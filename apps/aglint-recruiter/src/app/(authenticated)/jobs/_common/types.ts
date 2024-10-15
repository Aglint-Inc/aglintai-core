import type { Aglint } from '@/routers/jobs/create/aglint';
import type { Read } from '@/routers/jobs/job/read';

export type Job = Read['output'];

export type JobCreate = Omit<Aglint['input'], 'id'>;

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
