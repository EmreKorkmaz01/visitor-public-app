import { useState } from 'react'
import { useTranslation } from '../../../i18n/useTranslation'
import {
  saveConsentStep,
  saveRegistrationStep,
  completeRegistration,
} from '../../../services/api'

export default function useRegister(token, skipVideo = false) {
  const { t } = useTranslation()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [consentForm, setConsentForm] = useState({
    kvkkAccepted: false,
    isgAccepted : false,
    saveProfile : false,
  })

  const [personalForm, setPersonalForm] = useState({
    firstName      : '',
    lastName       : '',
    tcNo           : '',
    passportNo     : '',
    birthDate      : '',
    email          : '',
    phone          : '',
    company        : '',
    nationality    : 'TR',
    countryOfOrigin: '',
    countryLabel   : '',
  })

  const [vehicleForm, setVehicleForm] = useState({
    plate   : '',
    carBrand: '',
    carModel: '',
    carColor: '',
  })

  const [personalErrors, setPersonalErrors] = useState({})

  const prefill = (data) => {
    setPersonalForm((prev) => ({
      ...prev,
      firstName: data.firstName ?? '',
      lastName : data.lastName  ?? '',
      email    : data.email     ?? '',
      phone    : data.phone     ?? '',
      company  : data.company   ?? '',
    }))
  }

const validatePersonal = () => {
  const errs = {}
  const isForeign = personalForm.nationality === 'FOREIGN'

  if (!personalForm.nationality)                errs.nationality     = t('personal.nationalityReq')
  if (!personalForm.firstName?.trim())          errs.firstName       = t('personal.firstNameReq')
  if (!personalForm.lastName?.trim())           errs.lastName        = t('personal.lastNameReq')
  if (!personalForm.email?.trim())              errs.email           = t('personal.emailReq')
  if (!personalForm.phone?.trim())              errs.phone           = t('personal.phoneReq')
  if (!personalForm.birthDate?.trim())          errs.birthDate       = t('personal.birthDateReq')

  if (!isForeign) {
    if (!personalForm.tcNo?.trim())             errs.tcNo            = t('personal.tcNoReq')
    else if (!/^\d{11}$/.test(personalForm.tcNo.trim()))
      errs.tcNo = t('personal.tcNoInvalid')
  } else {
    if (!personalForm.passportNo?.trim())       errs.passportNo      = t('personal.passportNoReq')
    if (!personalForm.countryOfOrigin?.trim())  errs.countryOfOrigin = t('personal.countryReq')
  }

  setPersonalErrors(errs)
  return Object.keys(errs).length === 0
}

  const nextStep = async () => {
    setError(null)
    setLoading(true)
    try {
      // Step 1: Kişisel Bilgiler
      if (step === 1) {
        if (!validatePersonal()) return
        await saveRegistrationStep({
          token,
          firstName  : personalForm.firstName,
          lastName   : personalForm.lastName,
          tcNo       : personalForm.nationality === 'TR' ? personalForm.tcNo : null,
          passportNo : personalForm.nationality === 'FOREIGN' ? personalForm.passportNo : null,
          birthDate  : personalForm.birthDate || null,
          email      : personalForm.email,
          phone      : personalForm.phone,
          company    : personalForm.company || null,
          nationality: personalForm.nationality === 'FOREIGN'
                        ? (personalForm.countryLabel || personalForm.countryOfOrigin || 'FOREIGN')
                        : 'TÜRKİYE',
          licensePlate: null,
          carBrand    : null,
          carModel    : null,
          carColor    : null,
        })
        setStep(2)

      // Step 2: Belgeler
      } else if (step === 2) {
        setStep(3)

      // Step 3: Araç
      } else if (step === 3) {
        await saveRegistrationStep({
          token,
          firstName  : personalForm.firstName,
          lastName   : personalForm.lastName,
          tcNo       : personalForm.nationality === 'TR' ? personalForm.tcNo : null,
          passportNo : personalForm.nationality === 'FOREIGN' ? personalForm.passportNo : null,
          birthDate  : personalForm.birthDate || null,
          email      : personalForm.email,
          phone      : personalForm.phone,
          company    : personalForm.company || null,
          nationality: personalForm.nationality === 'FOREIGN'
                        ? (personalForm.countryLabel || personalForm.countryOfOrigin || 'FOREIGN')
                        : 'TÜRKİYE',
          licensePlate: vehicleForm.plate    || null,
          carBrand    : vehicleForm.carBrand || null,
          carModel    : vehicleForm.carModel || null,
          carColor    : vehicleForm.carColor || null,
        })
        setStep(4)

      // Step 4: Aydınlatma Metni
    } else if (step === 4) {
  if (!consentForm.kvkkAccepted || !consentForm.isgAccepted) {
    setError(t('consent.bothRequired'))
    return
  }
  await saveConsentStep({ token, ...consentForm })
  if (skipVideo) {
    await completeRegistration(token)
    setStep(6)
  } else {
    setStep(5)
  }


      // Step 5: Video — VideoStep kendi içinde tamamla çağırıyor
      } else if (step === 5) {
        await completeRegistration(token)
        setStep(6)
      }

    } catch (err) {
      setError(err?.response?.data?.error?.message ?? t('general.error'))
    } finally {
      setLoading(false)
    }
  }

  const prevStep = () => {
    if (step > 1) setStep((s) => s - 1)
  }

  return {
    step,
    loading,
    error,
    consentForm,
    setConsentForm : (field, val) => setConsentForm((p) => ({ ...p, [field]: val })),
    personalForm,
    setPersonalForm: (field, val) => setPersonalForm((p) => ({ ...p, [field]: val })),
    vehicleForm,
    setVehicleForm : (field, val) => setVehicleForm((p) => ({ ...p, [field]: val })),
    personalErrors,
    prefill,
    nextStep,
    prevStep,
  }
}