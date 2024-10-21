import { type CustomSchedulingSettingsUser } from '@aglint/shared-types/src/db/tables/recruiter_user.types';

export type EditAdminFormErrorType = {
  first_name: boolean;
  department: boolean;
  linked_in: boolean;
  location: boolean;
  employment: boolean;
  position: boolean;
  phone: boolean;
  role: boolean;
  manager: boolean;
};

export type Formtype = {
  first_name: string;
  last_name: string;
  linked_in: string | null;
  office_location_id: number | null;
  employment: string;
  position: string;
  department_id: number | null;
  phone: string;
  profile_image: string | null;
  role_id: string | null;
  manager_id: string | null;
  role?: string | undefined;
  timeZone: CustomSchedulingSettingsUser['timeZone'];
};
