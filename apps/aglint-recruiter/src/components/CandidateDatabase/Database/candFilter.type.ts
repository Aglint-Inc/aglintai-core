import { type JsonResume } from '@aglint/shared-types';

import { type CandJobPost } from '../../../context/CandidateSearchProvider/CandidateSearchProvider';

export interface Candidate {
  candidate_id: string;
  application_id: string;
  first_name: string;
  last_name: string;
  job_title: string;
  email: string;
  json_resume: JsonResume;
  profile_image?: string;
  resume_link: string;
  is_checked: boolean;
  candfile_id: string;
  applied_job_posts: CandJobPost[];
}

export type candDbContextType = {
  candState: CandidateStateType;
  // eslint-disable-next-line no-unused-vars
  updateState: ({ path, value }: { path: string; value: any }) => void;
  handleAddCandidatesTojob: (
    // eslint-disable-next-line no-unused-vars
    jobAppIds: string[],
    // eslint-disable-next-line no-unused-vars
    job_ids: {
      job_id: string;
      job_title: string;
    }[],
  ) => Promise<void>;
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
