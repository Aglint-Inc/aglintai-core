import { EmptyState } from '@components/empty-state';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { Briefcase, TriangleAlert } from 'lucide-react';

import { useIntegrations } from '@/authenticated/hooks';
import { UIButton } from '@/components/Common/UIButton';
import { useOnboarding } from '@/components/Navigation/OnboardPending/context/onboarding';
import { useRouterPro } from '@/hooks/useRouterPro';
import { STATE_LEVER_DIALOG } from '@/jobs/constants';
import { useIntegrationActions, useIntegrationStore } from '@/jobs/hooks';
import ROUTES from '@/utils/routing/routes';

export const EmptyJob = () => {
  const { data: allIntegrations, isLoading } = useIntegrations();
  const isATSConnected =
    allIntegrations?.greenhouse_key ||
    allIntegrations?.ashby_key ||
    allIntegrations?.lever_key;
  const connectedATSName = allIntegrations?.greenhouse_key
    ? 'Green House'
    : allIntegrations?.ashby_key
      ? 'Ashby'
      : allIntegrations?.lever_key
        ? 'Lever'
        : '';
  const router = useRouterPro();
  const { setIntegrations } = useIntegrationActions();
  const integration = useIntegrationStore((state) => state.integrations);
  const { isJobSetupPending } = useOnboarding();
  return (
    <div className='mt-[200px]'>
      <EmptyState
        icon={Briefcase}
        header='No jobs yet'
        description='Get started by importing jobs from ATS or create a new job posting to find great candidates!'
        primarySlot={
          <UIButton
            isLoading={isLoading}
            onClick={() => {
              if (isATSConnected) {
                setIntegrations({
                  ...integration,
                  lever: { open: true, step: STATE_LEVER_DIALOG.LISTJOBS },
                });
              } else {
                router.push(ROUTES['/integrations']());
              }
            }}
            className='mb-2 w-full'
          >
            {isLoading
              ? 'Loading...'
              : isATSConnected
                ? 'Import from ' + connectedATSName
                : 'Connect to ATS'}
          </UIButton>
        }
        secondarySlot={
          <UIButton
            variant='outline'
            onClick={() => router.push(ROUTES['/jobs/create']())}
            className='w-full'
            leftIcon={
              // <TriangleAlert />
              isJobSetupPending && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TriangleAlert size={14} />
                    </TooltipTrigger>
                    <TooltipContent>
                      First complete the company setup
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            }
          >
            Add Job
          </UIButton>
        }
      />
    </div>
  );
};
