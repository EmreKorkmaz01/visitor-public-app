import { useTranslation } from '../../../i18n/useTranslation'
import Card, { SectionTitle } from '../../../components/ui/Card'
import Checkbox from '../../../components/ui/Checkbox'
import Toggle from '../../../components/ui/Toggle'

export default function ConsentStep({ form, onChange }) {
  const { t } = useTranslation()

  return (
    <Card>
      <SectionTitle>{t('consent.kvkkTitle')}</SectionTitle>
      <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
        <div style={{
          padding: '12px 14px', fontSize: '12px', color: '#757575',
          lineHeight: 1.7, maxHeight: '160px', overflowY: 'auto',
          background: '#fafafa', borderBottom: '1px solid #f0f0f0',
          whiteSpace: 'pre-line',
        }}>
          {t('consent.kvkkText')}
        </div>
        <div style={{ padding: '12px 14px', background: '#fff' }}>
          <Checkbox
            checked={form.kvkkAccepted}
            onChange={(val) => onChange('kvkkAccepted', val)}
            label={t('consent.kvkkCheck')}
          />
        </div>
      </div>

      <SectionTitle>{t('consent.isgTitle')}</SectionTitle>
      <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
        <div style={{
          padding: '12px 14px', fontSize: '12px', color: '#757575',
          lineHeight: 1.7, maxHeight: '160px', overflowY: 'auto',
          background: '#fafafa', borderBottom: '1px solid #f0f0f0',
          whiteSpace: 'pre-line',
        }}>
          {t('consent.isgText')}
        </div>
        <div style={{ padding: '12px 14px', background: '#fff' }}>
          <Checkbox
            checked={form.isgAccepted}
            onChange={(val) => onChange('isgAccepted', val)}
            label={t('consent.isgCheck')}
          />
        </div>
      </div>

      <Toggle
        checked={form.saveProfile}
        onChange={(val) => onChange('saveProfile', val)}
        label={t('consent.saveProfile')}
        description={t('consent.saveProfileDesc')}
      />
    </Card>
  )
}