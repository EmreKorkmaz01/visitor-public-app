import { useState } from 'react'
import { useTranslation } from '../../../i18n/useTranslation'
import Card, { SectionTitle } from '../../../components/ui/Card'
import { saveDocument } from '../../../services/api'

export default function DocumentStep({ token, nationality, onValidate }) {
  const { t } = useTranslation()
  const isForeign = nationality === 'FOREIGN'

  const DOC_TYPES = isForeign
    ? [
        { key: 'PASSPORT', label: 'Pasaport', required: true },
        { key: 'ID_FRONT', label: 'Kimlik', required: false },
      ]
    : [
        { key: 'ID_FRONT', label: 'Kimlik Ön Yüz', required: true },
        { key: 'PASSPORT', label: 'Pasaport', required: false },
      ]

  const [docs, setDocs] = useState({})
  const [uploading, setUploading] = useState({})
  const [errors, setErrors] = useState({})

  const handleFileSelect = async (docType, file) => {
    if (file.size > 5 * 1024 * 1024) {
      setErrors((p) => ({ ...p, [docType]: t('documents.sizeError') }))
      return
    }

    setUploading((p) => ({ ...p, [docType]: true }))
    setErrors((p) => ({ ...p, [docType]: null }))

    try {
      const base64 = await fileToBase64(file)
      await saveDocument({ token, docType, fileName: file.name, mimeType: file.type, base64 })
      setDocs((p) => ({ ...p, [docType]: { fileName: file.name } }))
    } catch {
      setErrors((p) => ({ ...p, [docType]: t('documents.uploadError') }))
    } finally {
      setUploading((p) => ({ ...p, [docType]: false }))
    }
  }

  const handleDelete = (docType) => {
    setDocs((p) => {
      const next = { ...p }
      delete next[docType]
      return next
    })
  }

  const validate = () => {
    const newErrors = {}
    DOC_TYPES.forEach((doc) => {
      if (doc.required && !docs[doc.key]) {
        newErrors[doc.key] = t('documents.required')
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  if (onValidate) onValidate(validate)

  return (
    <Card>
      <SectionTitle>{t('documents.title')}</SectionTitle>

      {/* Uyarı yazısı */}
      <div style={{
        background: '#fff8e1', border: '1px solid #ffe082',
        borderRadius: '8px', padding: '12px 14px', marginBottom: '16px',
        fontSize: '12px', color: '#7a6000', lineHeight: 1.6,
      }}>
        ⚠️ Lütfen giriş işlemlerinde kullandığınız kimlik belgesini havalimanı güvenlik kontrolü sırasında yanınızda bulundurduğunuzdan emin olun.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
        {DOC_TYPES.map((doc) => (
          <div key={doc.key}>
            <div
              onClick={() => {
                if (uploading[doc.key]) return
                const input = document.createElement('input')
                input.type = 'file'
                input.accept = 'image/jpeg,image/png,application/pdf'
                input.onchange = (e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileSelect(doc.key, file)
                }
                input.click()
              }}
              style={{
                border: errors[doc.key]
                  ? '2px solid #C8102E'
                  : docs[doc.key]
                    ? '2px solid #a5d6a7'
                    : '2px dashed #e0e0e0',
                borderRadius: '8px', padding: '16px', textAlign: 'center',
                cursor: uploading[doc.key] ? 'wait' : 'pointer',
                background: errors[doc.key]
                  ? '#fff5f6'
                  : docs[doc.key]
                    ? '#f1f8e9'
                    : '#fafafa',
                transition: 'all 0.15s',
                opacity: uploading[doc.key] ? 0.7 : 1,
                position: 'relative',
              }}
            >
              {doc.required && (
                <div style={{
                  position: 'absolute', top: '6px', right: '8px',
                  fontSize: '10px', fontWeight: 600,
                  color: docs[doc.key] ? '#4caf50' : '#C8102E',
                }}>
                  {docs[doc.key] ? '✓' : '*'}
                </div>
              )}

              {uploading[doc.key] ? (
                <>
                  <div style={{
                    width: '24px', height: '24px', margin: '0 auto 6px',
                    border: '2px solid #C8102E', borderTopColor: 'transparent',
                    borderRadius: '50%', animation: 'spin 0.8s linear infinite',
                  }} />
                  <div style={{ fontSize: '12px', color: '#757575' }}>{t('documents.uploading')}</div>
                </>
              ) : docs[doc.key] ? (
                <>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#4caf50" style={{ display: 'block', margin: '0 auto 6px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: '#2e7d32' }}>{docs[doc.key].fileName}</div>
                  <div style={{ fontSize: '11px', color: '#4caf50', marginTop: '2px' }}>{t('documents.change')}</div>
                </>
              ) : (
                <>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={errors[doc.key] ? '#C8102E' : '#bdbdbd'} style={{ display: 'block', margin: '0 auto 6px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: errors[doc.key] ? '#C8102E' : '#757575' }}>{doc.label}</div>
                  <div style={{ fontSize: '11px', color: errors[doc.key] ? '#C8102E' : '#bdbdbd', marginTop: '2px' }}>{t('documents.fileHint')}</div>
                </>
              )}
            </div>

            {/* Sil butonu */}
            {docs[doc.key] && (
              <button
                onClick={() => handleDelete(doc.key)}
                style={{
                  width: '100%', marginTop: '6px', padding: '5px',
                  border: '1px solid #fca5a5', borderRadius: '6px',
                  background: '#fff5f5', color: '#C8102E',
                  fontSize: '11px', fontWeight: 500, cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Sil
              </button>
            )}

            {errors[doc.key] && (
              <div style={{ fontSize: '11px', color: '#C8102E', marginTop: '4px', textAlign: 'center' }}>
                {errors[doc.key]}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', fontSize: '12px', color: '#9e9e9e' }}>
        {isForeign
          ? t('documents.passportRequired')
          : t('documents.idRequired')
        }
      </div>
    </Card>
  )
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}