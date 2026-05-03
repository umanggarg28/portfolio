'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  isHero?: boolean
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  isHero = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (isHero) {
      const timer = setTimeout(() => el.classList.add('in'), delay)
      return () => clearTimeout(timer)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.07, rootMargin: '0px 0px -30px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, isHero])

  return (
    <div
      ref={ref}
      className={`appear${className ? ' ' + className : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
