/**
 * Hybrid eval harness for the Ask Umang chat agent.
 *
 * Each case in `evals/golden.json` runs in two phases:
 *
 *   1. **Deterministic assertions** — `evals/assertions.ts`. Cheap (ms), no
 *      LLM. Catches the structural failures: wrong tool fired, banned phrase
 *      slipped through, wrong URL, missing keyword. Most failures land here.
 *
 *   2. **LLM judge (Sonnet)** — only invoked when assertions pass AND the
 *      case has `judge_expectations`. Catches the subjective failures: tone,
 *      voice, off-brand language. Run via `generateObject` with a schema, so
 *      the verdict is structured.
 *
 * Run:
 *   npm run eval                        — full suite, exits non-zero on fail
 *   npm run eval -- --case=asurion-deep — single case
 *   npm run eval -- --verbose           — print full responses + tool calls
 *   npm run eval -- --no-judge          — skip the LLM judge (fastest)
 *
 * Cost per run: ~$0.05 with judge enabled, <$0.01 without.
 */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { anthropic } from '@ai-sdk/anthropic'
import { generateObject, generateText, stepCountIs } from 'ai'
import { config as loadEnv } from 'dotenv'
import { z } from 'zod'

import { runAssertion, type Assertion, type AssertionResult } from '../evals/assertions'
import { resolveSystemPrompt } from '../src/lib/chat-prompt-loader'
import { buildTools, CHAT_MODEL } from '../src/lib/chat-tools'

loadEnv({ path: '.env.local' })

const JUDGE_MODEL = 'claude-sonnet-4-6'

type Case = {
  id: string
  question: string
  assertions?: Assertion[]
  judge_expectations?: string[]
}

type Golden = { cases: Case[] }
type ToolCallLog = { name: string; input: unknown }

const args = new Set(process.argv.slice(2))
const verbose = args.has('--verbose')
const skipJudge = args.has('--no-judge')
const caseFilter = [...args]
  .find((a) => a.startsWith('--case='))
  ?.slice('--case='.length)

const golden: Golden = JSON.parse(
  readFileSync(resolve(process.cwd(), 'evals/golden.json'), 'utf-8')
)

const cases = caseFilter
  ? golden.cases.filter((c) => c.id === caseFilter)
  : golden.cases

if (cases.length === 0) {
  console.error('no cases to run')
  process.exit(2)
}

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('ANTHROPIC_API_KEY missing — load .env.local first')
  process.exit(2)
}

async function runCase(c: Case): Promise<{ text: string; toolCalls: ToolCallLog[] }> {
  const { text: SYSTEM_PROMPT } = await resolveSystemPrompt({})
  const result = await generateText({
    model: anthropic(CHAT_MODEL),
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: c.question }],
    temperature: 0.65,
    stopWhen: stepCountIs(5),
    tools: buildTools({ transcript: '', userMsg: c.question }),
  })
  const toolCalls: ToolCallLog[] = []
  for (const step of result.steps ?? []) {
    for (const call of step.toolCalls ?? []) {
      toolCalls.push({ name: call.toolName, input: call.input })
    }
  }
  return { text: result.text, toolCalls }
}

const verdictSchema = z.object({
  pass: z.boolean(),
  reasoning: z.string(),
  failed_expectations: z.array(z.string()),
})

async function judge(
  c: Case,
  reply: string,
  toolCalls: ToolCallLog[]
): Promise<z.infer<typeof verdictSchema>> {
  const judgePrompt = `You are evaluating a chat agent that represents a software engineer named Umang on his portfolio site.

# Question asked by visitor
${c.question}

# Agent's reply
${reply || '(empty)'}

# Tools the agent called
${toolCalls.length === 0 ? '(none)' : JSON.stringify(toolCalls, null, 2)}

# Subjective expectations (ALL must hold)
${(c.judge_expectations ?? []).map((e, i) => `${i + 1}. ${e}`).join('\n')}

Return:
- pass: true ONLY if every expectation is met.
- reasoning: 1–2 sentences citing the specific phrase or tool call (or absence) that drove the verdict.
- failed_expectations: list any expectation numbers/text that were NOT met.
Be strict. Pass only if it would represent Umang well to a recruiter.`

  const { object } = await generateObject({
    model: anthropic(JUDGE_MODEL),
    schema: verdictSchema,
    messages: [{ role: 'user', content: judgePrompt }],
    temperature: 0,
  })
  return object
}

async function main() {
  let passed = 0
  let failed = 0
  let judgeCalls = 0

  for (const c of cases) {
    process.stdout.write(`▸ ${c.id.padEnd(28, ' ')} `)
    try {
      const { text, toolCalls } = await runCase(c)

      // Phase 1: deterministic assertions
      const assertionResults: AssertionResult[] = (c.assertions ?? []).map((a) =>
        runAssertion(a, text, toolCalls)
      )
      const failedAssertions = assertionResults.filter((r) => !r.passed)

      if (failedAssertions.length > 0) {
        console.log('FAIL (assertion)')
        for (const r of failedAssertions) {
          if (!r.passed) console.log(`   • ${r.reason}`)
        }
        failed += 1
        if (verbose) printVerbose(text, toolCalls)
        continue
      }

      // Phase 2: LLM judge (only if assertions passed AND there are subjective expectations)
      if (skipJudge || !c.judge_expectations || c.judge_expectations.length === 0) {
        console.log('PASS')
        passed += 1
        if (verbose) printVerbose(text, toolCalls)
        continue
      }

      const verdict = await judge(c, text, toolCalls)
      judgeCalls += 1
      if (verdict.pass) {
        console.log('PASS')
        passed += 1
      } else {
        console.log('FAIL (judge)')
        console.log(`   reason: ${verdict.reasoning}`)
        for (const e of verdict.failed_expectations) console.log(`   missed: ${e}`)
        failed += 1
      }
      if (verbose) printVerbose(text, toolCalls)
    } catch (err) {
      console.log('ERROR')
      console.log(`   ${(err as Error).message}`)
      failed += 1
    }
  }

  console.log()
  console.log(
    `${passed} passed, ${failed} failed (of ${cases.length}) — judge invoked ${judgeCalls} time(s)`
  )
  process.exit(failed === 0 ? 0 : 1)
}

function printVerbose(text: string, toolCalls: ToolCallLog[]) {
  console.log(`   tools: ${toolCalls.map((t) => t.name).join(', ') || '(none)'}`)
  console.log(
    `   reply: ${text.replace(/\s+/g, ' ').slice(0, 240)}${text.length > 240 ? '…' : ''}`
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(2)
})
