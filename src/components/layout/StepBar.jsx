import { useTranslation } from '../../i18n/useTranslation'

export default function StepBar({ currentStep, skipVideo = false }) {
  const { t } = useTranslation()

  const STEPS = [
    t('steps.personal'),
    t('steps.documents'),
    t('steps.vehicle'),
    t('steps.consent'),
    t('steps.video'),
  ]

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
      {STEPS.map((label, i) => {
        const step = i + 1
        const isDone = step < currentStep
        const isActive = step === currentStep

        return (
          <div key={step} style={{ display: 'flex', alignItems: 'center', flex: step < STEPS.length ? 1 : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: 600, flexShrink: 0,
                background: isDone || isActive ? '#C8102E' : '#e0e0e0',
                color: isDone || isActive ? '#fff' : '#9e9e9e',
                boxShadow: isActive ? '0 2px 8px rgba(200,16,46,0.4)' : 'none',
                transition: 'all 0.2s',
              }}>
                {isDone ? (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : step}
              </div>
              <span style={{
                fontSize: '11px', whiteSpace: 'nowrap',
                color: isDone || isActive ? '#C8102E' : '#9e9e9e',
                fontWeight: isActive ? 600 : isDone ? 500 : 400,
              }}>
                {label}
              </span>
            </div>
            {step < STEPS.length && (
              <div style={{
                flex: 1, height: '2px', margin: '0 8px', borderRadius: '2px',
                background: isDone ? '#C8102E' : '#e0e0e0',
                transition: 'background 0.3s',
              }} />
            )}
          </div>
        )
      })}
    </div>
  )
}