import { createContext, useContext } from "react"

// contexto global para usuario
//inicialmente es null (por defecto no hay usuario logueado)
export const UsuarioContext = createContext(null)

// hook personalizado para acceder a el
// useusuario encapsula usecontext
// esto simplifica el consumo en lugar de escribir usecontext(usuariocontext) se usa useUsuario()
export function useUsuario() {
  return useContext(UsuarioContext)
}