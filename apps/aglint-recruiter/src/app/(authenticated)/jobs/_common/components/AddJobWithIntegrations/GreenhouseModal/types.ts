interface Location {
  id: number;
  name: string;
  office_id: number | null;
  job_post_custom_location_id: number | null;
  job_post_location_type: {
    id: number;
    name: string;
  };
}

interface Question {
  required: boolean | null;
  private: boolean;
  label: string;
  name: string;
  type: string;
  values: any[]; // You might need to specify a more specific type based on your requirements
  description: string | null;
}

export interface JobGreenhouse {
  id: number;
  active: boolean;
  live: boolean;
  first_published_at: string;
  title: string;
  location: Location;
  internal: boolean;
  external: boolean;
  job_id: number;
  content: string | null;
  internal_content: string | null;
  updated_at: string;
  created_at: string;
  demographic_question_set_id: number | null;
  questions: Question[];
}

export interface ExtendedJobGreenhouse extends JobGreenhouse {
  public_job_id: string;
  recruiter_id: string;
  ats_job_id: string;
}

type Attachment = {
  filename: string;
  url: string;
  type: string;
  created_at: string;
};

export type GreenhouseApplication = {
  id: number;
  first_name: string;
  last_name: string;
  company: null | string;
  title: null | string;
  created_at: string;
  updated_at: string;
  last_activity: string;
  is_private: boolean;
  photo_url: null | string;
  attachments: Attachment[];
  application_ids: number[];
  phone_numbers: PhoneNumber[];
  addresses: any[];
  email_addresses: EmailAddress[];
  website_addresses: any[];
  social_media_addresses: any[];
  recruiter: User;
  coordinator: User;
  can_email: boolean;
  tags: any[];
  applications: any;
  educations: any[];
  employments: any[];
  linked_user_ids: number[];
};

type EmailAddress = {
  value: string;
  type: string;
};

type PhoneNumber = {
  value: string;
  type: string;
};

type User = {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  employee_id: null | string; // Adjust the type if you have more specific information
};
