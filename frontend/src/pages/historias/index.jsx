import { Outlet } from 'react-router';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Card } from '@mui/material';

export default function HistoriasLayout() {

  return <>
    <PageContainer>
      <Card>
      <Outlet />
      </Card>
    </PageContainer>
  </>
}