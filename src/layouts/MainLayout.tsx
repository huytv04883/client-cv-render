import { Settings } from '@/components/settings/Index';
import { SettingsPanel } from '@/components/settings/SettingsPanel';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useAppStore } from '@/stores/appStore';
import { Menu } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function MainLayout() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isOpenMobileSettings, setOpenMobileSettings } = useAppStore();
  return (
    <>
      <main className="h-full flex flex-col">
        <Header />
        {isMobile && (
          <div className="h-10 mb-4 flex items-center justify-start">
            <button type="button" onClick={() => setOpenMobileSettings(true)}>
              <Menu aria-hidden="true" />
            </button>
          </div>
        )}
        <Outlet />
        <Settings
          isOpen={isOpenMobileSettings}
          onOpenChange={(isOpen) => setOpenMobileSettings(isOpen)}
        >
          <SettingsPanel />
        </Settings>
      </main>
    </>
  );
}
