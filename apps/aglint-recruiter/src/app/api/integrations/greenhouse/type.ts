export type GreenhouseAPI = {
  GET: {
    request: {};
    response: Record<string, boolean>;
  };
  POST: {
    request: Record<string, boolean>;
    response: Record<string, boolean>;
  };
};
