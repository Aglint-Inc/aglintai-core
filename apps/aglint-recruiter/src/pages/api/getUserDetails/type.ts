import { type getRecruiterDetails } from './index';

export type GetUserDetailsAPI = {
  request: {};
  response: Awaited<ReturnType<typeof getRecruiterDetails>> & {
    primary: boolean;
  };
};
