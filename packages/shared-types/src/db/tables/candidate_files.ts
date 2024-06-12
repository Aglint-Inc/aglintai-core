import { TableType } from "./index.types";

export type CustomCandidateFiles = TableType<
  "candidate_files",
  {
    resume_json: CustomResumeJson;
  }
>;

type CustomResumeJson = {
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
    level:
      | "Fresher-level"
      | "Associate-level"
      | "Mid-level"
      | "Senior-level"
      | "Executive-level";
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
