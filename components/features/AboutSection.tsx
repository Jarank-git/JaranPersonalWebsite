import type { AboutSlab } from '@/types/content'
import { Ornament } from '@/components/layout/Ornament'

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
          <a
            href={data.download.href}
            className="menu-label inline-block border border-[var(--color-gold)]/60 px-6 py-3 text-sm text-[var(--color-gold-bright)] transition-colors hover:border-[var(--color-gold-bright)] hover:text-[var(--color-cream)] focus-visible:outline-none focus-visible:border-[var(--color-gold-bright)] focus-visible:text-[var(--color-cream)]"
            download
          >
            {data.download.label}
          </a>
        </div>
      )}
    </section>
  )
}
