import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { LayoutManager } from './layoutManager';
import SportsKabaddiRoundedIcon from '@mui/icons-material/SportsKabaddiRounded';
import MedicationRoundedIcon from '@mui/icons-material/MedicationRounded';
import InsertInvitationRoundedIcon from '@mui/icons-material/InsertInvitationRounded';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
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

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function AppProviderBasic(props) {
  const { window } = props;

  const router = useDemoRouter('/page');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <LayoutManager pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

export default AppProviderBasic;