export const pageRoutes = Object.freeze({
  LOGIN: '/login',
  COACH_LOGIN: '/coach/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESETPASSWORD: '/reset-password',
  REFERRAL: '/referral',
  ONBOARDING: '/onboarding',
  HOMEPAGE: '/',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  Career_COACH: '/career-coach',
  TOOLBOX: '/toolbox',

  INTERVIEW: '/interview',
  MOCK_INTERVIEW: '/interview/mock-interview',
  INTERVIEW_HISTORY: '/interview/history',
  INTERVIEW_COMMONLY_ASKED_QUESTIONS: '/interview/commonly-asked-questions',
  MOCK_TEST: '/interview/mock-test',

  COVER_LETTER: '/cover-letter',
  COVER_LETTER_CREATE: '/cover-letter/create',

  RESUME: '/resume',
  // RESUME_BUILDER: '/resume/builder',
  RESUME_Favorite: '/resume/favorite',
  RESUME_JD_MATCH: '/resume/jd-match',
  RESUME_ANALYSIS: '/resume/analysis',

  JOBS: '/jobs',
  JOB_TRACKER: '/jobs/tracker',
  JOBS_EMAIL_FOLLOWUP: '/jobs/email-followup',
  JOBS_REMINDER: '/jobs/reminder',
  JOBS_CONTACTS: '/jobs/contacts',
  JOBS_ORGANIZATION: '/jobs/organisation',

  PULSE: '/pulse',
  FEEDBACK: '/feedback',
  SESSION_FEEDBACK: '/session-feedback',

  SETTINGS: '/settings',
  NOTIFICATIONS: '/notifications',
});

export const routerQuery = Object.freeze({
  CREATE_RESUME_SCRATCH: 'createResumeScratch',
  CREATE_RESUME_LINKEDIN: 'createResumeLinkedIn',
  CREATE_RESUME_UPLOAD: 'createResumeUpload',
  REVIEW_RESUME: 'reviewResume',
});
