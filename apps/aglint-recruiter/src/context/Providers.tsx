// eslint-disable-next-line simple-import-sort/imports
import { DevlinkMainProvider } from '@context/DevlinkContext';
import { PostHogProvider } from 'posthog-js/react';
import { AuthProvider } from '../context/AuthContext/AuthContext';
import JobsProvider from '../context/JobsContext';
import ScreenSizeProvider from '../context/ResizeWindow/ResizeWindow';
import Theme from '../context/Theme/Theme';
import { RolesAndPermissionsProvider } from '../context/RolesAndPermissions/RolesAndPermissionsContext';
import AppLayout from '../components/AppLayout';
import { BreadcrumProvider } from './BreadcrumContext/BreadcrumContext';
import { TourProvider } from './TourContext';
import { type PropsWithChildren, Suspense } from 'react';
import WorkflowsProvider from './Workflows';
import { ThemeProvider } from '@/components/theme-provider';
import { TRPCReactProvider } from '../trpc/client';

export const PrivateProviders = ({
  children,
  appRouter = false,
}: PropsWithChildren<{ appRouter?: boolean }>) => {
  return (
    <PublicProviders>
      <PostHogProvider>
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
      </PostHogProvider>
    </PublicProviders>
  );
};

export const PublicProviders = ({ children }: PropsWithChildren) => {
  return (
    <Suspense>
      <DevlinkMainProvider>
        <Theme>
          <ThemeProvider
            attribute='class'
            defaultTheme='light'
            enableSystem
            disableTransitionOnChange
          >
            <ScreenSizeProvider>
              <TRPCReactProvider>{children}</TRPCReactProvider>
            </ScreenSizeProvider>
          </ThemeProvider>
        </Theme>
      </DevlinkMainProvider>
    </Suspense>
  );
};
