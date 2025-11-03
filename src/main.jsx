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

// Funcion proteger rutas
function RutaProtegida({ children, soloAdmin = false }) {
  const usuario = obtenerUsuarioActual()
  if (!usuario) return <Login />
  if (soloAdmin && usuario.rol !== "admin") return <Login />
  return children
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <RutaProtegida>
            <Reservar />
          </RutaProtegida>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // Proteccion para admin panel
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

      // Pagina de errorr
      { path: "*", element: <h2>Página no encontrada</h2> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)