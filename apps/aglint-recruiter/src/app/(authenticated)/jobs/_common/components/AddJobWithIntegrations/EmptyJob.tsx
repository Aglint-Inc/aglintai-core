import { Button } from '@components/ui/button';
import { Briefcase } from 'lucide-react';

import { useAllIntegrations } from '@/authenticated/hooks';
import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { UIButton } from '@/components/Common/UIButton';
import { useRouterPro } from '@/hooks/useRouterPro';
import { STATE_LEVER_DIALOG } from '@/jobs/constants';
import { useIntegrationActions, useIntegrationStore } from '@/jobs/hooks';
import ROUTES from '@/utils/routing/routes';

export const EmptyJob = () => {
  const { data: allIntegrations, isLoading } = useAllIntegrations();
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
  return (
    <div className='mt-[200px]'>
      <GlobalEmpty
        icon={
          <Briefcase
            strokeWidth={2}
            className='h-6 w-6 text-muted-foreground'
          />
        }
        header='No jobs yet'
        description='Get started by importing jobs from ATS or create a new job posting to find great candidates!'
        primaryAction={
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
        secondaryAction={
          <Button
            variant='outline'
            onClick={() => router.push(ROUTES['/jobs/create']())}
            className='w-full'
          >
            Add Job
          </Button>
        }
      />
    </div>
  );
};
