export default function Toggle({ checked, onChange, label, description }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
      background: '#fff5f6', border: '1.5px solid #fce4e7',
      borderRadius: '8px', padding: '12px 14px',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {label && (
          <span style={{ fontSize: '13px', fontWeight: 500, color: '#212121' }}>
            {label}
          </span>
        )}
        {description && (
          <span style={{ fontSize: '11px', color: '#9e9e9e' }}>
            {description}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        style={{
          width: '38px', height: '22px', borderRadius: '100px',
          background: checked ? '#C8102E' : '#e0e0e0',
          border: 'none', cursor: 'pointer', flexShrink: 0,
          position: 'relative', transition: 'background 0.2s',
        }}
      >
        <span style={{
          position: 'absolute', top: '3px',
          left: checked ? '19px' : '3px',
          width: '16px', height: '16px',
          background: '#fff', borderRadius: '50%',
          transition: 'left 0.2s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }} />
      </button>
    </div>
  )
}