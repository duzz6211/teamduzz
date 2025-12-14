import { Link } from 'react-router-dom'
import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  href?: string
  external?: boolean
  icon?: ReactNode
  loading?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  external,
  icon,
  loading,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  // Base styles - pill shape, always white text for primary
  const baseStyles = `
    inline-flex items-center justify-center gap-2 
    font-semibold rounded-full font-body
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    transition-all duration-200
  `

  // Variant styles with explicit text colors
  const variants = {
    primary: `
      text-white
      hover:text-white
      active:text-white
    `,
    secondary: `
      text-brand-primary border-2 border-brand-primary bg-transparent
      hover:bg-brand-primary hover:text-white hover:border-brand-primary
    `,
    ghost: `
      text-brand-primary bg-transparent
      hover:bg-brand-light hover:text-brand-primary
    `,
  }

  // Size variants
  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  // Inline styles for primary button (gradient + shadow)
  const primaryStyles = variant === 'primary' ? {
    background: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)',
    boxShadow: '0 2px 8px rgba(109, 40, 217, 0.2)',
    color: '#FFFFFF',
  } : {}

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  const content = (
    <>
      {loading ? (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : icon ? (
        icon
      ) : null}
      {children}
    </>
  )

  // Hover/active styles for primary button
  const hoverClass = variant === 'primary' 
    ? 'hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(109,40,217,0.3)] active:translate-y-0 active:shadow-[0_2px_6px_rgba(109,40,217,0.2)]'
    : variant === 'secondary'
    ? 'hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(109,40,217,0.25)] active:translate-y-0'
    : 'hover:-translate-y-0.5 active:translate-y-0'

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${combinedClassName} ${hoverClass}`}
          style={primaryStyles}
        >
          {content}
        </a>
      )
    }
    return (
      <Link 
        to={href} 
        className={`${combinedClassName} ${hoverClass}`}
        style={primaryStyles}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      className={`${combinedClassName} ${hoverClass}`}
      style={primaryStyles}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  )
}
