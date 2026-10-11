import { useTranslation } from '../../../i18n/useTranslation'
import Card, { SectionTitle } from '../../../components/ui/Card'
import Input from '../../../components/ui/Input'

export default function VehicleStep({ form, onChange }) {
  const { t } = useTranslation()
  const handle = (field) => (e) => onChange(field, e.target.value)
  const handlePlate = (e) => onChange('plate', e.target.value.toLocaleUpperCase('tr-TR'))

  return (
    <Card>
      <SectionTitle>{t('vehicle.title')}</SectionTitle>

      <Input
        label={t('vehicle.plate')} optional
        value={form.plate ?? ''}
        onChange={handlePlate}
        placeholder={t('vehicle.platePh')}
        style={{ textTransform: 'uppercase' }}
      />

      <div style={{ textAlign: 'center', fontSize: '12px', color: '#9e9e9e', marginTop: '16px' }}>
        {t('vehicle.hint')}
      </div>
    </Card>
  )
}