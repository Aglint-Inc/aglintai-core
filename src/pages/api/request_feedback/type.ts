export type API_request_feedback = {
  request: {
    session_id: string;
    relation_id: string;
    job_id: string;
    receiver: { name: string; email: string };
    candidate: { name: string; email: string };
  };
  response:
    | {
        mailSent: boolean;
        error: null;
      }
    | {
        mailSent: null;
        error: string;
      };
};
