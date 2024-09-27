import { TooltipProvider } from '@components/ui/tooltip';
import { type PropsWithChildren } from 'react';

import { JobsProvider } from '@/jobs/contexts';
import { WorkflowsProvider } from '@/workflows/contexts';

import AppLayout from '../components/AppLayout';
import { RolesAndPermissionsProvider } from '../context/RolesAndPermissions/RolesAndPermissionsContext';
import { TRPCReactProvider } from '../trpc/client';
import { BreadcrumProvider } from './BreadcrumContext/BreadcrumContext';

export const PrivateProviders = ({ children }: PropsWithChildren) => {
  return (
    <PublicProviders>
      <RolesAndPermissionsProvider>
        <BreadcrumProvider>
          <JobsProvider>
            <WorkflowsProvider>
              <TooltipProvider>
                <AppLayout>{children}</AppLayout>
              </TooltipProvider>
            </WorkflowsProvider>
          </JobsProvider>
        </BreadcrumProvider>
      </RolesAndPermissionsProvider>
    </PublicProviders>
  );
};

export const PublicProviders = ({ children }: PropsWithChildren) => {
  return <TRPCReactProvider>{children}</TRPCReactProvider>;
};
