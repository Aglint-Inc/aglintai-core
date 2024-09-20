import { Toaster } from '@components/ui/toaster';
import { TooltipProvider } from '@components/ui/tooltip';
import { PostHogProvider } from 'posthog-js/react';
import { type PropsWithChildren, Suspense } from 'react';

import { JobsProvider } from '@/jobs/contexts';
import { WorkflowsProvider } from '@/workflows/contexts';

import AppLayout from '../components/AppLayout';
import { AuthProvider } from '../context/AuthContext/AuthContext';
import { RolesAndPermissionsProvider } from '../context/RolesAndPermissions/RolesAndPermissionsContext';
import { TRPCReactProvider } from '../trpc/client';
import { BreadcrumProvider } from './BreadcrumContext/BreadcrumContext';

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
              <JobsProvider>
                <WorkflowsProvider>
                  <TooltipProvider>
                    <AppLayout appRouter={appRouter}>{children}</AppLayout>
                  </TooltipProvider>
                </WorkflowsProvider>
              </JobsProvider>
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
      <Toaster />
      <TRPCReactProvider>{children}</TRPCReactProvider>
      <Toaster />
    </Suspense>
  );
};
