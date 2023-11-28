import { JsonResume } from '@/src/types/resume_json.types';

import { CandJobPost } from '../context/CandidateSearchProvider';

export interface Candidate {
  candidate_id: string;
  first_name: string;
  last_name: string;
  job_title: string;
  email: string;
  json_resume: JsonResume;
  profile_image?: string;
  resume_link: string;
  is_checked: boolean;
  applied_job_posts: CandJobPost[];
}

export type candDbContextType = {
  candState: CandidateStateType;
  // eslint-disable-next-line no-unused-vars
  updateState: ({ path, value }: { path: string; value: any }) => void;
};

export type CandidateStateType = {
  candidates: Candidate[];
  selectedCandidate: number;
};

export type ActionType = {
  type: 'UPDATE_STATE';
  payload: {
    path: string;
    value: any;
  };
};
