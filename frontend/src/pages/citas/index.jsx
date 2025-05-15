import { Outlet } from 'react-router';
import { PageContainer } from '@toolpad/core/PageContainer';

export default function CitasLayout() {

  return <>
    <PageContainer>
      <Outlet />
    </PageContainer>
  </>
}