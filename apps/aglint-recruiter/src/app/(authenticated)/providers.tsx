'use client';

import { type PropsWithChildren } from 'react';

import AppLayout from '@/components/AppLayout';
import { BreadcrumProvider } from '@/context/BreadcrumContext/BreadcrumContext';
import { RolesAndPermissionsProvider } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { JobsProvider } from '@/jobs/contexts';
import { WorkflowsProvider } from '@/workflows/contexts';

export const Provider = ({ children }: PropsWithChildren) => {
  return (
    <RolesAndPermissionsProvider>
      <BreadcrumProvider>
        <JobsProvider>
          <WorkflowsProvider>
            <AppLayout>{children}</AppLayout>
          </WorkflowsProvider>
        </JobsProvider>
      </BreadcrumProvider>
    </RolesAndPermissionsProvider>
  );
};
