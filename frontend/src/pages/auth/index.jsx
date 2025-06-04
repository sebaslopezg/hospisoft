import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import data from './data'

// preview-start
const providers = [{ id: 'credentials', name: 'Email' }];
// preview-end

const signIn = async (provider, formData) => {
  data.login(formData)
  .then((response) => {
    console.log(response)
  })  
};

export default function CredentialsSignInPage() {
  const theme = useTheme();
  return (
    // preview-start
    <AppProvider theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false }, form: { noValidate: true } }}
      />
    </AppProvider>
    // preview-end
  );
}