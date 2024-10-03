'use client';

import { TooltipProvider } from '@radix-ui/react-tooltip';
import { type PropsWithChildren } from 'react';

import { BreadcrumProvider } from '@/context/BreadcrumContext/BreadcrumContext';
import { RolesAndPermissionsProvider } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { JobsProvider } from '@/jobs/contexts';
import { WorkflowsProvider } from '@/workflows/contexts';

export const Provider = ({ children }: PropsWithChildren) => {
  return (
    <TooltipProvider>
      <RolesAndPermissionsProvider>
        <BreadcrumProvider>
          <JobsProvider>
            <WorkflowsProvider>{children}</WorkflowsProvider>
          </JobsProvider>
        </BreadcrumProvider>
      </RolesAndPermissionsProvider>
    </TooltipProvider>
  );
};
