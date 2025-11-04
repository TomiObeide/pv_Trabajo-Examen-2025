const CLAVE = "socios" 

// lista d socios fijos
//se cargan por defecto si no hay datos en el localstorage
//siempre hay un socio por vehiculo disponible
const SOCIOS_INICIALES = [
  {
    id: "socio-1",
    nombre: "Carlos Pérez",
    experiencia: 5, 
    patente: "ABC123",
    vehiculo: { tipo: "X", modelo: "Toyota Corolla" },
    eliminado: false // borrado logico
  },
  {
    id: "socio-2",
    nombre: "María Gómez",
    experiencia: 3,
    patente: "XYZ789",
    vehiculo: { tipo: "Luxe", modelo: "Honda Civic" },
    eliminado: false
  },
  {
    id: "socio-3",
    nombre: "Juan López",
    experiencia: 10,
    patente: "LMN456",
    vehiculo: { tipo: "Premium", modelo: "BMW Serie 5" },
    eliminado: false
  }
]

// verifica lista d socios y si no hay inicializa socios 
export function obtenerSocios() {
  let data = localStorage.getItem(CLAVE)
  if (!data) {
    localStorage.setItem(CLAVE, JSON.stringify(SOCIOS_INICIALES))
    return SOCIOS_INICIALES
  }
  return JSON.parse(data)
}
//guardar socios es la lista completa d socios en local storage
export function guardarSocios(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

// funcion crear socios
// crea un nuevo socio con los datos del form
export function crearSocio({ nombre, experiencia, patente, tipoVehiculo, modeloVehiculo }) {
  const lista = obtenerSocios()
  const nuevo = {
    id: crypto.randomUUID(), // id unico
    nombre,
    experiencia,
    patente,
    vehiculo: {
      tipo: tipoVehiculo,
      modelo: modeloVehiculo
    },
    eliminado: false
  }
  guardarSocios([...lista, nuevo])
  return nuevo
}

// editar socios 
//edita los datos de socios existentes
//reemplaza los campos con lo que se escribio en el form
export function editarSocio(id, cambios) {
  const lista = obtenerSocios().map(s =>
    s.id === id ? { ...s, ...cambios } : s
  )
  guardarSocios(lista)
}

// elmina socio(borrado logico)
export function eliminarLogicoSocio(id) {
  editarSocio(id, { eliminado: true })
}