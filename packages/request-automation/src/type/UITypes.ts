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

export type tabs = "seed" | "demo" | "clear";

//------------------------------------------------
export type seedTabs =
  | "company"
  | "email"
  | "interview_type"
  | "jobs"
  | "workflow";

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
