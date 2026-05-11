'use client'

import { useEffect, useRef } from 'react'

const ASCII_CHARS = '01·*+-=<>{}[]()/\\|'

const ARTIFACT_COUNT = 3

type SignalArtifactsProps = {
  variant?: 'about' | 'experience' | 'projects' | 'skills' | 'learning'
}

function randomPosition() {
  return {
    x: 7 + Math.random() * 86,
    y: 16 + Math.random() * 72,
  }
}

export default function SignalArtifacts({ variant = 'about' }: SignalArtifactsProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const fragmentRefs = useRef<Array<HTMLSpanElement | null>>([])
  const artifacts = Array.from({ length: ARTIFACT_COUNT })

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const root = rootRef.current
    let visible = true
    let timer: ReturnType<typeof setTimeout> | undefined

    const columns = fragmentRefs.current.map((el) => {
      const rows = 5 + Math.floor(Math.random() * 5)
      const cells = Array(rows).fill(' ')
      const position = randomPosition()
      el?.style.setProperty('--x', `${position.x}%`)
      el?.style.setProperty('--y', `${position.y}%`)
      return {
        el,
        cells,
        head: -Math.random() * rows,
        speed: 0.28 + Math.random() * 0.16,
      }
    }).filter((column) => column.el)

    const observer = root && 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting
        }, { rootMargin: '160px' })
      : null

    if (root && observer) observer.observe(root)

    const draw = () => {
      if (visible) {
        columns.forEach((column) => {
          for (let i = 0; i < column.cells.length; i++) {
            if (column.cells[i] !== ' ' && Math.random() < 0.11) column.cells[i] = ' '
          }

          const row = Math.floor(column.head)
          if (row >= 0 && row < column.cells.length) {
            column.cells[row] = ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)]
          }

          column.head += column.speed
          if (column.head > column.cells.length + 2) {
            const position = randomPosition()
            column.el!.style.setProperty('--x', `${position.x}%`)
            column.el!.style.setProperty('--y', `${position.y}%`)
            column.head = -Math.random() * 7
          }
          column.el!.textContent = column.cells.join('\n')
        })
      }

      timer = setTimeout(draw, 180)
    }

    draw()

    return () => {
      if (timer) clearTimeout(timer)
      observer?.disconnect()
    }
  }, [variant])

  return (
    <div className={`signal-artifacts signal-artifacts--${variant}`} ref={rootRef} aria-hidden="true">
      {artifacts.map((_, index) => (
        <span
          className="signal-fragment"
          key={`${variant}-${index}`}
          ref={(el) => {
            fragmentRefs.current[index] = el
          }}
        />
      ))}
    </div>
  )
}
