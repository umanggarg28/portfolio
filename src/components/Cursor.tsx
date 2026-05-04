'use client'

import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const ring = document.getElementById('cursor-ring')
    if (!cursor || !ring) return

    let mx = -100, my = -100, rx = -100, ry = -100

    const onMouseMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
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

    const onMouseOver = (e: MouseEvent) => {
      const t = e.target as Element
      if (t.closest('.project-cell:not(.project-cell--static)')) {
        document.body.classList.add('cursor-project')
        document.body.classList.remove('cursor-link')
      } else if (t.closest('a, button, .exp-row')) {
        document.body.classList.add('cursor-link')
        document.body.classList.remove('cursor-project')
      } else {
        document.body.classList.remove('cursor-link', 'cursor-project')
      }
    }
    document.addEventListener('mouseover', onMouseOver)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div id="cursor" />
      <div id="cursor-ring"><span id="cursor-label" /></div>
    </>
  )
}
