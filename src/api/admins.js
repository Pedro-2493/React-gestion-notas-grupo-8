import api from './client'

export const adminService = {
  listar: () => api.get('/admins'),
  buscarPorId: (id) => api.get(`/admins/${id}`),
  buscarPorEmail: (email) => api.get(`/admins/email/${encodeURIComponent(email)}`),
  buscarPorNombre: (nombre) => api.get(`/admins/buscar?nombre=${encodeURIComponent(nombre)}`),
  crear: (data) => api.post('/admins', data),
}
