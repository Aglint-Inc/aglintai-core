import type { Api } from '@/server/api/root';

export type Job = Api['jobs']['job']['read'];

export type JobCreate = Required<
  Job['draft'] &
    Pick<
      Job,
      'hiring_manager' | 'recruiter' | 'recruiting_coordinator' | 'sourcer'
    >
>;

export type JobHiringTeamForm = Pick<
  Required<Form>,
  'hiring_manager' | 'recruiter' | 'recruiting_coordinator' | 'sourcer'
>;

export type Form = Partial<{
  [id in keyof Omit<JobCreate, 'jd_json' | 'description_hash'>]: {
    value: JobCreate[id];
    required: boolean;
    placeholder?: string;
    error: {
      value: boolean;
      helper: string;
    };
  };
}>;

export type JobDetailsForm = Required<Omit<Form, keyof JobHiringTeamForm>>;

export type HiringTeamValidity = {
  validity: boolean;
  invalidFields: (keyof Pick<
    JobHiringTeamForm,
    'hiring_manager' | 'recruiter'
  >)[];
  message: string;
};
