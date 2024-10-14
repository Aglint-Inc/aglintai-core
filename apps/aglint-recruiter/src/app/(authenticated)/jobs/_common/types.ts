import type { API } from '@/server/api/root';

export type Job = API['jobs']['job']['read']['output'];

export type JobCreate = Omit<API['jobs']['create']['aglint']['input'], 'id'>;

export type Form = Partial<{
  [id in keyof JobCreate]: {
    value: JobCreate[id];
    required: boolean;
    placeholder?: string;
    error: {
      value: boolean;
      helper: string;
    };
  };
}>;

export type JobHiringTeamForm = Pick<
  Required<Form>,
  'hiring_manager' | 'recruiter' | 'recruiting_coordinator' | 'sourcer'
>;

export type JobDetailsForm = Required<Omit<Form, keyof JobHiringTeamForm>>;
