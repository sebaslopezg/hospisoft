import { Outlet } from 'react-router';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Card } from '@mui/material';

export default function DispensarioLayout(){
  return <>
    <PageContainer>
      <Card>
      <Outlet/>
      </Card>
    </PageContainer>
  </>
}