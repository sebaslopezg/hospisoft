import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';

import App from './App.jsx'

import Layout from './layouts/dashboard.jsx';
import DashboardPage from './pages';
import OrdersPage from './pages/orders.jsx';
import NotesPage from './pages/notes.jsx';
import MedicamentosLayout from './pages/medicamentos';
import {MedicamentosCreate} from './pages/medicamentos/create';
import MedicamentosView from './pages/medicamentos/view';
import MedicamentosEdit from './pages/medicamentos/edit'


const router = createBrowserRouter([
  {
    Component: App, // root layout route
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: '',
            Component: DashboardPage,
          },
          {
            path: 'orders',
            Component: OrdersPage,
          },
          {
            path: 'notes',
            Component: NotesPage,
          },
          {
            path: 'medicamentos',
            Component: MedicamentosLayout,
            children:[
              {
                path:'',
                Component: MedicamentosView,
              },
              {
                path:'create',
                Component: MedicamentosCreate,
              },
              {
                path:'edit/:id',
                Component: MedicamentosEdit,
              },
            ]
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
