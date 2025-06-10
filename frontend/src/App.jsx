import * as React from 'react'
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet } from 'react-router';
import Navigation from './routes/navigation';
import Logo from './assets/img/logo.png'
import Theme from './Theme';
import AccountLogin from './layouts/account';

const BRANDING = {
  logo: <img src={Logo} alt="MUI logo" />,
  title: 'HospiSoft',
  homeUrl: '/',
};

function App() {
  const session = localStorage.getItem('token')
  return(
    <>
    <ReactRouterAppProvider theme={Theme} branding={BRANDING} navigation={Navigation}>
      <Outlet />
    </ReactRouterAppProvider>
  </>
  )
}

export default App
