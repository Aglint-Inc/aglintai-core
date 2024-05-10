import OpenAI from 'openai';

export type Prompt = {
  messages: {
    role: string;
    content: string;
  }[];
  temperature: number;
  prevError: any;
  tag: 'positions' | 'schools' | 'skills';
  index: number;
};

export type JobJson = {
  company: string;
  location: string;
  title: string;
  role: string;
  level: string;
  specialty: string;
  industry: string;
  experience: number;
  skills: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
};
export type ResumeJson = {
  basics: {
    email: string;
    phone: string;
    social: string[];
    lastName: string;
    linkedIn: string;
    location: string;
    firstName: string;
    currentCompany: string;
    currentJobTitle: string;
    experience: number;
  };
  skills: string[];
  schools: {
    end: {
      year: number;
      month: number;
    };
    gpa: number;
    field: string;
    start: {
      year: number;
      month: number;
    };
    degree: string;
    institution: string;
  }[];
  overview: string;
  projects: {
    title: string;
    summary: string;
  }[];
  languages: string[];
  positions: {
    end: {
      year: number;
      month: number;
    };
    org: string;
    level: PositionLevel;
    start: {
      year: number;
      month: number;
    };
    title: string;
    summary: string;
    location: string;
  }[];
  certificates: string[];
};

export type PromptBuilderResponse = {
  data: {
    response: any;
    index: number;
    tag: Prompt['tag'];
    tries: number;
    tokens: OpenAI.Completions.CompletionUsage | undefined;
  };
  error: any;
}[];

export type PromptEnum = 'low' | 'medium' | 'high';
export type PositionLevel =
  | 'Fresher-level'
  | 'Associate-level'
  | 'Mid-level'
  | 'Senior-level'
  | 'Executive-level';

export type PromptResponse = {
  rating: PromptEnum;
  reason: string;
  tokens: any;
  index: number;
};

export type PromptSkillResponse = {
  [key: string]: PromptEnum;
};
