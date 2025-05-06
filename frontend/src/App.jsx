import * as React from 'react';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { AppProvider } from '@toolpad/core/AppProvider';
import { Outlet } from 'react-router';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MedicationIcon from '@mui/icons-material/Medication';

const NAVIGATION = [
/*   { // para darle un titulo a la barra
    kind: 'header',
    title: 'Main items',
  }, */
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'notes',
    title: 'Noticas',
    icon: <EditNoteIcon />,
    pattern: 'notes{/:noteId}*',
  },
  {
    segment: 'medicamentos',
    title: 'Medicamentos',
    icon: <MedicationIcon />,
    pattern: 'medicamentos{/:crud}*',
  },
];

const BRANDING = {
  logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
  title: 'como tas :3',
  homeUrl: '/',
};

function App() {
  return(
    <>
    <AppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </AppProvider>
  </>
  )
}

export default App
