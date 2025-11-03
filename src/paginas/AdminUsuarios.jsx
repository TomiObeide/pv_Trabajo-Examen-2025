import { useState } from "react"
import { obtenerUsuarios } from "../lib/usuarios"

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState(obtenerUsuarios())

  function cambiarRol(id, nuevoRol) {
    const lista = usuarios.map(u => u.id === id ? { ...u, rol: nuevoRol } : u)
    localStorage.setItem("usuarios", JSON.stringify(lista))
    setUsuarios(lista)
  }

  function eliminarLogico(id) {
    const lista = usuarios.map(u => u.id === id ? { ...u, eliminado: true } : u)
    localStorage.setItem("usuarios", JSON.stringify(lista))
    setUsuarios(lista)
  }

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <ul>
        {usuarios.filter(u => !u.eliminado).map(u => (
          <li key={u.id}>
            {u.nombre} — {u.email} — Rol: {u.rol}
            <select
              value={u.rol}
              onChange={e => cambiarRol(u.id, e.target.value)}
              style={{ marginLeft: 8 }}
            >
              <option value="cliente">cliente</option>
              <option value="admin">admin</option>
            </select>
            <button style={{ marginLeft: 8 }} onClick={() => eliminarLogico(u.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}