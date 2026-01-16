import AuthLayout from '@/app/layouts/AuthLayout';
import MainLayout from '@/app/layouts/MainLayout';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
const HomePage = lazy(() => import('@/app/pages/Home'));
const DashboardPage = lazy(() => import('@/app/pages/Dashboard'));
const EditorPage = lazy(() => import('@/app/pages/Editor'));
const LoginPage = lazy(() => import('@/app/pages/Login'));
const NotFoundPage = lazy(() => import('@/app/pages/NotFound'));

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
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/editor/:id',
        element: <EditorPage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [{ path: '/login', element: <LoginPage /> }],
  },
  { path: '*', element: <NotFoundPage /> },
];
