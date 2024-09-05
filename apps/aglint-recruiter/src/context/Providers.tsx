// eslint-disable-next-line simple-import-sort/imports
import { DevlinkMainProvider } from '@/context/DevlinkContext';
import { PostHogProvider } from 'posthog-js/react';
import { AuthProvider } from '../context/AuthContext/AuthContext';
import ScreenSizeProvider from '../context/ResizeWindow/ResizeWindow';
import Theme from '../context/Theme/Theme';
import { RolesAndPermissionsProvider } from '../context/RolesAndPermissions/RolesAndPermissionsContext';
import AppLayout from '../components/AppLayout';
import { BreadcrumProvider } from './BreadcrumContext/BreadcrumContext';
import { TourProvider } from './TourContext';
import { type PropsWithChildren, Suspense } from 'react';
import WorkflowsProvider from './Workflows';
import { ThemeProvider } from '@components/theme-provider';
import { TRPCReactProvider } from '../trpc/client';
import { TooltipProvider } from '@components/ui/tooltip';
import { JobsProvider } from '@/jobs/context';

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
                    <TooltipProvider>
                      <AppLayout appRouter={appRouter}>{children}</AppLayout>
                    </TooltipProvider>
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
