import axios, { AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access')

  const publicRoutes = ['/login/', '/register/']

  const isPublicRoute = publicRoutes.some((route) => config.url?.includes(route))

  if (!isPublicRoute && token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  if (config.data instanceof FormData && config.headers) {
    delete config.headers['Content-Type']
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refresh = localStorage.getItem('refresh')

      if (!refresh) {
        window.location.href = '/login'
        return Promise.reject(error)
      }

      try {
        const res = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
          refresh
        })

        localStorage.setItem('access', res.data.access)
        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`

        return api(originalRequest)
      } catch (err) {
        localStorage.clear()
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default api
