
// src/api/axiosConfig.js
import axios from 'axios';

// Configuración de integración de acuerdo con características técnicas
export const apiPublica = axios.create({
  baseURL: 'https://sistema-gestion-notas-grupo-8.onrender.com',
  timeout: 8000, // Parámetro técnico: no esperar más de 8 segundos
  headers: {
    'Accept': 'application/json'
    // Aquí irían los parámetros de licenciamiento si la API lo requiriera
  }
});
