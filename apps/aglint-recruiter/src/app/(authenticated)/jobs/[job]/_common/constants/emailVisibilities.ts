import type { Application } from '@/types/applications.types';

export const EMAIL_VISIBILITIES: {
  // eslint-disable-next-line no-unused-vars
  [_id in Application['status']]: Application['status'][];
} = {
  new: ['disqualified'],
  interview: ['new'],
  qualified: ['new', 'interview'],
  disqualified: ['new', 'interview', 'qualified'],
};
