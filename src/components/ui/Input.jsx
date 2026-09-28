export default function Input({
  label,
  required,
  optional,
  error,
  hint,
  prefilled,
  className,
  ...props
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <label style={{ fontSize: '12px', fontWeight: 500, color: '#757575', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {label}
          {required && <span style={{ color: '#C8102E', fontSize: '13px', lineHeight: 1 }}>*</span>}
          {optional && (
            <span style={{
              fontSize: '10px', color: '#9e9e9e',
              background: '#f5f5f5', border: '1px solid #e0e0e0',
              borderRadius: '4px', padding: '1px 6px', fontWeight: 400,
            }}>
              opsiyonel
            </span>
          )}
        </label>
      )}
      <input
        className={[
          'm-field-input',
          prefilled ? 'prefilled' : '',
          error ? 'error' : '',
          className || '',
        ].join(' ')}
        {...props}
      />
      {error && (
        <span style={{ fontSize: '11px', color: '#C8102E' }}>{error}</span>
      )}
      {hint && !error && (
        <span style={{ fontSize: '11px', color: '#9e9e9e' }}>{hint}</span>
      )}
    </div>
  )
}