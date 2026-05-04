'use client'

import { useEffect, useState, useCallback } from 'react'

const NAV_LINKS = [
  { href: '#about',      label: 'About',    id: 'about'      },
  { href: '#experience', label: 'Work',     id: 'experience' },
  { href: '#projects',   label: 'Projects', id: 'projects'   },
  { href: '#skills',     label: 'Skills',   id: 'skills'     },
  { href: '#contact',    label: 'Contact',  id: 'contact'    },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [peek, setPeek] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    // Scroll state + progress bar
    const bar = document.getElementById('scroll-progress')
    const onScroll = () => {
      setScrolled(window.scrollY > 80)
      if (bar) {
        const total = document.documentElement.scrollHeight - window.innerHeight
        bar.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Mouse peek
    const onMouseMove = (e: MouseEvent) => setPeek(e.clientY < 72)
    document.addEventListener('mousemove', onMouseMove)

    // Active section via IntersectionObserver
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { threshold: 0.35 }
    )
    sections.forEach((s) => observer.observe(s))

    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mousemove', onMouseMove)
      observer.disconnect()
    }
  }, [])

  const hidden = scrolled && !peek && !drawerOpen

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
    document.body.style.overflow = ''
  }, [])

  const toggleDrawer = useCallback(() => {
    setDrawerOpen((prev) => {
      const next = !prev
      document.body.style.overflow = next ? 'hidden' : ''
      return next
    })
  }, [])

  return (
    <>
      <div id="scroll-progress" />
      <nav
        id="main-nav"
        className={[scrolled ? 'scrolled' : '', hidden ? 'nav-hidden' : ''].filter(Boolean).join(' ')}
      >
        <a className="nav-logo" href="#hero">UG</a>
        <ul className="nav-links">
          {NAV_LINKS.map(({ href, label, id }) => (
            <li key={id}>
              <a href={href} className={activeId === id ? 'nav-active' : ''}>{label}</a>
            </li>
          ))}
        </ul>
        <button
          className={`nav-hamburger${drawerOpen ? ' open' : ''}`}
          aria-label="Menu"
          onClick={toggleDrawer}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`nav-drawer${drawerOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(({ href, label, id }) => (
          <a key={id} href={href} onClick={closeDrawer}>{label}</a>
        ))}
      </div>
    </>
  )
}
