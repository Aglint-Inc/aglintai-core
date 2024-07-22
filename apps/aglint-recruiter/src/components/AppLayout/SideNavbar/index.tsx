import { DatabaseTable } from '@aglint/shared-types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useFeatureFlagEnabled } from 'posthog-js/react';
import { useEffect } from 'react';

import { NavLink } from '@/devlink/NavLink';
import { AssistantLogo } from '@/devlink2/AssistantLogo';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
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
  const { checkPermissions } = useRolesAndPermissions();
  const { isAssessmentEnabled, isScreeningEnabled } = useAuthDetails();

  const isAssistantEnabled = useFeatureFlagEnabled('isAssistantEnabled');
  const isSupportEnabled = useFeatureFlagEnabled('isSupportEnabled');
  const isAgentEnabled = useFeatureFlagEnabled('isAgentEnabled');
  const isSourcingEnabled = useFeatureFlagEnabled('isSourcingEnabled');
  let isTasksEnabled = useFeatureFlagEnabled('isTasksEnabled');

  const navList: {
    text: LinkProps['module'];
    SubComponents: any;
    route: string;
    comingSoon: boolean;
    isVisible: boolean;
    permission?: DatabaseTable['permissions']['name'][];
  }[] = [
    {
      text: 'Agent',
      SubComponents: null,
      route: ROUTES['/agent'](),
      comingSoon: false,
      isVisible: isAgentEnabled,
    },
    {
      text: 'Tasks',
      SubComponents: null,
      route: ROUTES['/tasks']() + '?myTasks',
      comingSoon: false,
      isVisible: isTasksEnabled,
      permission: ['task_module'],
    },
    {
      text: 'Jobs',
      SubComponents: null,
      route: ROUTES['/jobs']() + '?status=published',
      comingSoon: false,
      isVisible: true,
      permission: ['job_module'],
    },
    {
      text: 'Scheduler',
      SubComponents: null,
      route: ROUTES['/scheduling']() + '?tab=dashboard',
      comingSoon: false,
      isVisible: true,
      permission: ['scheduling_module'],
    },
    {
      text: 'Workflows',
      SubComponents: null,
      route: ROUTES['/workflows'](),
      comingSoon: false,
      isVisible: true,
      permission: ['workflow_module'],
    },
    {
      text: 'Sourcing Hub',
      SubComponents: null,
      route: ROUTES['/candidates/history']() + '?currentTab=discover%20talent',
      comingSoon: false,
      isVisible: isSourcingEnabled,
      // permission: '',
    },
    {
      text: 'Support',
      SubComponents: null,
      route: ROUTES['/support'](),
      comingSoon: false,
      isVisible: isSupportEnabled,
      // permission: ,
    },
    {
      text: 'Agent',
      SubComponents: null,
      route: ROUTES['/assistant'](),
      comingSoon: false,
      isVisible: isAssistantEnabled,
    },
    {
      text: 'Phone Screening',
      SubComponents: null,
      route: ROUTES['/screening'](),
      comingSoon: false,
      isVisible: isScreeningEnabled,
      // permission: ['phone_screening_enabled'],
    },

    {
      text: 'Assessment',
      SubComponents: null,
      route: ROUTES['/assessment-new'](),
      comingSoon: false,
      isVisible: isAssessmentEnabled,
      // permission: ['assessment_enabled'],
    },
    {
      text: 'Integrations',
      SubComponents: null,
      route: ROUTES['/integrations'](),
      comingSoon: false,
      isVisible: true,
      permission: ['integrations_module'],
    },
    {
      text: 'Company Settings',
      SubComponents: null,
      route: ROUTES['/company'](),
      comingSoon: false,
      isVisible: true,
      permission: ['company_settings_module'],
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
  const pattern = /^\/[^/]+/;
  const { pathname } = useRouter();
  const filteredPathname = pathname.match(pattern)[0];

  return (
    <Link href={path}>
      <LinkIcon
        module={module}
        active={
          filteredPathname.match(pattern)[0].includes(path) ||
          path.includes(filteredPathname)
        }
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
