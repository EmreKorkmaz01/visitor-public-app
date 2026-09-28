import axios from 'axios'

const SERVICE_ROUTE = import.meta.env.DEV 
  ? '/odata/v4/public'
  : './api/public'

const api = axios.create({
  baseURL: SERVICE_ROUTE,
  headers: { 'Content-Type': 'application/json' },
})

let csrfTokenPromise

// Fetches one managed-approuter CSRF token per browser session for mutations.
const getCsrfToken = () => {
  csrfTokenPromise ??= axios.get(`${SERVICE_ROUTE}/`, {
    headers: { 'X-CSRF-Token': 'Fetch' },
  }).then((response) => {
    const token = response.headers['x-csrf-token']
    if (!token) throw new Error('CSRF token could not be loaded')
    return token
  }).catch((error) => {
    csrfTokenPromise = undefined
    throw error
  })

  return csrfTokenPromise
}

api.interceptors.request.use(async config => {
  if (!import.meta.env.DEV && !['get', 'head', 'options'].includes(config.method?.toLowerCase())) {
    config.headers['X-CSRF-Token'] = await getCsrfToken()
  }
  return config
})

 export const validateToken = async (token) => {
  const res = await api.get(`/validateToken(token='${token}')`)
  return res.data
}

export const saveConsentStep = async (data) => {
  const res = await api.post('/saveConsentStep', data)
  return res.data.value
}

export const saveRegistrationStep = async (data) => {
  const res = await api.post('/saveRegistrationStep', data)
  return res.data.value
}

export const completeRegistration = async (token) => {
  const res = await api.post('/completeRegistration', { token })
  return res.data.value
}

export const saveDocument = async (data) => {
  const res = await api.post('/saveDocument', data)
  return res.data.value
}

export const fetchPurposeConfigs = async () => {
  const res = await api.get('/VisitPurposeConfigs?$orderby=sortOrder')
  return res.data.value
}

export default api
