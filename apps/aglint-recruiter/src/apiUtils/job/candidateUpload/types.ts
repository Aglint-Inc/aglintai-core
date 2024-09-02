import { type DB } from '@aglint/shared-types';
import { type PostgrestError, type SupabaseClient } from '@supabase/supabase-js';

export type Supabase = SupabaseClient<DB>;

export type ManualUploadApi = {
  request: {
    [UploadApiFormData.PARAMS]: {
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      linkedin: string;
      recruiter_id: string;
      job_id: string;
    };
    [UploadApiFormData.FILES]: FormData;
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
    [UploadApiFormData.PARAMS]: {
      recruiter_id: string;
      job_id: string;
    };
    [UploadApiFormData.FILES]: FormData;
  };
  response: {
    confirmation: boolean;
    error: PostgrestError['message'];
  }[];
};

export type ResumeReuploadApi = {
  request: {
    [UploadApiFormData.PARAMS]: {
      candidate_id: string;
      application_id: string;
    };
    [UploadApiFormData.FILES]: FormData;
  };
  response: {
    confirmation: boolean;
    error: PostgrestError['message'];
  };
};

export enum UploadApiFormData {
  // eslint-disable-next-line no-unused-vars
  PARAMS = 'params',
  // eslint-disable-next-line no-unused-vars
  FILES = 'files',
}
