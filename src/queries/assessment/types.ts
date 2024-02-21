import { Database } from '@/src/types/schema';

type QuestionBankTable = Database['public']['Tables']['question_bank'];
type QuestionBankRow = Omit<QuestionBankTable['Row'], 'embeddings'>;
export type RecommendationQuestion = QuestionBankRow & CustomQuestionType;

type AssessmentQuestionTable =
  Database['public']['Tables']['assessment_question'];
type AssessmentQuestionRow = AssessmentQuestionTable['Row'];
type AssessmentQuestionRowInsert = AssessmentQuestionTable['Insert'];
type AssessmentQuestionRowUpdate = AssessmentQuestionTable['Update'];
export type AssessmentQuestion = AssessmentQuestionRow & CustomQuestionType;
export type AssessmentQuestionInsert = AssessmentQuestionRowInsert &
  Partial<CustomQuestionType>;
export type AssessmentQuestionUpdate = AssessmentQuestionRowUpdate &
  Partial<CustomQuestionType>;

type AssessmentTable = Database['public']['Tables']['assessment'];
type AssessmentRow = AssessmentTable['Row'];
type AssessmentRowInsert = AssessmentTable['Insert'];
type AssessmentRowUpdate = AssessmentTable['Update'];
export type Assessment = AssessmentRow;
export type AssessmentCreate = Pick<
  AssessmentRowInsert,
  'title' | 'description' | 'level' | 'type' | 'mode'
>;
export type AssessmentUpdate = Partial<
  Pick<AssessmentRowUpdate, 'title' | 'description' | 'level' | 'type'>
>;

type AssessmentResultTable = Database['public']['Tables']['assessment_results'];
type AssessmentResultRow = AssessmentResultTable['Row'];
// type AssessmentResultInsert = AssessmentResultTable['Insert'];
// type AssessmentResultUpdate = AssessmentResultTable['Update'];
export type AssessmentResult = AssessmentResultRow & CustomResponseType;

type CustomQuestionType = CustomQuestion & {
  description: {
    show: boolean;
    value: string;
  };
};
type CustomResponseType = {
  responses: CustomResponse[];
};

type CustomResponse =
  | {
      type: 'mcq';
      question: {
        label: string;
        options: string[];
      };
      answer: {
        options: number[];
      };
      question_id: AssessmentQuestion['id'];
      response: {
        options: number[];
      };
    }
  | {
      type: 'qna';
      question: {
        label: string;
      };
      answer: {
        label: string;
      };
      question_id: AssessmentQuestion['id'];
      response: {
        label: string;
      };
    };
type CustomQuestion =
  | {
      type: 'mcq';
      question: {
        label: string;
        options: string[];
      };
      answer: {
        options: number[];
      };
    }
  | {
      type: 'qna';
      question: {
        label: string;
      };
      answer: {
        label: string;
      };
    };
