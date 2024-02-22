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
  result: { rating: number; question_id: AssessmentQuestion['id'] }[];
};

type QuestionEnum = Exclude<
  Database['public']['Tables']['assessment_question']['Row']['type'],
  'scq' | 'code'
>;

type ResponseTypes = CustomResponse<'mcq'> | CustomResponse<'qna'>;

type CustomResponse<T extends QuestionEnum> = {
  type: T;
  question_id: AssessmentQuestion['id'];
  question: GenericQuestionType<T>;
  answer: FirstValue<CustomQuestion<T>['answer']>;
};

type FirstValue<T> = T[keyof T];

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
