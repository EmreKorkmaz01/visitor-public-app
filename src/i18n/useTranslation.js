import { useState, createContext, useContext } from 'react'
import tr from './tr'
import en from './en'

const langs = { tr, en }

export const LangContext = createContext({
  lang: 'tr',
  t   : (key) => key,
  setLang: () => {},
})

export function useLang() {
  return useContext(LangContext)
}

export function useTranslation() {
  const { lang } = useLang()
  const messages = langs[lang] ?? langs.tr

  const t = (path) => {
    const keys = path.split('.')
    let val = messages
    for (const k of keys) {
      val = val?.[k]
      if (val === undefined) return path
    }
    return val ?? path
  }

  return { t, lang }
}

export function useLangState() {
  const [lang, setLang] = useState('tr')
  return { lang, setLang }
}