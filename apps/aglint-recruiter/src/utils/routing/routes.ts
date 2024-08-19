const pageRouteBuilder = (routes: string[]): string => {
  return routes.join('/');
};
const agentJobs = {
  '/agent/jobs': () => pageRouteBuilder([agent['/agent'](), 'jobs']),
  '/agent/jobs/[id]': ({ id }: { id: string }) =>
    pageRouteBuilder([agentJobs['agent/jobs'](), id]),
} as const;
const agent = {
  '/agent': () => pageRouteBuilder([ROUTES.app(), 'agent']),
  '/agent/scheduler': () => pageRouteBuilder([agent['/agent'](), 'scheduler']),
  '/agent/sourcing': () => pageRouteBuilder([agent['/agent'](), 'sourcing']),
  ...agentJobs,
} as const;
const assementNew = {
  '/assessment-new': () => pageRouteBuilder([ROUTES.app(), 'assessment-new']),
  '/assessment-new/[id]': ({ id }: { id: string }) =>
    pageRouteBuilder([assementNew['/assessment-new'](), id]),
} as const;
const assessmentThanks = {
  '/assessment-thanks': () =>
    pageRouteBuilder([ROUTES.app(), 'assessment-thanks']),
  '/assessment-thanks/[assessment_id]': ({
    assessment_id,
  }: {
    assessment_id: string;
  }) =>
    pageRouteBuilder([assessmentThanks['/assessment-thanks'](), assessment_id]),
} as const;

