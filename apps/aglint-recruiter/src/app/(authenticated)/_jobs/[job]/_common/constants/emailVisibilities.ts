import { Application } from '@/types/applications.types';

export const EMAIL_VISIBILITIES: {
  // eslint-disable-next-line no-unused-vars
  [_id in Application['status']]: Application['status'][];
} = {
  new: ['disqualified'],
  screening: ['new'],
  assessment: ['new', 'screening'],
  interview: ['new', 'screening', 'assessment'],
  qualified: ['new', 'screening', 'assessment', 'interview'],
  disqualified: ['new', 'screening', 'assessment', 'interview', 'qualified'],
};
