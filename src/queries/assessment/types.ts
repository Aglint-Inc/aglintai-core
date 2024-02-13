import { Database } from '@/src/types/schema';

export type Assessment = Database['public']['Tables']['assessment']['Row'];
type AssessmentQuestionDb =
  Database['public']['Tables']['assessment_question']['Row'];
export type AssessmentQuestion = AssessmentQuestionDb &
  (
    | {
        type: 'mcq';
        question: {
          label: string;
          options: string[];
        };
        answer: {
          options: string[];
        };
      }
    | {
        type: 'qna';
        question: {
          label: string;
        };
        answer: null;
      }
  );

export type AssessmentCreate = Pick<
  Assessment,
  'title' | 'description' | 'level' | 'type'
>;

export type AssessmentUpdate = Partial<
  Pick<Assessment, 'title' | 'description' | 'level' | 'type'>
>;
