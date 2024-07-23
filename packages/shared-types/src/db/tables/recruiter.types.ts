import type { CustomSchedulingSettings } from './common.types';
import type { TableType } from './index.types';

export type CustomRecruiter = TableType<
  'recruiter',
  {
    scheduling_settings: CustomSchedulingSettings;
    scheduling_reason: CustomSchedulingReason;
    office_locations: OfficeLocationType;
  }
>;

type CustomSchedulingReason = {
  internal?: {
    rescheduling?: string[];
    cancellation?: string[];
    decline?: string[];
  };
  candidate?: { rescheduling?: string[]; cancellation?: string[] };
} | null;

type OfficeLocationType = {
  city: string;
  line1: string;
  line2: string;
  region: string;
  country: string;
  zipcode: string;
  timezone: string;
  full_address: string;
  is_headquarter: boolean;
  location_header: string;
}[];
