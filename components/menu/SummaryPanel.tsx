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
      <hr className="summary-panel-rule" aria-hidden="true" />
      <h2 className="summary-panel-title">Jaran Khalid</h2>
      <hr className="summary-panel-rule" aria-hidden="true" />

      <div className="summary-panel-body">
        <section className="summary-panel-section" aria-labelledby="sp-experience">
          <h3 id="sp-experience" className="summary-panel-section-heading">Experience</h3>

          <div className="summary-panel-entry">
            <span className="summary-panel-entry-title">Systems Eng. Intern · Civilcraft</span>
            <span className="summary-panel-entry-sub">Remote · Jun–Aug 2025</span>
          </div>
          <div className="summary-panel-entry">
            <span className="summary-panel-entry-title">Electrical Subsystem · WARG</span>
            <span className="summary-panel-entry-sub">Waterloo · Sep 2025–Present</span>
          </div>
          <div className="summary-panel-entry">
            <span className="summary-panel-entry-title">Coding Instructor · Code Ninjas</span>
            <span className="summary-panel-entry-sub">Milton · Jul–Aug 2025</span>
          </div>
        </section>

        <div>
          <section className="summary-panel-section" aria-labelledby="sp-projects">
            <h3 id="sp-projects" className="summary-panel-section-heading">Projects</h3>

            <div className="summary-panel-entry">
              <span className="summary-panel-entry-title">12-24V Buck Boost Converter</span>
              <span className="summary-panel-entry-sub">Altium Designer · WARG</span>
            </div>
            <div className="summary-panel-entry">
              <span className="summary-panel-entry-title">Patient Env. Management System</span>
              <span className="summary-panel-entry-sub">Python · Flask · Raspberry Pi</span>
            </div>
          </section>

          <section className="summary-panel-section" aria-labelledby="sp-education">
            <h3 id="sp-education" className="summary-panel-section-heading">Education</h3>

            <div className="summary-panel-entry">
              <span className="summary-panel-entry-title">BASc Electrical Engineering</span>
              <span className="summary-panel-entry-sub">
                <a
                  href="https://uwaterloo.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="summary-panel-entry-link"
                >
                  <img
                    src="/assets/uwaterloo-crest.png"
                    alt=""
                    aria-hidden="true"
                    className="summary-panel-entry-mark"
                  />
                  University of Waterloo · 2025–2030
                </a>
              </span>
            </div>
          </section>
        </div>
      </div>

      <hr className="summary-panel-rule" aria-hidden="true" />
      <div className="summary-panel-footer">
        <a
          href="/resume.pdf"
          className="summary-panel-hint"
          download
          aria-label="Download resume"
        >
          <span className="summary-panel-hint-glyph" aria-hidden="true" />
          <span>:Resume</span>
        </a>
        <a
          href="https://github.com/Jarank-git"
          className="summary-panel-hint"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
        >
          <span className="summary-panel-hint-glyph" aria-hidden="true" />
          <span>:GitHub</span>
        </a>
        <a
          href="https://www.linkedin.com/in/jaran-khalid/"
          className="summary-panel-hint"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
        >
          <span className="summary-panel-hint-glyph" aria-hidden="true" />
          <span>:LinkedIn</span>
        </a>
      </div>
    </motion.div>
  )
}
