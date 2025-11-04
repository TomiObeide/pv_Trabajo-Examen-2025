import { useState, useMemo, useCallback } from "react"
import { useUsuario } from "../context/UsuarioContext" // usuario contexto
import { obtenerSocios } from "../lib/socios"
import "../App.css"

// tarifa base 
const TARIFAS_BASE = { corta: 4000, media: 7000, larga: 20000 }

// recargo
const RECARGOS = { X: 0, Luxe: 0.10, Premium: 0.20 }

//componente d reservas
export default function Reservar() {
  // usuario actual desde contexto
  const usuario = useUsuario()

  const [tipoVehiculo, setTipoVehiculo] = useState("")   
  const [socioAsignado, setSocioAsignado] = useState(null)
  const [tipoViaje, setTipoViaje] = useState("")         
  const [mensaje, setMensaje] = useState("")             
  const [recibo, setRecibo] = useState(null)             

  // lista d socios activos
  const socios = obtenerSocios().filter(s => !s.eliminado)

  // elegir tipo de vehiculo (useCallback para no recrear en cada render)
  const elegirTipoVehiculo = useCallback((tipo) => {
    setTipoVehiculo(tipo)
    setTipoViaje("") // cuando se cambia el vehiculo resetea la distancia

    // buscar socios disponibles con el vehiculo elegido
    const candidatos = socios.filter(s => s.vehiculo.tipo === tipo)
    if (candidatos.length > 0) {
      // asigna socios(el primero, esto se puede cambiar)
      setSocioAsignado(candidatos[0])
    } else {
      // si no hay muestra mensaje de error
      setSocioAsignado(null)
    }
  }, [socios])

  // calculo costo final
  const costoFinal = useMemo(() => { // use memo para no recalcular si no se cambian dependencias
    if (!socioAsignado || !tipoViaje) return 0
    const base = TARIFAS_BASE[tipoViaje]
    const recargo = RECARGOS[socioAsignado.vehiculo.tipo] || 0
    return Math.round(base * (1 + recargo))
  }, [socioAsignado, tipoViaje])

  // zona de confirmacion (useCallback para optimizar)
  const confirmarReserva = useCallback(() => {
    // validaciones antes de confirmar
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

    // guardar reservas en caso de necesitar(localstorage)
    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]")
    reservas.push(reserva)
    localStorage.setItem("reservas", JSON.stringify(reservas))

    // recibo visual para mostrar
    setRecibo({
      socio: socioAsignado.nombre,
      vehiculo: socioAsignado.vehiculo,
      precio: costoFinal
    })

    // resetear form
    setMensaje("")
    setTipoVehiculo("")
    setSocioAsignado(null)
    setTipoViaje("")
  }, [usuario, socioAsignado, tipoViaje, costoFinal])

  return (
    <div>
      <h2>Pedir un vehículo</h2>

      {/* elegir vehiculo */}
      <div style={{ marginBottom: 12 }}>
        <p><strong>Elegí el tipo de vehículo:</strong></p>
        {["X", "Luxe", "Premium"].map(tipo => (
          <button
            key={tipo}
            onClick={() => elegirTipoVehiculo(tipo)}
            className={tipoVehiculo === tipo ? "boton-principal" : "boton-secundario"}
            style={{ marginRight: 8 }}
          >
            {tipo}
          </button>
        ))}
      </div>

      {/* socio no dispo */}
      {tipoVehiculo && !socioAsignado && (
        <p style={{ marginTop: 12, color: "red" }}>
          Conductores de esta categoría no disponibles
        </p>
      )}

      {/* socio asignado */}
      {socioAsignado && (
        <div className="tarjeta">
          <h3>Conductor asignado</h3>
          <p><strong>Nombre:</strong> {socioAsignado.nombre}</p>
          <p><strong>Experiencia en la app:</strong> {socioAsignado.experiencia} años</p>
          <p><strong>Patente:</strong> {socioAsignado.patente}</p>
          <p><strong>Vehículo:</strong> {socioAsignado.vehiculo.tipo} {socioAsignado.vehiculo.modelo}</p>
        </div>
      )}

      {/* distancia */}
      {socioAsignado && (
        <div style={{ marginTop: 12 }}>
          <p><strong>Distancia del viaje:</strong></p>
          {["corta", "media", "larga"].map(dist => (
            <button
              key={dist}
              onClick={() => setTipoViaje(dist)}
              className={tipoViaje === dist ? "boton-principal" : "boton-secundario"}
              style={{ marginRight: 8 }}
            >
              {dist === "corta" && "Corta ($4000)"}
              {dist === "media" && "Media ($7000)"}
              {dist === "larga" && "Larga ($20000)"}
            </button>
          ))}
        </div>
      )}

      {/* costo final */}
      <div style={{ marginTop: 12 }}>
        <strong>Costo final:</strong> {costoFinal ? `$${costoFinal}` : "-"}
      </div>

      {/* boton d confirm */}
      <button
        className="boton-principal"
        style={{ marginTop: 12 }}
        onClick={confirmarReserva}
        disabled={!socioAsignado || !tipoViaje}
      >
        Confirmar reserva
      </button>

      {/* mensaje d erorr */}
      {mensaje && <p style={{ marginTop: 10 }}>{mensaje}</p>}

      {/* recibo */}
      {recibo && (
        <div className="tarjeta">
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