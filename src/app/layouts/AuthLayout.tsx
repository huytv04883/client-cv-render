import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="auth-layout relative">
      <Outlet />
    </div>
  );
}
