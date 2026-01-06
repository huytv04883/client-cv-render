import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function MainLayout() {
  return (
    <>
      <main className="h-full flex flex-col">
        <Header />
        <Outlet />
      </main>
    </>
  );
}
