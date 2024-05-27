type Params = Partial<{ [id: string]: string | number | boolean | null }>;
const pageRouteBuilder = (
  routes: string[],
  ...args: Args<Params, Params>
): string => {
  const safeDynamicPaths = Object.values(args[0] ?? {}).map((path) => path);
  const safeQueries = Object.entries(args[1] ?? {})
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return `${[...routes, ...safeDynamicPaths].join('/')}${safeQueries ? `?${safeQueries}` : ''}`;
};

type Args<
  T extends Params = undefined,
  U extends Params = undefined,
> = Parameters<
  (
    // eslint-disable-next-line no-unused-vars
    dynamicPaths?: T,
    // eslint-disable-next-line no-unused-vars
    queries?: U,
  ) => void
>;

const agentJobs = {
  '/agent/jobs': (...args: Args) =>
    pageRouteBuilder([agent['/agent'](), 'jobs'], ...args),
  '/agent/jobs/[id]': (...args: Args<{ id: string }>) =>
    pageRouteBuilder([agentJobs['agent/jobs']()], ...args),
} as const;

const agent = {
  '/agent': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'agent'], ...args),
  '/agent/scheduler': (...args: Args) =>
    pageRouteBuilder([agent['/agent'](...args), 'scheduler'], ...args),
  '/agent/sourcing': (...args: Args) =>
    pageRouteBuilder([agent['/agent'](), 'sourcing'], ...args),
  ...agentJobs,
} as const;

const assementNew = {
  '/assessment-new': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'assessment-new'], ...args),
  '/assessment-new/[id]': (args: { id: string }) =>
    pageRouteBuilder([assementNew['/assessment-new']()], args),
} as const;

const assessmentThanks = {
  '/assessment-thanks': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'assessment-thanks'], ...args),
  '/assessment-thanks/[assessment_id]': (args: { assessment_id: string }) =>
    pageRouteBuilder([assessmentThanks['/assessment-thanks']()], args),
} as const;

const assisstant = {
  '/assisstant': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'assisstant'], ...args),
};

const auth = {
  '/auth/microsoft': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'auth/microsoft'], ...args),
  '/auth/zoom': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'auth/zoom'], ...args),
} as const;

const authCal = {
  '/auth-cal/google': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'auth-cal/google'], ...args),
} as const;

const authEmail = {
  '/auth-email/google': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'auth-email/google'], ...args),
} as const;

const candidateAssessment = {
  '/candidate-assessment': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'candidate-assessment'], ...args),
  '/candidate-assessment/[application_id]/[assessment_id]': (
    args: Args<{
      application_id: string;
      assessment_id: string;
    }>,
  ) =>
    pageRouteBuilder(
      [candidateAssessment['candidate-assessment'](...args)],
      ...args,
    ),
} as const;

const candidatePhoneScreening = {
  '/candidate-phone-screening': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'candidate-phone-screening'], ...args),
} as const;

const candidates = {
  '/candidates': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'candidates'], ...args),
  '/candidates/aglintdb': (...args: Args) =>
    pageRouteBuilder([candidates['/candidates'](...args), 'aglintdb'], ...args),
  '/candidates/history': (...args: Args) =>
    pageRouteBuilder([candidates['/candidates'](...args), 'history'], ...args),
  '/candidates/search': (...args: Args) =>
    pageRouteBuilder([candidates['/candidates'](...args), 'search'], ...args),
} as const;

const company = {
  '/company': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'company'], ...args),
} as const;

const companyPostings = {
  '/company-postings/[id]': (...args: Args<{ id: string }>) =>
    pageRouteBuilder([ROUTES.app()], ...args),
} as const;

const forgotPassword = {
  '/forgot-password': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'forgot-password'], ...args),
} as const;

const integrations = {
  '/integrations': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'integrations'], ...args),
} as const;

const interview = {
  '/interview/feedback': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'interview/feedback'], ...args),
};

const jobAssistant = {
  '/job-assistant/[id]': (...args: Args<{ id: string }>) =>
    pageRouteBuilder([ROUTES.app(), 'job-assistant'], ...args),
} as const;

const jobPost = {
  '/job-post/[id]': (...args: Args<{ id: string }>) =>
    pageRouteBuilder([ROUTES.app(), 'job-post'], ...args),
} as const;

const jobPostAssistant = {
  '/job-post-assistant/[company_id]': (
    ...args: Args<{
      company_id: string;
    }>
  ) => pageRouteBuilder([ROUTES.app(), 'job-post-assistant'], ...args),
} as const;

