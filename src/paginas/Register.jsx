import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registrarUsuario } from "../lib/usuarios"

export default function Register() {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  function manejarRegistro(e) {
    e.preventDefault() 

    registrarUsuario({ nombre, email, password })

    // redirige al login cuando se crea un usuario
    navigate("/login")
  }

  return (
    <div>
      <h2>Registrarse</h2>

      {/* formulario d register */}
      <form onSubmit={manejarRegistro}>
        <input
          placeholder="Nombre completo"
          value={nombre}
          onChange={e => setNombre(e.target.value)} 
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Crear cuenta</button>
      </form>
    </div>
  )
}