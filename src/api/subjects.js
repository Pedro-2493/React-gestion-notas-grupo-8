import api from './client'

export const subjectService = {
  listar: () => api.get('/subjects'),
  buscarPorId: (id) => api.get(`/subjects/${id}`),
  buscarPorNombre: (nombre) => api.get(`/subjects/buscar?nombre=${encodeURIComponent(nombre)}`),
  porDocente: (teacherId) => api.get(`/subjects/docente/${teacherId}`),
  crear: (data) => api.post('/subjects', data),
  actualizar: (id, data) => api.put(`/subjects/${id}`, data),
  eliminar: (id) => api.del(`/subjects/${id}`),
}
