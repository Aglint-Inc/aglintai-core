export const TYPE_SAFE_PARAMS = {
  'pages': {
    '/integrations/[platform]': [
      'platform'
    ],
    '/interview-pool/[pool]': [
      'pool'
    ],
    '/jobs/[job]/candidate-plan': [
      'job'
    ],
    '/jobs/[job]/email-templates': [
      'job'
    ],
    '/jobs/[job]/hiring-team': [
      'job'
    ],
    '/jobs/[job]/interview-plan': [
      'job'
    ],
    '/jobs/[job]/job-details': [
      'job'
    ],
    '/jobs/[job]/profile-score': [
      'job'
    ],
    '/jobs/[job]/workflows': [
      'job'
    ],
    '/jobs/[job]/metrics': [
      'job'
    ],
    '/jobs/[job]': [
      'job'
    ],
    '/jobs/[job]/[application]': [
      'job',
      'application'
    ],
    '/requests/[request]': [
      'request'
    ],
    '/user/[user]': [
      'user'
    ],
    '/workflows/[workflow]': [
      'workflow'
    ],
    '/candidate/[application]/home': [
      'application'
    ],
    '/candidate/[application]/interviews': [
      'application'
    ],
    '/candidate/[application]/messages': [
      'application'
    ],
    '/candidate/[application]/profile': [
      'application'
    ],
    '/candidate/[application]/login': [
      'application'
    ],
    '/company-postings/[id]': [
      'id'
    ],
    '/job-post/[id]': [
      'id'
    ],
    '/request-availability/[request_id]': [
      'request_id'
    ],
    '/self-scheduling/[filter]': [
      'filter'
    ]
  },
  'api': {}
} as const
