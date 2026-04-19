import { ChronicleLayout } from '@/components/layout/ChronicleLayout'
import { experience } from '@/lib/content'

export default function ExperiencePage() {
  return (
    <ChronicleLayout
      eyebrow={'Chapter III \u00B7 The Timeline'}
      title="Experience"
      titleSub="IN SERVICE OF GOOD SYSTEMS"
      lead={'Years spent building, teaching, and learning \u2014 alongside people I learned a great deal from.'}
    >
      {experience.map((r) => (
        <div key={r.slug} className="exp-item">
          <div className="exp-years">
            {r.start} {'\u2014'} {r.end === 'present' ? 'Now' : r.end}
          </div>
          <div>
            <div className="exp-role">{r.title}</div>
            <div className="exp-place">{r.company}</div>
            <div className="exp-blurb">{r.summary}</div>
          </div>
        </div>
      ))}
    </ChronicleLayout>
  )
}
