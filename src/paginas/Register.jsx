import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registrarUsuario } from "../lib/usuarios"


// Register

export default function Register() {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  //dsp de registrarse redirige a login
  const navigate = useNavigate()

  //funcion formulario de registro
  //verifica campos vacios
  //llama a registrarUsuario con los datos q se ingresen
  //redirige a login
  function manejarRegistro(e) {
    e.preventDefault() 

    //  validacion de no permitir campos vacios
    if (!nombre || !email || !password) {
      alert("Todos los campos son obligatorios")
      return
    }
   //regustro del nuevo usuario
    registrarUsuario({ nombre, email, password })

    // redirige al login cuando se crea un usuario
    navigate("/login")
  }

  //render registro

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