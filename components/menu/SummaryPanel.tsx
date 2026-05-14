'use client'

export function SummaryPanel() {
  return (
    <div className="summary-panel">
      <hr className="summary-panel-rule" aria-hidden="true" />
      <h2 className="summary-panel-title">Jaran Khalid</h2>
      <hr className="summary-panel-rule" aria-hidden="true" />

      <div className="summary-panel-body">
        <section className="summary-panel-section" aria-labelledby="sp-experience">
          <h3 id="sp-experience" className="summary-panel-section-heading">Experience</h3>

          <div className="summary-panel-entry">
            <span className="summary-panel-entry-title">Business Automation &amp; Systems Developer (Co-op)</span>
            <span className="summary-panel-entry-sub">
              <a href="https://renellence.com/" target="_blank" rel="noopener noreferrer" className="summary-panel-entry-company">
                <img src="/assets/Renellence%20Logo.png" alt="" aria-hidden="true" className="summary-panel-entry-co-mark" />
                Renellence · Jan 2026–Present
              </a>
            </span>
          </div>

          <div className="summary-panel-entry">
            <span className="summary-panel-entry-title">Systems Engineering Intern</span>
            <span className="summary-panel-entry-sub">
              <a href="https://civilcraft.com/" target="_blank" rel="noopener noreferrer" className="summary-panel-entry-company">
                <img src="/assets/Civilcraft.png" alt="" aria-hidden="true" className="summary-panel-entry-co-mark" />
                Civilcraft · Jun–Aug 2025
              </a>
            </span>
          </div>

          <div className="summary-panel-entry">
            <span className="summary-panel-entry-title">Electrical Subsystem Member</span>
            <span className="summary-panel-entry-sub">
              <a href="https://www.uwarg.com/" target="_blank" rel="noopener noreferrer" className="summary-panel-entry-company">
                <img src="/assets/WARG.png" alt="" aria-hidden="true" className="summary-panel-entry-co-mark" />
                WARG · Sep 2025–Present
              </a>
            </span>
          </div>

          <div className="summary-panel-entry">
            <span className="summary-panel-entry-title">Coding Instructor</span>
            <span className="summary-panel-entry-sub">
              <a href="https://www.codeninjas.com/milton-on-ca" target="_blank" rel="noopener noreferrer" className="summary-panel-entry-company">
                <img src="/assets/Code%20Ninjas%20Logo.png" alt="" aria-hidden="true" className="summary-panel-entry-co-mark" />
                Code Ninjas · Jul–Aug 2025
              </a>
            </span>
          </div>
        </section>

        <div>
          <section className="summary-panel-section" aria-labelledby="sp-projects">
            <h3 id="sp-projects" className="summary-panel-section-heading">Projects</h3>

            <div className="summary-panel-entry">
              <span className="summary-panel-entry-title">Robotic Arm</span>
              <span className="summary-panel-entry-sub">Arduino Nano · OpenCV · Altium</span>
            </div>
            <div className="summary-panel-entry">
              <span className="summary-panel-entry-title">LDO Voltage Regulator</span>
              <span className="summary-panel-entry-sub">Altium Designer · WARG</span>
            </div>
            <div className="summary-panel-entry">
              <span className="summary-panel-entry-title">Arctic Analytics</span>
              <span className="summary-panel-entry-sub">Arduino · React · Python</span>
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
                    src="/assets/Uwaterloo_crest.png"
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
          href="https://github.com/Jarank-git"
          className="summary-panel-hint"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
        >
          <img src="/assets/Github%20Logo.png" alt="" aria-hidden="true" className="summary-panel-hint-logo" />
          <span>:GitHub</span>
        </a>
        <a
          href="https://www.linkedin.com/in/jaran-khalid/"
          className="summary-panel-hint"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
        >
          <img src="/assets/Linkedin%20Logo.png" alt="" aria-hidden="true" className="summary-panel-hint-logo" data-color />
          <span>:LinkedIn</span>
        </a>
      </div>
    </div>
  )
}
