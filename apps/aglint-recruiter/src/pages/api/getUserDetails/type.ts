import { type getRecruiterDetails } from './index';

export type GetUserDetailsAPI = {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  request: {};
  response: Awaited<ReturnType<typeof getRecruiterDetails>> & {
    primary: boolean;
  };
};
