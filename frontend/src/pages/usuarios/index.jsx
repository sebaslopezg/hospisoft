import { Outlet } from 'react-router';
import { PageContainer } from '@toolpad/core/PageContainer';

export default function UsuariosLayout() {

  return <>
    <PageContainer>
      <Outlet />
    </PageContainer>
  </>
}