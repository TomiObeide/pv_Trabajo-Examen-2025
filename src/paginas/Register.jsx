import { useState } from "react"
import { registrarUsuario } from "../lib/usuarios"

export default function Register() {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mensaje, setMensaje] = useState("")

  function manejarRegistro(e) {
    e.preventDefault()
    registrarUsuario({ nombre, email, password })
    setMensaje("Usuario registrado correctamente ✅")
    setNombre("")
    setEmail("")
    setPassword("")
  }

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={manejarRegistro}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  )
}