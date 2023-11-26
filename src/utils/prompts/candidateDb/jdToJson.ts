import { CandidateSearchState } from '@/src/components/CandidateDatabase/context/CandidateSearchProvider';

import { extractJson } from '../addNewJob';
import { MessageType } from '../types';

interface JobDetails {
  jobRoles: string[];
  locations: string[];
  skills: string[];
  spokenLanguagesMentioned: string[];
  requiredPreviousCompanies: string[];
  universities: string[];
  minExperienceInYears: number;
  maxExperienceInYears: number;
  degrees: string[];
}

export const searchJdToJson = async (searchQuery: string) => {
  const prompt = [
    {
      role: 'system',
      content: `extract from the given text and respond in json format:{
        jobRoles: string[],
        locations: string[],
        skills: string[],
        degrees: string[],
        spokenLanguagesMentioned: string[],
        requiredPreviousCompanies: string[],
        universities: string[],
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

  const resp = JSON.parse(await extractJson(prompt)) as JobDetails;

  const p: CandidateSearchState['queryJson'] = {
    jobTitles: [...resp.jobRoles],
    universities: [...resp.universities],
    prefferedCompanies: [...resp.requiredPreviousCompanies],
    excludedCompanies: [],
    languages: [...resp.spokenLanguagesMentioned],
    location: [...resp.locations],
    maxExp: resp.maxExperienceInYears,
    minExp: resp.minExperienceInYears,
    skills: [...resp.skills],
    degrees: [...resp.degrees],
  };

  return p;
};
