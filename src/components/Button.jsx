import { Link } from 'react-router-dom'

export default function Button({
  children,
  to,
  variant = 'outline', // 'outline' | 'solid'
  className = '',
  ...props
}) {
  const base = variant === 'solid' ? 'btn-gold-solid' : 'btn-gold'
  const cls = `${base} ${className}`

  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    )
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}