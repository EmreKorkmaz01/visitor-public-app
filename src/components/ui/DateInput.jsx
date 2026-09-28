import { useState } from 'react'

export default function DateInput({ value, onChange, error, label, required, optional }) {
  const [display, setDisplay] = useState(() => {
    if (!value) return ''
    const [y, m, d] = value.split('-')
    return `${d}.${m}.${y}`
  })
  const [inlineError, setInlineError] = useState('')

  const handleChange = (e) => {
    let raw = e.target.value.replace(/[^0-9]/g, '')
    if (raw.length > 8) raw = raw.slice(0, 8)

    let formatted = ''
    if (raw.length >= 1) formatted = raw.slice(0, 2)
    if (raw.length >= 3) formatted += '.' + raw.slice(2, 4)
    if (raw.length >= 5) formatted += '.' + raw.slice(4, 8)

    setDisplay(formatted)
    setInlineError('')

    if (raw.length === 8) {
      const day   = parseInt(raw.slice(0, 2))
      const month = parseInt(raw.slice(2, 4))
      const year  = parseInt(raw.slice(4, 8))

      if (
        day >= 1 && day <= 31 &&
        month >= 1 && month <= 12 &&
        year >= 1930 && year <= 2050
      ) {
        const isoDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        onChange(isoDate)
        setInlineError('')
      } else {
        onChange('')
        setInlineError('Geçerli bir tarih giriniz (GG.AA.YYYY)')
      }
    } else {
      onChange('')
    }
  }

  const displayError = error || inlineError

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <label style={{ fontSize: '12px', fontWeight: 500, color: '#757575', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {label}
          {required && <span style={{ color: '#C8102E', fontSize: '13px', lineHeight: 1 }}>*</span>}
          {optional && <span style={{ color: '#C8102E', fontSize: '13px', lineHeight: 1 }}>*</span>}
        </label>
      )}
      <input
        type="text"
        inputMode="numeric"
        placeholder="GG.AA.YYYY"
        maxLength={10}
        value={display}
        onChange={handleChange}
        className={['m-field-input', displayError ? 'error' : ''].join(' ')}
      />
      {displayError && (
        <span style={{ fontSize: '11px', color: '#C8102E' }}>{displayError}</span>
      )}
    </div>
  )
}