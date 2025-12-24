import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';
import NotFoundPage from '@/pages/NotFound';
import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

export const routes: RouteObject[] = [
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [{ path: '/login', element: <LoginPage /> }],
  },
  { path: '*', element: <NotFoundPage /> },
];
