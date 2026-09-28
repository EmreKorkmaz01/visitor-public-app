import clsx from 'clsx'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className,
}) {
  const base = `
    inline-flex items-center justify-center gap-2 font-medium
    rounded-lg transition-all duration-150 cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
  `

  const variants = {
    primary: `
      bg-[var(--red)] text-white border-none
      hover:bg-[var(--red-hover)]
      shadow-[0_2px_8px_rgba(200,16,46,0.35)]
      hover:shadow-[0_4px_12px_rgba(200,16,46,0.4)]
    `,
    secondary: `
      bg-white text-[var(--text-secondary)]
      border border-[var(--border)]
      hover:bg-gray-50 hover:text-[var(--text-primary)]
    `,
    ghost: `
      bg-transparent border-none
      text-[var(--text-hint)]
      hover:text-[var(--text-muted)]
    `,
    success: `
      bg-[var(--success-bg)] text-[var(--success-text)]
      border border-[var(--success-border)]
      hover:bg-green-50
    `,
  }

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-5 text-[13px]',
    lg: 'h-11 px-6 text-sm',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : children}
    </button>
  )
}