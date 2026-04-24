import React, { useState } from "react";
import "./EstudiantesDashboard.css";

// Datos del estudiante
const ESTUDIANTE = {
  nombre: "Melina",
  apellido: "Ramirez",
  email: "melirez@evalix.edu.co",
  documento: "1002345678",
  grupo: "EV0001",
};

// Lista de materias
const MATERIAS = [
  { id: 101, nombre: "Cálculo Diferencial" },
  { id: 102, nombre: "Estructuras de Datos" },
  { id: 103, nombre: "Base de Datos I" },
  { id: 104, nombre: "Inglés Técnico" },
];

// Notas por materia
const NOTAS = [
  { id: 1, materia_id: 101, periodo: "2024-1", nota1: 3.8, nota2: 4.2, nota3: 4.5 },
  { id: 2, materia_id: 102, periodo: "2024-1", nota1: 3.5, nota2: 3.8, nota3: 4.0 },
  { id: 3, materia_id: 103, periodo: "2024-1", nota1: 4.0, nota2: 4.1, nota3: 4.3 },
  { id: 4, materia_id: 104, periodo: "2024-1", nota1: 4.5, nota2: 4.7, nota3: 4.8 },
  { id: 5, materia_id: 101, periodo: "2024-2", nota1: 4.0, nota2: 4.3, nota3: 4.6 },
  { id: 6, materia_id: 102, periodo: "2024-2", nota1: 3.9, nota2: 4.1, nota3: 4.2 },
];

// Calcula el promedio de 3 notas
function calcularPromedio(n1, n2, n3) {
  return ((n1 + n2 + n3) / 3).toFixed(2);
}

export default function EstudiantesDashboard() {
  const [periodo, setPeriodo] = useState("2024-1");

  // Periodos disponibles (sin repetidos)
  const periodos = [...new Set(NOTAS.map((n) => n.periodo))];

  // Notas del periodo seleccionado
  const notasDelPeriodo = NOTAS.filter((n) => n.periodo === periodo);

  return (
    <div className="pagina">

      {/* PERFIL */}
      <div className="card">
        <div className="perfil">
          <div className="avatar">
            {ESTUDIANTE.nombre[0]}{ESTUDIANTE.apellido[0]}
          </div>
          <div>
            <h2>{ESTUDIANTE.nombre} {ESTUDIANTE.apellido}</h2>
            <p>Documento: {ESTUDIANTE.documento}</p>
            <p>Grupo: {ESTUDIANTE.grupo}</p>
            <p>Email: {ESTUDIANTE.email}</p>
          </div>
        </div>
      </div>

      {/* SELECTOR DE PERIODO */}
      <div className="card">
        <p>Selecciona un período:</p>
        <div className="pills">
          {periodos.map((p) => (
            <button
              key={p}
              className={periodo === p ? "pill activo" : "pill"}
              onClick={() => setPeriodo(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* TABLA DE NOTAS */}
      <div className="card">
        <h3>Notas — {periodo}</h3>
        <table className="tabla">
          <thead>
            <tr>
              <th>Materia</th>
              <th>Nota 1</th>
              <th>Nota 2</th>
              <th>Nota 3</th>
              <th>Promedio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {notasDelPeriodo.map((nota) => {
              const materia = MATERIAS.find((m) => m.id === nota.materia_id);
              const promedio = calcularPromedio(nota.nota1, nota.nota2, nota.nota3);
              const aprobada = promedio >= 3.0;

              return (
                <tr key={nota.id}>
                  <td>{materia?.nombre}</td>
                  <td>{nota.nota1}</td>
                  <td>{nota.nota2}</td>
                  <td>{nota.nota3}</td>
                  <td><strong>{promedio}</strong></td>
                  <td>
                    <span className={aprobada ? "badge verde" : "badge rojo"}>
                      {aprobada ? "Aprobada" : "Reprobada"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}