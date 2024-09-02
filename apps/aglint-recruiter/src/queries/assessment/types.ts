import { type JobTypeDB } from '@aglint/shared-types';
import { type DB } from '@aglint/shared-types';

type QuestionBankTable = DB['public']['Tables']['question_bank'];
type QuestionBankRow = Omit<QuestionBankTable['Row'], 'embeddings'>;
export type RecommendationQuestion = QuestionBankRow & CustomQuestionType;

type AssessmentQuestionTable = DB['public']['Tables']['assessment_question'];
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

// eslint-disable-next-line no-unused-vars
type AssessmentTemplateTable = DB['public']['Tables']['assessment_template'];

type AssessmentTemplateRow =
  DB['public']['Functions']['getassessmenttemplates']['Returns'][number];
export type AssessmentTemplate = Omit<
  AssessmentTemplateRow,
  keyof CustomAssessmentTemplateType
> &
  CustomAssessmentTemplateType;

type CustomAssessmentTemplateType = {
  question_count: number;
  duration: number;
};

type AssessmentTable = DB['public']['Tables']['assessment'];
type AssessmentRow =
  DB['public']['Functions']['getassessments']['Returns'][number];

export type AssessmentRowInsert = AssessmentTable['Insert'];
type AssessmentRowUpdate = AssessmentTable['Update'];

export type Assessment = Omit<AssessmentRow, keyof CustomAssessmentType> &
  CustomAssessmentType;

type CustomAssessmentType = {
  jobs: {
    id: JobTypeDB['id'];
    title: JobTypeDB['job_title'];
  }[];
  question_count: number;
  duration: number;
  loading: boolean;
};

export type AssessmentCreate = Omit<
  Required<AssessmentRowInsert>,
  'created_at' | 'id' | 'recruiter_id'
>;

export type AssessmentUpdate = Partial<
  Pick<
    AssessmentRowUpdate,
    'title' | 'description' | 'level' | 'type' | 'id' | 'mode'
  >
>;

type AssessmentResultTable = DB['public']['Tables']['assessment_results'];
type AssessmentResultRow = AssessmentResultTable['Row'];
// type AssessmentResultInsert = AssessmentResultTable['Insert'];
// type AssessmentResultUpdate = AssessmentResultTable['Update'];
export type AssessmentResult = Omit<
  AssessmentResultRow,
  keyof CustomResponseType
> &
  CustomResponseType;

type CustomQuestionType = QuestionTypes & QuestionOthers;

type QuestionOthers = {
  description: {
    show: boolean;
    value: string;
  };
};
type CustomResponseType = {
  responses: ResponseTypes[];
  result: { question_id: string; rating: number; analysis: string }[];
};

type QuestionEnum = Exclude<
  DB['public']['Tables']['assessment_question']['Row']['type'],
  'scq' | 'code'
>;

export type ResponseTypes = CustomResponse<'mcq'> | CustomResponse<'qna'>;

type CustomResponse<T extends QuestionEnum> = CustomQuestion<T> & {
  response: CustomQuestion<T>['answer'];
};

type QuestionTypes = CustomQuestion<'mcq'> | CustomQuestion<'qna'>;

type CustomQuestion<T extends QuestionEnum> = {
  type: T;
  question_id: string;
} & (T extends 'mcq' ? MCQ : T extends 'qna' ? QNA : never);

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
