import type { TableType } from "./index.types";

export type CustomIntegrations = TableType<
  "integrations",
  { greenhouse_metadata: CustomGreenhouseMetadata }
>;

type CustomGreenhouseMetadata = {
  options: Partial<{
    jobs: boolean;
    users: boolean;
    task_sync: boolean;
    candidates: boolean;
    departments: boolean;
    applications: boolean;
    interview_stages: boolean;
    office_locations: boolean;
  }>;
  last_sync: Partial<{
    full: string;
    jobs: string;
    users: string;
    full_sync: string;
  }>;
};
