import { Outlet, useNavigate } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { NotificationsProvider } from '@toolpad/core/useNotifications';
import { DialogsProvider } from '@toolpad/core/useDialogs';

export default function Layout() {

    const navigate = useNavigate()

  const rol = localStorage.getItem('rol')
  const permiso = (rol == 1 || rol == 2 || rol == 3 || rol == 4)

  permiso ? '' : navigate('/login')

  return (
    <NotificationsProvider>
      <DialogsProvider>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
      </DialogsProvider>
    </NotificationsProvider>
  );
}