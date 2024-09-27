import { TooltipProvider } from '@radix-ui/react-tooltip';
import { type PropsWithChildren } from 'react';

import AppLayout from '@/components/AppLayout';
import { JobsProvider } from '@/jobs/contexts';
import { WorkflowsProvider } from '@/workflows/contexts';

import { TRPCReactProvider } from '../trpc/client';
import { BreadcrumProvider } from './BreadcrumContext/BreadcrumContext';
import { RolesAndPermissionsProvider } from './RolesAndPermissions/RolesAndPermissionsContext';

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
