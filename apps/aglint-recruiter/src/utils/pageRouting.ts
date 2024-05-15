export const pageRoutes = Object.freeze({
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESETPASSWORD: '/reset-password',
  HOMEPAGE: '/',
  DASHBOARD: '/agent',
  JOBS: '/jobs',
  CREATEJOB: '/jobs/create',
  JOBDASHBOARD: '/jobs/[id]',
  EDITJOB: '/jobs/[id]/edit',
  PROFILESCORE: '/jobs/[id]/profile-score',
  JOBASSESSMENT: '/jobs/[id]/assessment',
  JOBEMAILTEMPLATES: '/jobs/[id]/email-templates',
  JOBINTERVIEWPLAN: '/jobs/[id]/interview-plan',
  COMPANY: '/company',
  CANDIDATES: '/candidates/history',
  AGLINTDB: '/candidates/aglintdb',
  NOTIFICATIONS: '/notifications',
  SETTINGS: '/settings',
  PROFILE: '/profile',
  ProfileLink: '/profile-link',
  ASSESSMENTS: '/assessment-new',
  ASSESSMENT: '/assessment-new/[id]',
  MOCKTEST: '/assessment',
  CANDIDATE_ASSESSMENT: '/candidate-assessment',
  JOBPOST: '/job-post/',
  COMPANYPOSTINGS: '/company-postings/',
  SUPPORT: '/support',
  ASSISTANT: '/assistant',
  PHONESCREEN: '/candidate-phone-screening',
  LOADING: '/loading',
  SCHEDULING: '/scheduling',
  SCHEDULING_APPLICATION: '/scheduling/application/[application_id]',
  SCHEDULING_CANDIDATE_INVITE: '/scheduling/invite/[id]',
  SCHEDULINGINTERVIEWER: '/scheduling/interviewer',
  INTERVIEWMODULE: '/scheduling/module',
  CONFIRM_SCHEDULE: '/confirm-availability',
  INTERVIEWER: '/interviewer',
  AGENT: '/agent',
  SCREENING: '/screening',
  TASKS: '/tasks',
});

const pageRouteBuilder = (routes: string[]): string => {
  return routes.join('/');
};

const agentJobs = {
  '/agent/jobs': () => pageRouteBuilder([agent['/agent'](), 'jobs']),
  '/agent/jobs/[id]': ({ id }: { id: string }) =>
    pageRouteBuilder([agentJobs['agent/jobs'](), id]),
} as const;

const agent = {
  '/agent': () => pageRouteBuilder([pages.app(), 'agent']),
  '/agent/scheduler': () => pageRouteBuilder([agent['/agent'](), 'scheduler']),
  '/agent/sourcing': () => pageRouteBuilder([agent['/agent'](), 'sourcing']),
  ...agentJobs,
} as const;

const assementNew = {
  '/assessment-new': () => pageRouteBuilder([pages.app(), 'assessment-new']),
  '/assessment-new/[id]': ({ id }: { id: string }) =>
    pageRouteBuilder([assementNew['/assessment-new'](), id]),
} as const;

const assessmentThanks = {
  '/assessment-thanks': () =>
    pageRouteBuilder([pages.app(), 'assessment-thanks']),
  '/assessment-thanks/[assessment_id]': ({
    assessment_id,
  }: {
    assessment_id: string;
  }) =>
    pageRouteBuilder([assessmentThanks['/assessment-thanks'](), assessment_id]),
} as const;

const assisstant = {
  '/assisstant': () => pageRouteBuilder([pages.app(), 'assisstant']),
};

const auth = {
  '/auth/microsoft': () => pageRouteBuilder([pages.app(), 'auth/microsoft']),
  '/auth/zoom': () => pageRouteBuilder([pages.app(), 'auth/zoom']),
} as const;

const authCal = {
  '/auth-cal/google': () => () =>
    pageRouteBuilder([pages.app(), 'auth-cal/google']),
} as const;

const authEmail = {
  '/auth-email/google': () => () =>
    pageRouteBuilder([pages.app(), 'auth-email/google']),
} as const;

