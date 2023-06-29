import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  createBrowserRouter, RouterProvider,} from "react-router-dom";
import Layout from './Pages/Layout'
import Principal from './Pages/Principal'
import Login from './Pages/Login'
import Menu from './Pages/Menu'
import Clientas from './Components/TablaClientas'
import RegistroClientas from './Pages/RegistroClienta'
import RegisterCoordinador from './Pages/RegistroCoordinadores';
import Pagos from './Pages/Pagos';
import User from './Components/Usuario'




const router = createBrowserRouter([
{
  path: '/inicio',
  element: <Layout/>,
  children: [
    {
      index: true,
      element:<Menu/>
    },
    {
      path:'clientas',
      element:<Clientas/>
    },
    {
      path:'registroclientas',
      element:<RegistroClientas/>

    },
    {
      path:"coordinadoras",
      element:<RegisterCoordinador/>,
    },
    {
      path:"pagos",
      element:<Pagos/>,
    },{
      path:"user",
      element:<User/>,
    }

  ]
},  
{
  path:"/",
  element:<Principal/>,
  children:[{
  index: true,
  element:<Login/>

  }]
  

}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>  
  </React.StrictMode>,
)
