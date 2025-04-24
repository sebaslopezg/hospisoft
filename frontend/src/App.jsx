import { Outlet } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';

import DashboardIcon from '@mui/icons-material/Dashboard';
import SportsKabaddiRoundedIcon from '@mui/icons-material/SportsKabaddiRounded';
import MedicationRoundedIcon from '@mui/icons-material/MedicationRounded';
import InsertInvitationRoundedIcon from '@mui/icons-material/InsertInvitationRounded';

function App() {

  const NAVIGATION = [
    {
      kind: 'header',
      title: 'Main items',
    },
    {
      segment: 'home',
      title: 'Home',
      icon: <DashboardIcon />,
    },
    {
      segment: 'usuarios',
      title: 'Usuarios',
      icon: <SportsKabaddiRoundedIcon />,
    },
    {
      segment: 'citas',
      title: 'Gestion de citas',
      icon: <InsertInvitationRoundedIcon />,
      children:[
        {
          segment: 'sales',
          title: 'Sales',
          icon: <InsertInvitationRoundedIcon />,
        },
        {
          segment: 'traffic',
          title: 'Traffic',
          icon: <InsertInvitationRoundedIcon />,
        },
      ]
    },
    {
      segment: 'medicamentos',
      title: 'Medicamentos',
      icon: <MedicationRoundedIcon />,
    },
  ];
  
  const BRANDING = {
    title: 'My Toolpad Core App',
  };
  

  return (
    <>
    {/*<AppProviderBasic />*/}
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </ReactRouterAppProvider>
    </>
  )
}

export default App
