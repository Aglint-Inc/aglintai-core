import { type DB } from '@aglint/shared-types';

export type Candidate = Omit<
  DB['public']['Tables']['aglint_candidates']['Row'],
  'phone_numbers' | 'employment_history' | 'organization'
> & {
  phone_numbers: PhoneNumber[] | null;
  employment_history: EmploymentHistory[] | null;
  organization: Organization | null;
};

export type CandidateSearchHistoryType = Omit<
  DB['public']['Tables']['candidate_search_history']['Row'],
  'used_credits' | 'query_json'
> & {
  used_credits: UsedCredits;
  query_json: FetchCandidatesParams;
};

export interface UsedCredits {
  mobile_credits: number;
  export_credits: number;
  email_credits: number;
}

export interface EmploymentHistory {
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
  linkedin_url: string | null;
  twitter_url: string | null;
  facebook_url: string | null;
  primary_phone: JSON;
  languages: string[];
  alexa_ranking: number;
  phone: string | null;
  linkedin_uid: string | null;
  founded_year: 2015;
  publicly_traded_symbol: string | null;
  publicly_traded_exchange: string | null;
  logo_url: string | null;
  crunchbase_url: string | null;
  primary_domain: string | null;
}

export interface FetchCandidatesParams {
  person_locations: string[];
  person_seniorities: string[];
  person_titles: string[];
  organization_ids: string[];
  pagination: Pagination;
  companies: string[];
}

export interface Pagination {
  page: number;
  per_page: number;
  total_entries: number;
  total_pages: number;
}
