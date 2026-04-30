'use client'

const ROWS = [
  {
    label: 'Email',
    href: 'mailto:Jarankhalid2@gmail.com',
    display: 'Jarankhalid2@gmail.com',
    logo: null,
    external: false,
  },
  {
    label: 'Phone',
    href: 'tel:+14374312094',
    display: '437-431-2094',
    logo: null,
    external: false,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jaran-khalid/',
    display: 'jaran-khalid',
    logo: '/assets/Linkedin%20Logo.png',
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Jarank-git',
    display: 'Jarank-git',
    logo: '/assets/Github%20Logo.png',
    external: true,
  },
]

export function ContactPanel() {
  return (
    <div className="summary-panel">
      <hr className="summary-panel-rule" aria-hidden="true" />
      <h2 className="summary-panel-title">Contact</h2>
      <hr className="summary-panel-rule" aria-hidden="true" />

      <div className="contact-panel-body">
        {ROWS.map(({ label, href, display, logo, external }) => (
          <div key={label} className="contact-panel-row">
            <span className="contact-panel-label">{label}</span>
            <a
              href={href}
              className="contact-panel-value summary-panel-entry-company"
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {logo && (
                <img src={logo} alt="" aria-hidden="true" className="summary-panel-entry-co-mark" />
              )}
              {display}
            </a>
          </div>
        ))}
      </div>

      <hr className="summary-panel-rule" aria-hidden="true" />
    </div>
  )
}
