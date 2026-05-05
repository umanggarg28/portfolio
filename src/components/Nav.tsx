'use client'

import { useEffect, useState, useCallback } from 'react'

const NAV_LINKS = [
  { href: '#about',      label: 'About',    id: 'about'      },
  { href: '#experience', label: 'Work',     id: 'experience' },
  { href: '#projects',   label: 'Projects', id: 'projects'   },
  { href: '#skills',     label: 'Skills',   id: 'skills'     },
  { href: '#contact',    label: 'Contact',  id: 'contact'    },
]

const SECTION_TITLES: Record<string, { num: string; title: string; accent: string }> = {
  about: { num: '01', title: 'ABOUT', accent: 'me' },
  experience: { num: '02', title: 'WORK', accent: 'history' },
  projects: { num: '03', title: 'SELECTED', accent: 'work' },
  skills: { num: '04', title: 'TECH', accent: 'stack' },
  contact: { num: '05', title: 'CONTACT', accent: 'me' },
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [peek, setPeek] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    const sections = NAV_LINKS
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    const updateActiveSection = () => {
      const marker = window.innerWidth <= 900 ? 112 : Math.round(window.innerHeight * 0.38)
      const bottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      let current = ''

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= marker) {
          current = section.id
        }
      }

      setActiveId(bottom ? NAV_LINKS[NAV_LINKS.length - 1].id : current)
    }

    const onScroll = () => {
      setScrolled(window.scrollY > 80)
      if (bar) {
        const total = document.documentElement.scrollHeight - window.innerHeight
        bar.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`
      }
      updateActiveSection()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    onScroll()

    // Mouse peek
    const onMouseMove = (e: MouseEvent) => setPeek(e.clientY < 72)
    document.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateActiveSection)
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  const hidden = scrolled && !peek && !drawerOpen
  const activeSection = SECTION_TITLES[activeId]

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

      <div
        className={[
          'mobile-section-indicator',
          activeSection && scrolled ? 'visible' : '',
          hidden ? 'nav-is-hidden' : '',
        ].filter(Boolean).join(' ')}
        aria-hidden="true"
      >
        {activeSection ? (
          <>
            <span className="mobile-section-num">{activeSection.num}</span>
            <span className="mobile-section-title">
              {activeSection.title} <em>{activeSection.accent}</em>
            </span>
          </>
        ) : null}
      </div>
    </>
  )
}
