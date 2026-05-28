import api from './client'

export const analyticsService = {
  obtener: () => api.get('/analytics'),
}
