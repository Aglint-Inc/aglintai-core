import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { GlobalSwitch } from '@/devlink3/GlobalSwitch';
import { GlobalSwitchPill } from '@/devlink3/GlobalSwitchPill';
import ROUTES from '@/src/utils/routing/routes';

import { interviewersTab } from './types';

function InterviewersTabs() {
  const router = useRouter();
  const tab = (router.query.tab as interviewersTab) || 'interview_load';

  useEffect(() => {
    if (router.isReady && !router.query.tab) {
      router.replace(
        `${ROUTES['/interviewers']()}?tab=interview_load`,
        undefined,
        {
          shallow: true,
        },
      );
    }
  }, [router]);

  return (
    <Stack>
      <GlobalSwitch
        slotGlobalSwitchPill={
          <>
            <GlobalSwitchPill
              isActive={tab === 'interview_load'}
              textPill={'Interview Load'}
              onClickPill={{
                onClick: () => {
                  router.push(
                    `${ROUTES['/interviewers']()}?tab=interview_load`,
                  );
                },
              }}
            />
            <GlobalSwitchPill
              isActive={tab === 'availability'}
              textPill={'Availability'}
              onClickPill={{
                onClick: () => {
                  router.push(`${ROUTES['/interviewers']()}?tab=availability`);
                },
              }}
            />
            <GlobalSwitchPill
              isActive={tab === 'training' || !tab}
              textPill={'Training'}
              onClickPill={{
                onClick: () => {
                  router.push(`${ROUTES['/interviewers']()}?tab=training`);
                },
              }}
            />

            <GlobalSwitchPill
              isActive={tab === 'metrics' || !tab}
              textPill={'Metrics'}
              onClickPill={{
                onClick: () => {
                  router.push(`${ROUTES['/interviewers']()}?tab=metrics`);
                },
              }}
            />
          </>
        }
      />
    </Stack>
  );
}

export default InterviewersTabs;
