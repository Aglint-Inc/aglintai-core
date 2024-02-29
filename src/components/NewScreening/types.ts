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

export type EmailTemplate = {
  body: string;
  default: boolean;
  subject: string;
  fromName: string;
};

export type EmailTemplates = {
  interview: EmailTemplate;
  rejection: EmailTemplate;
  phone_screening: EmailTemplate;
  interview_resend: EmailTemplate;
  application_recieved: EmailTemplate;
  phone_screening_resend: EmailTemplate;
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
  email_template: EmailTemplates;
  result_created_at: string | null;
  assessment_result: any;
};



export type Option= {
  id: string;
  option: string;
}

export type  QuestionTypes= {
  id: string;
  type: string;
  options: Option[];
  question: string;
  isRequired: boolean;
  description: string;
  questionLabel: string;
  showDescription: boolean;
}

export type QuestionnaireTypes ={
  questions: QuestionTypes[];
  startMessage: string;
  endMessage: string;
}

export type QuestionnaireData ={
  id: string;
  title: string;
  questions: QuestionnaireTypes;
}

