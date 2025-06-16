import { Outlet } from 'react-router';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Card } from '@mui/material';
import { PermissionWarning } from '../../components/permissionWarning';

export default function EventosLayout() {
  const rol = localStorage.getItem('rol')
  const permiso = (rol == 1 || rol == 2)
  return permiso ? (
    <PageContainer>
      <Card>
        <Outlet />
      </Card>
    </PageContainer>
  ) : (
    <PermissionWarning />
  )
}