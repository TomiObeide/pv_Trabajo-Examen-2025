import { useState } from "react"
import { obtenerSocios, crearSocio, editarSocio, eliminarLogicoSocio } from "../lib/socios"

const TIPOS = ["X", "Luxe", "Premium"]

export default function AdminSocios() {
  const [socios, setSocios] = useState(obtenerSocios())
  const [nombre, setNombre] = useState("")
  const [experiencia, setExperiencia] = useState("")
  const [licencia, setLicencia] = useState("")
  const [tipoVehiculo, setTipoVehiculo] = useState("")
  const [modeloVehiculo, setModeloVehiculo] = useState("")
  const [editId, setEditId] = useState(null)

  function manejarAgregar(e) {
    e.preventDefault()
    if (!nombre || !experiencia || !licencia || !tipoVehiculo || !modeloVehiculo) return
    crearSocio({ nombre, experiencia, licencia, tipoVehiculo, modeloVehiculo })
    setSocios(obtenerSocios())
    setNombre(""); setExperiencia(""); setLicencia(""); setTipoVehiculo(""); setModeloVehiculo("")
  }

  function manejarEditar(e) {
    e.preventDefault()
    if (!editId) return
    editarSocio(editId, { nombre, experiencia, licencia, vehiculo: { tipo: tipoVehiculo, modelo: modeloVehiculo } })
    setSocios(obtenerSocios())
    setEditId(null); setNombre(""); setExperiencia(""); setLicencia(""); setTipoVehiculo(""); setModeloVehiculo("")
  }

  return (
    <div>
      <h2>Gestión de Socios</h2>
      <form onSubmit={editId ? manejarEditar : manejarAgregar}>
        <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        <input placeholder="Experiencia" value={experiencia} onChange={e => setExperiencia(e.target.value)} />
        <input placeholder="Licencia" value={licencia} onChange={e => setLicencia(e.target.value)} />
        <select value={tipoVehiculo} onChange={e => setTipoVehiculo(e.target.value)}>
          <option value="">Tipo de vehículo</option>
          {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <input placeholder="Modelo del vehículo" value={modeloVehiculo} onChange={e => setModeloVehiculo(e.target.value)} />
        <button type="submit">{editId ? "Guardar" : "Agregar"}</button>
      </form>

      <ul>
        {socios.filter(s => !s.eliminado).map(s => (
          <li key={s.id}>
            {s.nombre} — {s.experiencia} años — Licencia {s.licencia} — Vehículo: {s.vehiculo.tipo} {s.vehiculo.modelo}
            <button onClick={() => { 
              setEditId(s.id); 
              setNombre(s.nombre); 
              setExperiencia(s.experiencia); 
              setLicencia(s.licencia); 
              setTipoVehiculo(s.vehiculo.tipo); 
              setModeloVehiculo(s.vehiculo.modelo) 
            }}>Editar</button>
            <button onClick={() => { eliminarLogicoSocio(s.id); setSocios(obtenerSocios()) }}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}