import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { iniciarSesion } from "../lib/usuarios"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // redirige usuario dsp del login
  const navigate = useNavigate()

  function manejarLogin(e) {
    e.preventDefault() 

    const usuario = iniciarSesion(email, password)

    if (usuario) {
      // si los datos son correctos se va a la pag principal
      navigate("/")
    } else {
      // si no muestra mensaje
      alert("Credenciales inválidas")
    }
  }

  return (
    <div>
      <h2>Iniciar Sesión</h2>

      {/* form login */}
      <form onSubmit={manejarLogin}>
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
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}