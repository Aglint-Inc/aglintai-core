import { type DatabaseTable } from '@aglint/shared-types';

import { PATHS } from '@/constant/allPaths';

// import ROUTES from './routes';

export type PermissionEnums = DatabaseTable['permissions']['name'];

type Permissions = {
  // eslint-disable-next-line no-unused-vars
  [_id in (typeof PATHS)[number]]: PermissionEnums[];
};

const DEFAULT: Permissions = Object.assign(
  {},
  ...PATHS.map((route) => ({ [route]: null }) as unknown as Permissions),
);

const PERMISSIONS: Permissions = {
  ...DEFAULT,
  /** All of the permission are required to access this routes
   * permissions will reduced  using 'and'
   */

  //
  '/api/job/candidateUpload/csvUpload': ['job_module', 'manage_job'],
  '/api/job/candidateUpload/manualUpload': ['job_module', 'manage_job'],
  '/api/job/candidateUpload/resumeReupload': ['job_module', 'manage_job'],
  '/api/job/candidateUpload/resumeUpload': ['job_module', 'manage_job'],
  '/jobs': ['job_module'],
  '/jobs/create': ['job_module', 'manage_job'],
  '/jobs/[job]': ['job_module'],
  '/jobs/[job]/[application]': ['job_module'],
  '/jobs/[job]/metrics': ['job_module'],
  '/jobs/[job]/email-templates': ['job_module', 'manage_job'],
  '/jobs/[job]/hiring-team': ['job_module', 'manage_job'],
  '/jobs/[job]/interview-plan': ['job_module', 'manage_job'],
  '/jobs/[job]/candidate-plan': ['job_module', 'manage_job'],
  '/jobs/[job]/job-details': ['job_module', 'manage_job'],
  '/jobs/[job]/profile-score': ['job_module', 'manage_job'],
  '/jobs/[job]/workflows': ['job_module'],
  '/workflows': ['workflow_module'],
  '/workflows/[workflow]': ['workflow_module'],
  '/interviews/view': ['scheduling_module'],
  '/interviews': ['scheduling_module'],
  '/interviews/all': ['scheduling_module'],
  '/interview-pool': ['view_interview_types'],
  '/interview-pool/[pool]': ['interview_types'],
  '/requests': ['job_module'],
  '/requests/[request]': ['job_module'],
  '/requests/history': ['job_module'],
  '/integrations': ['integrations_module'],
  '/integrations/[platform]': ['integrations_module'],
  '/company': ['company_settings_module'],
  '/user/[user]': ['authorized'],
  '/reports': ['view_scheduling_reports'],

  //  For candidateDB module
  '/interviewers': ['authorized'],

  /** Any one of the permission is required to access this apis
   * permission will reduced  using 'or'
   */
  '/api/scheduling/get_interview_plans': ['scheduling_module'],
  '/api/greenhouse/getPostings': ['manage_job'],
  '/api/greenhouse/saveApiKey': ['manage_company'],
  '/api/lever/getPostings': ['manage_job', 'authorized'],
  '/api/lever/saveApiKey': ['manage_job'],
  '/api/lever/getCandidates': ['manage_job'],
  '/api/ashby/getPostings': ['manage_job'],
  '/api/ashby/saveApiKey': ['manage_company'],
  '/api/scheduling/fetchUserDetails': ['scheduling_module'],
  '/api/scheduling/fetch_activities': ['authorized'],
  // scheduling application apis
  '/api/scheduling/application/cancelschedule': ['scheduling_module'],
  '/api/scheduling/application/schedulewithagentwithouttaskid': [
    'scheduling_module',
  ],
  '/api/request/schedule-request': ['scheduling_actions'],
  '/api/scheduling/get-accesstoken': ['scheduling_module'],
  //v1 apis
  '/api/scheduling/v1/event_attendee_status': ['scheduling_module'],
  // request availability apis
  '/api/scheduling/request_availability/getCandidateRequestData': [
    'scheduling_module',
  ],

  '/api/scheduling/request_availability/candidateAvailability/getMeetings': [
    'scheduling_module',
  ],
  '/api/scheduling/request_availability/candidateAvailability/getScheduleMeetings':
    ['scheduling_module'],
  // request availability mail apis
  // '/api/scheduling/v1/find-alternative-time-slots': ['scheduler_update'], //
  // '/api/scheduling/v1/update_meeting_interviewers': ['scheduler_update'], //
  '/api/scheduling/application/fetchfeedbackdetails': [
    'scheduling_module',
    'task_module',
  ],

  '/api/encryptData': ['integrations_module', 'manage_company'],
  '/api/scheduling/v1/booking/confirm-recruiter-selected-option': [
    'scheduling_module',
  ],
  '/api/emails/preview': ['scheduling_module'],
  '/api/decryptApiKey': ['manage_company'],
  '/api/request_feedback': ['scheduling_module'],
  '/api/workflow-cron/execute': ['workflow_module'],
  '/api/google-calender/watch-changes': ['authorized'],
  '/api/google-calender/webhook': ['authorized'],
  '/api/scheduling/application/sendselfschedule': ['scheduling_actions'],
};

export default PERMISSIONS;
