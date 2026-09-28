import { useTranslation } from '../../../i18n/useTranslation'

export default function VisitPill({ visitDate, purposeLabel }) {
  const { lang } = useTranslation()

  const formatDate = (dateStr) => {
    if (!dateStr) return null
    return new Date(dateStr).toLocaleDateString(lang === 'en' ? 'en-GB' : 'tr-TR', {
      day: 'numeric', month: 'long', year: 'numeric'
    })
  }

  const parts = [formatDate(visitDate), purposeLabel].filter(Boolean)
  if (!parts.length) return null

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      background: '#fce4e7', border: '1px solid #f9a8b4',
      borderRadius: '100px', padding: '5px 12px', marginBottom: '12px',
    }}>
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C8102E' }} />
      <span style={{ fontSize: '11px', fontWeight: 600, color: '#C8102E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {parts.join(' · ')}
      </span>
    </div>
  )
}