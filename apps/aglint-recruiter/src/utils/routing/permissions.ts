import { DatabaseEnums } from '@aglint/shared-types';

import { PATHS } from '@/script/paths';

// import ROUTES from './routes';

type Permissions = {
  // eslint-disable-next-line no-unused-vars
  [id in (typeof PATHS)[number]]: DatabaseEnums['permissions_type'] | null;
};

const DEFAULT: Permissions = Object.assign(
  {},
  ...PATHS.map((route) => ({ [route]: null }) as Permissions),
);

const PERMISSIONS: Permissions = {
  ...DEFAULT,
  '/jobs': 'jobs_enabled',
  '/jobs/create': 'jobs_create',
  '/jobs/[id]': 'jobs_read',
  '/jobs/[id]/job-details': 'jobs_update',
  '/jobs/[id]/profile-score': 'jobs_update',
  '/jobs/[id]/interview-plan': 'jobs_update',
  '/jobs/[id]/assessment': 'jobs_update',
  '/jobs/[id]/screening': 'jobs_update',
  '/jobs/[id]/hiring-team': 'jobs_update',
  '/jobs/[id]/email-templates': 'jobs_update',
  '/company': 'company_setting_enabled',
  '/api/job/jobApplications/read': 'jobs_read',
};

export default PERMISSIONS;
