import api from './client'

export const attendanceService = {
  listar: () => api.get('/attendance'),
  porEstudiante: (studentId) => api.get(`/attendance/estudiante/${studentId}`),
  porEstudianteYMateria: (studentId, subjectId) =>
    api.get(`/attendance/estudiante/${studentId}/materia/${subjectId}`),
  crear: (data) => api.post('/attendance', data),
}
