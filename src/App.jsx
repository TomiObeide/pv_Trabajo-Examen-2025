import { Outlet, Link } from "react-router-dom"
import { useEffect } from "react"
import { cerrarSesion, obtenerUsuarios } from "./lib/usuarios"
import { obtenerSocios } from "./lib/socios"
import { useUsuario } from "./context/UsuarioContext" // hook de contexto
import "./App.css"

export default function App() {
  // usuario actual desde contexto
  const usuario = useUsuario()

  // inicializa usuarios actuales y socios precargar
  useEffect(() => { 
    obtenerUsuarios()
    obtenerSocios()
  }, [])

  // cierre de sesión 
  function manejarLogout() {
    cerrarSesion()
    window.location.href = "/login" // redirige al login
  }

  // layout principal
  return (
    <div style={{ padding: 20 }}>
      <div className="header-ubern">
        <Link to="/" style={{ textDecoration: "none" }}>
          <button className="boton-principal">Ubern’t</button>  {/* boton principal ubernt */}
        </Link>
      </div>
              {/* si no hay usuario logueado muestra boton login y register */}
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
              {/* si si hay usuario logueado muestra nombre, rol y logout */}
      {usuario && (
        <div style={{ marginBottom: 20 }}>
          <strong>Sesión iniciada:</strong> {usuario.nombre} ({usuario.rol}){" "}
          <button className="boton-secundario" onClick={manejarLogout}>
            Cerrar sesión
          </button>
               {/* si el usuario es admin muestra el boton panel admin */}
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