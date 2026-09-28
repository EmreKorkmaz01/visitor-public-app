import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { LangContext } from './i18n/useTranslation'
import './index.css'
import RegisterPage from './features/register/components/RegisterPage'

function App() {
  const [lang, setLang] = useState('tr')
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <HashRouter>
        <Routes>
          <Route path="/register/:token" element={<RegisterPage />} />
          <Route path="*" element={<RegisterPage />} />
        </Routes>
      </HashRouter>
    </LangContext.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)