'use client';

import { TooltipProvider } from '@radix-ui/react-tooltip';
import type { PropsWithChildren } from 'react';

import AppLayout from '@/components/AppLayout';
import { BreadcrumProvider } from '@/context/BreadcrumContext/BreadcrumContext';
import { PublicProviders } from '@/context/Providers';
import { RolesAndPermissionsProvider } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { JobsProvider } from '@/jobs/contexts';
import { WorkflowsProvider } from '@/workflows/contexts';

const Layout = ({ children }: PropsWithChildren) => {
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

export default Layout;