const candidateAssessment = {
  '/candidate-assessment': () =>
    pageRouteBuilder([pages.app(), 'candidate-assessment']),
  '/candidate-assessment/[application_id]/[assessment_id]': ({
    application_id,
    assessment_id,
  }: {
    application_id: string;
    assessment_id: string;
  }) =>
    pageRouteBuilder([
      candidateAssessment['candidate-assessment'](),
      application_id,
      assessment_id,
    ]),
} as const;

const candidatePhoneScreening = {
  '/candidate-phone-screening': () =>
    pageRouteBuilder([pages.app(), 'candidate-phone-screening']),
} as const;

const candidates = {
  '/candidates': () => pageRouteBuilder([pages.app(), 'candidates']),
  '/candidates/aglintdb': () =>
    pageRouteBuilder([candidates['/candidates'](), 'aglintdb']),
  '/candidates/history': () =>
    pageRouteBuilder([candidates['/candidates'](), 'history']),
  '/candidates/search': () =>
    pageRouteBuilder([candidates['/candidates'](), 'search']),
} as const;

const company = {
  '/company': () => pageRouteBuilder([pages.app(), 'company']),
} as const;

const companyPostings = {
  '/company-postings/[id]': ({ id }: { id: string }) =>
    pageRouteBuilder([pages.app(), id]),
} as const;

const forgotPassword = {
  '/forgot-password': () => pageRouteBuilder([pages.app(), 'forgot-password']),
} as const;

const intergrations = {
  '/intergrations': () => pageRouteBuilder([pages.app(), 'intergrations']),
} as const;

const interview = {
  '/interview/feedback': () =>
    pageRouteBuilder([pages.app(), 'interview/feedback']),
};

const jobAssistant = {
  '/job-assistant/[id]': ({ id }: { id: string }) =>
    pageRouteBuilder([pages.app(), 'job-assistant', id]),
} as const;

const jobPost = {
  '/job-post/[id]': ({ id }: { id: string }) =>
    pageRouteBuilder([pages.app(), 'job-post', id]),
} as const;

const jobPostAssistant = {
  '/job-post-assistant/[company_id]': ({
    company_id,
  }: {
    company_id: string;
  }) => pageRouteBuilder([pages.app(), 'job-post-assistant', company_id]),
} as const;

const jobsById = {
  '/jobs/[id]': ({ id }: { id: string }) =>
    pageRouteBuilder([jobs['/jobs'](), id]),
  '/jobs/[id]/agent': ({ id }: { id: string }) =>
    pageRouteBuilder([jobsById['/jobs/[id]']({ id }), 'agent']),
  '/jobs/[id]/assessment': ({ id }: { id: string }) =>
    pageRouteBuilder([jobsById['/jobs/[id]']({ id }), 'assessment']),
  '/jobs/[id]/candidate-list': ({ id }: { id: string }) =>
    pageRouteBuilder([jobsById['/jobs/[id]']({ id }), 'candidate-list']),
  '/jobs/[id]/email-templates': ({ id }: { id: string }) =>
    pageRouteBuilder([jobsById['/jobs/[id]']({ id }), 'email-templates']),
  '/jobs/[id]/interview-plan': ({ id }: { id: string }) =>
    pageRouteBuilder([jobsById['/jobs/[id]']({ id }), 'interview-plan']),
  '/jobs/[id]/profile-score': ({ id }: { id: string }) =>
    pageRouteBuilder([jobsById['/jobs/[id]']({ id }), 'profile-score']),
  '/jobs/[id]/screening': ({ id }: { id: string }) =>
    pageRouteBuilder([jobsById['/jobs/[id]']({ id }), 'screening']),
  '/jobs/[id]/hiring-team': ({ id }: { id: string }) =>
    pageRouteBuilder([jobsById['/jobs/[id]']({ id }), 'hiring-team']),
  '/jobs/[id]/job-details': ({ id }: { id: string }) =>
    pageRouteBuilder([jobsById['/jobs/[id]']({ id }), 'job-details']),
} as const;

const jobs = {
  '/jobs': () => pageRouteBuilder([pages.app(), 'jobs']),
  '/jobs/create': () => pageRouteBuilder([jobs['/jobs'](), 'create']),
  '/jobs/edit': () => pageRouteBuilder([jobs['/jobs'](), 'edit']),
  '/jobs/new': () => pageRouteBuilder([jobs['/jobs'](), 'new']),
  ...jobsById,
} as const;

