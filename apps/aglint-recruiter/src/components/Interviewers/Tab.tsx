import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { GlobalSwitch } from '@/devlink3/GlobalSwitch';
import { GlobalSwitchPill } from '@/devlink3/GlobalSwitchPill';
import { useKeyPress } from '@/src/hooks/useKeyPress';
import ROUTES from '@/src/utils/routing/routes';

import { type interviewersTab } from './types';

function InterviewersTabs() {
  const router = useRouter();
  const tab = (router.query.tab as interviewersTab) || 'interview_load';

  const tabs: interviewersTab[] = [
    'interview_load',
    'availability',
    'training',
    'metrics',
  ];

  const setTabHandle = (tab: interviewersTab) => {
    router.replace(`${ROUTES['/interviewers']()}?tab=${tab}`, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    if (router.isReady && !router.query.tab) {
      setTabHandle('interview_load');
    }
  }, [router]);

  const handleSelectNextSection = () => {
    const currentIndex = tabs.findIndex((t) => t === tab);
    setTabHandle(
      currentIndex === tabs.length - 1 ? tabs[0] : tabs[currentIndex + 1],
    );
  };

  const handleSelectPrevSection = () => {
    const currentIndex = tabs.findIndex((t) => t === tab);
    setTabHandle(
      currentIndex === 0 ? tabs[tabs.length - 1] : tabs[currentIndex - 1],
    );
  };
  const { pressed: right } = useKeyPress('ArrowRight');
  const { pressed: left } = useKeyPress('ArrowLeft');

  useEffect(() => {
    if (left) handleSelectPrevSection();
    else if (right) handleSelectNextSection();
  }, [left, right]);

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
