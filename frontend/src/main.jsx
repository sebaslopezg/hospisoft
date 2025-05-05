import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppProviderBasic from './layouts/layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Users } from './layouts/users/Users.jsx';
import { Medicamentos } from './layouts/medicamentos/Medicamentos.jsx'; 
import { Crudsito } from './layouts/crud/crudsito.jsx';

import App from './App.jsx'

const router = createBrowserRouter([
    {
      Component: App, // root layout route
      children: [
        {
          path: '/',
          Component: AppProviderBasic,
          children:[
            {
              path: 'usuarios',
              Component: Users,
            },
            {
              path: 'medicamentos',
              Component: Medicamentos ,
            },
            {
              path: 'crudsito',
              Component: Crudsito ,
            },
          ]
        },
        //aquí se puede poner una landing
        {
          path: 'usuarios', //path de ejemplo
          Component: Users,
        },
      ],
    },
  ]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)