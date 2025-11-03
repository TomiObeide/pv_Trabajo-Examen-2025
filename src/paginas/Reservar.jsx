import { useState, useMemo } from "react"
import { obtenerUsuarioActual } from "../lib/usuarios"
import { obtenerSocios } from "../lib/socios"

const TARIFAS_BASE = { corta: 4000, media: 7000, larga: 20000 }
const RECARGOS = { X: 0, Luxe: 0.10, Premium: 0.20 }

export default function Reservar() {
  const usuario = obtenerUsuarioActual()
  const [tipoVehiculo, setTipoVehiculo] = useState("")
  const [socioAsignado, setSocioAsignado] = useState(null)
  const [tipoViaje, setTipoViaje] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [recibo, setRecibo] = useState(null)

  const socios = obtenerSocios().filter(s => !s.eliminado)

  function elegirTipoVehiculo(tipo) {
    setTipoVehiculo(tipo)
    setTipoViaje("")
    const candidatos = socios.filter(s => s.vehiculo.tipo === tipo)
    if (candidatos.length > 0) {
      setSocioAsignado(candidatos[0])
    } else {
      setSocioAsignado(null)
    }
  }

  const costoFinal = useMemo(() => {
    if (!socioAsignado || !tipoViaje) return 0
    const base = TARIFAS_BASE[tipoViaje]
    const recargo = RECARGOS[socioAsignado.vehiculo.tipo] || 0
    return Math.round(base * (1 + recargo))
  }, [socioAsignado, tipoViaje])

  function confirmarReserva() {
    if (!usuario) {
      setMensaje("Debés iniciar sesión para confirmar.")
      return
    }
    if (!socioAsignado || !tipoViaje) {
      setMensaje("Completá tipo de vehículo y distancia.")
      return
    }

    const reserva = {
      id: crypto.randomUUID(),
      usuarioId: usuario.id,
      usuarioNombre: usuario.nombre,
      socioNombre: socioAsignado.nombre,
      socioExperiencia: socioAsignado.experiencia,
      vehiculo: socioAsignado.vehiculo.modelo,
      vehiculoTipo: socioAsignado.vehiculo.tipo,
      tipoViaje,
      costo: costoFinal,
      fecha: new Date().toLocaleString(),
    }

    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]")
    reservas.push(reserva)
    localStorage.setItem("reservas", JSON.stringify(reservas))

    setRecibo({
      socio: socioAsignado.nombre,
      vehiculo: socioAsignado.vehiculo,
      precio: costoFinal
    })

    setMensaje("")
    setTipoVehiculo("")
    setSocioAsignado(null)
    setTipoViaje("")
  }

  return (
    <div>
      <h2>Pedir un vehículo</h2>

      {/* Paso 1: elegir tipo de vehículo */}
      <div style={{ marginBottom: 12 }}>
        <p><strong>Elegí el tipo de vehículo:</strong></p>
        {["X", "Luxe", "Premium"].map(tipo => (
          <button
            key={tipo}
            onClick={() => elegirTipoVehiculo(tipo)}
            style={{
              marginRight: 8,
              backgroundColor: tipoVehiculo === tipo ? "#4caf50" : "#eee",
              color: tipoVehiculo === tipo ? "white" : "black",
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: 4,
              cursor: "pointer"
            }}
          >
            {tipo}
          </button>
        ))}
      </div>

      {/* Mostrar socio asignado */}
      {socioAsignado && (
        <div style={{ marginTop: 12 }}>
          <h3>Conductor asignado</h3>
          <p><strong>Nombre:</strong> {socioAsignado.nombre}</p>
          <p><strong>Experiencia en la app:</strong> {socioAsignado.experiencia} años</p>
          <p><strong>Licencia:</strong> {socioAsignado.licencia}</p>
          <p><strong>Vehículo:</strong> {socioAsignado.vehiculo.tipo} {socioAsignado.vehiculo.modelo}</p>
        </div>
      )}

      {/* Paso 2: elegir distancia */}
      {socioAsignado && (
        <div style={{ marginTop: 12 }}>
          <p><strong>Distancia del viaje:</strong></p>
          {["corta", "media", "larga"].map(dist => (
            <button
              key={dist}
              onClick={() => setTipoViaje(dist)}
              style={{
                marginRight: 8,
                backgroundColor: tipoViaje === dist ? "#ff9800" : "#eee",
                color: tipoViaje === dist ? "white" : "black",
                padding: "8px 12px",
                border: "1px solid #ccc",
                borderRadius: 4,
                cursor: "pointer"
              }}
            >
              {dist === "corta" && "Corta ($4000)"}
              {dist === "media" && "Media ($7000)"}
              {dist === "larga" && "Larga ($20000)"}
            </button>
          ))}
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <strong>Costo final:</strong> {costoFinal ? `$${costoFinal}` : "-"}
      </div>

      <button 
        style={{ marginTop: 12 }} 
        onClick={confirmarReserva}
        disabled={!socioAsignado || !tipoViaje}
      >
        Confirmar reserva
      </button>

      {mensaje && <p style={{ marginTop: 10 }}>{mensaje}</p>}

      {/* recibo de viaje confirmado*/}
      {recibo && (
        <div style={{ border: "1px solid #070707ff", padding: "1rem", marginTop: "1rem" }}>
          <h3>Recibo de Reserva</h3>
          <p><strong>Conductor:</strong> {recibo.socio}</p>
          <p><strong>Vehículo:</strong> {recibo.vehiculo.modelo} ({recibo.vehiculo.patente})</p>
          <p><strong>Precio estimado:</strong> ${recibo.precio}</p>
          <p>Su vehículo llegará en breves</p>
        </div>
      )}
    </div>
  )
}