import { useTranslation } from '../../../i18n/useTranslation'

// Geçmiş ziyaretten bilgi ve belge devralmayı teklif eden pencere.
export default function HistoryModal({ isOpen, history, applying, onAccept, onDecline }) {
  const { t, lang } = useTranslation()

  if (!isOpen || !history) return null

  const formatDate = (value) => {
    if (!value) return ''
    return new Date(value).toLocaleDateString(lang === 'en' ? 'en-GB' : 'tr-TR', {
      day: '2-digit', month: 'long', year: 'numeric',
    })
  }

  const docLabel = (docType) => {
    if (docType === 'PASSPORT') return t('documents.passport')
    if (docType === 'ID_BACK') return t('documents.idBack')
    if (docType === 'ID_FRONT') return t('documents.idFront')
    return docType
  }

  const documents = history.documents ?? []

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 60,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />

      <div style={{
        position: 'relative', width: '100%', maxWidth: '420px',
        background: '#fff', borderRadius: '12px', padding: '24px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
      }}>
        <div style={{ fontSize: '17px', fontWeight: 700, color: '#212121', marginBottom: '8px' }}>
          {t('history.title')}
        </div>

        <p style={{ fontSize: '13px', color: '#757575', lineHeight: 1.7, marginBottom: documents.length ? '14px' : '20px' }}>
          {t('history.desc')}
        </p>

        {documents.length > 0 && (
          <div style={{
            border: '1px solid #e0e0e0', borderRadius: '8px',
            background: '#fafafa', padding: '12px 14px', marginBottom: '20px',
          }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#757575', letterSpacing: '0.06em', marginBottom: '8px' }}>
              {t('history.documents')}
            </div>
            {documents.map((doc) => (
              <div
                key={doc.docType}
                style={{
                  display: 'flex', justifyContent: 'space-between', gap: '12px',
                  fontSize: '12px', color: '#212121', padding: '4px 0',
                }}
              >
                <span style={{ fontWeight: 500 }}>{docLabel(doc.docType)}</span>
                <span style={{ color: '#9e9e9e', flexShrink: 0 }}>{formatDate(doc.uploadedAt)}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onDecline}
            disabled={applying}
            style={{
              padding: '10px 16px', borderRadius: '8px',
              border: '1px solid #e0e0e0', background: '#fff',
              color: '#757575', fontSize: '13px', fontWeight: 500,
              fontFamily: 'inherit', cursor: applying ? 'default' : 'pointer',
            }}
          >
            {t('history.decline')}
          </button>
          <button
            type="button"
            onClick={onAccept}
            disabled={applying}
            style={{
              padding: '10px 16px', borderRadius: '8px',
              border: 'none', background: '#C8102E', color: '#fff',
              fontSize: '13px', fontWeight: 600, fontFamily: 'inherit',
              cursor: applying ? 'wait' : 'pointer', opacity: applying ? 0.7 : 1,
            }}
          >
            {applying ? t('history.applying') : t('history.accept')}
          </button>
        </div>
      </div>
    </div>
  )
}
