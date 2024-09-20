export type GreenhouseJobStagesAPI = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  job_id: number;
  priority: number;
  interviews: Interview[];
}[];

type Interview = {
  id: number;
  name: string;
  schedulable: boolean;
  estimated_minutes?: number;
  default_interviewer_users?: DefaultInterviewerUser[];
  interview_kit: InterviewKit;
  created_at?: string;
  updated_at?: string;
  job_id?: number;
};

type DefaultInterviewerUser = {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  employee_id: string;
};

type InterviewKit = {
  id: number;
  content: null | string;
  questions: Question[];
};

type Question = {
  id: number;
  question: string;
};

export type GreenhouseCandidateAPI = {
  id: number;
  first_name: string;
  last_name: string;
  company: string;
  title: string;
  created_at: Date;
  updated_at: Date;
  last_activity: Date;
  is_private: boolean;
  photo_url: null;
  attachments: Attachment[];
  application_ids: number[];
  phone_numbers: Address[];
  addresses: Address[];
  email_addresses: Address[];
  website_addresses: Address[];
  social_media_addresses: any[];
  recruiter: Recruiter;
  coordinator: null;
  can_email: boolean;
  tags: string[];
  applications: Application[];
  educations: Education[];
  employments: Employment[];
  linked_user_ids: number[];
  custom_fields: CustomFields;
  keyed_custom_fields: KeyedCustomFields;
};

type Address = {
  value: string;
  type: string;
};

type Application = {
  id: number;
  candidate_id: number;
  prospect: boolean;
  applied_at: Date;
  rejected_at: null;
  last_activity_at: Date;
  location: Location | null;
  source: Source;
  credited_to: Recruiter;
  rejection_reason: null;
  rejection_details: null;
  jobs: CurrentStage[];
  job_post_id?: number;
  status: string;
  current_stage: CurrentStage | null;
  answers: any[];
  prospective_office: null;
  prospective_department: null;
  prospect_detail: ProspectDetail;
  attachments: Attachment[];
};

type Attachment = {
  filename: string;
  url: string;
  type: string;
  created_at: Date;
};

type Recruiter = {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  employee_id: null;
};

type CurrentStage = {
  id: number;
  name: string;
};

type Location = {
  address: string;
};

type ProspectDetail = {
  prospect_pool: CurrentStage | null;
  prospect_stage: CurrentStage | null;
  prospect_owner: CurrentStage | null;
};

type Source = {
  id: number;
  public_name: string;
};

type CustomFields = {
  desired_salary: string;
  work_remotely: boolean;
  graduation_year: string;
};

type Education = {
  id: number;
  school_name: string;
  degree: string;
  discipline: string;
  start_date: string;
  end_date: string;
};

type Employment = {
  id: number;
  company_name: string;
  title: string;
  start_date: string;
  end_date: string;
};

type KeyedCustomFields = {
  desired_salary: DesiredSalary;
  work_remotely: WorkRemotely;
  graduation_year_1: DesiredSalary;
};

type DesiredSalary = {
  name: string;
  type: string;
  value: string;
};

type WorkRemotely = {
  name: string;
  type: string;
  value: boolean;
};
