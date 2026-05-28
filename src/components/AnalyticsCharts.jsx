import { useState, useEffect } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell, LabelList
} from 'recharts'
import { analyticsService } from '../api/analytics'

const COLORS = {
  aprobado: '#10b981',
  reprobado: '#ef4444',
  materia: ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
            '#f43f5e', '#f97316', '#eab308', '#84cc16', '#22c55e'],
}

function parseJson(raw) {
  if (!raw) return []
  try {
    return typeof raw === 'string' ? JSON.parse(raw) : raw
  } catch {
    return []
  }
}

function PromedioMaterias({ data }) {
  const items = parseJson(data).map(d => ({
    materia: d.nombre_materia,
    promedio: d.promedio_general,
  }))

  if (!items.length) return null

  return (
    <div className="admin-card">
      <h3>Promedio de Notas por Materia</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={items} layout="vertical" margin={{ left: 120 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis type="number" domain={[0, 5]} tick={{ fill: '#94a3b8' }} />
          <YAxis type="category" dataKey="materia" tick={{ fill: '#e2e8f0', fontSize: 12 }} />
          <Tooltip
            contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
            labelStyle={{ color: '#e2e8f0' }}
          />
          <Bar dataKey="promedio" radius={[0, 6, 6, 0]}>
            {items.map((_, i) => (
              <Cell key={i} fill={COLORS.materia[i % COLORS.materia.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function RendimientoPeriodo({ data }) {
  const items = parseJson(data).map(d => ({
    periodo: d.periodo,
    Aprobado: d.Aprobado,
    Reprobado: d.Reprobado,
  }))

  if (!items.length) return null

  return (
    <div className="admin-card">
      <h3>Rendimiento por Periodo</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={items} margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="periodo" tick={{ fill: '#e2e8f0' }} />
          <YAxis tick={{ fill: '#94a3b8' }} />
          <Tooltip
            contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
            labelStyle={{ color: '#e2e8f0' }}
          />
          <Legend />
          <Bar dataKey="Aprobado" fill={COLORS.aprobado} radius={[6, 6, 0, 0]} />
          <Bar dataKey="Reprobado" fill={COLORS.reprobado} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function DistribucionNotas({ data }) {
  const values = parseJson(data).map(d => d.value).filter(v => v != null)

  if (!values.length) return null

  const bins = {}
  const step = 0.5
  for (let i = 0; i <= 5; i += step) {
    const label = `${i.toFixed(1)}-${(i + step).toFixed(1)}`
    bins[label] = 0
  }
  values.forEach(v => {
    const binIndex = Math.floor(v / step) * step
    const label = `${binIndex.toFixed(1)}-${(binIndex + step).toFixed(1)}`
    if (bins[label] !== undefined) bins[label]++
  })

  const chartData = Object.entries(bins).map(([rango, cantidad]) => ({ rango, cantidad }))

  return (
    <div className="admin-card">
      <h3>Distribucion de Notas</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="rango" tick={{ fill: '#e2e8f0', fontSize: 11 }} angle={-20} textAnchor="end" />
          <YAxis tick={{ fill: '#94a3b8' }} />
          <Tooltip
            contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
            labelStyle={{ color: '#e2e8f0' }}
          />
          <Bar dataKey="cantidad" fill="#3b82f6" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, i) => {
              const min = parseFloat(entry.rango.split('-')[0])
              return <Cell key={i} fill={min >= 3.0 ? '#10b981' : '#ef4444'} />
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function ResumenDocentes({ data }) {
  const items = parseJson(data).map(d => ({
    docente: d.nombre_docente,
    promedio: d.promedio_general,
    total_notas: d.total_notas,
  }))

  if (!items.length) return null

  return (
    <div className="admin-card">
      <h3>Rendimiento por Docente</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={items} layout="vertical" margin={{ left: 120 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis type="number" domain={[0, 5]} tick={{ fill: '#94a3b8' }} />
          <YAxis type="category" dataKey="docente" tick={{ fill: '#e2e8f0', fontSize: 12 }} />
          <Tooltip
            contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
            labelStyle={{ color: '#e2e8f0' }}
            formatter={(value, name, props) => [
              `${value.toFixed(2)} (${props.payload.total_notas} notas)`, 'Promedio'
            ]}
          />
          <Bar dataKey="promedio" radius={[0, 6, 6, 0]}>
            {items.map((_, i) => (
              <Cell key={i} fill={COLORS.materia[i % COLORS.materia.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default function AnalyticsCharts() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await analyticsService.obtener()
        setData(res)
      } catch {
        console.warn('No se pudieron cargar los datos analiticos')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return <div className="admin-pagina"><p style={{ color: '#94a3b8' }}>Cargando datos analiticos...</p></div>
  }

  if (!data) {
    return (
      <div className="admin-pagina">
        <div className="admin-card" style={{ textAlign: 'center', padding: 40 }}>
          <h3>No hay datos analiticos disponibles</h3>
          <p style={{ color: '#94a3b8' }}>
            Ejecuta primero <code>python src/exportar_json.py</code> para enviar los datos desde Python.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-pagina">
      <div className="admin-header">
        <h2>Analiticas Academicas</h2>
        <p style={{ color: '#4a7a9b' }}>Datos procesados desde Python con Pandas</p>
      </div>

      <div className="admin-grid-2">
        <PromedioMaterias data={data.resumenMaterias} />
        <RendimientoPeriodo data={data.rendimientoPeriodo} />
      </div>

      <div className="admin-grid-2">
        <DistribucionNotas data={data.distribucionNotas} />
        <ResumenDocentes data={data.resumenDocentes} />
      </div>
    </div>
  )
}
