export type GreenHouseJobsSyncAPI = {
  request: {
    recruiter_id: string;
    key: string;
    last_sync?: string;
  };
  response: {
    success: boolean;
  };
};

