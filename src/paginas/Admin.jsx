import { Link } from "react-router-dom" 
import "./../App.css" 

export default function Admin() {
  return (
    <div>
      {/* titulo */}
      <h2>Panel de Administración</h2>

      {/* contenedor estetico */}
      <div
        style={{
          display: "flex",             
          justifyContent: "center", 
          gap: "12px",                
          marginTop: "20px",            
          flexWrap: "wrap"            
        }}
      >
        {/* boton para socios */}
        <Link to="/admin/socios" style={{ textDecoration: "none" }}>
          <button className="boton-principal">Gestión de Socios</button>
        </Link>

        {/* boton para usuarios */}
        <Link to="/admin/usuarios" style={{ textDecoration: "none" }}>
          <button className="boton-principal">Gestión de Usuarios</button>
        </Link>
      </div>
    </div>
  )
}