import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Outlet } from 'react-router';

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

function AppProviderBasic(props) {

  return (

    <DashboardLayout>
    <PageContainer>
      <Outlet />
    </PageContainer>
    </DashboardLayout>
  );
}

export default AppProviderBasic;