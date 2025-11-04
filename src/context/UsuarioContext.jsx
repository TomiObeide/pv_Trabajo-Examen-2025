import { createContext, useContext } from "react"

// contexto global para usuario
export const UsuarioContext = createContext(null)

// hook personalizado para acceder a el
export function useUsuario() {
  return useContext(UsuarioContext)
}