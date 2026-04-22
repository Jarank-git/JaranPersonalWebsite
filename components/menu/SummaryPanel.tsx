'use client'

import { motion, useReducedMotion } from 'framer-motion'

export function SummaryPanel() {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="summary-panel"
      initial={{ x: reduced ? 0 : -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: reduced ? 0 : -40, opacity: 0 }}
      transition={{ duration: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <div className="summary-panel-accent" aria-hidden="true" />
      <div className="summary-panel-corner-cut" aria-hidden="true" />

      <p className="summary-panel-eyebrow">00 · SUMMARY</p>

      <div className="summary-panel-name" aria-label="Jaran Khalid">
        <span>JARAN</span>
        <span>KHALID</span>
      </div>

      <div className="summary-panel-rule" aria-hidden="true" />

      <p className="summary-panel-degree">
        BASc Electrical Engineering · University of Waterloo
      </p>

      <p className="summary-panel-bio">
        Building at the intersection of hardware and software.
      </p>

      <div className="summary-panel-card summary-panel-card--red">
        <span className="summary-panel-card-label">▸ Experience</span>
        <span className="summary-panel-card-title">Internship · Company</span>
        <span className="summary-panel-card-sub">Role · 2024</span>
      </div>

      <div className="summary-panel-card summary-panel-card--gold">
        <span className="summary-panel-card-label">▸ Top Project</span>
        <span className="summary-panel-card-title">Project Name</span>
        <span className="summary-panel-card-sub">React · TypeScript</span>
      </div>

      <div className="summary-panel-ctas">
        <a
          href="/resume.pdf"
          className="summary-panel-btn-primary"
          download
          aria-label="Download resume"
        >
          ↓ Resume
        </a>
        <a
          href="https://linkedin.com/in/jarankhalid"
          className="summary-panel-btn-secondary"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
        >
          ↗ LinkedIn
        </a>
      </div>
    </motion.div>
  )
}
