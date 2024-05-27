import { DatabaseEnums } from '@aglint/shared-types';
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
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import ROUTES from '@/src/utils/routing/routes';
import toast from '@/src/utils/toast';

function SideNavbar() {
  const router = useRouter();
  const pathName = usePathname();
  const { checkPermissions } = useRolesAndPermissions();

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
    comingSoon: boolean;
    isVisible: boolean;
    permission?: DatabaseEnums['permissions_type'];
  }[] = [
    {
      icon: <AssistantLogo />,
      text: 'Agent',
      SubComponents: null,
      route: ROUTES['/agent'](),
      comingSoon: false,
      isVisible: isAgentEnabled,
    },
    {
      icon: <NavTask isActive={false} />,
      text: 'Tasks',
      SubComponents: null,
      route: ROUTES['/tasks']() + '?myTasks',
      comingSoon: false,
      isVisible: isTasksEnabled,
      permission: 'tasks_enabled',
    },
    {
      icon: <NavJobs isActive={false} />,
      text: 'Jobs',
      SubComponents: null,
      route: ROUTES['/jobs'](),
      comingSoon: false,
      isVisible: true,
      permission: 'jobs_enabled',
    },
    {
      icon: <NavScheduler isActive={false} />,
      text: 'Scheduler',
      SubComponents: null,
      route: ROUTES['/scheduling'](),
      comingSoon: false,
      isVisible: isSchedulingEnabled,
      permission: 'scheduler_enabled',
    },
    {
      icon: <NavCd isActive={false} />,
      text: 'Candidates',
      SubComponents: null,
      route: ROUTES['/candidates/history'](),
      comingSoon: false,
      isVisible: isSourcingEnabled,
      // permission: '',
    },
    {
      icon: <NavTickets isActive={false} />,
      text: 'Tickets',
      SubComponents: null,
      route: ROUTES['/support'](),
      comingSoon: false,
      isVisible: isSupportEnabled,
      // permission: ,
    },
    {
      icon: <NavAssistant isActive={false} />,
      text: 'Assistant',
      SubComponents: null,
      route: ROUTES['/assistant'](),
      comingSoon: false,
      isVisible: isAssistantEnabled,
    },

    {
      icon: <NavPhoneScreening isActive={false} />,
      text: 'Phone Screening',
      SubComponents: null,
      route: ROUTES['/screening'](),
      comingSoon: false,
      isVisible: isPhoneScreeningEnabled,
      permission: 'phone_screening_enabled',
    },

    {
      icon: <NavAssessment isActive={false} />,
      text: 'Assessment',
      SubComponents: null,
      route: ROUTES['/assessment-new'](),
      comingSoon: false,
      isVisible: isAssessmentEnabled,
      permission: 'assessment_enabled',
    },
    {
      icon: <NavIntegration isActive={false} />,
      text: 'Integrations',
      SubComponents: null,
      route: ROUTES['/integrations'](),
      comingSoon: false,
      isVisible: true,
      permission: 'integrations_enabled',
    },
    {
      icon: <NavCompanySetting isActive={false} />,
      text: 'Company Settings',
      SubComponents: null,
      route: ROUTES['/company'](),
      comingSoon: false,
      isVisible: true,
      permission: 'company_setting_enabled',
    },
  ];

  useEffect(() => {
    const tempR = navList.find((item) => {
      return pathName?.includes(item.route);
    })?.permission;
    if (tempR && !checkPermissions(tempR)) {
      toast.error('This section of the application is not accessible to you.');
      router.replace(ROUTES['/loading']());
    }
  }, [pathName]);

  return (
    <>
      {navList
        .filter((item) =>
          item.permission ? checkPermissions(item.permission) : true,
        )
        .filter((item) => item.isVisible)
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
