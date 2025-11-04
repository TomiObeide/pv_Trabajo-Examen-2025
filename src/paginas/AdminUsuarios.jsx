import { useState } from "react"
import { Link } from "react-router-dom"
import { obtenerUsuarios } from "../lib/usuarios"
import "../App.css"

// roles unicos permitidos
const ROLES = ["admin", "cliente"]

export default function AdminUsuarios() {
  // lista de usuarios actual
  const [usuarios, setUsuarios] = useState(obtenerUsuarios())

  const [editando, setEditando] = useState(null)

  const [form, setForm] = useState({ nombre: "", email: "", rol: "" })

  // eliminar usuario 
  function eliminarUsuario(id) {
    const actualizados = usuarios.map(u =>
      u.id === id ? { ...u, eliminado: true } : u
    )
    setUsuarios(actualizados)

    localStorage.setItem("usuarios", JSON.stringify(actualizados))
  }

  // Guardar edicion
  function guardarEdicion(id) {
    const actualizados = usuarios.map(u =>
      u.id === id ? { ...u, ...form } : u
    )
    setUsuarios(actualizados)
    localStorage.setItem("usuarios", JSON.stringify(actualizados))

    // sale de editanto y limpia el formulario de edicion
    setEditando(null)
    setForm({ nombre: "", email: "", rol: "" })
  }

  // muestra solo user activos (false)
  const activos = usuarios.filter(u => !u.eliminado)

  return (
    <div>
      <h2>Gestión de Usuarios</h2>

      {/* usuarios activos */}
      {activos.map(usuario => (
        <div key={usuario.id} className="tarjeta">
          {editando === usuario.id ? (
            // EDICION
            <>
              <input
                value={form.nombre}
                onChange={e => setForm({ ...form, nombre: e.target.value })}
              />
              <input
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
              <select
                value={form.rol}
                onChange={e => setForm({ ...form, rol: e.target.value })}
              >
                <option value="">Seleccionar rol</option>
                {ROLES.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  className="boton-principal"
                  onClick={() => guardarEdicion(usuario.id)}
                >
                  Guardar
                </button>
                <button
                  className="boton-secundario"
                  onClick={() => setEditando(null)}
                >
                  Cancelar
                </button>
              </div>
            </>
          ) : (
            // vista normal
            <>
              <h3>{usuario.nombre}</h3>
              <p><strong>Email:</strong> {usuario.email}</p>
              <p><strong>Rol:</strong> {usuario.rol}</p>
              <p><strong>Contraseña:</strong> {usuario.password}</p>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  className="boton-principal"
                  onClick={() => {
                    setEditando(usuario.id)
                    setForm({
                      nombre: usuario.nombre,
                      email: usuario.email,
                      rol: usuario.rol
                    })
                  }}
                >
                  Editar
                </button>
                <button
                  className="boton-secundario"
                  onClick={() => eliminarUsuario(usuario.id)}
                >
                  Eliminar
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      {/* boton menu principal*/}
      <Link to="/admin">
        <button className="boton-principal">Volver al Panel</button>
      </Link>
    </div>
  )
}