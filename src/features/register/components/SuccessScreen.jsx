import { useTranslation } from '../../../i18n/useTranslation'

export default function SuccessScreen({ visitDate, visitStart }) {
  const { t, lang } = useTranslation()

  const MAP_URL = 'https://maps.app.goo.gl/BjrV7vxdRYrH5Jqu8'

  const formatDate = (dateStr) => {
    if (!dateStr) return null
    return new Date(dateStr).toLocaleDateString(lang === 'en' ? 'en-GB' : 'tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const formatTime = (timeStr) => {
    if (!timeStr) return null
    return timeStr.slice(0, 5)
  }

  const meta = [formatDate(visitDate), formatTime(visitStart)].filter(Boolean).join(' \u00B7 ')

  const openMap = () => {
    window.open(MAP_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: '#f1f8e9',
          border: '2px solid #a5d6a7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
        }}
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#4caf50">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
          />
        </svg>
      </div>

      <div style={{ fontSize: '20px', fontWeight: 700, color: '#212121', marginBottom: '8px' }}>
        {t('success.title')}
      </div>

      <div
        style={{
          fontSize: '13px',
          color: '#757575',
          lineHeight: 1.7,
          marginBottom: '24px',
          whiteSpace: 'pre-line',
        }}
      >
        {t('success.desc')}
      </div>

      {(visitDate || visitStart) && (
        <div
          style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '10px',
            padding: '16px',
            maxWidth: '360px',
            margin: '0 auto',
            textAlign: 'left',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ fontSize: '13px', color: '#212121', lineHeight: 1.7, marginBottom: '8px' }}>
            {'Ziyaret saatinde refakatçinin sizi aşağıdaki konumda bulunan '}
            <strong>Sabiha Gökçen A Kapısı</strong>
            {"'nda karşılamasını bekleyiniz."}
          </div>

          <div style={{ fontSize: '12px', color: '#9e9e9e', marginBottom: '14px' }}>{meta}</div>

          <button
            type="button"
            onClick={openMap}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              background: '#f5f5f5',
              border: '1px solid #e0e0e0',
              color: '#212121',
              fontSize: '13px',
              fontWeight: 500,
              fontFamily: 'inherit',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            {'📍 Haritada Göster'}
          </button>
        </div>
      )}
    </div>
  )
}