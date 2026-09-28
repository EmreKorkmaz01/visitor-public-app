import { useState, useRef } from 'react'
import { useTranslation } from '../../../i18n/useTranslation'

export default function VideoStep({ onComplete }) {
  const { t } = useTranslation()
  const videoRef = useRef(null)
  const [watched, setWatched] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video) return
    const pct = (video.currentTime / video.duration) * 100
    setProgress(pct)
    if (pct >= 95) setWatched(true)
  }

  return (
    <div style={{
      background: '#fff', borderRadius: '12px', border: '1px solid #e0e0e0',
      overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    }}>
      <video
        ref={videoRef}
        src="videos/safety.mp4"
        controls
        controlsList="nodownload"
        onTimeUpdate={handleTimeUpdate}
        style={{ width: '100%', display: 'block', maxHeight: '400px', background: '#000' }}
      />

      {/* Progress bar */}
      <div style={{ height: '3px', background: '#f0f0f0' }}>
        <div style={{
          height: '100%', background: '#C8102E',
          width: `${progress}%`, transition: 'width 0.3s',
        }} />
      </div>

      <div style={{
        padding: '16px', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: '12px', color: '#9e9e9e' }}>
          {watched
            ? '✓ Video izlendi'
            : 'Devam etmek için videoyu izleyiniz'
          }
        </div>
        <button
          onClick={onComplete}
          disabled={!watched}
          style={{
            height: '40px', padding: '0 20px', borderRadius: '8px',
            fontSize: '13px', fontWeight: 600, fontFamily: 'inherit',
            background: watched ? '#C8102E' : '#e0e0e0',
            border: 'none', color: watched ? '#fff' : '#9e9e9e',
            cursor: watched ? 'pointer' : 'not-allowed',
            boxShadow: watched ? '0 2px 8px rgba(200,16,46,0.35)' : 'none',
            transition: 'all 0.2s',
          }}
        >
          {watched ? 'Devam Et →' : 'Videoyu izleyin'}
        </button>
      </div>
    </div>
  )
}