import type { TableType } from "./index.types";

export type CustomIntegrations = TableType<
  "integrations",
  { greenhouse_metadata: CustomGreenhouseMetadata }
>;

type CustomGreenhouseMetadata = {
  options: Record<string, boolean>;
  last_sync: Record<string, string>;
};
