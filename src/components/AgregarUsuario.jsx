import { useState } from 'react';
import { useUsuarios } from '../context/UsuariosContext';
import styles from './AgregarUsuario.module.css';

export default function AgregarUsuario() {
  const { agregarUsuario } = useUsuarios();

  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    rol: 'estudiante',
  });

  function handleChange(e) {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formulario.nombre || !formulario.email) return;
    agregarUsuario(formulario);
    setFormulario({ nombre: '', email: '', rol: 'estudiante' });
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.titulo}>Agregar Usuario</h3>
      <p className={styles.subtitulo}>Completa los campos para registrar un nuevo usuario</p>

      <form onSubmit={handleSubmit} className={styles.form}>

        <div className={styles.campo}>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={handleChange}
            placeholder="Nombre completo"
          />
        </div>

        <div className={styles.campo}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formulario.email}
            onChange={handleChange}
            placeholder="correo@uniedu.co"
          />
        </div>

        <div className={styles.campo}>
          <label>Rol</label>
          <select name="rol" value={formulario.rol} onChange={handleChange}>
            <option value="estudiante">Estudiante</option>
            <option value="docente">Docente</option>
          </select>
        </div>

        <button type="submit" className={styles.boton}>
          Agregar
        </button>

      </form>
    </div>
  );
}