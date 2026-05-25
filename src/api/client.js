const BASE_URL = 'http://localhost:8080/api'

function getToken() {
  return localStorage.getItem('token')
}

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`
  const headers = { 'Content-Type': 'application/json', ...options.headers }

  const token = getToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const config = { headers, ...options }

  const res = await fetch(url, config)
  if (!res.ok) {
    const error = await res.text().catch(() => 'Error desconocido')
    throw new Error(`API error ${res.status}: ${error}`)
  }
  return res.status === 204 ? null : res.json()
}

export const api = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, data) => request(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  put: (endpoint, data) => request(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  del: (endpoint) => request(endpoint, { method: 'DELETE' }),
}

export default api
