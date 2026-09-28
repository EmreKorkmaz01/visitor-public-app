import { useTranslation } from '../../../i18n/useTranslation'
import Card, { SectionTitle } from '../../../components/ui/Card'
import Input from '../../../components/ui/Input'
import CountrySelect from '../../../components/ui/CountrySelect'
import DateInput from '../../../components/ui/DateInput'
export default function PersonalStep({ form, onChange, errors }) {
  const { t } = useTranslation()
  const handle = (field) => (e) => onChange(field, e.target.value)
  const isForeign = form.nationality === 'FOREIGN'

  return (
    <Card>
      <SectionTitle>{t('personal.title')}</SectionTitle>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        {[
          { value: 'TR',      label: t('personal.turkish') },
          { value: 'FOREIGN', label: t('personal.foreign') },
        ].map((opt) => (
          <div
            key={opt.value}
            onClick={() => onChange('nationality', opt.value)}
            style={{
              border: form.nationality === opt.value ? '2px solid #C8102E' : '1.5px solid #e0e0e0',
              borderRadius: '8px', padding: '12px 14px', cursor: 'pointer',
              background: form.nationality === opt.value ? '#fff5f6' : '#fafafa',
              display: 'flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.15s',
            }}
          >
            <div style={{
              width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
              border: form.nationality === opt.value ? '5px solid #C8102E' : '2px solid #e0e0e0',
              background: '#fff', transition: 'all 0.15s',
            }} />
            <span style={{
              fontSize: '13px', fontWeight: 500,
              color: form.nationality === opt.value ? '#C8102E' : '#424242',
            }}>
              {opt.label}
            </span>
          </div>
        ))}
      </div>

      {errors?.nationality && (
        <div style={{ fontSize: '11px', color: '#C8102E', marginBottom: '12px' }}>
          {errors.nationality}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
        <Input
          label={t('personal.firstName')} required
          value={form.firstName ?? ''}
          onChange={handle('firstName')}
          placeholder={t('personal.firstNamePh')}
          prefilled={!!form.firstName}
          error={errors?.firstName}
        />
        <Input
          label={t('personal.lastName')} required
          value={form.lastName ?? ''}
          onChange={handle('lastName')}
          placeholder={t('personal.lastNamePh')}
          prefilled={!!form.lastName}
          error={errors?.lastName}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
        {!isForeign ? (
          <Input
            label={t('personal.tcNo')} required
            value={form.tcNo ?? ''}
            onChange={handle('tcNo')}
            placeholder={t('personal.tcNoPh')}
            maxLength={11}
            inputMode="numeric"
            error={errors?.tcNo}
            hint={t('personal.tcNoHint')}
          />
        ) : (
          <Input
            label={t('personal.passportNo')} required
            value={form.passportNo ?? ''}
            onChange={handle('passportNo')}
            placeholder={t('personal.passportNoPh')}
            error={errors?.passportNo}
          />
        )}
       <DateInput
  label={t('personal.birthDate')}
  required={isForeign}
  optional={!isForeign}
  value={form.birthDate ?? ''}
  onChange={(val) => onChange('birthDate', val)}
  error={errors?.birthDate}
/>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
        <Input
          label={t('personal.email')} required
          type="email"
          value={form.email ?? ''}
          onChange={handle('email')}
          placeholder={t('personal.emailPh')}
          prefilled={!!form.email}
          error={errors?.email}
        />
        <Input
          label={t('personal.phone')} required
          type="tel"
          value={form.phone ?? ''}
          onChange={handle('phone')}
          placeholder={t('personal.phonePh')}
          prefilled={!!form.phone}
          error={errors?.phone}
        />
      </div>

      {isForeign && (
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '12px', fontWeight: 500, color: '#757575', display: 'block', marginBottom: '6px' }}>
            {t('personal.country')} <span style={{ color: '#C8102E' }}>*</span>
          </label>
          <CountrySelect
            value={form.countryOfOrigin ?? ''}
            onChange={(code, label) => {
              onChange('countryOfOrigin', code)
              onChange('countryLabel', label)
            }}
            error={errors?.countryOfOrigin}
          />
        </div>
      )}

      <Input
        label={t('personal.company')} optional
        value={form.company ?? ''}
        onChange={handle('company')}
        placeholder={t('personal.companyPh')}
        prefilled={!!form.company}
      />
    </Card>
  )
}