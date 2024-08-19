import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { NewTabPill } from '@/devlink3/NewTabPill';
import { useApplication } from '@/src/context/ApplicationContext';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';

export type TabsType =
  | 'interview'
  | 'requests'
  | 'activity'
  | 'resume'
  | 'scoring';

function Tabs() {
  const router = useRouter();
  const tab = router.query.tab as TabsType;

  const { isScoringEnabled } = useRolesAndPermissions();

  const { job_id, application_id } = useApplication();

  const allTabs = [
    {
      tab: 'resume',
      onClick: () => {
        router.push({
          query: { tab: 'resume' },
          pathname: `/jobs/${job_id}/application/${application_id}`,
        });
      },
      textLabel: 'Resume',
      isVisible: true,
    },
    {
      tab: 'scoring',
      onClick: () => {
        router.push({
          query: { tab: 'scoring' },
          pathname: `/jobs/${job_id}/application/${application_id}`,
        });
      },
      textLabel: 'Scoring',
      isVisible: isScoringEnabled,
    },
    {
      tab: 'interview',
      onClick: () => {
        router.push({
          query: { tab: 'interview' },
          pathname: `/jobs/${job_id}/application/${application_id}`,
        });
      },
      textLabel: 'Interview',
      isVisible: true,
    },
    {
      tab: 'requests',
      onClick: () => {
        router.push({
          query: { tab: 'requests' },
          pathname: `/jobs/${job_id}/application/${application_id}`,
        });
      },
      textLabel: 'Requests',
      isVisible: true,
    },
    {
      tab: 'activity',
      onClick: () => {
        router.push({
          query: { tab: 'activity' },
          pathname: `/jobs/${job_id}/application/${application_id}`,
        });
      },
      textLabel: 'Activity',
      isVisible: true,
    },
  ];

  return (
    <Stack
      direction={'row'}
      width={'100%'}
      borderBottom={'1px solid'}
      borderColor={'var(--neutral-6)'}
    >
      {allTabs
        .filter((tab) => tab.isVisible)
        .map((tabItem, index) => (
          <NewTabPill
            key={index}
            isPillActive={tab === tabItem.tab}
            onClickPill={{
              onClick: tabItem.onClick,
            }}
            textLabel={tabItem.textLabel}
          />
        ))}
    </Stack>
  );
}

export default Tabs;
