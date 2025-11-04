import { useState } from "react"
import { Link } from "react-router-dom"
import { obtenerSocios, guardarSocios } from "../lib/socios"
import "../App.css"

// unicos tipos de vehiculos
const TIPOS = ["X", "Luxe", "Premium"]

export default function AdminSocios() {
  // lista de socios en localstorage
  const [socios, setSocios] = useState(obtenerSocios())

  // Creaciond e nuevo socio
  const [nuevo, setNuevo] = useState({
    nombre: "",
    experiencia: "",
    patente: "",
    tipoVehiculo: "",
    modeloVehiculo: ""
  })

  // Cuando un socio se esta editando
  const [editando, setEditando] = useState(null)

  // formulario de edicion
  const [form, setForm] = useState({
    nombre: "",
    experiencia: "",
    patente: "",
    tipoVehiculo: "",
    modeloVehiculo: ""
  })

  // Agregar nuevo socio
  function agregarSocio() {
    // nombre y patentes obligatorios
    if (!nuevo.nombre || !nuevo.patente) return

    const socio = {
      id: crypto.randomUUID(), // genera id unico
      nombre: nuevo.nombre,
      experiencia: parseInt(nuevo.experiencia) || 0, // experiencia tiene que ser un numero
      patente: nuevo.patente,
      vehiculo: {
        tipo: nuevo.tipoVehiculo,
        modelo: nuevo.modeloVehiculo
      },
      eliminado: false // borrador logico
    }

    // actualiza lista
    const actualizados = [...socios, socio]
    setSocios(actualizados)
    guardarSocios(actualizados)

    // se limpia el formulario de creacion
    setNuevo({ nombre: "", experiencia: "", patente: "", tipoVehiculo: "", modeloVehiculo: "" })
  }

  // Borrado logico
  function eliminarSocio(id) {
    const actualizados = socios.map(s =>
      s.id === id ? { ...s, eliminado: true } : s
    )
    setSocios(actualizados)
    guardarSocios(actualizados)
  }

  // Boton guardar edicion
  function guardarEdicion(id) {
    const actualizados = socios.map(s =>
      s.id === id
        ? {
            ...s,
            ...form,
            vehiculo: { tipo: form.tipoVehiculo, modelo: form.modeloVehiculo }
          }
        : s
    )
    setSocios(actualizados)
    guardarSocios(actualizados)

    setEditando(null)
    setForm({ nombre: "", experiencia: "", patente: "", tipoVehiculo: "", modeloVehiculo: "" })
  }

  // Socios activos(no eliminados logicamente)
  const activos = socios.filter(s => !s.eliminado)

  return (
    <div>
      <h2>Gestión de Socios</h2>

      {/* formulario para nuevos socios */}
      <div className="tarjeta">
        <h3>Agregar socio</h3>
        <input
          placeholder="Nombre"
          value={nuevo.nombre}
          onChange={e => setNuevo({ ...nuevo, nombre: e.target.value })}
        />
        <input
          placeholder="Experiencia"
          value={nuevo.experiencia}
          onChange={e => setNuevo({ ...nuevo, experiencia: e.target.value })}
        />
        <input
          placeholder="Patente"
          value={nuevo.patente}
          onChange={e => setNuevo({ ...nuevo, patente: e.target.value })}
        />
        <select
          value={nuevo.tipoVehiculo}
          onChange={e => setNuevo({ ...nuevo, tipoVehiculo: e.target.value })}
        >
          <option value="">Tipo de vehículo</option>
          {TIPOS.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <input
          placeholder="Modelo vehículo"
          value={nuevo.modeloVehiculo}
          onChange={e => setNuevo({ ...nuevo, modeloVehiculo: e.target.value })}
        />
        <button className="boton-principal" onClick={agregarSocio}>Agregar</button>
      </div>

      {/* socios activos */}
      {activos.map(socio => (
        <div key={socio.id} className="tarjeta">
          {editando === socio.id ? (
            <>
              <input
                value={form.nombre}
                onChange={e => setForm({ ...form, nombre: e.target.value })}
              />
              <input
                value={form.experiencia}
                onChange={e => setForm({ ...form, experiencia: e.target.value })}
              />
              <input
                value={form.patente}
                onChange={e => setForm({ ...form, patente: e.target.value })}
              />
              <select
                value={form.tipoVehiculo}
                onChange={e => setForm({ ...form, tipoVehiculo: e.target.value })}
              >
                <option value="">Tipo de vehículo</option>
                {TIPOS.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <input
                value={form.modeloVehiculo}
                onChange={e => setForm({ ...form, modeloVehiculo: e.target.value })}
              />
              <div style={{ display: "flex", gap: "8px" }}>
                <button className="boton-principal" onClick={() => guardarEdicion(socio.id)}>Guardar</button>
                <button className="boton-secundario" onClick={() => setEditando(null)}>Cancelar</button>
              </div>
            </>
          ) : (
            <>
              <h3>{socio.nombre}</h3>
              <p><strong>Experiencia:</strong> {socio.experiencia} años</p>
              <p><strong>Vehículo:</strong> {socio.vehiculo.tipo} {socio.vehiculo.modelo}</p>
              <p><strong>Patente:</strong> {socio.patente}</p>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  className="boton-principal"
                  onClick={() => {
                    setEditando(socio.id)
                    setForm({
                      nombre: socio.nombre,
                      experiencia: socio.experiencia,
                      patente: socio.patente,
                      tipoVehiculo: socio.vehiculo.tipo,
                      modeloVehiculo: socio.vehiculo.modelo
                    })
                  }}
                >
                  Editar
                </button>
                <button className="boton-secundario" onClick={() => eliminarSocio(socio.id)}>Eliminar</button>
              </div>
            </>
          )}
        </div>
      ))}

      {/* boton menu principal */}
      <Link to="/admin">
        <button className="boton-principal">Volver al Panel</button>
      </Link>
    </div>
  )
}