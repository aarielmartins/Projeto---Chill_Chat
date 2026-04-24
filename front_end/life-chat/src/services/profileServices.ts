import api from './api'

export const gerMyProfile = async () => {
  const response = await api.get('/profile/')
  return response.data
}
