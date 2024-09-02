import { type useApplication } from '.';

type UseApplication = typeof useApplication;

export type ApplicationDetails<
  T extends keyof Pick<ReturnType<UseApplication>, 'details' | 'meta'>,
> = ReturnType<UseApplication>[T]['data'];
