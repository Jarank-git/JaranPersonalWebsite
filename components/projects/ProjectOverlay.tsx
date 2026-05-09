'use client'

import { useRef, useEffect, useState } from 'react'

export interface ProjectEntry {
  id: string
  num: string
  title: string
  sub: string
  year: string
  category: string
  tagline: string
  overview: string
  bullets: string[]
  stack: string[]
  links: { label: string; href: string }[]
  images: { src: string; alt: string }[]
  icon: string | null
}

interface ProjectOverlayProps {
  project: ProjectEntry
  onClose: () => void
}

const EXIT_MS = 180

export function ProjectOverlay({ project, onClose }: ProjectOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    panelRef.current?.focus()
  }, [])

  const close = () => {
    setExiting(true)
    setTimeout(onClose, EXIT_MS)
  }

  return (
    <div
      className="proj-overlay-backdrop"
      data-exiting={exiting ? 'true' : undefined}
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="proj-overlay-panel"
        ref={panelRef}
        tabIndex={-1}
      >
        <button
          className="proj-overlay-close"
          onClick={close}
          aria-label="Close"
        >
          Close ×
        </button>

        <hr className="summary-panel-rule" style={{ marginTop: '28px' }} />
        <h2 className="summary-panel-title">{project.title}</h2>
        <p style={{
          textAlign: 'center',
          fontFamily: 'var(--font-body)',
          fontStyle: 'italic',
          fontSize: 'clamp(14px, 1.1vw, 16px)',
          color: 'var(--color-parchment-dim)',
          margin: '0 0 4px',
        }}>
          {project.sub} · {project.year}
        </p>
        <hr className="summary-panel-rule" />

        <div className="proj-overlay-body">
          {project.images.length > 0 && (
            <div className="proj-overlay-gallery">
              {project.images.map((img) => (
                <div key={img.src} className="proj-overlay-img">
                  <img src={img.src} alt={img.alt} />
                </div>
              ))}
            </div>
          )}

          <div className="proj-overlay-section-label">Overview</div>
          <p className="proj-overlay-overview">{project.overview}</p>

          {project.bullets.length > 0 && (
            <>
              <div className="proj-overlay-section-label">Highlights</div>
              <ul className="proj-overlay-bullets">
                {project.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </>
          )}

          {project.stack.length > 0 && (
            <>
              <div className="proj-overlay-section-label">Stack</div>
              <div className="proj-overlay-tags">
                {project.stack.map((s) => (
                  <span key={s} className="proj-overlay-tag">{s}</span>
                ))}
              </div>
            </>
          )}

          {project.links.length > 0 && (
            <div className="proj-overlay-links">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-overlay-link"
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <hr className="summary-panel-rule" />
      </div>
    </div>
  )
}
