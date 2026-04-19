interface CommandHudProps {
  currentCommand: string
}

export function CommandHud({ currentCommand }: CommandHudProps) {
  return (
    <div className="cmd-hud">
      <div className="cmd-hud-label">Command</div>
      <div className="cmd-hud-current">{currentCommand}</div>
      <div className="cmd-hud-keys">
        <span>
          <span className="key-pill">{'\u21B5'}</span>Enter
        </span>
        <span>
          <span className="key-pill">{'\u2195'}</span>Navigate
        </span>
      </div>
    </div>
  )
}
