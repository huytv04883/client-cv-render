import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
const HomePage = lazy(() => import('@/pages/Home'));
const DashboardPage = lazy(() => import('@/pages/Dashboard'));
const EditorPage = lazy(() => import('@/pages/Editor'));
const LoginPage = lazy(() => import('@/pages/Login'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

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
