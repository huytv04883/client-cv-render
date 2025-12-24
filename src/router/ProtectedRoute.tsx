import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const isAuthenticated = true; // @TODO: replace with real auth check;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
