import { Outlet, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { obtenerUsuarioActual, cerrarSesion, obtenerUsuarios } from "./lib/usuarios"
import { obtenerSocios } from "./lib/socios"


export default function App() {
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    obtenerUsuarios() 
    obtenerSocios()
    setUsuario(obtenerUsuarioActual())
  }, [])

  function manejarLogout() {
    cerrarSesion()
    setUsuario(null)
    window.location.href = "/login"
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Trabajo Examen 2025</h1>

      {!usuario && (
        <nav>
          <Link to="/login">Iniciar Sesión</Link> |{" "}
          <Link to="/register">Registro</Link>
        </nav>
      )}

      {usuario && (
        <div style={{ marginBottom: 20 }}>
          <strong>Sesión iniciada:</strong> {usuario.nombre} ({usuario.rol}){" "}
          <button onClick={manejarLogout}>Cerrar sesión</button>
          {usuario.rol === "admin" && (
            <div>
              <Link to="/admin">Panel Admin</Link>
            </div>
          )}
        </div>
      )}

      <Outlet />
    </div>
  )
}