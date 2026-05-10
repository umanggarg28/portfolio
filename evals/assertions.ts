/**
 * Cheap deterministic assertions for the eval harness.
 *
 * Run in milliseconds, no LLM needed. Reserve the (expensive, slow) LLM judge
 * for genuinely subjective criteria like tone or voice.
 */

export type ToolCallInfo = { name: string; input: unknown }

export type Assertion =
  | { type: 'contains'; value: string; flags?: string }
  | { type: 'containsAny'; values: string[] }
  | { type: 'notContains'; value: string }
  | { type: 'notContainsAny'; values: string[] }
  | { type: 'maxWords'; value: number }
  | { type: 'minWords'; value: number }
  | { type: 'matches'; pattern: string; flags?: string }
  | { type: 'toolCalled'; name: string }
  | { type: 'toolNotCalled'; name: string }
  | { type: 'toolInputContains'; name: string; field: string; value: string }

export type AssertionResult =
  | { passed: true; assertion: Assertion }
  | { passed: false; assertion: Assertion; reason: string }

const lc = (s: string) => s.toLowerCase()

export function runAssertion(
  assertion: Assertion,
  response: string,
  toolCalls: ToolCallInfo[]
): AssertionResult {
  const ok = (): AssertionResult => ({ passed: true, assertion })
  const fail = (reason: string): AssertionResult => ({
    passed: false,
    assertion,
    reason,
  })

  switch (assertion.type) {
    case 'contains':
      return lc(response).includes(lc(assertion.value))
        ? ok()
        : fail(`response missing "${assertion.value}"`)
    case 'containsAny':
      return assertion.values.some((v) => lc(response).includes(lc(v)))
        ? ok()
        : fail(`response missing any of [${assertion.values.join(', ')}]`)
    case 'notContains':
      return !lc(response).includes(lc(assertion.value))
        ? ok()
        : fail(`response contains banned phrase "${assertion.value}"`)
    case 'notContainsAny':
      for (const v of assertion.values) {
        if (lc(response).includes(lc(v))) {
          return fail(`response contains banned phrase "${v}"`)
        }
      }
      return ok()
    case 'maxWords': {
      const wc = response.trim().split(/\s+/).length
      return wc <= assertion.value
        ? ok()
        : fail(`${wc} words > max ${assertion.value}`)
    }
    case 'minWords': {
      const wc = response.trim().split(/\s+/).length
      return wc >= assertion.value
        ? ok()
        : fail(`${wc} words < min ${assertion.value}`)
    }
    case 'matches':
      return new RegExp(assertion.pattern, assertion.flags ?? 'i').test(response)
        ? ok()
        : fail(`pattern /${assertion.pattern}/ did not match`)
    case 'toolCalled':
      return toolCalls.some((t) => t.name === assertion.name)
        ? ok()
        : fail(`tool "${assertion.name}" was not called`)
    case 'toolNotCalled':
      return toolCalls.every((t) => t.name !== assertion.name)
        ? ok()
        : fail(`tool "${assertion.name}" was called and shouldn't be`)
    case 'toolInputContains': {
      const call = toolCalls.find((t) => t.name === assertion.name)
      if (!call) return fail(`tool "${assertion.name}" was not called`)
      const input = call.input as Record<string, unknown>
      const v = String(input?.[assertion.field] ?? '').toLowerCase()
      return v.includes(assertion.value.toLowerCase())
        ? ok()
        : fail(
            `tool "${assertion.name}" input.${assertion.field} = "${v}" missing "${assertion.value}"`
          )
    }
  }
}
