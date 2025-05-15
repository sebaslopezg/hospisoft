import * as React from 'react';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { createBrowserRouter } from 'react-router';
import { Outlet } from 'react-router';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MedicationIcon from '@mui/icons-material/Medication';
import GroupIcon from '@mui/icons-material/Group';
import Logo from './assets/img/logo.png'

 const NAVIGATION = [
   { // para darle un titulo a la barra
    kind: 'header',
    title: 'Main items',
  }, 
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
/*   {
    segment: 'notes',
    title: 'Noticas',
    icon: <EditNoteIcon />,
    pattern: 'notes{/:noteId}*',
  }, */
  {
    segment: 'usuarios',
    title: 'Usuarios',
    icon: <GroupIcon />,
    pattern: 'usuarios{/:crud}*',
  },
  {
    segment: 'medicamentos',
    title: 'Medicamentos',
    icon: <MedicationIcon />,
    pattern: 'medicamentos{/:crud}*',
  },
]; 

const BRANDING = {
  logo: <img src={Logo} alt="MUI logo" />,
  title: 'HospiSoft',
  homeUrl: '/',
};

function App() {
  return(
    <>
    <ReactRouterAppProvider branding={BRANDING} navigation={NAVIGATION}>
      <Outlet />
    </ReactRouterAppProvider>
  </>
  )
}

export default App
