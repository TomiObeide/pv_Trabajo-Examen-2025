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
      {/* boton volver al inicio*/}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <button
            style={{
              backgroundColor: "#0a0a0aff",
              color: "white",
              fontSize: "1.2rem",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
            }}
          >
            Ubern’t
          </button>
        </Link>
      </div>

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