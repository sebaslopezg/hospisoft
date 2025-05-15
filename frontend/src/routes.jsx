import { createBrowserRouter } from 'react-router';

import App from './App.jsx'
import Layout from './layouts/dashboard.jsx';
import DashboardPage from './pages';
import OrdersPage from './pages/orders.jsx';
import NotesPage from './pages/notes.jsx';

//medicamentos
import MedicamentosLayout from './pages/medicamentos';
import {MedicamentosCreate} from './pages/medicamentos/create';
import MedicamentosView from './pages/medicamentos/view';
import MedicamentosEdit from './pages/medicamentos/edit'

//Usuarios
import UsuariosLayout from './pages/usuarios/index.jsx';
import { UsuariosView } from './pages/usuarios/view.jsx';
import { UsuariosEdit } from './pages/usuarios/edit.jsx';
import { UsuariosCreate } from './pages/usuarios/create.jsx';

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
          {
            path: 'usuarios',
            Component: UsuariosLayout,
            children:[
              {
                path:'',
                Component: UsuariosView
              },
              {
                path:'create',
                Component: UsuariosCreate
              },
              {
                path:'edit/:id',
                Component: UsuariosEdit
              },
            ]
          }
        ],
      },
    ],
  },
]);

export default router