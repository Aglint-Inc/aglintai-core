import OpenAI from "openai";

export type Section = "positions" | "schools" | "skills";

export type OpenAIPrompt = {
  messages: {
    role: string;
    content: string;
  }[];
  temperature: number;
  prevError: any;
  tag: Section;
  index: number;
};

export type GeminiPrompt = {
  contents: {
    role: string;
    parts: {
      text: string;
    }[];
  }[];
  temperature: number;
  prevError: any;
  tag: Section;
  index: number;
};

export type AnthropicPrompt = {
  prompt: string;
  temperature: number;
  prevError: any;
};

export type Badges = {
  skills: number;
  schools: number;
  positions: number;
  leadership: number;
  jobStability: number;
  careerGrowth: number;
};

export type JobJson = {
  title: string;
  level: string;
  skills: JobFields[];
  educations: JobFields[];
  rolesResponsibilities: JobFields[];
};

export type JobFields = {
  field: string;
  isMustHave: boolean;
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
    level: string;
    start: {
      year: number;
      month: number;
    };
    title: string;
    summary: string;
    description: string;
    location: string;
  }[];
  certificates: string[];
};

export type OpenAiPromptBuilderResponse = {
  data: {
    response: any;
    index: number;
    tag: Section;
    tries: number;
    tokens: OpenAI.Completions.CompletionUsage | undefined;
  };
  error: any;
}[];

export type AnthropicPromptBuilderResponse = {
  data: {
    response: any;
    tries: number;
    tokens: number;
  };
  error: any;
}[];

export type GeminiPromptBuilderResponse = {
  data: {
    response: any;
    index: number;
    tag: GeminiPrompt["tag"];
    tries: number;
    tokens: OpenAiPromptBuilderResponse[number]["data"]["tokens"];
  };
  error: any;
}[];

export type PromptEnum = "low" | "medium" | "high";

export type PromptResponse = {
  rating: PromptEnum;
  index: number;
  reason: string;
  tokens: any;
};

export type PromptSkillResponse = {
  [key: string]: PromptEnum;
};