const jobsById = {
  '/jobs/[id]': (...args: Args<{ id: string }>) =>
    pageRouteBuilder([jobs['/jobs']()], ...args),
  '/jobs/[id]/agent': (...args: Args<{ id: string }>) =>
    pageRouteBuilder(
      [jobsById['/jobs/[id]']({ ...args[0] }), 'agent'],
      ...args,
    ),
  '/jobs/[id]/assessment': (...args: Args<{ id: string }>) =>
    pageRouteBuilder(
      [jobsById['/jobs/[id]']({ ...args[0] }), 'assessment'],
      ...args,
    ),
  '/jobs/[id]/candidate-list': (...args: Args<{ id: string }>) =>
    pageRouteBuilder(
      [jobsById['/jobs/[id]']({ ...args[0] }), 'candidate-list'],
      ...args,
    ),
  '/jobs/[id]/email-templates': (...args: Args<{ id: string }>) =>
    pageRouteBuilder(
      [jobsById['/jobs/[id]']({ ...args[0] }), 'email-templates'],
      ...args,
    ),
  '/jobs/[id]/interview-plan': (...args: Args<{ id: string }>) =>
    pageRouteBuilder(
      [jobsById['/jobs/[id]']({ ...args[0] }), 'interview-plan'],
      ...args,
    ),
  '/jobs/[id]/profile-score': (...args: Args<{ id: string }>) =>
    pageRouteBuilder(
      [jobsById['/jobs/[id]']({ ...args[0] }), 'profile-score'],
      ...args,
    ),
  '/jobs/[id]/screening': (...args: Args<{ id: string }>) =>
    pageRouteBuilder(
      [jobsById['/jobs/[id]']({ ...args[0] }), 'screening'],
      ...args,
    ),
  '/jobs/[id]/hiring-team': (...args: Args<{ id: string }>) =>
    pageRouteBuilder(
      [jobsById['/jobs/[id]']({ ...args[0] }), 'hiring-team'],
      ...args,
    ),
  '/jobs/[id]/job-details': (...args: Args<{ id: string }>) =>
    pageRouteBuilder(
      [jobsById['/jobs/[id]']({ ...args[0] }), 'job-details'],
      ...args,
    ),
} as const;

const jobs = {
  '/jobs': (...args: Args<{ lk: string }>) =>
    pageRouteBuilder([ROUTES.app(), 'jobs'], ...args),
  '/jobs/create': (...args: Args) =>
    pageRouteBuilder([jobs['/jobs'](), 'create'], ...args),
  '/jobs/edit': (...args: Args) =>
    pageRouteBuilder([jobs['/jobs'](), 'edit'], ...args),
  '/jobs/new': (...args: Args) =>
    pageRouteBuilder([jobs['/jobs'](), 'new'], ...args),
  ...jobsById,
} as const;

const loading = {
  '/loading': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'loading'], ...args),
} as const;

const login = {
  '/login': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'login'], ...args),
} as const;

const notifications = {
  '/notifications': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'notifications'], ...args),
} as const;

const previewAssessment = {
  '/preview-assessment': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'preview-assessment'], ...args),
  '/preview-assessment/[job_id]/[assessment_id]': (
    ...args: Args<{
      job_id: string;
      assessment_id: string;
    }>
  ) => pageRouteBuilder([previewAssessment['preview-assessment']()], ...args),
} as const;

const profile = {
  '/profile': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'profile'], ...args),
} as const;

const profileLink = {
  '/profile-link/[id]': (...args: Args<{ id: string }>) =>
    pageRouteBuilder([ROUTES.app(), 'profile-link'], ...args),
} as const;

const resetPassword = {
  '/reset-password': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'reset-password'], ...args),
} as const;

const scheduling = {
  '/scheduling': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'scheduling'], ...args),
  '/scheduling/application/[application_id]': (
    ...args: Args<{
      application_id: string;
    }>
  ) => pageRouteBuilder([scheduling['/scheduling'](), 'application'], ...args),
  '/scheduling/interviewer/[member_id]': (
    ...args: Args<{
      member_id: string;
    }>
  ) => pageRouteBuilder([scheduling['/scheduling'](), 'interviewer'], ...args),
  '/scheduling/invite/[id]': (...args: Args<{ id: string }>) =>
    pageRouteBuilder([scheduling['/scheduling'](), 'invite'], ...args),
  '/scheduling/module/members/[module_id]': (
    ...args: Args<{
      module_id: string;
    }>
  ) =>
    pageRouteBuilder(
      [scheduling['/scheduling'](), 'module', 'members'],
      ...args,
    ),
  '/scheduling/module/IProgressDrawer': (...args: Args) =>
    pageRouteBuilder(
      [scheduling['/scheduling'](), 'module', 'IProgressDrawer'],
      ...args,
    ),
  '/scheduling/module/[module_id]': (...args: Args<{ module_id: string }>) =>
    pageRouteBuilder([scheduling['/scheduling'](), 'module'], ...args),
  '/scheduling/view': (...args: Args) =>
    pageRouteBuilder([scheduling['/scheduling'](), 'view'], ...args),
} as const;

const screening = {
  '/screening': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'screening'], ...args),
  '/screening/[id]': (...args: Args<{ id: string }>) =>
    pageRouteBuilder([screening['/screening']()], ...args),
} as const;

const screeningDashboard = {
  '/screening-dashboard': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'screening-dashboard'], ...args),
} as const;

const signup = {
  '/signup': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'signup'], ...args),
} as const;

const support = {
  '/support': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'support'], ...args),
  '/support/create': (...args: Args) =>
    pageRouteBuilder([support['/support'](), 'create'], ...args),
  '/support/[id]': (...args: Args<{ id: string }>) =>
    pageRouteBuilder([support['/support']()], ...args),
} as const;

const tasks = {
  '/tasks': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'tasks'], ...args),
} as const;

const thanksPage = {
  '/thanks-page': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'thanks-page'], ...args),
} as const;

const workflowsById = {
  '/workflows/[id]': (...args: Args<{ id: string }>) =>
    pageRouteBuilder([workflows['/workflows']()], ...args),
} as const;

const workflows = {
  '/workflows': (...args: Args) =>
    pageRouteBuilder([ROUTES.app(), 'workflows'], ...args),
  ...workflowsById,
} as const;

const ROUTES = {
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
  ...workflows,
} as const;

export default ROUTES;
