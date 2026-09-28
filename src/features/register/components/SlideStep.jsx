import { useState } from 'react'
import { useTranslation } from '../../../i18n/useTranslation'

const TOTAL_SLIDES = 13

export default function SlideStep({ onComplete, onBack }) {
  const { t } = useTranslation()
  const [current, setCurrent] = useState(1)
  const [viewed, setViewed] = useState(new Set([1]))
  const isLast = current === TOTAL_SLIDES
  const allViewed = viewed.size === TOTAL_SLIDES

  const goTo = (n) => {
    setCurrent(n)
    setViewed((prev) => new Set([...prev, n]))
  }

  const prev = () => { if (current > 1) goTo(current - 1) }
  const next = () => { if (current < TOTAL_SLIDES) goTo(current + 1) }

  return (
    <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e0e0e0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>

      <div style={{ position: 'relative', background: '#000', lineHeight: 0 }}>
        <img
          src={`./slides/slide-${String(current).padStart(2, '0')}.jpg`}
          alt={`Slide ${current}`}
          style={{ width: '100%', display: 'block', maxHeight: '400px', objectFit: 'contain' }}
        />
        {current > 1 && (
          <button onClick={prev} style={{
            position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)', fontSize: '16px',
          }}>‹</button>
        )}
        {current < TOTAL_SLIDES && (
          <button onClick={next} style={{
            position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)', fontSize: '16px',
          }}>›</button>
        )}
        <div style={{
          position: 'absolute', bottom: '12px', right: '12px',
          background: 'rgba(0,0,0,0.55)', borderRadius: '100px',
          padding: '4px 10px', fontSize: '12px', color: '#fff', fontWeight: 500,
        }}>
          {current} / {TOTAL_SLIDES}
        </div>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '6px', padding: '14px 16px', borderBottom: '1px solid #f0f0f0',
        flexWrap: 'wrap',
      }}>
        {Array.from({ length: TOTAL_SLIDES }, (_, i) => i + 1).map((n) => (
          <div
            key={n}
            onClick={() => goTo(n)}
            style={{
              width: n === current ? '20px' : '8px',
              height: '8px', borderRadius: '100px',
              background: n === current ? '#C8102E' : viewed.has(n) ? '#f9a8b4' : '#e0e0e0',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          />
        ))}
      </div>

      <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={onBack}
            style={{
              height: '40px', padding: '0 16px', borderRadius: '8px',
              fontSize: '13px', fontWeight: 500, fontFamily: 'inherit',
              background: '#fff', border: '1.5px solid #e0e0e0',
              color: '#616161', cursor: 'pointer',
            }}
          >
            {t('nav.back')}
          </button>
          <span style={{ fontSize: '12px', color: '#9e9e9e' }}>
            {allViewed
              ? '✓ Tüm slaytlar görüntülendi'
              : `${viewed.size} / ${TOTAL_SLIDES} slayt görüntülendi`
            }
          </span>
        </div>
        <button
          onClick={onComplete}
          disabled={!allViewed}
          style={{
            height: '40px', padding: '0 20px', borderRadius: '8px',
            fontSize: '13px', fontWeight: 600, fontFamily: 'inherit',
            background: allViewed ? '#C8102E' : '#e0e0e0',
            border: 'none', color: allViewed ? '#fff' : '#9e9e9e',
            cursor: allViewed ? 'pointer' : 'not-allowed',
            boxShadow: allViewed ? '0 2px 8px rgba(200,16,46,0.35)' : 'none',
            transition: 'all 0.2s',
          }}
        >
          {allViewed ? t('nav.next') : 'Tüm slaytları görüntüleyin'}
        </button>
      </div>
    </div>
  )
}
