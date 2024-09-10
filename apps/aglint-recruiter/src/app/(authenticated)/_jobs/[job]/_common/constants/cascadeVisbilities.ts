import { Application } from '@/types/applications.types';

export const CASCADE_VISIBILITIES: {
  // eslint-disable-next-line no-unused-vars
  [id in Application['status']]: Application['status'][];
} = {
  new: [
    'new',
    'screening',
    'assessment',
    'interview',
    'qualified',
    'disqualified',
  ],
  screening: [
    'screening',
    'assessment',
    'interview',
    'qualified',
    'disqualified',
  ],
  assessment: ['assessment', 'interview', 'qualified', 'disqualified'],
  interview: ['interview', 'qualified', 'disqualified'],
  qualified: ['qualified', 'disqualified'],
  disqualified: ['disqualified'],
};
