import type { AboutSlab } from '@/types/content'
import { Ornament } from '@/components/layout/Ornament'
import { Button } from '@/components/ui/button'

export interface AboutSectionProps {
  data: AboutSlab
}

export function AboutSection({ data }: AboutSectionProps) {
  const paragraphs = data.body.split(/\n\n+/).filter((p) => p.trim().length > 0)

  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-12">
      <header className="mb-6">
        <h1 className="menu-label text-3xl text-[var(--color-cream)]">{data.title}</h1>
        <Ornament variant="divider" className="mt-3" />
      </header>

      <div className="space-y-4 text-[var(--color-cream-dim)] leading-relaxed">
        {paragraphs.length === 0 ? (
          <p>{data.body}</p>
        ) : (
          paragraphs.map((p, i) => <p key={i}>{p}</p>)
        )}
      </div>

      {data.sideNote && (
        <aside className="mt-6 border-l border-[var(--color-gold)]/40 pl-4 italic text-[var(--color-cream-faint)]">
          {data.sideNote}
        </aside>
      )}

      {data.download && (
        <div className="mt-8">
          <Button asChild size="lg">
            <a href={data.download.href} download>
              {data.download.label}
            </a>
          </Button>
        </div>
      )}
    </section>
  )
}
