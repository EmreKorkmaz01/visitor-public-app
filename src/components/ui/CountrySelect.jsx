import { useState, useRef, useEffect } from 'react'
import countries from 'i18n-iso-countries'
import tr from 'i18n-iso-countries/langs/tr.json'
import en from 'i18n-iso-countries/langs/en.json'
import { useTranslation } from '../../i18n/useTranslation'

countries.registerLocale(tr)
countries.registerLocale(en)

const getCountryList = (lang) => {
  const names = countries.getNames(lang === 'en' ? 'en' : 'tr')
  const list = Object.entries(names)
    .map(([code, label]) => ({ code, label }))
    .sort((a, b) => a.label.localeCompare(b.label, lang === 'en' ? 'en' : 'tr'))
  const turkey = list.find((c) => c.code === 'TR')
  const rest   = list.filter((c) => c.code !== 'TR')
  return turkey ? [turkey, ...rest] : list
}

export default function CountrySelect({ value, onChange, error }) {
  const { t, lang } = useTranslation()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const COUNTRY_LIST = getCountryList(lang)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const filtered = query.trim()
    ? COUNTRY_LIST.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
    : COUNTRY_LIST

  const selected = COUNTRY_LIST.find((c) => c.code === value)

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div
        onClick={() => { setOpen((p) => !p); setQuery('') }}
        style={{
          height: '44px', border: error ? '1.5px solid #C8102E' : '1.5px solid #e0e0e0',
          borderRadius: '8px', padding: '0 14px', fontSize: '14px',
          background: '#fafafa', cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
          color: selected ? '#212121' : '#bdbdbd',
          transition: 'border-color 0.15s',
        }}
      >
        <span>{selected?.label ?? t('personal.countryPh')}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4L6 8L10 4" stroke="#9e9e9e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {open && (
        <div style={{
          position: 'absolute', top: '48px', left: 0, right: 0, zIndex: 100,
          background: '#fff', border: '1.5px solid #e0e0e0', borderRadius: '8px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)', overflow: 'hidden',
        }}>
          <div style={{ padding: '8px' }}>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('personal.countrySearch')}
              style={{
                width: '100%', height: '36px', border: '1.5px solid #e0e0e0',
                borderRadius: '6px', padding: '0 10px', fontSize: '13px',
                fontFamily: 'inherit', outline: 'none', background: '#fafafa',
              }}
            />
          </div>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {filtered.length === 0 ? (
              <div style={{ padding: '12px 14px', fontSize: '13px', color: '#9e9e9e' }}>
                {t('personal.countryNotFound')}
              </div>
            ) : filtered.map((c) => (
              <div
                key={c.code}
                onClick={() => { onChange(c.code, c.label); setOpen(false); setQuery('') }}
                style={{
                  padding: '10px 14px', fontSize: '13px', cursor: 'pointer',
                  background: value === c.code ? '#fff5f6' : '#fff',
                  color: value === c.code ? '#C8102E' : '#212121',
                  fontWeight: value === c.code ? 500 : 400,
                  borderBottom: '1px solid #f5f5f5',
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div style={{ fontSize: '11px', color: '#C8102E', marginTop: '4px' }}>{error}</div>
      )}
    </div>
  )
}