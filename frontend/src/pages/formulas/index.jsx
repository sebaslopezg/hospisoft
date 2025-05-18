import { Outlet } from 'react-router';
import { PageContainer } from '@toolpad/core/PageContainer';

export default function FormulasLayout() {

  return <>
    <PageContainer>
      <Outlet />
    </PageContainer>
  </>
}