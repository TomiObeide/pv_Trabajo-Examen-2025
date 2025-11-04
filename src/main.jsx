import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"

import Login from "./paginas/Login"
import Register from "./paginas/Register"
import Reservar from "./paginas/Reservar"
import Admin from "./paginas/Admin"
import AdminSocios from "./paginas/AdminSocios"
import AdminUsuarios from "./paginas/AdminUsuarios"

import { obtenerUsuarioActual } from "./lib/usuarios"
import { UsuarioContext } from "./context/UsuarioContext" // contexto

// proteccion d admin
// si no hay user va a login
// si la ruta requiere acceso admin redirige a login
function RutaProtegida({ children, soloAdmin = false }) {
  const usuario = obtenerUsuarioActual()
  if (!usuario) return <Login />
  if (soloAdmin && usuario.rol !== "admin") return <Login />
  return children
}

// rutas principales
const router = createBrowserRouter([
  {
    path: "/",              //ruta principal
    element: <App />,       //layout
    children: [
      {
        index: true, 
        element: (
          <RutaProtegida>
            <Reservar /> {/* solo los logueados podran reservar */}
          </RutaProtegida>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // rutas exclusivas de admin
      {
        path: "admin",
        element: (
          <RutaProtegida soloAdmin>
            <Admin />
          </RutaProtegida>
        ),
      },
      {
        path: "admin/socios",
        element: (
          <RutaProtegida soloAdmin>
            <AdminSocios />
          </RutaProtegida>
        ),
      },
      {
        path: "admin/usuarios",
        element: (
          <RutaProtegida soloAdmin>
            <AdminUsuarios />
          </RutaProtegida>
        ),
      },

      // ruta en caso de inexistencia error
      { path: "*", element: <h2>Página no encontrada</h2> },
    ],
  },
])

// render principal
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* contexto para q la app tenga acceso a usuario */}
    <UsuarioContext.Provider value={obtenerUsuarioActual()}>
      <RouterProvider router={router} />
    </UsuarioContext.Provider>
  </React.StrictMode>
)