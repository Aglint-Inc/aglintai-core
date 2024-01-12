export interface Candidate {
  city: string;
  country: string;
  departments: string[];
  email: string | null;
  email_status: string;
  employment_history: EmploymentHistory[];
  extrapolated_email_confidence: null;
  facebook_url: string | null;
  first_name: string;
  functions: string[];
  github_url: string | null;
  headline: string;
  id: string;
  intent_strength: null;
  is_likely_to_engage: boolean;
  last_name: string;
  linkedin_url: string;
  name: string;
  organization: Organization;
  organization_id: string;
  phone_numbers: PhoneNumber[];
  photo_url: string;
  revealed_for_current_team: boolean;
  seniority: string;
  show_intent: boolean;
  state: string;
  subdepartments: string[];
  title: string;
  twitter_url: string | null;
}

interface EmploymentHistory {
  created_at: string | null;
  current: boolean;
  degree: string | null;
  description: string | null;
  emails: string | null;
  end_date: string | null;
  grade_level: string | null;
  id: string;
  key: string;
  kind: string | null;
  major: string | null;
  organization_id: string;
  organization_name: string;
  raw_address: string | null;
  start_date: string | null;
  title: string;
  updated_at: string | null;
  _id: string;
}

interface PhoneNumber {
  dialer_flags: string | null;
  dnc_other_info: string | null;
  dnc_status: string | null;
  position: number;
  raw_number: string | null;
  sanitized_number: string | null;
  status: string | null;
  type: string | null;
}

interface Organization {
  id: string;
  name: string;
  website_url: string;
  blog_url: string | null;
  angellist_url: string | null;
  // Add more properties as needed
}

export interface FetchCandidatesParams {
  q_keywords: string;
  organization_locations: string[];
  person_seniorities: string[];
  person_titles: string[];
}
