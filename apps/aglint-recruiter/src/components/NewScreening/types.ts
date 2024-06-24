export type QuestionOption = {
  id: string;
  option: string;
};

export type Question = {
  id: string;
  type: 'shortAnswer' | 'singleSelect';
  options: QuestionOption[];
  question: string;
  isRequired: boolean;
  description: string;
  questionLabel: string;
  showDescription: boolean;
};

export type CandidateScreeningType = {
  id: string;
  first_name: string;
  last_name: string;
  avatar: string | null;
  status_emails_sent: Record<string, any>;
  screening_title: string;
  job_title: string;
  created_at: string | null;
  response: any;
  questions: {
    questions: Question[];
    endMessage: string;
    startMessage: string;
  };
  public_job_id: string;
  company: string;
  email: string;
  candidate_id: string;
  result_created_at: string | null;
  assessment_result: any;
};

export type Option = {
  id: string;
  option: string;
};

export type QuestionTypes = {
  id: string;
  type: string;
  options: Option[];
  question: string;
  isRequired: boolean;
  description: string;
  questionLabel: string;
  showDescription: boolean;
};

export type QuestionnaireTypes = {
  questions: QuestionTypes[];
  startMessage: string;
  endMessage: string;
};

export type QuestionnaireData = {
  id: string;
  title: string;
  questions: QuestionnaireTypes;
};

export type PhoneScreenQuestion = {
  id: string;
  isRequired: boolean;
  question: string;
  description: string;
  showDescription: boolean;
  questionLabel: string;
  type: 'multiSelect' | 'singleSelect' | 'shortAnswer';
  options: {
    option: string;
    id: string;
  }[];
};
