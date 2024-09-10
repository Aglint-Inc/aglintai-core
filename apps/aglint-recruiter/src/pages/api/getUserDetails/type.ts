import { type getRecruiterDetails } from './index';

export type GetUserDetailsAPI = {
  request: object;
  response: Awaited<ReturnType<typeof getRecruiterDetails>> & {
    primary: boolean;
  };
};
