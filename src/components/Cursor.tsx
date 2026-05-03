'use client'

import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const ring = document.getElementById('cursor-ring')
    if (!cursor || !ring) return

    let mx = -100, my = -100, rx = -100, ry = -100

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }
    document.addEventListener('mousemove', onMouseMove)

    let rafId: number
    function animateCursor() {
      rx += (mx - rx) * 0.14
      ry += (my - ry) * 0.14
      cursor!.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`
      ring!.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`
      rafId = requestAnimationFrame(animateCursor)
    }
    rafId = requestAnimationFrame(animateCursor)

    const addLink = () => document.body.classList.add('cursor-link')
    const removeLink = () => document.body.classList.remove('cursor-link')

    document.addEventListener('mouseover', (e) => {
      const t = e.target as Element
      if (t.closest('a, button, .exp-row, .project-cell')) addLink()
      else removeLink()
    })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div id="cursor" />
      <div id="cursor-ring" />
    </>
  )
}
