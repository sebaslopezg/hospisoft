import * as React from 'react';
import { Outlet } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { NotificationsProvider } from '@toolpad/core/useNotifications';
import { DialogsProvider } from '@toolpad/core/useDialogs';

export default function Layout() {
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