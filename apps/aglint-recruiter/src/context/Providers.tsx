// eslint-disable-next-line simple-import-sort/imports
import { DevlinkMainProvider } from '@context/DevlinkContext';
import { PHProvider } from '../components/PostHog/postHog';
import { AuthProvider } from '../context/AuthContext/AuthContext';
import JobsProvider from '../context/JobsContext';
import ScreenSizeProvider from '../context/ResizeWindow/ResizeWindow';
import Theme from '../context/Theme/Theme';
import { QueryProvider } from '../queries';
import { RolesAndPermissionsProvider } from '../context/RolesAndPermissions/RolesAndPermissionsContext';
import AppLayout from '../components/AppLayout';
import { BreadcrumProvider } from './BreadcrumContext/BreadcrumContext';
import { TourProvider } from './TourContext';
import { PropsWithChildren } from 'react';
import WorkflowsProvider from './Workflows';

export const PrivateProviders = ({
  children,
  appRouter = false,
}: PropsWithChildren<{ appRouter?: boolean }>) => {
  return (
    <PublicProviders>
      <PHProvider>
        <AuthProvider>
          <RolesAndPermissionsProvider>
            <BreadcrumProvider>
              <TourProvider>
                <JobsProvider>
                  <WorkflowsProvider>
                    <AppLayout appRouter={appRouter}>{children}</AppLayout>
                  </WorkflowsProvider>
                </JobsProvider>
              </TourProvider>
            </BreadcrumProvider>
          </RolesAndPermissionsProvider>
        </AuthProvider>
      </PHProvider>
    </PublicProviders>
  );
};

export const PublicProviders = ({ children }: PropsWithChildren) => {
  return (
    <DevlinkMainProvider>
      <Theme>
        <ScreenSizeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ScreenSizeProvider>
      </Theme>
    </DevlinkMainProvider>
  );
};
