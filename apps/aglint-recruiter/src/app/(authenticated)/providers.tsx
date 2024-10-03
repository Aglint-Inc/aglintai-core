'use client';

import { TooltipProvider } from '@radix-ui/react-tooltip';
import { type PropsWithChildren } from 'react';

import { BreadcrumProvider } from '@/context/BreadcrumContext/BreadcrumContext';
import { RolesAndPermissionsProvider } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { JobsProvider } from '@/jobs/contexts';
import { WorkflowsProvider } from '@/workflows/contexts';
import { OnboardingProvider } from '@/components/Navigation/OnboardPending/context/onboarding';

export const Provider = ({ children }: PropsWithChildren) => {
  return (
    <TooltipProvider>
      <OnboardingProvider>
        <RolesAndPermissionsProvider>
          <BreadcrumProvider>
            <JobsProvider>
              <WorkflowsProvider>{children}</WorkflowsProvider>
            </JobsProvider>
          </BreadcrumProvider>
        </RolesAndPermissionsProvider>
      </OnboardingProvider>
    </TooltipProvider>
  );
};
