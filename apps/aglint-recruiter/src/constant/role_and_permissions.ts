import { type DatabaseTable } from '@aglint/shared-types';

const app_modules: {
  name: string;
  description: string;
  dependency: string | null;
  permissions: DatabaseTable['permissions']['name'][];
}[] = [
  {
    name: 'Enable or Disable Apps',
    dependency: null,
    description:
      'Manage the apps available for the [role_name] in your Aglint account. By enabling an app, the role will have access to it. You can configure permissions for each app in the sections below.',
    permissions: [
      'view_jobs',
      'view_requests',
      'view_interview',
      'view_workflow',
      'view_integrations',
      'view_company',
    ],
  },
  {
    name: 'Tasks Application Permissions',
    dependency: 'view_requests',
    description:
      'Here are the permissions enabled for the [role_name] role to manage the Tasks Application:',
    permissions: ['view_requests'],
  },
  {
    name: 'Jobs Application Permissions',
    dependency: 'view_jobs',
    description:
      'Here are the permissions enabled for the [role_name] role to manage the Jobs Application:',
    permissions: ['manage_jobs'],
  },
  {
    name: 'Scheduling Application Permissions',
    dependency: 'view_interview',
    description:
      'Here are the permissions enabled for the [role_name] role to manage the Scheduling Application:',
    permissions: [
      'view_interview_pool',
      'manage_interview',
      'manage_interviewers',
    ],
  },
  {
    name: 'Workflows Application Permissions',
    dependency: 'view_workflow',
    description:
      'Here are the permissions enabled for the [role_name] role to manage the Workflows Application:',
    permissions: ['manage_workflow'],
  },
  {
    name: 'Company Settings Permissions',
    dependency: 'view_company',
    description:
      'Here are the permissions enabled for the [role_name] role to manage the Company Settings',
    permissions: [
      'view_company',
      'manage_company',
      'view_company',
      'manage_company',
      'view_company',
      'manage_company',
    ],
  },
];
const allPermissions = app_modules.map((module) => module.permissions).flat();

const rolesOrder = {
  admin: 0,
  recruiter: 1,
  'recruiting coordinator': 2,
  'hiring manager': 2,
  sourcer: 3,
  interview: 4,
};

export { allPermissions, app_modules, rolesOrder };
