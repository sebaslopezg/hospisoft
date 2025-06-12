import { createBrowserRouter } from 'react-router';

import App from '../App.jsx'
import Layout from '../layouts/dashboard.jsx';
import DashboardPage from '../pages/index.jsx';
import NotesPage from '../pages/test/notes.jsx';

//auth
import CredentialsSignInPage from '../pages/auth/index.jsx'

//medicamentos
import MedicamentosLayout from '../pages/medicamentos/index.jsx';
import {MedicamentosCreate} from '../pages/medicamentos/create.jsx';
import MedicamentosView from '../pages/medicamentos/view.jsx';
import MedicamentosEdit from '../pages/medicamentos/edit.jsx'

//Usuarios
import UsuariosLayout from '../pages/usuarios/index.jsx';
import { UsuariosView } from '../pages/usuarios/view.jsx';
import { UsuariosEdit } from '../pages/usuarios/edit.jsx';
import { UsuariosCreate } from '../pages/usuarios/create.jsx';

//citas
import CitasLayout from '../pages/citas/index.jsx';
import { CitasView } from '../pages/citas/view.jsx';
import { CitasCreate } from '../pages/citas/create.jsx';
import { CitasEdit } from '../pages/citas/edit.jsx';

//pacientes
import PacientesLayout from '../pages/pacientes/index.jsx';
import { PacientesView } from '../pages/pacientes/view.jsx';
import { PacientesEdit } from '../pages/pacientes/edit.jsx';
import { PacientesCreate } from '../pages/pacientes/create.jsx';
import { PacientesDetails } from '../pages/pacientes/details.jsx';

//formulas
import FormulasLayout from '../pages/formulas/index.jsx';
import { FormulasView } from '../pages/formulas/view.jsx';
import { FormulasEdit } from '../pages/formulas/edit.jsx';
import { FormulasCreate } from '../pages/formulas/create.jsx';
import { FormulasDetails } from '../pages/formulas/details.jsx';

// diagnosticos
import DiagnosticosLayout from '../pages/diagnosticos/index.jsx';
import { DiagnosticosView } from '../pages/diagnosticos/view.jsx';
import { DiagnosticosEdit } from '../pages/diagnosticos/edit.jsx';
import { DiagnosticosCreate } from '../pages/diagnosticos/create.jsx';

// examenes
import ExamenesLayout from '../pages/examenes/index.jsx';
import { ExamenesView } from '../pages/examenes/view.jsx';
import { ExamenesEdit } from '../pages/examenes/edit.jsx';
import { ExamenesCreate } from '../pages/examenes/create.jsx';

// historia clinica
import HistoriasLayout from '../pages/historias/index.jsx';
import { HistoriasView } from '../pages/historias/view.jsx';

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
          },
          {
            path: 'citas',
            Component: CitasLayout,
            children:[
              {
                path:'',
                Component: CitasView
              },
              {
                path:'create',
                Component: CitasCreate
              },
              {
                path:'edit/:id',
                Component: CitasEdit
              },
            ]
          },
          {
            path:'pacientes',
            Component:PacientesLayout,
            children:[
              {
                path:'',
                Component: PacientesView
              },
              {
                path:'create',
                Component: PacientesCreate
              },
              {
                path:'edit/:id',
                Component: PacientesEdit
              },
              {
                path:'details/:id',
                Component: PacientesDetails
              },
            ]
          },
          {
            path:'formulas',
            Component:FormulasLayout,
            children:[
              {
                path:'',
                Component: FormulasView
              },
              {
                path:'create',
                Component: FormulasCreate
              },
              {
                path:'edit/:id',
                Component: FormulasEdit
              },
              {
                path:'details/:id',
                Component: FormulasDetails
              },
            ]
          },
          {
            path:'diagnosticos',
            Component:DiagnosticosLayout,
            children:[
              {
                path:'',
                Component: DiagnosticosView
              },
              {
                path:'create',
                Component: DiagnosticosCreate
              },
              {
                path:'edit/:id',
                Component: DiagnosticosEdit
              },
            ]
          },
          {
            path:'examenes',
            Component:ExamenesLayout,
            children:[
              {
                path:'',
                Component: ExamenesView
              },
              {
                path:'create',
                Component: ExamenesCreate
              },
              {
                path:'edit/:id',
                Component: ExamenesEdit
              },
            ]
          },
          {
            path:'historias',
            Component:HistoriasLayout,
            children:[
              {
                path:'',
                Component: HistoriasView
              },
            ]
          },
        ],
      },
      {
        path:'/login',
        Component:CredentialsSignInPage
      }
    ],
  },
]);

export default router