const loading = {
  '/loading': () => pageRouteBuilder([pages.app(), 'loading']),
} as const;

const login = {
  '/login': () => pageRouteBuilder([pages.app(), 'login']),
} as const;

const notifications = {
  '/notifications': () => pageRouteBuilder([pages.app(), 'notifications']),
} as const;

const previewAssessment = {
  '/preview-assessment': () =>
    pageRouteBuilder([pages.app(), 'preview-assessment']),
  '/preview-assessment/[job_id]/[assessment_id]': ({
    job_id,
    assessment_id,
  }: {
    job_id: string;
    assessment_id: string;
  }) =>
    pageRouteBuilder([
      previewAssessment['preview-assessment'](),
      job_id,
      assessment_id,
    ]),
} as const;

const profile = {
  '/profile': () => pageRouteBuilder([pages.app(), 'profile']),
} as const;

const profileLink = {
  '/profile-link/[id]': ({ id }: { id: string }) =>
    pageRouteBuilder([pages.app(), 'profile-link', id]),
} as const;

const resetPassword = {
  '/reset-password': () => pageRouteBuilder([pages.app(), 'reset-password']),
} as const;

const scheduling = {
  '/scheduling': () => pageRouteBuilder([pages.app(), 'scheduling']),
  '/scheduling/application/[application_id]': ({
    application_id,
  }: {
    application_id: string;
  }) =>
    pageRouteBuilder([
      scheduling['/scheduling'](),
      'application',
      application_id,
    ]),
  '/scheduling/interviewer/[member_id]': ({
    member_id,
  }: {
    member_id: string;
  }) =>
    pageRouteBuilder([scheduling['/scheduling'](), 'interviewer', member_id]),
  '/scheduling/invite/[id]': ({ id }: { id: string }) =>
    pageRouteBuilder([scheduling['/scheduling'](), 'invite', id]),
  '/scheduling/module/members/[module_id]': ({
    module_id,
  }: {
    module_id: string;
  }) =>
    pageRouteBuilder([
      scheduling['/scheduling'](),
      'module',
      'members',
      module_id,
    ]),
  '/scheduling/module/IProgressDrawer': () =>
    pageRouteBuilder([
      scheduling['/scheduling'](),
      'module',
      'IProgressDrawer',
    ]),
  '/scheduling/module/[module_id]': ({ module_id }: { module_id: string }) =>
    pageRouteBuilder([scheduling['/scheduling'](), 'module', module_id]),
  '/scheduling/view': () =>
    pageRouteBuilder([scheduling['/scheduling'](), 'view']),
} as const;

const screening = {
  '/screening': () => pageRouteBuilder([pages.app(), 'screening']),
  '/screening/[id]': ({ id }: { id: string }) =>
    pageRouteBuilder([screening['/screening'](), id]),
} as const;

const screeningDashboard = {
  '/screening-dashboard': () =>
    pageRouteBuilder([pages.app(), 'screening-dashboard']),
} as const;

const signup = {
  '/signup': () => pageRouteBuilder([pages.app(), 'signup']),
} as const;

const support = {
  '/support': () => pageRouteBuilder([pages.app(), 'support']),
  '/support/create': () => pageRouteBuilder([support['/support'](), 'create']),
  '/support/[id]': ({ id }: { id: string }) =>
    pageRouteBuilder([support['/support'](), id]),
} as const;

const thanksPage = {
  '/thanks-page': () => pageRouteBuilder([pages.app(), 'thanks-page']),
};

export const pages = {
  app: () => '',
  ...agent,
  ...assementNew,
  ...assessmentThanks,
  ...assisstant,
  ...auth,
  ...authCal,
  ...authEmail,
  ...candidateAssessment,
  ...candidatePhoneScreening,
  ...candidates,
  ...company,
  ...companyPostings,
  ...forgotPassword,
  ...intergrations,
  ...interview,
  ...jobAssistant,
  ...jobPost,
  ...jobPostAssistant,
  ...jobs,
  ...loading,
  ...login,
  ...notifications,
  ...previewAssessment,
  ...profile,
  ...profileLink,
  ...resetPassword,
  ...scheduling,
  ...screening,
  ...screeningDashboard,
  ...signup,
  ...support,
  ...thanksPage,
} as const;
