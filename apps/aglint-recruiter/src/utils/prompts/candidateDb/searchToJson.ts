import { extractJson } from '../addNewJob';
import { type MessageType } from '../types';
import { requestJson } from '../utils';

type CandidateFilter = {
  jobTitles: string[];
  locations: string[];
  spokenLanguages: string[];
  companies: string[];
  universities: string[];
  minExperienceInYears: number;
  maxExperienceInYears: number;
  skills: string[];
  degrees: string[];
};

export const searchQueryToJson = async (searchQuery: string) => {
  const schema: CandidateFilter = {
    jobTitles: ['sample data 1', 'sample data 2'],
    locations: ['sample data 1', 'sample data 2'],
    spokenLanguages: ['sample data 1 ', 'sample data 2 '],
    companies: ['sample data 1', 'sample data 2'],
    universities: [],
    skills: ['skill 1'],
    degrees: [],
    minExperienceInYears: 1,
    maxExperienceInYears: 3,
  };

  const prompt = [
    {
      role: 'system',
      content: `
       * Your given a job description summary and  a sample JSon. 
       * your job is to extract the fields from jdSummary and respond with same json structure used in sample json.
       * if the values are not in the given summary, respond appropriately.
      `,
    },
    {
      role: 'user',
      content: requestJson(`here is the sample json`, schema),
    },
    {
      role: 'user',
      content: `
      Here is the search Query : 
      """ ${searchQuery}  """
      `,
    },
  ] as MessageType[];

  const resp = await extractJson(prompt);
  return JSON.parse(resp) as CandidateFilter;
};
