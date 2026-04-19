import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="chronicle" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div className="chronicle-eyebrow">Untranslated Fragment</div>
        <h1
          className="chronicle-title"
          style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(72px, 10vw, 140px)' }}
        >
          Quest Not Found
        </h1>
        <p className="chronicle-lead" style={{ maxWidth: '42em' }}>
          This page has drifted out of the expedition. No record of it remains.
        </p>
        <Link href="/" className="chronicle-back" style={{ marginTop: 20 }}>
          <span className="chronicle-back-glyph" aria-hidden>
            {'\u2190'}
          </span>
          <span className="chronicle-back-text">Return to Main</span>
        </Link>
      </div>
    </main>
  )
}
