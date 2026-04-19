const chips = [
  { name: 'THE AUTHOR', bar1: 82, bar2: 64 },
  { name: 'CRAFT', bar1: 91, bar2: 78 },
  { name: 'CURIOSITY', bar1: 100, bar2: 88 },
] as const

export function PartyChips() {
  return (
    <div className="party">
      {chips.map((c) => (
        <div key={c.name} className="chip">
          <div className="chip-avatar" />
          <div className="chip-meta">
            <div className="chip-name">{c.name}</div>
            <div className="chip-bars">
              <div className="chip-bar">
                <span style={{ width: `${c.bar1}%` }} />
              </div>
              <div className="chip-bar red">
                <span style={{ width: `${c.bar2}%` }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
