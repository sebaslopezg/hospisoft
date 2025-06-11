import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { createTheme } from '@mui/material/styles';
import data from './data'
import Logo from '../../assets/img/logo.png';
import { useSession } from '@toolpad/core'

const BRANDING = {
  logo: <img src={Logo} alt="MUI logo" height={'100px'} />,
  title: 'HospiSoft',
  homeUrl: '/',
};

// preview-start
const providers = [{ id: 'credentials', name: 'Email and password' }];
// preview-end

const signIn = async (provider, formData, callbackUrl) => {
  const json = Object.fromEntries(formData.entries())
  console.log(json);
  
  data.login(json)
  .then((response) => {
    localStorage.setItem('name', JSON.stringify(response.data.data.nombre))
    localStorage.setItem('email', JSON.stringify(response.data.data.email))
    localStorage.setItem('imageUrl', JSON.stringify(response.data.data.imagen))
    localStorage.setItem('token',response.data.token)

     window.location.href = callbackUrl || '/'
  })  
};

export default function CredentialsSignInPage() {
  const session = useSession()
  const theme = createTheme({
    components:{
        MuiCssBaseline:{
            styleOverrides:{
                body:{
                    backgroundColor: '#0D0D33',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Cdefs%3E%3CradialGradient id='a' cx='396' cy='281' r='514' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23404EDD'/%3E%3Cstop offset='1' stop-color='%230D0D33'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='400' y1='148' x2='400' y2='333'%3E%3Cstop offset='0' stop-color='%2399F4FF' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%2399F4FF' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='400'/%3E%3Cg fill-opacity='0.25'%3E%3Ccircle fill='url(%23b)' cx='267.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='532.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='400' cy='30' r='300'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundAttachment: 'fixed',
                    backgroundSize: 'cover'
                }
            }
        }
      }
  });
  return (
    // preview-start
    <AppProvider theme={theme} branding={BRANDING} session={session}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false }, form: { noValidate: true } }} 
      />
    </AppProvider>
    // preview-end
  );
}