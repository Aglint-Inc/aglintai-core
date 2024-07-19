import { DatabaseEnums } from '@aglint/shared-types';

import { PATHS } from '@/src/constant/allPaths';

// import ROUTES from './routes';

export type PermissionEnums = DatabaseEnums['permissions_type'];

type Permissions = {
  // eslint-disable-next-line no-unused-vars
  [id in (typeof PATHS)[number]]: (PermissionEnums | 'basic')[];
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
  //

  '/api/job/profileScore': ['jobs_enabled'],
  '/api/job/candidateUpload/csvUpload': ['jobs_enabled'],
  '/api/job/candidateUpload/manualUpload': ['jobs_enabled'],
  '/api/job/candidateUpload/resumeReupload': ['jobs_enabled'],
  '/api/job/candidateUpload/resumeUpload': ['jobs_enabled'],
  '/jobs': ['jobs_enabled', 'jobs_read'],
  '/jobs/create': ['jobs_enabled', 'jobs_read', 'jobs_create'],
  '/jobs/[id]': ['jobs_enabled', 'jobs_read', 'jobs_read'],
  '/jobs/[id]/job-details': ['jobs_enabled', 'jobs_read', 'jobs_update'],
  '/jobs/[id]/profile-score': ['jobs_enabled', 'jobs_read', 'jobs_update'],
  '/jobs/[id]/interview-plan': ['jobs_enabled', 'jobs_read', 'jobs_update'],
  '/jobs/[id]/assessment': ['jobs_enabled', 'jobs_read', 'jobs_update'],
  '/jobs/[id]/screening': ['jobs_enabled', 'jobs_read', 'jobs_update'],
  '/jobs/[id]/hiring-team': ['jobs_update'],
  '/jobs/[id]/email-templates': ['jobs_enabled', 'jobs_read', 'jobs_update'],
  '/workflows': ['workflow_enabled', 'workflow_read'],
  '/workflows/[id]': ['workflow_enabled', 'workflow_read'],

  '/scheduling': ['scheduler_enabled'],
  '/scheduling/module/members/[module_id]': ['scheduler_enabled'],
  '/scheduling/interviewer/[member_id]': ['scheduler_enabled'],
  '/scheduling/application/[application_id]': ['scheduler_enabled'],
  '/company': ['company_setting_enabled'],

  /** Any one of the permission is required to access this apis
   * permission will reduced  using 'or'
   */
  '/api/getMembersWithRole': ['team_enabled'],
  '/api/scheduling/get_interview_plans': ['scheduler_enabled'],
  '/api/greenhouse/getPostings': ['jobs_enabled'],
  '/api/greenhouse/saveApiKey': ['settings_company_update'],
  '/api/lever/getPostings': ['jobs_enabled'],
  '/api/lever/saveApiKey': ['settings_company_update'],
  '/api/ashby/getPostings': ['jobs_enabled'],
  '/api/ashby/saveApiKey': ['settings_company_update'],
  '/api/get_last_login': ['team_enabled'],
  '/api/setMembersWithRole': ['team_enabled', 'scheduler_enabled'],
  '/api/scheduling/fetchUserDetails': ['scheduler_enabled'],
  '/api/scheduling/fetch_interview_session_task': ['scheduler_enabled'],
  '/api/scheduling/fetch_activities': ['scheduler_enabled'],
  '/api/scheduling/get_interview_modules': ['scheduler_enabled'],
  '/api/scheduling/fetch_interview_module_by_id': ['scheduler_enabled'],
  // scheduling application apis
  '/api/scheduling/application/sendtocandidate': ['scheduler_enabled'],
  '/api/scheduling/application/cancelschedule': ['scheduler_enabled'],
  '/api/scheduling/application/candidatesessioncache': ['scheduler_enabled'],
  '/api/scheduling/application/schedulewithagentwithouttaskid': [
    'scheduler_enabled',
  ],
  '/api/scheduling/get-accesstoken': ['scheduler_enabled'],
  '/api/email-outreach/get-user-email': ['scheduler_enabled'],
  '/api/scheduling/application/schedulewithagent': ['scheduler_enabled'],
  //v1 apis
  '/api/scheduling/v1/get-candidate-selected-slots': ['scheduler_enabled'],
  '/api/scheduling/v1/event_attendee_status': ['scheduler_enabled'],
  // request availability apis
  '/api/scheduling/request_availability/getCandidateRequestData': [
    'scheduler_enabled',
  ],
  '/api/scheduling/request_availability/getTaskIdDetailsByRequestId': [
    'scheduler_enabled',
  ],
  '/api/scheduling/get_interviewer_and_modules': ['scheduler_enabled'],
  '/api/scheduling/request_availability/insertScheduleActivities': [
    'scheduler_enabled',
  ],
  '/api/scheduling/request_availability/insertTaskProgress': [
    'scheduler_enabled',
  ],
  '/api/scheduling/request_availability/updateRequestAvailability': [
    'scheduler_enabled',
    'scheduler_create',
  ],
  '/api/scheduling/request_availability/candidateAvailability/getMeetings': [
    'scheduler_enabled',
  ],
  '/api/scheduling/request_availability/candidateAvailability/getScheduleMeetings':
    ['scheduler_enabled'],
  '/api/scheduling/get_interview_training_progress': ['scheduler_enabled'],
  // request availability mail apis
  '/api/emails/sendAvailabilityRequest_email_applicant': ['scheduler_enabled'],
  '/api/scheduling/v1/find-alternative-time-slots': ['scheduler_update'],
  '/api/scheduling/v1/update_meeting_interviewers': ['scheduler_update'],
  '/api/request_feedback': ['scheduler_update'],
  '/api/scheduling/application/fetchfeedbackdetails': [
    'scheduler_enabled',
    'tasks_enabled',
  ],
  '/api/emails/sendAvailReqReminder_email_applicant': [
    'scheduler_enabled',
    'tasks_enabled',
  ],
  '/api/ai/gpt3-5-turbo': ['company_setting_enabled'],
  '/api/encryptData': ['integrations_enabled'],
  '/api/emails/selfScheduleReminder_email_applicant': ['scheduler_enabled'],
  '/api/emails/availabilityReqResend_email_candidate': ['scheduler_enabled'],
  '/api/scheduling/v1/booking/confirm-recruiter-selected-option': [
    'scheduler_enabled',
  ],
  '/api/emails/confirmInterview_email_applicant': ['scheduler_enabled'],
  '/api/emails/preview': ['scheduler_enabled'],
  '/api/getRoleAndPermissions': ['settings_roles_update'],
  '/api/setRoleAndPermission': ['settings_roles_update'],
  '/api/getUserDetails': ['jobs_enabled'],
  '/api/invite_user': ['team_enabled'],
  '/api/invite_user/resend': ['team_enabled'],
  // general apis
  '/api/decryptApiKey': ['integrations_enabled'],
  // sourcing
  '/api/ai/queryToJson': ['sourcing_enabled'],
  '/api/ai/create-embeddings': ['sourcing_enabled'],
};

export default PERMISSIONS;
