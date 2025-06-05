import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet } from 'react-router';
import Navigation from './routes/navigation';
import Logo from './assets/img/logo.png'
import Theme from './Theme';


const BRANDING = {
  logo: <img src={Logo} alt="MUI logo" />,
  title: 'HospiSoft',
  homeUrl: '/',
};

function App() {
  return(
    <>
    <ReactRouterAppProvider theme={Theme} branding={BRANDING} navigation={Navigation}>
      <Outlet />
    </ReactRouterAppProvider>
  </>
  )
}

export default App
