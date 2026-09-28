import { useTranslation } from '../../../i18n/useTranslation'
import Card, { SectionTitle } from '../../../components/ui/Card'
import Input from '../../../components/ui/Input'

export default function VehicleStep({ form, onChange }) {
  const { t } = useTranslation()
  const handle = (field) => (e) => onChange(field, e.target.value)

  return (
    <Card>
      <SectionTitle>{t('vehicle.title')}</SectionTitle>

      <Input
        label={t('vehicle.plate')} optional
        value={form.plate ?? ''}
        onChange={handle('plate')}
        placeholder={t('vehicle.platePh')}
      />

      <div style={{ textAlign: 'center', fontSize: '12px', color: '#9e9e9e', marginTop: '16px' }}>
        {t('vehicle.hint')}
      </div>
    </Card>
  )
}