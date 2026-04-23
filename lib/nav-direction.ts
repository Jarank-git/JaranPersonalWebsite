type NavDirection = 'forward' | 'back'

let _dir: NavDirection = 'forward'

export function setNavBack(): void {
  _dir = 'back'
}

export function consumeNavDirection(): NavDirection {
  const d = _dir
  _dir = 'forward'
  return d
}
