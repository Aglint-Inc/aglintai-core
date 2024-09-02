import { type DatabaseTable } from '@aglint/shared-types';

const app_modules: {
  name: string;
  description: string;
  dependency: string;
  permissions: DatabaseTable['permissions']['name'][];
}[] = [
  {
    name: 'Enable or Disable Apps',
    dependency: null,
    description:
      'Manage the apps available for the [role_name] in your Aglint account. By enabling an app, the role will have access to it. You can configure permissions for each app in the sections below.',
    permissions: [
      'job_module',
      'task_module',
      'scheduling_module',
      'workflow_module',
      'integrations_module',
      'company_settings_module',
    ],
  },
  {
    name: 'Tasks Application Permissions',
    dependency: 'task_module',
    description:
      'Here are the permissions enabled for the [role_name] role to manage the Tasks Application:',
    permissions: ['view_all_task'],
  },
  {
    name: 'Jobs Application Permissions',
    dependency: 'job_module',
    description:
      'Here are the permissions enabled for the [role_name] role to manage the Jobs Application:',
    permissions: ['manage_job'],
  },
  {
    name: 'Scheduling Application Permissions',
    dependency: 'scheduling_module',
    description:
      'Here are the permissions enabled for the [role_name] role to manage the Scheduling Application:',
    permissions: [
      'interview_types',
      'scheduling_actions',
      'manage_interviewers',
      'scheduling_settings_and_reports',
    ],
  },
  {
    name: 'Workflows Application Permissions',
    dependency: 'workflow_module',
    description:
      'Here are the permissions enabled for the [role_name] role to manage the Workflows Application:',
    permissions: ['manage_workflow'],
  },
  {
    name: 'Company Settings Permissions',
    dependency: 'company_settings_module',
    description:
      'Here are the permissions enabled for the [role_name] role to manage the Company Settings',
    permissions: [
      'view_company',
      'manage_company',
      'view_roles',
      'manage_roles',
      'view_users',
      'manage_users',
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
