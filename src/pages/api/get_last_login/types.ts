export type API_get_last_login = {
  request: {
    ids: string[];
    recruiter_id: string;
  };
  response:
    | {
        data: { id: string; last_login: string }[];
        error: null;
      }
    | {
        data: null;
        error: string;
      };
};
