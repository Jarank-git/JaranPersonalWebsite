'use client'

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
  return (
    <div className="summary-panel exp-detail-anim">
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
    </div>
  )
}
