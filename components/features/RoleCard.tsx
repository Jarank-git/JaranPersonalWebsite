import type { Role } from '@/types/content'
import { Ornament } from '@/components/layout/Ornament'

export interface RoleCardProps {
  role: Role
}

function formatEnd(end: string): string {
  return end === 'present' ? 'Present' : end
}

export function RoleCard({ role }: RoleCardProps) {
  const { title, company, location, start, end, summary, bullets, stack } = role

  return (
    <article className="relative mx-auto w-full max-w-2xl px-6 py-12">
      <header className="mb-8">
        <h1 className="menu-label gold-text text-3xl md:text-4xl leading-tight">{title}</h1>
        <p className="mt-3 text-lg text-[var(--color-cream-dim)]">
          <span className="text-[var(--color-gold-bright)]">{company}</span>
          <span className="mx-2 text-[var(--color-cream-faint)]">·</span>
          <span>{location}</span>
        </p>
        <Ornament variant="divider" className="mt-5" />
        <p className="mt-4 menu-label text-xs tracking-widest text-[var(--color-cream-faint)]">
          <span>{start}</span>
          <span className="mx-2">—</span>
          <span>{formatEnd(end)}</span>
        </p>
      </header>

      <div className="relative art-nouveau-border p-6">
        <p className="leading-relaxed text-[var(--color-cream-dim)]">{summary}</p>

        {bullets.length > 0 && (
          <ul className="mt-6 space-y-3 pl-4 text-[var(--color-cream-dim)]">
            {bullets.map((b, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--color-gold)]/60" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {stack && stack.length > 0 && (
        <footer className="mt-8">
          <p className="menu-label mb-3 text-[10px] tracking-[0.3em] text-[var(--color-gold)]/50">Equipment</p>
          <ul className="flex flex-wrap gap-2">
            {stack.map((s) => (
              <li key={s} className="menu-label border border-[var(--color-gold)]/30 bg-[var(--color-obsidian-2)]/60 px-3 py-1.5 text-[10px] text-[var(--color-cream)]">
                {s}
              </li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  )
}
