import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet } from 'react-router';
import Navigation from './routes/navigation';
import Logo from './assets/img/logo.png'

const BRANDING = {
  logo: <img src={Logo} alt="MUI logo" />,
  title: 'HospiSoft',
  homeUrl: '/',
};

function App() {
  return(
    <>
    <ReactRouterAppProvider branding={BRANDING} navigation={Navigation}>
      <Outlet />
    </ReactRouterAppProvider>
  </>
  )
}

export default App
