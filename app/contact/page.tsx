import { ChronicleLayout } from '@/components/layout/ChronicleLayout'
import { contactLinks } from '@/lib/content'

export default function ContactPage() {
  return (
    <ChronicleLayout
      eyebrow={'Chapter IV \u00B7 Send Word'}
      title="Contact"
      titleSub="CORRESPONDENCE"
      lead="The best way to reach me is by email. I read everything and try to answer within a day or two."
    >
      <div className="contact-grid">
        {contactLinks.map((c) => (
          <a
            key={c.slug}
            href={c.href}
            className="contact-tile"
            target={c.external ? '_blank' : undefined}
            rel={c.external ? 'noreferrer noopener' : undefined}
          >
            <div className="k">{c.label}</div>
            <div className="v">{c.handle}</div>
          </a>
        ))}
      </div>
    </ChronicleLayout>
  )
}
