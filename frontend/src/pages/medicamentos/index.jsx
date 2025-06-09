import { Outlet } from 'react-router';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Card } from '@mui/material';

export default function MedicamentosLayout() {

  return <>
    <PageContainer>
      <Card>
        <Outlet />
      </Card>
    </PageContainer>
  </>
}