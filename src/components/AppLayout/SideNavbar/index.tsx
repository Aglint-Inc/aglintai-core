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
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { pageRoutes } from '@/src/utils/pageRouting';

function SideNavbar() {
  let isAssistantEnabled = posthog.isFeatureEnabled('isAssistantEnabled');
  let isSupportEnabled = posthog.isFeatureEnabled('isSupportEnabled');
  const router = useRouter();
  const { recruiter, recruiterUser } = useAuthDetails();

  const navList = [
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
      isvisible: true,
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
      {newNaveList.map((item, i) => {
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
                router.pathname.includes(item.route?.replace('/history', '')) &&
                'rgba(233, 235, 237, 0.5)'
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
