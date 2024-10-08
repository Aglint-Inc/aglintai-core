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
  '/api/job/candidateUpload/csvUpload': ['view_jobs', 'manage_jobs'],
  '/api/job/profileScore': ['view_jobs', 'manage_jobs'],
  '/api/job/candidateUpload/manualUpload': ['view_jobs', 'manage_jobs'],
  '/api/job/candidateUpload/resumeReupload': ['view_jobs', 'manage_jobs'],
  '/api/job/candidateUpload/resumeUpload': ['view_jobs', 'manage_jobs'],
  '/jobs': ['view_jobs'],
  '/jobs/create': ['view_jobs', 'manage_jobs'],
  '/jobs/[job]': ['view_jobs'],
  '/jobs/[job]/[application]': ['view_jobs'],
  '/jobs/[job]/metrics': ['view_jobs'],
  '/jobs/[job]/email-templates': ['view_jobs', 'manage_jobs'],
  '/jobs/[job]/hiring-team': ['view_jobs', 'manage_jobs'],
  '/jobs/[job]/interview-plan': ['view_jobs', 'manage_jobs'],
  '/jobs/[job]/candidate-plan': ['view_jobs', 'manage_jobs'],
  '/jobs/[job]/job-details': ['view_jobs', 'manage_jobs'],
  '/jobs/[job]/profile-score': ['view_jobs', 'manage_jobs'],
  '/jobs/[job]/workflows': ['view_jobs'],
  '/workflows': ['view_workflow'],
  '/workflows/[workflow]': ['view_workflow'],
  '/interviews/view': ['view_interview'],
  '/interviews': ['view_interview'],
  '/interviews/all': ['view_interview'],
  '/interview-pool': ['view_interview_pool'],
  '/interview-pool/[pool]': ['view_interview_pool'],
  '/requests': ['view_jobs'],
  '/requests/[request]': ['view_jobs'],
  '/requests/history': ['view_jobs'],
  '/integrations': ['view_integrations'],
  '/integrations/[platform]': ['view_integrations'],
  '/company': ['view_company'],
  '/user/[user]': ['authorized'],
  '/reports': ['view_reports'],

  //  For candidateDB module
  '/interviewers': ['authorized'],

  /** Any one of the permission is required to access this apis
   * permission will reduced  using 'or'
   */
  '/api/scheduling/get_interview_plans': ['view_interview'],
  '/api/greenhouse/getPostings': ['manage_jobs'],
  '/api/greenhouse/saveApiKey': ['manage_company'],
  '/api/lever/getPostings': ['manage_jobs', 'authorized'],
  '/api/lever/saveApiKey': ['manage_jobs'],
  '/api/lever/getCandidates': ['manage_jobs'],
  '/api/ashby/getPostings': ['manage_jobs'],
  '/api/ashby/saveApiKey': ['manage_company'],
  '/api/scheduling/fetchUserDetails': ['view_interview'],
  '/api/scheduling/fetch_activities': ['authorized'],
  // scheduling application apis
  '/api/scheduling/application/cancelschedule': ['view_interview'],
  '/api/scheduling/application/schedulewithagentwithouttaskid': [
    'view_interview',
  ],
  '/api/request/schedule-request': ['manage_interview'],
  '/api/scheduling/get-accesstoken': ['view_interview'],
  //v1 apis
  '/api/scheduling/v1/event_attendee_status': ['view_interview'],
  // request availability apis
  '/api/scheduling/request_availability/getCandidateRequestData': [
    'view_interview',
  ],

  '/api/scheduling/request_availability/candidateAvailability/getMeetings': [
    'view_interview',
  ],
  '/api/scheduling/request_availability/candidateAvailability/getScheduleMeetings':
    ['view_interview'],
  // request availability mail apis
  // '/api/scheduling/v1/find-alternative-time-slots': ['scheduler_update'], //
  // '/api/scheduling/v1/update_meeting_interviewers': ['scheduler_update'], //
  '/api/scheduling/application/fetchfeedbackdetails': [
    'view_interview',
    'view_requests',
  ],

  '/api/encryptData': ['view_integrations', 'manage_company'],
  '/api/scheduling/v1/booking/confirm-recruiter-selected-option': [
    'view_interview',
  ],
  '/api/emails/preview': ['view_interview'],
  '/api/decryptApiKey': ['manage_company'],
  '/api/request_feedback': ['view_interview'],
  '/api/workflow-cron/execute': ['view_workflow'],
  '/api/agent-workflow/interviewer-decline': ['authorized'],
  '/api/google-calender/watch-changes': ['authorized'],
  '/api/google-calender/webhook': ['authorized'],
  '/api/scheduling/application/sendselfschedule': ['manage_interview'],
};

export default PERMISSIONS;
