export type GreenHouseApplicationsAPI = {
  request: {
    job_id: string;
    key: string;
    recruiter_id: string;
    remote_id: number;
    last_sync?: string;
  };
  response: {
    success: boolean;
  };
};
