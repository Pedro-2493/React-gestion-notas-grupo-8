import api from './client'

export const studentService = {
  listar: () => api.get('/students'),
  buscarPorId: (id) => api.get(`/students/${id}`),
  buscarPorNombre: (nombre) => api.get(`/students/buscar?nombre=${encodeURIComponent(nombre)}`),
  crear: (data) => api.post('/students', data),
  actualizar: (id, data) => api.put(`/students/${id}`, data),
  eliminar: (id) => api.del(`/students/${id}`),
}
