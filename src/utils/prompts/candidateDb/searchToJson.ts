import { getAIResponse } from '../addNewJob';
import { MessageType } from '../types';
import { requestJson } from '../utils';

type CandidateFilter = {
  jobTitles: string[];
  locations: string[];
  spokenLanguages: string[];
  companies: string[];
  universities: string[];
  minExperienceInYears: number;
  maxExperienceInYears: number;
};

export const searchQueryToJson = async (searchQuery: string) => {
  const schema: CandidateFilter = {
    jobTitles: ['sample data 1', 'sample data 2'],
    locations: ['sample data 1', 'sample data 2'],
    spokenLanguages: ['sample data 1 ', 'sample data 2 '],
    companies: ['sample data 1', 'sample data 2'],
    universities: ['sample data 1', 'sample data 2'],
    minExperienceInYears: 3,
    maxExperienceInYears: 5,
  };

  const prompt = [
    {
      role: 'system',
      content: requestJson(
        `
        * Your given a Search string and a JSON Schema. 
        * your job is to extract the details from the given according to the given schema.
      `,
        schema,
      ),
    },
    {
      role: 'user',
      content: `
      Here is the search Query : 
      """ ${searchQuery} """.
      `,
    },
  ] as MessageType[];

  const resp = await getAIResponse(prompt);
  return JSON.parse(resp) as CandidateFilter;
};
