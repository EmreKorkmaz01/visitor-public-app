export default function Checkbox({ checked, onChange, label }) {
  return (
    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0,
          marginTop: '1px', border: checked ? '2px solid #C8102E' : '2px solid #e0e0e0',
          background: checked ? '#C8102E' : '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 0.15s',
        }}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      {label && (
        <span style={{ fontSize: '12px', color: '#424242', lineHeight: 1.6 }}>
          {label}
        </span>
      )}
    </label>
  )
}