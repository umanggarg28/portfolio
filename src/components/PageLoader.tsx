'use client'

import { useEffect } from 'react'

export default function PageLoader() {
  useEffect(() => {
    const overlay = document.createElement('div')
    overlay.id = 'page-loader'
    overlay.innerHTML = '<div class="loader-bar"></div>'
    document.body.appendChild(overlay)

    const style = document.createElement('style')
    style.textContent = `
      #page-loader {
        position: fixed; inset: 0; z-index: 9000;
        background: #0d0d0d;
        display: flex; align-items: flex-end;
        padding: 48px;
        transition: opacity 0.6s cubic-bezier(0.23,1,0.32,1);
      }
      #page-loader.done { opacity: 0; pointer-events: none; }
      .loader-bar {
        width: 0; height: 1px;
        background: var(--accent);
        transition: width 0.7s cubic-bezier(0.23,1,0.32,1);
      }
    `
    document.head.appendChild(style)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const bar = overlay.querySelector<HTMLElement>('.loader-bar')
        if (bar) bar.style.width = '100%'
        setTimeout(() => {
          overlay.classList.add('done')
          setTimeout(() => {
            overlay.remove()
            style.remove()
          }, 500)
        }, 550)
      })
    })
  }, [])

  return null
}
