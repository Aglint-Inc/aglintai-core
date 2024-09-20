export type GreenHouseUserSyncAPI = {
  request: {
    recruiter_id: string;
    last_sync?: string;
    key: string;
  };
  response: {
    success: boolean;
  };
};
