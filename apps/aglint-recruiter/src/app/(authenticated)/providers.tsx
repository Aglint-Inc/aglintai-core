'use client';

import { TooltipProvider } from '@components/ui/tooltip';
import { type PropsWithChildren } from 'react';

import { OnboardingProvider } from '@/components/Navigation/OnboardPending/context/onboarding';
import { BreadcrumProvider } from '@/context/BreadcrumContext/BreadcrumContext';
import { RolesAndPermissionsProvider } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';

export const Provider = ({ children }: PropsWithChildren) => {
  return (
    <TooltipProvider>
      <RolesAndPermissionsProvider>
        <BreadcrumProvider>
          <OnboardingProvider>{children} </OnboardingProvider>
        </BreadcrumProvider>
      </RolesAndPermissionsProvider>
    </TooltipProvider>
  );
};
