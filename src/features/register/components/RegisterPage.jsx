import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'

import { useTranslation } from '../../../i18n/useTranslation'
import Header from '../../../components/layout/Header'
import StepBar from '../../../components/layout/StepBar'
import VisitPill from './VisitPill'
import PersonalStep from './PersonalStep'
import DocumentStep from './DocumentStep'
import VehicleStep from './VehicleStep'
import ConsentStep from './ConsentStep'
import VideoStep from './VideoStep'
import ErrorScreen from './ErrorScreen'
import SuccessScreen from './SuccessScreen'

import { validateToken, fetchPurposeConfigs } from '../../../services/api'
import useRegister from '../hooks/useRegister'

export default function RegisterPage() {
  const { token } = useParams()
  const { t } = useTranslation()
  const validateDocRef = useRef(null)

  const [tokenState, setTokenState] = useState('loading')
  const [visitInfo, setVisitInfo] = useState(null)
  const [purposeLabel, setPurposeLabel] = useState(null)
  const skipVideo = visitInfo?.status === 'DOCS_REJECTED'
  const totalSteps = skipVideo ? 4 : 5
  const {
    step, loading, error,
    consentForm, setConsentForm,
    personalForm, setPersonalForm,
    vehicleForm, setVehicleForm,
    personalErrors,
    prefill,
    nextStep, prevStep,
} = useRegister(token, skipVideo)

  useEffect(() => {
    if (!token) {
      setTokenState('invalid')
      return
    }

    let cancelled = false

    const init = async () => {
      try {
        const result = await validateToken(token)
        if (cancelled) return

        if (!result?.valid) {
          setTokenState('invalid')
          return
        }

        setVisitInfo(result)
        prefill(result)
        setTokenState('valid')

        // Ziyaret amacı etiketi kozmetiktir: alınamazsa ham kod gösterilir,
        // kayıt akışı bu yüzden kesilmez.
        try {
          const purposes = await fetchPurposeConfigs()
          if (cancelled) return
          const match = purposes?.find(p => p.code === result.visitPurpose)
          setPurposeLabel(match?.label ?? result.visitPurpose)
        } catch (purposeError) {
          console.warn('[register] purpose configs failed:', purposeError)
          if (!cancelled) setPurposeLabel(result.visitPurpose)
        }
      } catch (tokenError) {
        console.error('[register] token validation failed:', tokenError)
        if (!cancelled) setTokenState('invalid')
      }
    }

    init()

    return () => { cancelled = true }
  }, [token])

  useEffect(() => {
    if (error) toast.error(error)
  }, [error])

  const handleNext = () => {
    if (step === 2 && validateDocRef.current) {
      const valid = validateDocRef.current()
      if (!valid) return
    }
    nextStep()
  }

  const isLastStep = skipVideo ? step === 4 : step === 5
const isDone = step === 6

  if (tokenState === 'loading') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f5f5f5' }}>
        <Header />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: '32px', height: '32px',
            border: '3px solid #C8102E', borderTopColor: 'transparent',
            borderRadius: '50%', animation: 'spin 0.8s linear infinite',
          }} />
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f5f5f5' }}>
      <Header />

      {tokenState === 'valid' && !isDone && (
        <div style={{ height: '4px', background: '#fce4e7' }}>
          <div style={{
            height: '100%', background: '#C8102E',
            width: `${Math.round(((step - 1) / totalSteps) * 100)}%`,
            transition: 'width 0.5s ease',
          }} />
        </div>
      )}

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#fff', color: '#212121',
            border: '1px solid #e0e0e0', fontSize: '13px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        }}
      />

      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '32px 16px 48px' }}>
        <div style={{ width: '100%', maxWidth: '640px' }}>

          {tokenState === 'invalid' && <ErrorScreen />}

          {tokenState === 'valid' && (
            <>
              {!isDone && (step !== 5 || skipVideo) && (
                <>
                  <VisitPill
                    visitDate={visitInfo?.visitDate}
                    purposeLabel={purposeLabel}
                  />
                  <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#212121', marginBottom: '4px' }}>
                    {t('greeting.title')},{' '}
                    {visitInfo?.firstName && (
                      <span style={{ color: '#C8102E' }}>{visitInfo.firstName}</span>
                    )}{' '}
                    👋
                  </h1>
                  <p style={{ fontSize: '13px', color: '#757575', marginBottom: '24px', lineHeight: 1.6 }}>
                    {t('greeting.subtitle')}
                  </p>
                  <StepBar currentStep={step} skipVideo={skipVideo} />
                </>
              )}

              {step === 1 && (
                <PersonalStep
                  form={personalForm}
                  onChange={setPersonalForm}
                  errors={personalErrors}
                />
              )}
              {step === 2 && (
                <DocumentStep
                  token={token}
                  nationality={personalForm.nationality}
                  onValidate={(fn) => { validateDocRef.current = fn }}
                />
              )}
              {step === 3 && (
                <VehicleStep form={vehicleForm} onChange={setVehicleForm} />
              )}
              {step === 4 && (
                <ConsentStep form={consentForm} onChange={setConsentForm} />
              )}
            {step === 5 && !skipVideo && (
  <VideoStep onComplete={nextStep} />
)}
              {isDone && (
                <SuccessScreen
                  visitDate={visitInfo?.visitDate}
                  visitStart={visitInfo?.visitStart}
                />
              )}

              {!isDone && step !== 5 && (
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', marginTop: '16px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9e9e9e' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4caf50' }} />
                    {t('nav.ssl')}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {step > 1 && (
                      <button
                        onClick={prevStep}
                        disabled={loading}
                        style={{
                          height: '40px', padding: '0 16px', borderRadius: '8px',
                          fontSize: '13px', fontWeight: 500, fontFamily: 'inherit',
                          background: '#fff', border: '1.5px solid #e0e0e0',
                          color: '#616161', cursor: 'pointer',
                        }}
                      >
                        {t('nav.back')}
                      </button>
                    )}
                    {step === 3 && (
                      <button
                        onClick={handleNext}
                        disabled={loading}
                        style={{
                          height: '40px', padding: '0 14px', borderRadius: '8px',
                          fontSize: '13px', fontWeight: 500, fontFamily: 'inherit',
                          background: 'transparent', border: 'none',
                          color: '#9e9e9e', cursor: 'pointer',
                        }}
                      >
                        {t('nav.skip')}
                      </button>
                    )}
                    <button
                      onClick={handleNext}
                      disabled={loading}
                      style={{
                        height: '40px', padding: '0 20px', borderRadius: '8px',
                        fontSize: '13px', fontWeight: 600, fontFamily: 'inherit',
                        background: isLastStep ? '#f1f8e9' : '#C8102E',
                        border: isLastStep ? '1.5px solid #a5d6a7' : 'none',
                        color: isLastStep ? '#2e7d32' : '#fff',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1,
                        boxShadow: isLastStep ? 'none' : '0 2px 8px rgba(200,16,46,0.35)',
                        display: 'flex', alignItems: 'center', gap: '6px',
                      }}
                    >
                      {loading ? (
                        <span style={{
                          width: '16px', height: '16px',
                          border: '2px solid currentColor', borderTopColor: 'transparent',
                          borderRadius: '50%', display: 'inline-block',
                          animation: 'spin 0.8s linear infinite',
                        }} />
                      ) : isLastStep ? t('nav.complete') : t('nav.next')}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}