const CLAVE = "usuarios"

// Usuario inicial fijo
const USUARIOS_INICIALES = [
  {
    id: "admin-1",
    nombre: "Administrador",
    email: "admin@mail.com",
    password: "1234",
    rol: "admin",
    eliminado: false
  }
]

export function obtenerUsuarios() {
  let data = localStorage.getItem(CLAVE)
  if (!data) {
    localStorage.setItem(CLAVE, JSON.stringify(USUARIOS_INICIALES))
    return USUARIOS_INICIALES
  }
  return JSON.parse(data)
}

export function guardarUsuarios(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

export function registrarUsuario({ nombre, email, password, rol = "cliente" }) {
  const usuarios = obtenerUsuarios()
  const nuevo = {
    id: crypto.randomUUID(),
    nombre,
    email,
    password,
    rol,
    eliminado: false
  }
  usuarios.push(nuevo)
  guardarUsuarios(usuarios)
  return nuevo
}

export function obtenerUsuarioActual() {
  const data = localStorage.getItem("usuario_actual")
  return data ? JSON.parse(data) : null
}

export function iniciarSesion(email, password) {
  const usuarios = obtenerUsuarios()
  const usuario = usuarios.find(
    u => u.email === email && u.password === password && !u.eliminado
  )
  if (usuario) {
    localStorage.setItem("usuario_actual", JSON.stringify(usuario))
    return usuario
  }
  return null
}

export function cerrarSesion() {
  localStorage.removeItem("usuario_actual")
}