import api from './client'

export const subjectService = {
  listar: () => api.get('/subjects'),
  buscarPorId: (id) => api.get(`/subjects/${id}`),
  buscarPorNombre: (nombre) => api.get(`/subjects/buscar?nombre=${encodeURIComponent(nombre)}`),
  crear: (data) => api.post('/subjects', data),
}
