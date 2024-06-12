import type { CustomApplicationBadges } from "../common.types";
import type { TableType } from "./index.types";

export type CustomApplications = TableType<
  "applications",
  {
    feedback: CustomFeedback;
    score_json: CustomScoreJson;
  }
>;

type CustomFeedback = {
  schedule: { feedback: string; rating: number };
  sessions?: { [key: string]: { rating: number; feedback: string } };
};

type CustomScoreJson = {
  scores: {
    skills: number;
    experience: number;
    education: number;
  };
  badges: CustomApplicationBadges;
  relevance: {
    skills: { [key: string]: PromptEnum };
    schools: { [key: string]: PromptEnum };
    positions: { [key: string]: PromptEnum };
  };
  reasoning: {
    skills: string;
    schools: string;
    positions: string;
  };
};

type PromptEnum = "low" | "medium" | "high";
