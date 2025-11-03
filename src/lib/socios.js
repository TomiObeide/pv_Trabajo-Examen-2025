const CLAVE = "socios"

// Socios iniciales fijos
const SOCIOS_INICIALES = [
  {
    id: "socio-1",
    nombre: "Carlos Pérez",
    experiencia: 5,
    licencia: "ABC123",
    vehiculo: { tipo: "X", modelo: "Toyota Corolla" },
    eliminado: false
  },
  {
    id: "socio-2",
    nombre: "María Gómez",
    experiencia: 3,
    licencia: "XYZ789",
    vehiculo: { tipo: "Luxe", modelo: "Honda Civic" },
    eliminado: false
  },
  {
    id: "socio-3",
    nombre: "Juan López",
    experiencia: 10,
    licencia: "LMN456",
    vehiculo: { tipo: "Premium", modelo: "BMW Serie 5" },
    eliminado: false
  }
]

export function obtenerSocios() {
  let data = localStorage.getItem(CLAVE)
  if (!data) {
    localStorage.setItem(CLAVE, JSON.stringify(SOCIOS_INICIALES))
    return SOCIOS_INICIALES
  }
  return JSON.parse(data)
}

export function guardarSocios(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

export function crearSocio({ nombre, experiencia, licencia, tipoVehiculo, modeloVehiculo }) {
  const lista = obtenerSocios()
  const nuevo = {
    id: crypto.randomUUID(),
    nombre,
    experiencia,
    licencia,
    vehiculo: {
      tipo: tipoVehiculo,
      modelo: modeloVehiculo
    },
    eliminado: false
  }
  guardarSocios([...lista, nuevo])
  return nuevo
}

export function editarSocio(id, cambios) {
  const lista = obtenerSocios().map(s => s.id === id ? { ...s, ...cambios } : s)
  guardarSocios(lista)
}

export function eliminarLogicoSocio(id) {
  editarSocio(id, { eliminado: true })
}