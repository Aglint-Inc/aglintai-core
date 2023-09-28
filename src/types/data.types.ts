import { Database } from './schema';

export type AddressType = {
  line1: string;
  line2: string;
  city: string;
  state: string;
  country: string;
};

export type SocialsType = {
  [key: string]: string;
};

export type RecruiterType = Omit<
  Database['public']['Tables']['recruiter']['Row'],
  'address' | 'socials'
> & { address: AddressType | null; socials: SocialsType | null };
export type JobTypeDB = Database['public']['Tables']['public_jobs']['Row'];
export type JobApplcationDB = Database['public']['Tables']['job_applications']['Row'];
