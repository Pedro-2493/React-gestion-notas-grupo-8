import api from './client'

export const gradeService = {
  listar: () => api.get('/grades'),
  buscarPorId: (id) => api.get(`/grades/${id}`),
  porEstudiante: (studentId) => api.get(`/grades/estudiante/${studentId}`),
  porEstudianteYPeriodo: (studentId, period) =>
    api.get(`/grades/estudiante/${studentId}/periodo?period=${encodeURIComponent(period)}`),
  crear: (data) => api.post('/grades', data),
}
