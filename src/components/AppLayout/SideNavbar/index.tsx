import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useFeatureFlagEnabled } from 'posthog-js/react';

import {
  NavAssessment,
  NavAssistant,
  NavCd,
  NavCompanySetting,
  NavIntegration,
  NavJobs,
  NavPhoneScreening,
  NavScheduler,
  NavTask,
  NavTickets,
} from '@/devlink';
import { AssistantLogo } from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { Database } from '@/src/types/schema';
import { pageRoutes } from '@/src/utils/pageRouting';

function SideNavbar() {
  const router = useRouter();
  const { loading, isAllowed } = useAuthDetails();

  const isAssistantEnabled = useFeatureFlagEnabled('isAssistantEnabled');
  const isSupportEnabled = useFeatureFlagEnabled('isSupportEnabled');
  const isAgentEnabled = useFeatureFlagEnabled('isAgentEnabled');
  const isAssessmentEnabled = useFeatureFlagEnabled('isNewAssessmentEnabled');
  const isSourcingEnabled = useFeatureFlagEnabled('isSourcingEnabled');
  const isPhoneScreeningEnabled = useFeatureFlagEnabled(
    'isPhoneScreeningEnabled',
  );
  const isSchedulingEnabled = useFeatureFlagEnabled('isSchedulingEnabled');
  let isTasksEnabled = useFeatureFlagEnabled('isTasksEnabled');

  const navList = [
    {
      icon: <AssistantLogo />,
      text: 'Agent',
      SubComponents: null,
      route: pageRoutes.AGENT,
      comingsoon: false,
      isvisible: isAgentEnabled,
      roles: ['admin'] as Database['public']['Enums']['user_roles'][],
    },
    {
      icon: <NavTask isActive={false} />,
      text: 'Tasks',
      SubComponents: null,
      route: pageRoutes.TASKS + '?myTask',
      comingsoon: false,
      isvisible: isTasksEnabled,
      roles: [
        'admin',
        'interviewer',
        'recruiter',
      ] as Database['public']['Enums']['user_roles'][],
    },
    {
      icon: <NavJobs isActive={false} />,
      text: 'Jobs',
      SubComponents: null,
      route: pageRoutes.JOBS,
      comingsoon: false,
      isvisible: true,
      roles: [
        'admin',
        'recruiter',
      ] as Database['public']['Enums']['user_roles'][],
    },
    {
      icon: <NavCd isActive={false} />,
      text: 'Candidates',
      SubComponents: null,
      route: pageRoutes.CANDIDATES,
      comingsoon: false,
      isvisible: isSourcingEnabled,
      roles: [
        'admin',
        'recruiter',
      ] as Database['public']['Enums']['user_roles'][],
    },
    {
      icon: <NavTickets isActive={false} />,
      text: 'Tickets',
      SubComponents: null,
      route: pageRoutes.SUPPORT,
      comingsoon: false,
      isvisible: isSupportEnabled,
      roles: ['admin'] as Database['public']['Enums']['user_roles'][],
    },
    {
      icon: <NavAssistant isActive={false} />,
      text: 'Assistant',
      SubComponents: null,
      route: pageRoutes.ASSISTANT,
      comingsoon: false,
      isvisible: isAssistantEnabled,
      roles: ['admin'] as Database['public']['Enums']['user_roles'][],
    },
    {
      icon: <NavPhoneScreening isActive={false} />,
      text: 'Phone Screening',
      SubComponents: null,
      route: pageRoutes.SCREENING,
      comingsoon: false,
      isvisible: isPhoneScreeningEnabled,
      roles: [
        'admin',
        'recruiter',
        'scheduler',
        'interviewer',
      ] as Database['public']['Enums']['user_roles'][],
    },
    {
      icon: <NavScheduler isActive={false} />,
      text: 'Scheduler',
      SubComponents: null,
      route: pageRoutes.SCHEDULING,
      comingsoon: false,
      isvisible: isSchedulingEnabled,
      roles: [
        'admin',
        'recruiter',
        'scheduler',
        'interviewer',
      ] as Database['public']['Enums']['user_roles'][],
    },
    {
      icon: <NavAssessment isActive={false} />,
      text: 'Assessment',
      SubComponents: null,
      route: pageRoutes.ASSESSMENTS,
      comingsoon: false,
      isvisible: isAssessmentEnabled,
      roles: [
        'admin',
        'recruiter',
      ] as Database['public']['Enums']['user_roles'][],
    },
    {
      icon: <NavIntegration isActive={false} />,
      text: 'Integrations',
      SubComponents: null,
      route: '/integrations',
      comingsoon: false,
      isvisible: true,
      roles: ['admin'] as Database['public']['Enums']['user_roles'][],
    },
    {
      icon: <NavCompanySetting isActive={false} />,
      text: 'Company Settings',
      SubComponents: null,
      route: pageRoutes.COMPANY,
      comingsoon: false,
      isvisible: true,
      roles: ['admin'] as Database['public']['Enums']['user_roles'][],
    },
  ];
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
