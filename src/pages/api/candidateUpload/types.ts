import { PostgrestError, SupabaseClient } from '@supabase/supabase-js';

import { Database } from '@/src/types/schema';

export type Supabase = SupabaseClient<Database>;

export type ManualUploadApi = {
  request: {
    params: {
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      linkedin: string;
      recruiter_id: string;
      job_id: string;
    };
    file: File;
  };
  response: {
    confirmation: boolean;
    error: PostgrestError['message'];
  };
};

export type CsvUploadApi = {
  request: {
    candidates: {
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      linkedin: string;
      file_url: string;
    }[];
    recruiter_id: string;
    job_id: string;
  };
  response: {
    confirmation: boolean;
    error: PostgrestError['message'];
  };
};

export type ResumeUploadApi = {
  request: {
    params: {
      recruiter_id: string;
      job_id: string;
    };
    files: File[];
  };
  response: {
    confirmation: boolean;
    error: PostgrestError['message'];
  }[];
};

export enum UploadApiFormData {
  // eslint-disable-next-line no-unused-vars
  FILES = 'files',
}
