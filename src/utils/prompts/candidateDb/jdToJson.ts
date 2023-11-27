import { get } from 'lodash';

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
      content: `extract from the given text and respond in this strict json format:{
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
    jobTitles: [...(get(resp, 'jobRoles') || [])],
    universities: [...(get(resp, 'universities') || [])],
    prefferedCompanies: [...(get(resp, 'requiredPreviousCompanies') || [])],
    excludedCompanies: [],
    languages: [...(get(resp, 'spokenLanguagesMentioned') || [])],
    location: [...(get(resp, 'locations') || [])],
    maxExp: get(resp, 'maxExperienceInYears', 0) || 0,
    minExp: get(resp, 'minExperienceInYears', 0) || 0,
    skills: [...(get(resp, 'skills', []) || [])],
    degrees: [...(get(resp, 'degrees', []) || [])],
  };

  return p;
};
