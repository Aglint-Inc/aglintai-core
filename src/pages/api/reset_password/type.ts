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
        passwordRest: false;
        error: string;
      };
};
