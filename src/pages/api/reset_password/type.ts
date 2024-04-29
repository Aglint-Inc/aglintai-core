export type API_reset_password = {
  request: {
    email: string;
  };
  response:
    | {
        passwordReset: boolean;
        error: null;
      }
    | {
        passwordReset: null;
        error: string;
      };
};
