import { Database } from '@aglint/shared-types';

export type ApplicationType =
  Database['public']['Tables']['applications']['Row'];
export type PublicJobsType = Database['public']['Tables']['public_jobs']['Row'];
export type AssessmentRelationJobType =
  Database['public']['Tables']['assessment_job_relation']['Row'];
export type AssessmentType =
  Database['public']['Tables']['assessment']['Row'] & {
    assessment_question: AssessmentQuestionType[];
  };
type tempAssessmentQuestionType =
  Database['public']['Tables']['assessment_question']['Row'];
export interface AssessmentQuestionType extends tempAssessmentQuestionType {
  question: {
    label: string;
    options: any[];
  };
  answer: {
    label: string;
    options: any[];
  };
}
export type AssessmentDetailsType = ApplicationType & {
  public_jobs: PublicJobsType & {
    assessment_job_relation: AssessmentRelationJobType &
      {
        assessment: AssessmentType & {
          assessment_question: AssessmentQuestionType[];
        };
      }[];
  };
};

export type responseType = {
  question_id: string;
  type: string;
  response: { options: any[]; label: string };
};
