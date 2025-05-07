import * as React from 'react';
import { Outlet } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { NotificationsProvider } from '@toolpad/core/useNotifications';

export default function Layout() {
  return (
    <NotificationsProvider>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </NotificationsProvider>
  );
}