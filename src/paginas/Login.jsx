import { useState } from "react"
import { iniciarSesion, obtenerUsuarios } from "../lib/usuarios"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mensaje, setMensaje] = useState("")

  function manejarLogin(e) {
    e.preventDefault()
    obtenerUsuarios() // fuerza sembrado inicial
    const usuario = iniciarSesion(email, password)
    if (usuario) {
      window.location.href = "/"
    } else {
      setMensaje("Credenciales inválidas")
    }
  }

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={manejarLogin}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  )
}