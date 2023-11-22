import { extractJson } from '../addNewJob';
import { MessageType } from '../types';

interface JobDetails {
  jobRoles: string[];
  locations: string[];
  skills: string[];
  spokenLanguagesMentioned: string[];
  requiredPreviousCompanies: string[];
  university: string[];
  minExperienceInYears: number;
  maxExperienceInYears: number;
  degrees: string[];
}

export const searchJdToJson = async (searchQuery: string) => {
  const prompt = [
    {
      role: 'system',
      content: `extract from the given text and respond in json format:{
        jobRoles: string [],
        locations: string [],
        skills: string [],
        degrees: string [],
        spokenLanguagesMentioned: string [],
        requiredPreviousCompanies: string [],
        university: string [],
        minExperienceInYears: number,
        maxExperienceInYears: number   
      }.
      
      dont add any place holder state     
      `,
    },
    {
      role: 'user',
      content: `
      text : 
      """ ${searchQuery} """.
      `,
    },
  ] as MessageType[];

  const resp = await extractJson(prompt);
  return JSON.parse(resp) as JobDetails;
};
