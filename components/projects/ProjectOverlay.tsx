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
  videos?: { label: string; youtubeId: string }[]
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
  const [slideIdx, setSlideIdx] = useState(0)

  const total = project.images.length
  const prev = () => setSlideIdx((i) => (i - 1 + total) % total)
  const next = () => setSlideIdx((i) => (i + 1) % total)

  useEffect(() => {
    panelRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const close = () => {
    setExiting(true)
    setTimeout(onClose, EXIT_MS)
  }

  useEffect(() => {
    if (total <= 1) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
      if (e.key === 'ArrowRight') { e.preventDefault(); next() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [total])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

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
          {total > 0 && (
            <div className="proj-overlay-slideshow" aria-label="Image gallery">
              <div className="proj-overlay-slide">
                <img
                  key={project.images[slideIdx].src}
                  src={project.images[slideIdx].src}
                  alt={project.images[slideIdx].alt}
                />
              </div>
              {total > 1 && (
                <div className="proj-overlay-slide-nav">
                  <button
                    className="proj-overlay-slide-btn"
                    onClick={prev}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <span className="proj-overlay-slide-counter">
                    {String(slideIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                  <button
                    className="proj-overlay-slide-btn"
                    onClick={next}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </div>
              )}
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

          {project.videos && project.videos.length > 0 && (
            <>
              <div className="proj-overlay-section-label">Demo Videos</div>
              <div className="proj-overlay-videos">
                {project.videos.map((v) => (
                  <div key={v.youtubeId} className="proj-overlay-video-wrap">
                    <div className="proj-overlay-video-label">{v.label}</div>
                    <div className="proj-overlay-video-frame">
                      <iframe
                        src={`https://www.youtube.com/embed/${v.youtubeId}`}
                        title={v.label}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  </div>
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
