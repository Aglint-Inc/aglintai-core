import { resumeMatchRPCFormatter } from '.';
import { Assessment } from '../assessment/types';

export type DashboardTypes = {
  assessments: Assessment[];
  skills: {
    top_skills: {
      [id: string]: number;
    };
    required_skills: {
      [id: string]: number;
    };
  };
  locations: {
    city: {
      [id: string]: number;
    };
    state: {
      [id: string]: number;
    };
    country: {
      [id: string]: number;
    };
  };
  matches: Omit<ReturnType<typeof resumeMatchRPCFormatter>, 'matches'> & {
    matches: {
      // eslint-disable-next-line no-unused-vars
      [id in Matches]: number;
    };
  };
  tenureAndExperience: {
    tenure: { [id: number]: number };
    experience: { [id: number]: number };
    average_tenure: number;
    average_experience: number;
  };
};

type Matches =
  | 'averageMatch'
  | 'goodMatch'
  | 'noMatch'
  | 'poorMatch'
  | 'topMatch'
  | 'unknownMatch';
