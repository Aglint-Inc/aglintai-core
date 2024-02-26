import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import { useMemo } from 'react';

import {
  NavAssessment,
  NavAssistant,
  NavCd,
  NavCompanySetting,
  NavJobs,
  NavScheduler,
  NavTickets,
} from '@/devlink';
import { AssistantLogo } from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { pageRoutes } from '@/src/utils/pageRouting';

function SideNavbar() {
  let isAssistantEnabled = posthog.isFeatureEnabled('isAssistantEnabled');
  let isSupportEnabled = posthog.isFeatureEnabled('isSupportEnabled');
  let isAgentEnabled = posthog.isFeatureEnabled('isAgentEnabled');
  let isAssessmentEnabled = posthog.isFeatureEnabled('isNewAssessmentEnabled');
  const router = useRouter();
  const { recruiter, recruiterUser, loading } = useAuthDetails();

  const navList = [
    {
      icon: <AssistantLogo />,
      text: 'Agent',
      SubComponents: null,
      route: pageRoutes.AGENT,
      comingsoon: false,
      isvisible: isAgentEnabled || recruiter?.email === 'dheeraj@aglinthq.com',
    },
    {
      icon: <NavJobs isActive={false} />,
      text: 'Jobs',
      SubComponents: null,
      route: pageRoutes.JOBS,
      comingsoon: false,
      isvisible: true,
    },
    {
      icon: <NavCd isActive={false} />,
      text: 'Candidates',
      SubComponents: null,
      route: pageRoutes.CANDIDATES,
      comingsoon: false,
      isvisible: true,
    },
    {
      icon: <NavTickets isActive={false} />,
      text: 'Tickets',
      SubComponents: null,
      route: pageRoutes.SUPPORT,
      comingsoon: false,
      isvisible: isSupportEnabled,
    },
    {
      icon: <NavAssistant isActive={false} />,
      text: 'Assistant',
      SubComponents: null,
      route: pageRoutes.ASSISTANT,
      comingsoon: false,
      isvisible: isAssistantEnabled,
    },

    {
      icon: <NavScheduler isActive={false} />,
      text: 'Scheduler',
      SubComponents: null,
      route: pageRoutes.SCHEDULING,
      comingsoon: false,
      isvisible: true,
    },
    {
      icon: <NavAssessment isActive={false} />,
      text: 'Assessment',
      SubComponents: null,
      route: pageRoutes.ASSESSMENT,
      comingsoon: false,
      isvisible:
        isAssessmentEnabled || recruiterUser?.email === 'dheeraj@aglinthq.com',
    },
    {
      icon: <NavCompanySetting isActive={false} />,
      text: 'Company Settings',
      SubComponents: null,
      route: pageRoutes.COMPANY,
      comingsoon: false,
      isvisible: true,
    },
  ];
  const navListInterviewer = [
    {
      icon: <NavScheduler isActive={false} />,
      text: 'Scheduler',
      SubComponents: null,
      route: pageRoutes.INTERVIEWER,
      comingsoon: false,
      isvisible: true,
    },
  ];

  const newNaveList = useMemo(() => {
    let tempList = [];
    if (recruiterUser?.role === 'member') {
      tempList = tempList.filter((x) => x.text !== 'Company Settings');
    } else if (recruiterUser?.role === 'interviewer') {
      tempList = navListInterviewer;
    } else {
      tempList = navList;
    }
    return tempList;
  }, [recruiter, recruiterUser]);
  return (
    <>
      {!loading &&
        newNaveList.map((item, i) => {
          if (item.isvisible)
            return (
              <Stack
                key={i}
                onClick={() => {
                  if (router.pathname !== item.route) {
                    router.push(item.route);
                  }
                }}
                direction={'row'}
                alignItems={'center'}
                color={'white.700'}
                borderRadius={'10px'}
                bgcolor={
                  router.pathname.includes(
                    item.route?.replace('/history', ''),
                  ) && 'rgba(233, 235, 237, 0.5)'
                }
                sx={{
                  '&:hover': {
                    bgcolor: 'rgba(233, 235, 237, 0.5)',
                  },
                }}
              >
                {item.icon}
              </Stack>
            );
        })}
    </>
  );
}

export default SideNavbar;