const assistant = {
  '/assistant': () => pageRouteBuilder([ROUTES.app(), 'assistant']),
};
const auth = {
  '/auth/microsoft': () => pageRouteBuilder([ROUTES.app(), 'auth/microsoft']),
  '/auth/zoom': () => pageRouteBuilder([ROUTES.app(), 'auth/zoom']),
} as const;
const authCal = {
  '/auth-cal/google': () => () =>
    pageRouteBuilder([ROUTES.app(), 'auth-cal/google']),
} as const;
const authEmail = {
  '/auth-email/google': () => () =>
    pageRouteBuilder([ROUTES.app(), 'auth-email/google']),
} as const;
const candidateAssessment = {
  '/candidate-assessment': () =>
    pageRouteBuilder([ROUTES.app(), 'candidate-assessment']),
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
    pageRouteBuilder([ROUTES.app(), 'candidate-phone-screening']),
} as const;
const candidates = {
  '/candidates': () => pageRouteBuilder([ROUTES.app(), 'candidates']),
  '/candidates/aglintdb': () =>
    pageRouteBuilder([candidates['/candidates'](), 'aglintdb']),
  '/candidates/history': () =>
    pageRouteBuilder([candidates['/candidates'](), 'history']),
  '/candidates/search': () =>
    pageRouteBuilder([candidates['/candidates'](), 'search']),
} as const;
const company = {
  '/company': () => pageRouteBuilder([ROUTES.app(), 'company']),
} as const;
const companyPostings = {
  '/company-postings/[id]': ({ id }: { id: string }) =>
    pageRouteBuilder([ROUTES.app(), 'company-postings', id]),
} as const;
const forgotPassword = {
  '/forgot-password': () => pageRouteBuilder([ROUTES.app(), 'forgot-password']),
} as const;
const integrations = {
  '/integrations': () => pageRouteBuilder([ROUTES.app(), 'integrations']),
} as const;
const interview = {
  '/interview/feedback': () =>
    pageRouteBuilder([ROUTES.app(), 'interview/feedback']),
};
const jobAssistant = {
  '/job-assistant/[id]': ({ id }: { id: string }) =>
    pageRouteBuilder([ROUTES.app(), 'job-assistant', id]),
} as const;
const jobPost = {
  '/job-post/[id]': ({ id }: { id: string }) =>
    pageRouteBuilder([ROUTES.app(), 'job-post', id]),
} as const;
const jobPostAssistant = {
  '/job-post-assistant/[company_id]': ({
    company_id,
  }: {
    company_id: string;
  }) => pageRouteBuilder([ROUTES.app(), 'job-post-assistant', company_id]),
} as const;
const jobsById = {
  '/jobs/[id]': ({ id }: { id: string }) =>
    pageRouteBuilder([jobs['/jobs'](), id]),
  '/jobs/[id]/application/[application_id]': ({
    id,
    application_id,
  }: {
    id: string;
    application_id: string;
  }) =>
    pageRouteBuilder([
      pageRouteBuilder([jobs['/jobs'](), id]),
      'application',
      application_id,
    ]),
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
  '/jobs/[id]/workflows': ({ id }: { id: string }) =>
    pageRouteBuilder([jobsById['/jobs/[id]']({ id }), 'workflows']),
} as const;
const jobs = {
  '/jobs': () => pageRouteBuilder([ROUTES.app(), 'jobs']),
  '/jobs/create': () => pageRouteBuilder([jobs['/jobs'](), 'create']),
  '/jobs/edit': () => pageRouteBuilder([jobs['/jobs'](), 'edit']),
  '/jobs/new': () => pageRouteBuilder([jobs['/jobs'](), 'new']),
  ...jobsById,
} as const;
const loading = {
  '/loading': () => pageRouteBuilder([ROUTES.app(), 'loading']),
} as const;
const login = {
  '/login': () => pageRouteBuilder([ROUTES.app(), 'login']),
} as const;
const notifications = {
  '/notifications': () => pageRouteBuilder([ROUTES.app(), 'notifications']),
} as const;
const previewAssessment = {
  '/preview-assessment': () =>
    pageRouteBuilder([ROUTES.app(), 'preview-assessment']),
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

const user = {
  '/user/profile/[user_id]': ({ user_id }: { user_id: string }) =>
    pageRouteBuilder([
      pageRouteBuilder([ROUTES.app(), 'user']),
      'profile',
      user_id,
    ]),
} as const;
const profile = {
  '/profile': () => pageRouteBuilder([ROUTES.app(), 'profile']),
} as const;
const profileLink = {
  '/profile-link/[id]': ({ id }: { id: string }) =>
    pageRouteBuilder([ROUTES.app(), 'profile-link', id]),
} as const;
const resetPassword = {
  '/reset-password': () => pageRouteBuilder([ROUTES.app(), 'reset-password']),
} as const;
const scheduling = {
  '/scheduling': () => pageRouteBuilder([ROUTES.app(), 'scheduling']),
  '/scheduling/application': () =>
    pageRouteBuilder([ROUTES.app(), '/scheduling/application']),
  '/scheduling/interviewer': () =>
    pageRouteBuilder([ROUTES.app(), '/scheduling/interviewer']),
  '/scheduling/interview-types': () =>
    pageRouteBuilder([ROUTES.app(), '/scheduling/interview-types']),
  '/scheduling/interview-types/[type_id]': ({ type_id }: { type_id: string }) =>
    pageRouteBuilder([scheduling['/scheduling'](), 'interview-types', type_id]),
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
  '/screening': () => pageRouteBuilder([ROUTES.app(), 'screening']),
  '/screening/[id]': ({ id }: { id: string }) =>
    pageRouteBuilder([screening['/screening'](), id]),
} as const;
const screeningDashboard = {
  '/screening-dashboard': () =>
    pageRouteBuilder([ROUTES.app(), 'screening-dashboard']),
} as const;
const signup = {
  '/signup': () => pageRouteBuilder([ROUTES.app(), 'signup']),
} as const;
const support = {
  '/support': () => pageRouteBuilder([ROUTES.app(), 'support']),
  '/support/create': () => pageRouteBuilder([support['/support'](), 'create']),
  '/support/[id]': ({ id }: { id: string }) =>
    pageRouteBuilder([support['/support'](), id]),
} as const;
const tasks = {
  '/tasks': () => pageRouteBuilder([ROUTES.app(), 'tasks']),
} as const;
const thanksPage = {
  '/thanks-page': () => pageRouteBuilder([ROUTES.app(), 'thanks-page']),
} as const;
const workflowsById = {
  '/workflows/[id]': ({ id }: { id: string }) =>
    pageRouteBuilder([workflows['/workflows'](), id]),
} as const;
const workflows = {
  '/workflows': () => pageRouteBuilder([ROUTES.app(), 'workflows']),
  ...workflowsById,
} as const;
const requests = {
  '/requests': () => pageRouteBuilder([ROUTES.app(), 'requests']),
} as const;
const ROUTES = {
  app: () => '',
  ...agent,
  ...assementNew,
  ...assessmentThanks,
  ...assistant,
  ...auth,
  ...authCal,
  ...authEmail,
  ...candidateAssessment,
  ...candidatePhoneScreening,
  ...candidates,
  ...company,
  ...companyPostings,
  ...forgotPassword,
  ...integrations,
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
  ...tasks,
  ...thanksPage,
  ...user,
  ...workflows,
  ...requests,
} as const;
export default ROUTES;
