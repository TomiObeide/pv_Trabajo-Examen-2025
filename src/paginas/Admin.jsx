import { Link } from "react-router-dom"

export default function Admin() {
  return (
    <div>
      <h2>Panel de Administración</h2>
      <ul>
        <li><Link to="/admin/socios">Gestión de Socios</Link></li>
        <li><Link to="/admin/usuarios">Gestión de Usuarios</Link></li>
      </ul>
    </div>
  )
}