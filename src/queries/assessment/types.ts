import { JobTypeDB } from '@/src/types/data.types';
import { Database } from '@/src/types/schema';

type QuestionBankTable = Database['public']['Tables']['question_bank'];
type QuestionBankRow = Omit<QuestionBankTable['Row'], 'embeddings'>;
export type RecommendationQuestion = QuestionBankRow & CustomQuestionType;

type AssessmentQuestionTable =
  Database['public']['Tables']['assessment_question'];
type AssessmentQuestionRow = AssessmentQuestionTable['Row'];
type AssessmentQuestionRowInsert = AssessmentQuestionTable['Insert'];
type AssessmentQuestionRowUpdate = AssessmentQuestionTable['Update'];
export type AssessmentQuestion = Omit<
  AssessmentQuestionRow,
  keyof CustomQuestionType
> &
  CustomQuestionType;
export type AssessmentQuestionInsert = Omit<
  AssessmentQuestionRowInsert,
  keyof CustomQuestionType
> &
  Partial<CustomQuestionType>;
export type AssessmentQuestionUpdate = Omit<
  AssessmentQuestionRowUpdate,
  keyof CustomQuestionType
> &
  Partial<CustomQuestionType>;

type AssessmentTemplateTable =
  Database['public']['Tables']['assessment_template'];
type AssessmentTemplateRow = AssessmentTemplateTable['Row'];

export type AssessmentTemplate = Omit<
  AssessmentTemplateRow,
  'embeddings' | keyof CustomAssessmentTemplateType
> &
  CustomAssessmentTemplateType;

type CustomAssessmentTemplateType = {
  duration?: number;
};

type AssessmentTable = Database['public']['Tables']['assessment'];
type AssessmentRow =
  Database['public']['Functions']['getassessments']['Returns'][number];

// type AssessmentRowInsert = AssessmentTable['Insert'];
type AssessmentRowUpdate = AssessmentTable['Update'];

export type Assessment = Omit<AssessmentRow, keyof CustomAssessmentType> &
  CustomAssessmentType;

type CustomAssessmentType = {
  jobs?: {
    id: JobTypeDB['id'];
    title: JobTypeDB['job_title'];
  }[];
  duration?: number;
};
export type AssessmentUpdate = Partial<
  Pick<AssessmentRowUpdate, 'title' | 'description' | 'level' | 'type'>
>;

type AssessmentResultTable = Database['public']['Tables']['assessment_results'];
type AssessmentResultRow = AssessmentResultTable['Row'];
// type AssessmentResultInsert = AssessmentResultTable['Insert'];
// type AssessmentResultUpdate = AssessmentResultTable['Update'];
export type AssessmentResult = Omit<
  AssessmentResultRow,
  keyof CustomResponseType
> &
  CustomResponseType;

type CustomQuestionType = QuestionTypes & QuestionOthers;

type GenericQuestionType<T extends QuestionEnum> = CustomQuestion<T> &
  QuestionOthers;

type QuestionOthers = {
  description: {
    show: boolean;
    value: string;
  };
};
type CustomResponseType = {
  responses: ResponseTypes[];
  result: { rating: number }[];
};

type QuestionEnum = Exclude<
  Database['public']['Tables']['assessment_question']['Row']['type'],
  'scq' | 'code'
>;

export type ResponseTypes = CustomResponse<'mcq'> | CustomResponse<'qna'>;

type CustomResponse<T extends QuestionEnum> = {
  type: T;
  question: GenericQuestionType<T>;
  answer: CustomQuestion<T>['answer'];
  response: CustomQuestion<T>['answer'];
};

type QuestionTypes = CustomQuestion<'mcq'> | CustomQuestion<'qna'>;

type CustomQuestion<T extends QuestionEnum> = { type: T } & (T extends 'mcq'
  ? MCQ
  : T extends 'qna'
    ? QNA
    : never);

type MCQ = {
  question: {
    label: string;
    options: string[];
  };
  answer: {
    options: number[];
  };
};

type QNA = {
  question: {
    label: string;
  };
  answer: {
    label: string;
  };
};
