import { DatabaseTable } from '@aglint/shared-types';

import { PATHS } from '@/src/constant/allPaths';
import ROUTES from '@/src/utils/routing/routes';

import { LinkProps } from './type';

export const navList: {
  text: LinkProps['module'];
  SubComponents: any;
  route: string;
  comingSoon: boolean;
  isVisible: boolean;
  permission?: DatabaseTable['permissions']['name'][];
  active: (typeof PATHS)[number][];
}[] = [
  {
    text: 'Aglint AI',
    SubComponents: null,
    route: ROUTES['/requests'](),
    comingSoon: false,
    isVisible: true,
    permission: ['task_module'],
    active: ['/requests'],
  },
  // {
  //   text: 'Requests',
  //   SubComponents: null,
  //   route: ROUTES['/requests'](),
  //   comingSoon: false,
  //   isVisible: true,
  //   permission: ['job_module'],
  //   active: ['/requests'],
  // },
  {
    text: 'Tasks',
    SubComponents: null,
    route: ROUTES['/tasks']() + '?myTasks',
    comingSoon: false,
    isVisible: false,
    permission: ['task_module'],
    active: ['/tasks'],
  },
  {
    text: 'Candidates',
    SubComponents: null,
    route: ROUTES['/scheduling/application'](),
    comingSoon: false,
    isVisible: true,
    permission: ['scheduling_actions'],
    active: [
      '/scheduling/application',
      '/scheduling/application/[application_id]',
    ],
  },
  {
    text: 'Dashboard',
    SubComponents: null,
    route: ROUTES['/scheduling']() + '?tab=dashboard',
    comingSoon: false,
    isVisible: true,
    permission: ['scheduling_module'],
    active: ['/scheduling'],
  },
  {
    text: 'Interview Types',
    SubComponents: null,
    route: ROUTES['/scheduling/interview-types'](),
    comingSoon: false,
    isVisible: true,
    permission: ['interview_types'],
    active: [
      '/scheduling/interview-types',
      '/scheduling/interview-types/[type_id]',
    ],
  },
  {
    text: 'Interviewers',
    SubComponents: null,
    route: ROUTES['/scheduling/interviewer'](),
    comingSoon: false,
    isVisible: true,
    permission: ['manage_interviewers'],
    active: ['/scheduling/interviewer'],
  },
  {
    text: 'Jobs',
    SubComponents: null,
    route: ROUTES['/jobs']() + '?status=published',
    comingSoon: false,
    isVisible: true,
    permission: ['job_module'],
    active: [
      '/jobs',
      '/jobs/[id]',
      '/jobs/[id]/agent',
      '/jobs/[id]/assessment',
      '/jobs/[id]/email-templates',
      '/jobs/[id]/hiring-team',
      '/jobs/[id]/interview-plan',
      '/jobs/[id]/profile-score',
      '/jobs/[id]/screening',
      '/jobs/[id]/workflows',
      '/jobs/[id]/candidate-list',
    ],
  },
  {
    text: 'Sourcing Hub',
    SubComponents: null,
    route: ROUTES['/candidates/history']() + '?currentTab=discover%20talent',
    comingSoon: false,
    isVisible: false,
    // permission: '',
    active: [],
  },
  {
    text: 'Integrations',
    SubComponents: null,
    route: ROUTES['/integrations'](),
    comingSoon: false,
    isVisible: true,
    permission: ['integrations_module'],
    active: ['/integrations'],
  },
  {
    text: 'Workflows',
    SubComponents: null,
    route: ROUTES['/workflows'](),
    comingSoon: false,
    isVisible: true,
    permission: ['workflow_module'],
    active: ['/workflows', '/workflows/[id]'],
  },
  {
    text: 'Company Settings',
    SubComponents: null,
    route: ROUTES['/company'](),
    comingSoon: false,
    isVisible: true,
    permission: ['company_settings_module'],
    active: ['/company', '/user/profile/[user_id]'],
  },
];
