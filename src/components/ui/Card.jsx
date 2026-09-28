export default function Card({ children, className }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      border: '1px solid #e0e0e0',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
    }} className={className}>
      {children}
    </div>
  )
}

export function SectionTitle({ children }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '10px',
      fontWeight: 700,
      color: '#C8102E',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: '16px',
    }}>
      <span>{children}</span>
      <div style={{ flex: 1, height: '1px', background: '#fce4e7' }} />
    </div>
  )
}