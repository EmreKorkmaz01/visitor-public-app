import { useTranslation } from '../../../i18n/useTranslation'

export default function ErrorScreen() {
  const { t } = useTranslation()

  return (
    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
      <div style={{
        width: '56px', height: '56px', borderRadius: '50%',
        background: '#fce4e7', border: '2px solid #f9a8b4',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 16px',
      }}>
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#C8102E">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
      </div>
      <div style={{ fontSize: '18px', fontWeight: 700, color: '#212121', marginBottom: '8px' }}>
        {t('error.title')}
      </div>
      <div style={{ fontSize: '13px', color: '#757575', lineHeight: 1.7, marginBottom: '24px', whiteSpace: 'pre-line' }}>
        {t('error.desc')}
      </div>
      <div style={{
        background: '#fff', border: '1px solid #e0e0e0', borderRadius: '10px',
        padding: '14px 16px', maxWidth: '320px', margin: '0 auto', textAlign: 'left',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#212121', marginBottom: '4px' }}>
          {t('error.contact')}
        </div>
        <div style={{ fontSize: '12px', color: '#757575', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
          {t('error.info')}
        </div>
      </div>
    </div>
  )
}