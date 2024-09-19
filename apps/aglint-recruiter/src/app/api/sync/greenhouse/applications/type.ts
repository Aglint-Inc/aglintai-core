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

export type GreenhouseApplicationRemoteData = {
  id: number;
  email: string;
  phone: string;
  job_id: string;
  resume: string;
  company: string;
  linkedin: string;
  job_title: string;
  last_name: string;
  created_at: string;
  first_name: string;
  profile_image: null;
  application_id: string;
};
