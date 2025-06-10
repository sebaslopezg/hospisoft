import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { Account } from '@toolpad/core/Account';
import axios from 'axios';
import Config from '../Config';


const demoSession = {
  user: {
    name: 'Bharat Kashyap',
    email: 'bharatkashyap@outlook.com',
    image: 'https://avatars.githubusercontent.com/u/19550456',
  },
};

export default function AccountLogin() {
    const getProtectedData = async() =>{
        const token = localStorage.getItem('token')
        const response = await axios('', {
            method: 'get',
            headers:{
                'Authorization': `bearer ${token}`
            }
        })
        const getProtectedData = await response.json
        return getProtectedData
    }
    const [session, setSession] = React.useState(demoSession);
    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
            setSession(demoSession);
            },
            signOut: () => {
            setSession(null);
            },
        };
    }, []);

  return (
    <AppProvider authentication={authentication} session={session}>
      {/* preview-start */}
      <Account />
      {/* preview-end */}
    </AppProvider>
  );
}