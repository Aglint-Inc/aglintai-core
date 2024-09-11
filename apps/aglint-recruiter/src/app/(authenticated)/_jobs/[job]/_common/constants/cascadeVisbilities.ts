import type { Application } from '@/types/applications.types';

export const CASCADE_VISIBILITIES: {
  // eslint-disable-next-line no-unused-vars
  [_id in Application['status']]: Application['status'][];
} = {
  new: ['new', 'interview', 'qualified', 'disqualified'],
  interview: ['interview', 'qualified', 'disqualified'],
  qualified: ['qualified', 'disqualified'],
  disqualified: ['disqualified'],
};
