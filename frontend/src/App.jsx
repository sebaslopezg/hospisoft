import * as React from 'react'
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet, useNavigate } from 'react-router';
import Navigation from './routes/navigation';
import Logo from './assets/img/logo.png'
import Theme from './Theme';
const BRANDING = {
  logo: <img src={Logo} alt="MUI logo" />,
  title: 'HospiSoft',
  homeUrl: '/',
};
const name = localStorage.getItem('name')
const email = localStorage.getItem('email')
const imageUrl = localStorage.getItem('imageUrl')
const sessionData = {user: {
      name: JSON.parse(name),
      email: JSON.parse(email),
      imageUrl: JSON.parse(imageUrl),
    }};

function App() { 
  const navigate = useNavigate()
  const [session, setSession] = React.useState(sessionData);
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        if (localStorage.getItem('key')){
        setSession(sessionData);
        } else {
          navigate('/login')
        }
      },
      signOut: () => {
        setSession(null);
        localStorage.clear()
        navigate('/login')
      },
    };
  }, []);
  return(
    <>
    <ReactRouterAppProvider theme={Theme} branding={BRANDING} navigation={Navigation} authentication={authentication} session={session}>
      <Outlet />
    </ReactRouterAppProvider>
  </>
  )
}

export default App
