import { Link } from 'react-router-dom'

export function Component() {
  return (
    <div className="error">
      <h2>Nie odnaleziono strony</h2>
      <Link to="/">Przejdź do strony głównej</Link>
    </div>
  )
}

Component.displayName = 'NotFound';