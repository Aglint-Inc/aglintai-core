import { Json } from '@aglint/shared-types/src/db/schema.types';

export interface JobAshby {
  id: string;
  title: string;
  jobId: string;
  departmentName: string | null;
  teamName: string | null;
  locationName: string;
  employmentType: string;
  isListed: boolean;
  publishedDate: string;
  externalLink: string;
  locationIds: Json;
  compensationTierSummary: string | null;
  shouldDisplayCompensationOnJobBoard: boolean;
  updatedAt: string;
  location: string;
  description: string;
}

export interface ExtendedJobAshby extends JobAshby {
  public_job_id: string;
  recruiter_id: string;
}

export type AshbyApplication = {
  id: string;
  createdAt: string;
  updatedAt: string;
  candidate: CandidateType;
  status: string;
  customFields: Json[];
  currentInterviewStage: InterviewType;
  source: Json;
  creditedToUser: Json;
  archiveReason: Json;
  job: JobType;
  hiringTeam: Json[];
  appliedViaJobPostingId: string | null;
};

type CandidateType = {
  id: string;
  name: string;
  primaryEmailAddress: {
    value: string;
    type: string;
    isPrimary: boolean;
  };
};

type InterviewType = {
  id: string;
  title: string;
  type: string;
  interviewPlanId: string;
  orderInInterviewPlan: number;
};

type JobType = {
  id: string;
  title: string;
  locationId: string;
  departmentId: string;
};
