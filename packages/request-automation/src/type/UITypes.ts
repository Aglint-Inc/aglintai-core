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

export type departmentType = {
  name: string;
  id: number;
  recruiter_id: string;
  remote_id: string;
};

export type companyDepartmentType = {
  name: string;
};
