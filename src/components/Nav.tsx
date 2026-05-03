'use client'

import { useEffect, useState, useCallback } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [peek, setPeek] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })

    const onMouseMove = (e: MouseEvent) => setPeek(e.clientY < 72)
    document.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mousemove', onMouseMove)
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
      <nav
        id="main-nav"
        className={[scrolled ? 'scrolled' : '', hidden ? 'nav-hidden' : ''].filter(Boolean).join(' ')}
      >
        <a className="nav-logo" href="#hero">UG</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Work</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button
          className={`nav-hamburger${drawerOpen ? ' open' : ''}`}
          id="hamburger"
          aria-label="Menu"
          onClick={toggleDrawer}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`nav-drawer${drawerOpen ? ' open' : ''}`} id="nav-drawer">
        <a href="#about" onClick={closeDrawer}>About</a>
        <a href="#experience" onClick={closeDrawer}>Work</a>
        <a href="#projects" onClick={closeDrawer}>Projects</a>
        <a href="#skills" onClick={closeDrawer}>Skills</a>
        <a href="#contact" onClick={closeDrawer}>Contact</a>
      </div>
    </>
  )
}
