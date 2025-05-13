import axios from 'axios'

// Configuração CORRETA:
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/', // ⚠️ Note o / no final
})

// Mantenha o interceptor do token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api