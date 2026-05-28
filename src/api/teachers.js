import api from './client'

export const teacherService = {
  listar: () => api.get('/teachers'),
  buscarPorId: (id) => api.get(`/teachers/${id}`),
  buscarPorNombre: (nombre) => api.get(`/teachers/buscar?nombre=${encodeURIComponent(nombre)}`),
  crear: (data) => api.post('/teachers', data),
  actualizar: (id, data) => api.put(`/teachers/${id}`, data),
  eliminar: (id) => api.del(`/teachers/${id}`),
}
