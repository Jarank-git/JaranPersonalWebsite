'use client'

const PLAIN_ROWS = [
  { label: 'Email', display: 'Jarankhalid2@gmail.com' },
  { label: 'Phone', display: '437-431-2094' },
]

const LINK_ROWS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jaran-khalid/',
    display: 'jaran-khalid',
    logo: '/assets/Linkedin%20Logo.png',
    colorLogo: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Jarank-git',
    display: 'Jarank-git',
    logo: '/assets/Github%20Logo.png',
    colorLogo: false,
  },
]

export function ContactPanel() {
  return (
    <div className="summary-panel">
      <hr className="summary-panel-rule" aria-hidden="true" />
      <h2 className="summary-panel-title">Contact</h2>
      <hr className="summary-panel-rule" aria-hidden="true" />

      <div className="contact-panel-body">
        {PLAIN_ROWS.map(({ label, display }) => (
          <div key={label} className="contact-panel-row">
            <span className="contact-panel-label">{label}</span>
            <span className="contact-panel-value">{display}</span>
          </div>
        ))}
        {LINK_ROWS.map(({ label, href, display, logo, colorLogo }) => (
          <div key={label} className="contact-panel-row">
            <span className="contact-panel-label">{label}</span>
            <a
              href={href}
              className="contact-panel-value summary-panel-entry-company"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={logo}
                alt=""
                aria-hidden="true"
                className="summary-panel-entry-co-mark"
                {...(colorLogo ? { 'data-color': '' } : {})}
              />
              {display}
            </a>
          </div>
        ))}
      </div>

      <hr className="summary-panel-rule" aria-hidden="true" />
    </div>
  )
}
