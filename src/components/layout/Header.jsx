import { useLang, useTranslation } from '../../i18n/useTranslation'

export default function Header() {
  const { lang, setLang } = useLang()
  const { t } = useTranslation()

  return (
    <header style={{
      background: '#C8102E',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: '12px',
      flexShrink: 0,
    }}>
     <img
  src="redbase.png"
  alt="RedBase"
  style={{
    height: '44px',
    objectFit: 'contain',
    background: 'rgba(255,255,255,0.9)',
    borderRadius: '8px',
    padding: '4px 8px',
  }}
/>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.15)', borderRadius: '6px', padding: '2px' }}>
          {['tr', 'en'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                height: '28px', padding: '0 10px', borderRadius: '4px',
                fontSize: '12px', fontWeight: 600, fontFamily: 'inherit',
                border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                background: lang === l ? '#fff' : 'transparent',
                color: lang === l ? '#C8102E' : 'rgba(255,255,255,0.8)',
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#69f0ae' }} />
          <span>{t('header.ssl')}</span>
        </div>
      </div>
    </header>
  )
}