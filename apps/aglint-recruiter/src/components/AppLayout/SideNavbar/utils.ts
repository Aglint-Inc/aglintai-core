import { type DatabaseTable } from '@aglint/shared-types';

import { type PATHS } from '@/constant/allPaths';
import ROUTES from '@/utils/routing/routes';

import { type LinkProps } from './type';

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
    text: 'Requests',
    SubComponents: null,
    route: ROUTES['/requests'](),
    comingSoon: false,
    isVisible: true,
    permission: ['task_module'],
    active: ['/requests'],
  },
  {
    text: 'Jobs',
    SubComponents: null,
    route: ROUTES['/jobs'](),
    comingSoon: false,
    isVisible: true,
    permission: ['job_module'],
    active: [
      '/jobs',
      '/jobs/[job]',
      '/jobs/[job]/email-templates',
      '/jobs/[job]/hiring-team',
      '/jobs/[job]/interview-plan',
      '/jobs/[job]/profile-score',
      '/jobs/[job]/workflows',
      '/jobs/[job]/metrics',
      '/jobs/[job]/[application]',
    ],
  },
  {
    text: 'Interviews',
    SubComponents: null,
    route: ROUTES['/interviews']() + '?tab=interviews',
    comingSoon: false,
    isVisible: true,
    permission: ['scheduling_module'],
    active: ['/interviews'],
  },

  {
    text: 'Interviewers',
    SubComponents: null,
    route: ROUTES['/interviewers'](),
    comingSoon: false,
    isVisible: true,
    permission: ['manage_interviewers'],
    active: ['/interviewers', '/user/[user]'],
  },
  {
    text: 'Interview Pools',
    SubComponents: null,
    route: ROUTES['/interview-pool'](),
    comingSoon: false,
    isVisible: true,
    permission: ['interview_types'],
    active: ['/interview-pool', '/interview-pool/[pool]'],
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
    text: 'Workflows',
    SubComponents: null,
    route: ROUTES['/workflows'](),
    comingSoon: false,
    isVisible: true,
    permission: ['manage_workflow'],
    active: ['/workflows', '/workflows/[workflow]'],
  },
  {
    text: 'Integrations',
    SubComponents: null,
    route: ROUTES['/integrations'](),
    comingSoon: false,
    isVisible: true,
    permission: ['integrations_module'],
    active: ['/integrations', '/integrations/[platform]'],
  },
  {
    text: 'Reports',
    SubComponents: null,
    route: '/reports?tab=interviewMetrics',
    comingSoon: false,
    isVisible: true,
    permission: ['company_settings_module'],
    active: ['/reports'],
  },
  {
    text: 'Company Settings',
    SubComponents: null,
    route: ROUTES['/company']() + '?tab=company-info',
    comingSoon: false,
    isVisible: true,
    permission: ['company_settings_module'],
    active: ['/company'],
  },
];
