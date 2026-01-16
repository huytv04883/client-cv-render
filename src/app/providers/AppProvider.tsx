import ErrorBoundaryWrapper from '@/shared/components/ErrorBoundary';
import type { JSX } from 'react';

function AppProvider({ children }: { children: React.ReactNode }): JSX.Element {
  return <ErrorBoundaryWrapper>{children}</ErrorBoundaryWrapper>;
}

export default AppProvider;
