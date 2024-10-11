'use client';

import { TooltipProvider } from '@components/ui/tooltip';
import { type PropsWithChildren } from 'react';

import { OnboardingProvider } from '@/components/Navigation/OnboardPending/context/onboarding';
import { BreadcrumProvider } from '@/context/BreadcrumContext/BreadcrumContext';
import { RolesAndPermissionsProvider } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { JobsProvider } from '@/jobs/contexts';

export const Provider = ({ children }: PropsWithChildren) => {
  return (
    <TooltipProvider>
      <RolesAndPermissionsProvider>
        <BreadcrumProvider>
          <JobsProvider>
            <OnboardingProvider> {children}</OnboardingProvider>
          </JobsProvider>
        </BreadcrumProvider>
      </RolesAndPermissionsProvider>
    </TooltipProvider>
  );
};
