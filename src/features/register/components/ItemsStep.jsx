import { useTranslation } from '../../../i18n/useTranslation'

const EMPTY_ROW = () => ({ id: crypto.randomUUID(), itemName: '', quantity: '', unit: '' })

const inputStyle = {
  height: '36px', width: '100%', boxSizing: 'border-box',
  padding: '0 10px', borderRadius: '8px', border: '1px solid #e0e0e0',
  fontSize: '13px', fontFamily: 'inherit', color: '#212121', outline: 'none',
}

function ItemTable({ title, rows, onChange, onAdd, onRemove, t }) {
  return (
    <div style={{
      background: '#fff', borderRadius: '12px', border: '1px solid #e0e0e0',
      overflow: 'hidden', marginBottom: '16px',
    }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #f0f0f0' }}>
        <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#212121' }}>{title}</p>
      </div>

      <div style={{ padding: '12px 16px' }}>
        {rows.length === 0 && (
          <p style={{ margin: '8px 0 12px', fontSize: '12px', color: '#9e9e9e' }}>
            {t('items.empty')}
          </p>
        )}

        {rows.length > 0 && (
          <div style={{
            display: 'grid', gridTemplateColumns: '28px 1fr 70px 80px 32px',
            gap: '8px', marginBottom: '6px',
            fontSize: '11px', color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>
            <span>{t('items.colOrder')}</span>
            <span>{t('items.colName')}</span>
            <span>{t('items.colQty')}</span>
            <span>{t('items.colUnit')}</span>
            <span />
          </div>
        )}

        {rows.map((row, idx) => (
          <div key={row.id} style={{
            display: 'grid', gridTemplateColumns: '28px 1fr 70px 80px 32px',
            gap: '8px', alignItems: 'center', marginBottom: '8px',
          }}>
            <span style={{ fontSize: '13px', color: '#9e9e9e', textAlign: 'center' }}>{idx + 1}</span>
            <input
              value={row.itemName}
              onChange={(e) => onChange(row.id, 'itemName', e.target.value)}
              placeholder={t('items.namePh')}
              style={inputStyle}
            />
            <input
              value={row.quantity}
              inputMode="decimal"
              onChange={(e) => onChange(row.id, 'quantity', e.target.value.replace(/[^\d.,]/g, ''))}
              placeholder="1"
              style={inputStyle}
            />
            <input
              value={row.unit}
              onChange={(e) => onChange(row.id, 'unit', e.target.value)}
              placeholder={t('items.unitPh')}
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => onRemove(row.id)}
              aria-label={t('items.remove')}
              style={{
                height: '32px', width: '32px', borderRadius: '8px',
                border: '1px solid #e0e0e0', background: '#fff',
                color: '#C8102E', cursor: 'pointer', fontSize: '16px', lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={onAdd}
          style={{
            marginTop: '4px', height: '36px', padding: '0 14px', borderRadius: '8px',
            border: '1.5px dashed #C8102E', background: '#fff',
            color: '#C8102E', fontSize: '13px', fontWeight: 500,
            fontFamily: 'inherit', cursor: 'pointer',
          }}
        >
          {t('items.add')}
        </button>
      </div>
    </div>
  )
}

export default function ItemsStep({ equipment, consumables, onChange }) {
  const { t } = useTranslation()

  const update = (type) => (id, field, value) => {
    const list = type === 'equipment' ? equipment : consumables
    onChange(type, list.map(r => r.id === id ? { ...r, [field]: value } : r))
  }
  const add = (type) => () => {
    const list = type === 'equipment' ? equipment : consumables
    onChange(type, [...list, EMPTY_ROW()])
  }
  const remove = (type) => (id) => {
    const list = type === 'equipment' ? equipment : consumables
    onChange(type, list.filter(r => r.id !== id))
  }

  return (
    <div>
      <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#757575', lineHeight: 1.6 }}>
        {t('items.intro')}
      </p>

      <ItemTable
        title={t('items.equipment')}
        rows={equipment}
        onChange={update('equipment')}
        onAdd={add('equipment')}
        onRemove={remove('equipment')}
        t={t}
      />
      <ItemTable
        title={t('items.consumable')}
        rows={consumables}
        onChange={update('consumables')}
        onAdd={add('consumables')}
        onRemove={remove('consumables')}
        t={t}
      />
    </div>
  )
}