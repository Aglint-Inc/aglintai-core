import { Stack } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useFeatureFlagEnabled } from 'posthog-js/react';
import { ReactNode, useEffect } from 'react';

import { NavAssessment } from '@/devlink/NavAssessment';
import { NavAssistant } from '@/devlink/NavAssistant';
import { NavCd } from '@/devlink/NavCd';
import { NavCompanySetting } from '@/devlink/NavCompanySetting';
import { NavIntegration } from '@/devlink/NavIntegration';
import { NavJobs } from '@/devlink/NavJobs';
import { NavPhoneScreening } from '@/devlink/NavPhoneScreening';
import { NavScheduler } from '@/devlink/NavScheduler';
import { NavTask } from '@/devlink/NavTask';
import { NavTickets } from '@/devlink/NavTickets';
import { AssistantLogo } from '@/devlink2/AssistantLogo';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import PAGES from '@/src/utils/routing/pageRouting';
import toast from '@/src/utils/toast';

function SideNavbar() {
  const router = useRouter();
  const pathName = usePathname();
  const { loading, isAllowed } = useAuthDetails();

  const isAssistantEnabled = useFeatureFlagEnabled('isAssistantEnabled');
  const isSupportEnabled = useFeatureFlagEnabled('isSupportEnabled');
  const isAgentEnabled = useFeatureFlagEnabled('isAgentEnabled');
  const isAssessmentEnabled = useFeatureFlagEnabled('isNewAssessmentEnabled');
  const isSourcingEnabled = useFeatureFlagEnabled('isSourcingEnabled');
  const isPhoneScreeningEnabled = useFeatureFlagEnabled(
    'isPhoneScreeningEnabled',
  );
  let isTasksEnabled = useFeatureFlagEnabled('isTasksEnabled');

  const isSchedulingEnabled = useFeatureFlagEnabled('isSchedulingEnabled');

  const navList: {
    icon: ReactNode;
    text: string;
    SubComponents: any;
    route: string;
    comingsoon: boolean;
    isvisible: boolean;
    roles?: (
      | 'admin'
      | 'recruiter'
      | 'interviewer'
      | 'recruiting_coordinator'
      | 'sourcer'
      | 'hiring_manager'
    )[];
  }[] = [
    {
      icon: <AssistantLogo />,
      text: 'Agent',
      SubComponents: null,
      route: PAGES['/agent'](),
      comingsoon: false,
      isvisible: isAgentEnabled,
      roles: ['admin'],
    },
    {
      icon: <NavTask isActive={false} />,
      text: 'Tasks',
      SubComponents: null,
      route: PAGES['/tasks']() + '?myTasks',
      comingsoon: false,
      isvisible: isTasksEnabled,
      // roles: [
      //   'admin',
      //   'interviewer',
      //   'recruiter',
      // ],
    },
    {
      icon: <NavJobs isActive={false} />,
      text: 'Jobs',
      SubComponents: null,
      route: PAGES['/jobs'](),
      comingsoon: false,
      isvisible: true,
      roles: [
        'admin',
        'hiring_manager',
        'recruiter',
        'recruiting_coordinator',
        'sourcer',
      ],
    },
    {
      icon: <NavScheduler isActive={false} />,
      text: 'Scheduler',
      SubComponents: null,
      route: PAGES['/scheduling'](),
      comingsoon: false,
      isvisible: isSchedulingEnabled,
      roles: ['admin', 'recruiter', 'recruiting_coordinator', 'interviewer'],
    },
    {
      icon: <NavCd isActive={false} />,
      text: 'Candidates',
      SubComponents: null,
      route: PAGES['/candidates/history'](),
      comingsoon: false,
      isvisible: isSourcingEnabled,
      roles: ['admin', 'recruiter'],
    },
    {
      icon: <NavTickets isActive={false} />,
      text: 'Tickets',
      SubComponents: null,
      route: PAGES['/support'](),
      comingsoon: false,
      isvisible: isSupportEnabled,
      roles: ['admin'],
    },
    {
      icon: <NavAssistant isActive={false} />,
      text: 'Assistant',
      SubComponents: null,
      route: PAGES['/assisstant'](),
      comingsoon: false,
      isvisible: isAssistantEnabled,
      roles: ['admin'],
    },

    {
      icon: <NavPhoneScreening isActive={false} />,
      text: 'Phone Screening',
      SubComponents: null,
      route: PAGES['/screening'](),
      comingsoon: false,
      isvisible: isPhoneScreeningEnabled,
      roles: ['admin', 'recruiter', 'recruiting_coordinator', 'interviewer'],
    },

    {
      icon: <NavAssessment isActive={false} />,
      text: 'Assessment',
      SubComponents: null,
      route: PAGES['/assessment-new'](),
      comingsoon: false,
      isvisible: isAssessmentEnabled,
      roles: ['admin', 'recruiter'],
    },
    {
      icon: <NavIntegration isActive={false} />,
      text: 'Integrations',
      SubComponents: null,
      route: PAGES['/integrations'](),
      comingsoon: false,
      isvisible: true,
      roles: ['admin'],
    },
    {
      icon: <NavCompanySetting isActive={false} />,
      text: 'Company Settings',
      SubComponents: null,
      route: PAGES['/company'](),
      comingsoon: false,
      isvisible: true,
      roles: ['admin'],
    },
  ];

  useEffect(() => {
    const tempR = navList.find((item) => {
      return pathName?.includes(item.route);
    })?.roles;
    if (tempR && !isAllowed(tempR)) {
      toast.error('This section of the application is not accessible to you.');
      router.replace(PAGES['/loading']());
    }
  }, [pathName]);

  return (
    <>
      {!loading &&
        navList
          .filter((item) => (item.roles ? isAllowed(item.roles) : true))
          .filter((item) => item.isvisible)
          .map((item, i) => {
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
                    item.route
                      ?.replace('/history', '')
                      .replaceAll('?myTasks', ''),
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
