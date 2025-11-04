const CLAVE = "usuarios"

// usuario admin al iniciar
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

// busca usuarios en local storage
export function obtenerUsuarios() {
  let data = localStorage.getItem(CLAVE)
  if (!data) {
    // si no hay carga el user admin
    localStorage.setItem(CLAVE, JSON.stringify(USUARIOS_INICIALES))
    return USUARIOS_INICIALES
  }
  return JSON.parse(data)
}

// guarda los usuarios y se usa cuando se agregan guardan o eliminan
export function guardarUsuarios(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

// registra nuevo user y le agrega rol cliente por defecto
export function registrarUsuario({ nombre, email, password, rol = "cliente" }) {
  const usuarios = obtenerUsuarios()
  const nuevo = {
    id: crypto.randomUUID(), // id unico
    nombre,
    email,
    password,
    rol,                     
    eliminado: false
  }
  usuarios.push(nuevo)       // se guarda
  guardarUsuarios(usuarios)  
  return nuevo
}

// devuelve el usuario actual(logueado)
// se guarda como usuario_actual en local storage
export function obtenerUsuarioActual() {
  const data = localStorage.getItem("usuario_actual")
  return data ? JSON.parse(data) : null
}

// inicia sesion con usuario guardados 
// busca usuario por mail y pass
// verifica q eliminado=false
//si es valido lo guarda como usuario_actual
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

// cierra sesion
// elimina al usuario_actual de localstorage
export function cerrarSesion() {
  localStorage.removeItem("usuario_actual")
}

// eliminacion logica de usuarios(en caso de querer revisar usuarios antiguos sin perder data importante)
export function eliminarLogicoUsuario(id) {
  const usuarios = obtenerUsuarios().map(u =>
    u.id === id ? { ...u, eliminado: true } : u
  )
  guardarUsuarios(usuarios)
}