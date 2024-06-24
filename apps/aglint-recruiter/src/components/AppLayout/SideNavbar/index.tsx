import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useFeatureFlagEnabled } from 'posthog-js/react';
import { useEffect } from 'react';

import { NavLink } from '@/devlink/NavLink';
import { AssistantLogo } from '@/devlink2/AssistantLogo';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import ROUTES from '@/src/utils/routing/routes';
import toast from '@/src/utils/toast';

import AssessmentIcon from '../IconsSideBar/AssessmentIcon';
import CompanySettingsIcon from '../IconsSideBar/CompanySettingsIcon';
import IntegrationIcon from '../IconsSideBar/IntegrationIcon';
import JobsIcon from '../IconsSideBar/JobsIcon';
import PhoneScreeningIcon from '../IconsSideBar/PhoneScreeningIcon';
import SchedulerIcon from '../IconsSideBar/SchedulerIcon';
import SourcingHubIcon from '../IconsSideBar/SourcingHubIcon';
import TaskIcon from '../IconsSideBar/TaskIcon';
import WorkFlowIcon from '../IconsSideBar/WorkFlowIcon';

function SideNavbar() {
  const router = useRouter();
  const pathName = usePathname();
  const {
    loading,
    isAllowed,
    isAssessmentEnabled,
    isSchedulingEnabled,
    isScreeningEnabled,
  } = useAuthDetails();

  const isAssistantEnabled = useFeatureFlagEnabled('isAssistantEnabled');
  const isSupportEnabled = useFeatureFlagEnabled('isSupportEnabled');
  const isAgentEnabled = useFeatureFlagEnabled('isAgentEnabled');
  const isSourcingEnabled = useFeatureFlagEnabled('isSourcingEnabled');
  let isTasksEnabled = useFeatureFlagEnabled('isTasksEnabled');

  const navList: {
    text: LinkProps['module'];
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
      text: 'Agent',
      SubComponents: null,
      route: ROUTES['/agent'](),
      comingsoon: false,
      isvisible: isAgentEnabled,
      roles: ['admin'],
    },
    {
      text: 'Tasks',
      SubComponents: null,
      route: ROUTES['/tasks']() + '?myTasks',
      comingsoon: false,
      isvisible: isTasksEnabled,
      // roles: [
      //   'admin',
      //   'interviewer',
      //   'recruiter',
      // ],
    },
    {
      text: 'Jobs',
      SubComponents: null,
      route: ROUTES['/jobs']() + '?status=published',
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
      text: 'Scheduler',
      SubComponents: null,
      route: ROUTES['/scheduling']() + '?tab=dashboard',
      comingsoon: false,
      isvisible: isSchedulingEnabled,
      roles: ['admin', 'recruiter', 'recruiting_coordinator', 'interviewer'],
    },
    {
      text: 'Workflows',
      SubComponents: null,
      route: ROUTES['/workflows'](),
      comingsoon: false,
      isvisible: true,
      roles: ['admin', 'recruiter'],
    },
    {
      text: 'Sourcing Hub',
      SubComponents: null,
      route: ROUTES['/candidates/history']() + '?currentTab=discover%20talent',
      comingsoon: false,
      isvisible: isSourcingEnabled,
      roles: ['admin', 'recruiter'],
    },
    {
      text: 'Support',
      SubComponents: null,
      route: ROUTES['/support'](),
      comingsoon: false,
      isvisible: isSupportEnabled,
      roles: ['admin'],
    },
    {
      text: 'Agent',
      SubComponents: null,
      route: ROUTES['/assisstant'](),
      comingsoon: false,
      isvisible: isAssistantEnabled,
      roles: ['admin'],
    },
    {
      text: 'Phone Screening',
      SubComponents: null,
      route: ROUTES['/screening'](),
      comingsoon: false,
      isvisible: isScreeningEnabled,
      roles: ['admin', 'recruiter', 'recruiting_coordinator', 'interviewer'],
    },

    {
      text: 'Assessment',
      SubComponents: null,
      route: ROUTES['/assessment-new'](),
      comingsoon: false,
      isvisible: isAssessmentEnabled,
      roles: ['admin', 'recruiter'],
    },
    {
      text: 'Integrations',
      SubComponents: null,
      route: ROUTES['/integrations'](),
      comingsoon: false,
      isvisible: true,
      roles: ['admin'],
    },
    {
      text: 'Company Settings',
      SubComponents: null,
      route: ROUTES['/company'](),
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
      router.replace(ROUTES['/loading']());
    }
  }, [pathName]);

  return (
    <>
      {!loading &&
        navList
          .filter((item) => (item.roles ? isAllowed(item.roles) : true))
          .filter((item) => item.isvisible)
          .map((item) => {
            return (
              <LinkComp module={item.text} key={item.text} path={item.route} />
            );
          })}
    </>
  );
}

export default SideNavbar;

const LinkIcon = ({
  module,
  active,
}: {
  module: LinkProps['module'];
  active: boolean;
}) => {
  switch (module) {
    case 'Agent':
      return <AssistantLogo />;
    case 'Jobs':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<JobsIcon />}
        />
      );
    case 'Scheduler':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<SchedulerIcon />}
        />
      );
    case 'Sourcing Hub':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<SourcingHubIcon />}
        />
      );
    case 'Phone Screening':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<PhoneScreeningIcon />}
        />
      );
    case 'Assessment':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<AssessmentIcon />}
        />
      );
    case 'Integrations':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<IntegrationIcon />}
        />
      );
    case 'Company Settings':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<CompanySettingsIcon />}
        />
      );
    case 'Workflows':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<WorkFlowIcon />}
        />
      );
    case 'Tasks':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<TaskIcon />}
        />
      );
  }
};

const LinkComp = ({
  module,
  path,
}: {
  module: LinkProps['module'];
  path: LinkProps['path'] | string;
}) => {
  const { pathname } = useRouter();

  return (
    <Link href={path}>
      <LinkIcon
        module={module}
        active={pathname.includes(path) || path.includes(pathname)}
      />
    </Link>
  );
};

type Path<T extends keyof typeof ROUTES> = keyof Pick<typeof ROUTES, T>;

type LinkProps =
  | {
      module: 'Agent';
      path: Path<'/agent'>;
    }
  | {
      module: 'Jobs';
      path: Path<'/jobs'>;
    }
  | {
      module: 'Scheduler';
      path: Path<'/scheduling'>;
    }
  | {
      module: 'Sourcing Hub';
      path: Path<'/candidates/history'>;
    }
  | {
      module: 'Phone Screening';
      path: Path<'/screening'>;
    }
  | {
      module: 'Assessment';
      path: Path<'/assessment-new'>;
    }
  | {
      module: 'Integrations';
      path: Path<'/integrations'>;
    }
  | {
      module: 'Workflows';
      path: Path<'/workflows'>;
    }
  | {
      module: 'Company Settings';
      path: Path<'/company'>;
    }
  | {
      module: 'Support';
      path: Path<'/support'>;
    }
  | {
      module: 'Tasks';
      path: Path<'/tasks'>;
    };
