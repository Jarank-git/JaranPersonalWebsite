'use client'

export function ContactPanel() {
  return (
    <div className="summary-panel">
      <hr className="summary-panel-rule" aria-hidden="true" />
      <h2 className="summary-panel-title">Contact</h2>
      <hr className="summary-panel-rule" aria-hidden="true" />

      <div className="contact-panel-body">
        <div className="contact-panel-row">
          <span className="contact-panel-label">Email</span>
          <a href="mailto:Jarankhalid2@gmail.com" className="contact-panel-value">
            Jarankhalid2@gmail.com
          </a>
        </div>
        <div className="contact-panel-row">
          <span className="contact-panel-label">Phone</span>
          <a href="tel:+14374312094" className="contact-panel-value">
            437-431-2094
          </a>
        </div>
        <div className="contact-panel-row">
          <span className="contact-panel-label">LinkedIn</span>
          <a
            href="https://www.linkedin.com/in/jaran-khalid/"
            className="contact-panel-value"
            target="_blank"
            rel="noopener noreferrer"
          >
            jaran-khalid
          </a>
        </div>
        <div className="contact-panel-row">
          <span className="contact-panel-label">GitHub</span>
          <a
            href="https://github.com/Jarank-git"
            className="contact-panel-value"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jarank-git
          </a>
        </div>
      </div>

      <hr className="summary-panel-rule" aria-hidden="true" />
    </div>
  )
}
