import { getAIResponse } from '../addNewJob';
import { MessageType } from '../types';
import { requestJson } from '../utils';

interface JobDetails {
  jobTitle: string;
  jobLocation: string;
  spokenLanguagesMentioned: string[];
  requiredPreviousCompanies: string[];
  university: string[];
  minExperienceInYears: number;
  maxExperienceInYears: number;
}

export const searchJdToJson = async (searchQuery: string) => {
  const schema: JobDetails = {
    jobTitle: 'sample JobTitle',
    jobLocation: 'sample Location',
    spokenLanguagesMentioned: ['spanish ', 'hindi '],
    requiredPreviousCompanies: ['Facebook', 'Mercedes'],
    university: ['Harward', 'MIT'],
    minExperienceInYears: 3,
    maxExperienceInYears: 5,
  };

  const prompt = [
    {
      role: 'system',
      content: requestJson(
        `
        * Your given a job description detail. 
        * your job is to extract the information from the JD.
        * if the input is not valid return with empty values.
      `,
        schema,
      ),
    },
    {
      role: 'user',
      content: `
      Here is the JD : 
      """ ${searchQuery} """.
      `,
    },
  ] as MessageType[];

  const resp = await getAIResponse(prompt);
  return JSON.parse(resp) as JobDetails;
};
