import { Outlet } from 'react-router';
import { PageContainer } from '@toolpad/core/PageContainer';

export default function PacientesLayout() {

  return <>
    <PageContainer>
      <Outlet />
    </PageContainer>
  </>
}