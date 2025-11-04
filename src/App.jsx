import { Outlet, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { obtenerUsuarioActual, cerrarSesion, obtenerUsuarios } from "./lib/usuarios"
import { obtenerSocios } from "./lib/socios"
import "./App.css"

export default function App() {
  const [usuario, setUsuario] = useState(null)

  // inicializa usuarios actuales y socios
  useEffect(() => {
    obtenerUsuarios()
    obtenerSocios()
    setUsuario(obtenerUsuarioActual())
  }, [])

  // cierre de sesion
  function manejarLogout() {
    cerrarSesion()          
    setUsuario(null)        
    window.location.href = "/login" // redirige al login
  }

  return (
    <div style={{ padding: 20 }}>
      {/* boton ubernt */}
      <div className="header-ubern">
        <Link to="/" style={{ textDecoration: "none" }}>
          <button className="boton-principal">Ubern’t</button>
        </Link>
      </div>

      {/* al no haber user mostrar login y registro */}
      {!usuario && (
        <nav className="nav-links">
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button className="boton-principal">Iniciar Sesión</button>
          </Link>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <button className="boton-principal">Registrarse</button>
          </Link>
        </nav>
      )}

      {/* si hay mostrar la sesion activa */}
      {usuario && (
        <div style={{ marginBottom: 20 }}>
          <strong>Sesión iniciada:</strong> {usuario.nombre} ({usuario.rol}){" "}
          <button className="boton-secundario" onClick={manejarLogout}>
            Cerrar sesión
          </button>

          {/* si es admin mostrar boton panel admin */}
          {usuario.rol === "admin" && (
            <div style={{ marginTop: 12 }}>
              <Link to="/admin" style={{ textDecoration: "none" }}>
                <button className="boton-principal">Panel Admin</button>
              </Link>
            </div>
          )}
        </div>
      )}
      
      <Outlet />
    </div>
  )
}