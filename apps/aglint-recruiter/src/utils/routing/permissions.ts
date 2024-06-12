import { DatabaseEnums } from '@aglint/shared-types';

import { PATHS } from '@/script/paths';

// import ROUTES from './routes';

type Permissions = {
  // eslint-disable-next-line no-unused-vars
  [id in (typeof PATHS)[number]]: DatabaseEnums['permissions_type'][];
};

const DEFAULT: Permissions = Object.assign(
  {},
  ...PATHS.map((route) => ({ [route]: null }) as Permissions),
);

const PERMISSIONS: Permissions = {
  ...DEFAULT,
  /** All of the permission are required to access this routes
   * permissions will reduced  using 'and'
   */
  '/tasks': ['tasks_enabled'],
  '/jobs': ['jobs_enabled'],
  '/jobs/create': ['jobs_create'],
  '/jobs/[id]': ['jobs_read'],
  '/jobs/[id]/job-details': ['jobs_update'],
  '/jobs/[id]/profile-score': ['jobs_update'],
  '/jobs/[id]/interview-plan': ['jobs_update'],
  '/jobs/[id]/assessment': ['jobs_update'],
  '/jobs/[id]/screening': ['jobs_update'],
  '/jobs/[id]/hiring-team': ['jobs_update'],
  '/jobs/[id]/email-templates': ['jobs_update'],

  '/scheduling': ['scheduler_enabled'],

  '/company': ['company_setting_enabled'],

  /** Any one of the permission is required to access this apis
   * permission will reduced  using 'or'
   */
  '/api/job/jobApplications/read': ['jobs_read', 'candidates_add'],
  '/api/getMembersWithRole': ['jobs_read'], //change to correct permission
  '/api/scheduling/fetchUserDetails': ['scheduler_enabled'],
  '/api/scheduling/fetch_interview_session_task': ['scheduler_enabled'],
  '/api/scheduling/fetch_activities': ['scheduler_enabled'],
  '/api/scheduling/get_interview_modules': ['scheduler_enabled'],
  '/api/scheduling/fetch_interview_module_by_id': ['scheduler_enabled'],
  // scheduling application apis
  '/api/scheduling/application/sendtocandidate': ['scheduler_enabled'],
  '/scheduling/application/[application_id]': ['scheduler_enabled'],
  //v1 apis
  '/api/scheduling/v1/get-candidate-selected-slots': ['scheduler_enabled'],
  // request availability apis
  '/api/scheduling/request_availability/getCandidateRequestData': [
    'scheduler_enabled',
  ],
  '/api/scheduling/request_availability/getTaskIdDetailsByRequestId': [
    'scheduler_enabled',
  ],
  '/api/scheduling/request_availability/insertScheduleActivities': [
    'scheduler_enabled',
  ],
  '/api/scheduling/request_availability/insertTaskProgress': [
    'scheduler_enabled',
  ],
  '/api/scheduling/request_availability/updateRequestAvailability': [
    'scheduler_enabled',
  ],
};

export default PERMISSIONS;
