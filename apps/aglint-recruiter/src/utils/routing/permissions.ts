import { DatabaseTable } from '@aglint/shared-types';

import { PATHS } from '@/src/constant/allPaths';

// import ROUTES from './routes';

export type PermissionEnums = DatabaseTable['permissions']['name'];

type Permissions = {
  // eslint-disable-next-line no-unused-vars
  [id in (typeof PATHS)[number]]: PermissionEnums[];
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
  '/tasks': ['task_module'],

  //
  '/supervisor': ['authorized'],
  '/api/job/candidateUpload/csvUpload': ['job_module', 'manage_job'],
  '/api/job/profileScore': ['job_module', 'manage_job'],
  '/api/job/candidateUpload/manualUpload': ['job_module', 'manage_job'],
  '/api/job/candidateUpload/resumeReupload': ['job_module', 'manage_job'],
  '/api/job/candidateUpload/resumeUpload': ['job_module', 'manage_job'],
  '/jobs': ['job_module'],
  '/jobs/create': ['job_module', 'manage_job'],
  '/jobs/[id]': ['job_module'],
  '/jobs/[id]/application/[application_id]': ['job_module'],
  '/jobs/[id]/assessment': ['job_module'],
  '/jobs/[id]/candidate-list': ['job_module'],
  '/jobs/[id]/email-templates': ['job_module', 'manage_job'],
  '/jobs/[id]/hiring-team': ['job_module', 'manage_job'],
  '/jobs/[id]/interview-plan': ['job_module', 'manage_job'],
  '/jobs/[id]/job-details': ['job_module', 'manage_job'],
  '/jobs/[id]/profile-score': ['job_module', 'manage_job'],
  '/jobs/[id]/screening': ['job_module', 'manage_job'],
  '/jobs/[id]/workflows': ['job_module'],
  '/workflows': ['workflow_module'],
  '/api/get_member': ['authorized'],
  '/api/get_users_by_ids': ['authorized'],
  '/workflows/[id]': ['workflow_module'],
  '/workflows/real-time-crons': ['workflow_module'],
  '/scheduling/view': ['scheduling_module'],
  '/scheduling': ['scheduling_module'],
  '/scheduling/application': ['scheduling_actions'],
  '/scheduling/interviewer': ['manage_interviewers'],
  '/scheduling/interview-types/[type_id]': ['interview_types'],
  '/scheduling/interviewer/[member_id]': ['scheduling_module'],
  '/scheduling/application/[application_id]': ['scheduling_module'],
  '/scheduling/analytics': ['scheduling_module'],
  '/scheduling/dashboard': ['scheduling_settings_and_reports'],
  '/scheduling/interview-types': ['view_interview_types'],
  '/requests': ['job_module'],
  '/requests/[id]': ['job_module'],

  '/integrations': ['integrations_module'],
  '/integrations/[platform]': ['integrations_module'],
  '/api/ai/gpt3-5-turbo': ['company_settings_module'],
  '/company': ['company_settings_module'],
  '/profile': ['authorized'],
  '/user/profile/[user_id]': ['authorized'],

  /** Any one of the permission is required to access this apis
   * permission will reduced  using 'or'
   */
  '/api/getMembersWithRole': ['view_users'],
  '/api/scheduling/application/fetchinterviewstages': ['scheduling_module'],
  '/api/scheduling/get_interview_plans': ['scheduling_module'],
  '/api/greenhouse/getPostings': ['manage_job'],
  '/api/lever/createjob': ['manage_job'],
  '/api/greenhouse/saveApiKey': ['manage_company'],
  '/api/lever/getPostings': ['manage_job'],
  '/api/lever/saveApiKey': ['manage_job'],
  '/api/lever/getCandidates': ['manage_job'],
  '/api/ashby/getPostings': ['manage_job'],
  '/api/ashby/saveApiKey': ['manage_company'],
  '/api/scheduling/fetchUserDetails': ['scheduling_module'],
  '/api/scheduling/fetch_interview_session_task': ['scheduling_module'],
  '/api/scheduling/fetch_activities': ['authorized'],
  '/api/scheduling/get_interview_modules': ['scheduling_module'],
  '/api/scheduling/fetch_interview_module_by_id': ['scheduling_module'],
  // scheduling application apis
  '/api/scheduling/application/sendtocandidate': ['scheduling_module'],
  '/api/scheduling/application/cancelschedule': ['scheduling_module'],
  '/api/scheduling/application/schedulewithagentwithouttaskid': [
    'scheduling_module',
  ],
  '/api/scheduling/get-accesstoken': ['scheduling_module'],
  '/api/email-outreach/get-user-email': ['scheduling_module'],
  '/api/scheduling/application/schedulewithagent': ['scheduling_module'],
  //v1 apis
  '/api/scheduling/v1/get-candidate-selected-slots': ['scheduling_module'],
  '/api/scheduling/v1/event_attendee_status': ['scheduling_module'],
  // request availability apis
  '/api/scheduling/request_availability/getCandidateRequestData': [
    'scheduling_module',
  ],
  '/api/scheduling/request_availability/getTaskIdDetailsByRequestId': [
    'scheduling_module',
  ],
  '/api/scheduling/get_interviewer_and_modules': ['scheduling_module'],
  '/api/scheduling/request_availability/insertScheduleActivities': [
    'scheduling_module',
  ],
  '/api/scheduling/request_availability/insertTaskProgress': [
    'scheduling_module',
  ],
  // '/api/scheduling/request_availability/updateRequestAvailability': [
  //   'scheduling_module',
  //   'scheduler_create',
  // ], //
  '/api/scheduling/request_availability/candidateAvailability/getMeetings': [
    'scheduling_module',
  ],
  '/api/scheduling/request_availability/candidateAvailability/getScheduleMeetings':
    ['scheduling_module'],
  '/api/scheduling/get_interview_training_progress': ['scheduling_module'],
  // request availability mail apis
  '/api/emails/sendAvailabilityRequest_email_applicant': ['scheduling_module'],
  // '/api/scheduling/v1/find-alternative-time-slots': ['scheduler_update'], //
  // '/api/scheduling/v1/update_meeting_interviewers': ['scheduler_update'], //
  // '/api/request_feedback': ['scheduler_update'], //
  '/api/scheduling/application/fetchfeedbackdetails': [
    'scheduling_module',
    'task_module',
  ],
  '/api/emails/sendAvailReqReminder_email_applicant': [
    'scheduling_module',
    'task_module',
  ],
  '/api/encryptData': ['integrations_module', 'manage_company'],
  '/api/emails/selfScheduleReminder_email_applicant': ['scheduling_module'],
  '/api/emails/availabilityReqResend_email_candidate': ['scheduling_module'],
  '/api/scheduling/v1/booking/confirm-recruiter-selected-option': [
    'scheduling_module',
  ],
  '/api/emails/confirmInterview_email_applicant': ['scheduling_module'],
  '/api/emails/preview': ['scheduling_module'],
  '/api/get_last_login': ['view_users'],
  '/api/setMembersWithRole': ['manage_users'],
  '/api/getRoleAndPermissions': ['view_roles'],
  '/api/scheduling/application/fetchcandidatedetails': ['scheduling_module'],
  '/api/setRoleAndPermission': ['manage_roles'],
  '/api/getUserDetails': ['authorized'],
  '/api/invite_user': ['view_users'],
  '/api/invite_user/resend': ['view_users'],
  '/api/decryptApiKey': ['manage_company'],
  '/api/supabase/deleteuser': ['manage_users'],
  '/api/request_feedback': ['scheduling_module'],
  '/api/workflow-cron/execute': ['workflow_module'],
  '/api/ai/queryToJson': ['scheduling_module'],
  '/api/integrations/greenhouse': ['authorized'],
  '/api/integrations/greenhouse/sync/interview_plans': ['manage_job'],
  '/api/integrations/greenhouse/sync/job': ['manage_job'],
  '/api/integrations/greenhouse/sync/user': ['integrations_module'],
  '/api/integrations/greenhouse/sync/departments': ['integrations_module'],
  '/api/integrations/greenhouse/sync/office_locations': ['integrations_module'],
  '/api/agent-workflow/interviewer-decline': ['authorized'],
};

export default PERMISSIONS;
