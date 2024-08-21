export type buttonsType =
  | "proceed"
  | "update_availability"
  | "booking_self_schedule"
  | "reSchedule_request"
  | "cancel_request";

export type radioBtnOptions = {
  name: string;
  value: string;
};

export type tabs = "automation" | "seed" | "reset" | "mode";

//------------------------------------------------
export type seedTabs =
  | "company"
  | "interview_type"
  | "jobs"
  | "workflow"
  | "user";

// -----------------------------------------------

export type departmentType = {
  name: string;
  id: number;
  recruiter_id: string;
  remote_id: string;
};

export type companyDepartmentType = {
  name: string;
};

// ---------------------------------------------

export type emailAuthData = {
  email: string;
  expiry_date: string;
  access_token: string;
  refresh_token: string;
};

// --------------------------------------------------

export type module = {
  name: string;
  objective: string;
  instructions: string;
};

export type interviewType = {
  created_at: string;
  name: string;
  recruiter_id: string;
  id: string;
  duration_available: any;
  description: string;
  settings: any;
  instructions: string;
  created_by: string;
  is_archived: boolean;
  department_id: number;
};

// ------------------------------------------------ company

type SocialLinks = {
  custom: any; // For custom social links or additional fields
  twitter: string;
  youtube: string;
  facebook: string;
  linkedin: string;
  instagram: string;
};

export type CompanyProfile = {
  slug: string;
  name: string;
  profile_image: string;
  company_website: string;
  industry: string;
  logo: string;
  phone_number: string;
  employee_size: string;
  socials: SocialLinks;
};
