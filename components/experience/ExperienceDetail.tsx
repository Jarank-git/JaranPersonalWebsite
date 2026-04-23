'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

interface Experience {
  role: string
  company: string
  location: string
  start: string
  end: string
  stack: string[]
  bullets: string[]
}

interface ExperienceDetailProps {
  exp: Experience
}

export function ExperienceDetail({ exp }: ExperienceDetailProps) {
  const reduced = useReducedMotion()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={exp.company}
        className="summary-panel"
        initial={{ x: reduced ? 0 : -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: reduced ? 0 : -40, opacity: 0 }}
        transition={{ duration: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <hr className="summary-panel-rule" aria-hidden="true" />
        <h2 className="summary-panel-title">{exp.role}</h2>
        <hr className="summary-panel-rule" aria-hidden="true" />

        <div className="exp-detail-body">
          <div className="summary-panel-section">
            <h3 className="summary-panel-section-heading">Where</h3>
            <div className="summary-panel-entry">
              <span className="summary-panel-entry-title">{exp.company}</span>
              <span className="summary-panel-entry-sub">{exp.location}</span>
            </div>
            <div className="summary-panel-entry">
              <span className="summary-panel-entry-sub">{exp.start} — {exp.end}</span>
            </div>
          </div>

          <div className="summary-panel-section exp-detail-bullets-section">
            <h3 className="summary-panel-section-heading">Highlights</h3>
            {exp.bullets.map(b => (
              <div key={b} className="summary-panel-entry">
                <span className="summary-panel-entry-sub exp-detail-bullet">{b}</span>
              </div>
            ))}
          </div>
        </div>

        <hr className="summary-panel-rule" aria-hidden="true" />
      </motion.div>
    </AnimatePresence>
  )
}
