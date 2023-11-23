import { isArray } from 'lodash';

import { CandidateSearchState } from '@/src/components/CandidateDatabase/context/CandidateSearchProvider';

import { similarJobs } from './similarJobs';
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

  const resp = JSON.parse(await extractJson(prompt)) as JobDetails;

  const p: CandidateSearchState['queryJson'] = {
    jobTitles: [...resp.jobRoles],
    universities: [...resp.university],
    prefferedCompanies: [...resp.requiredPreviousCompanies],
    excludedCompanies: [],
    languages: [...resp.spokenLanguagesMentioned],
    location: [...resp.locations],
    maxExp: resp.maxExperienceInYears,
    minExp: resp.minExperienceInYears,
    skills: [...resp.skills],
    degrees: [...resp.degrees],
  };

  if (p.jobTitles.length > 0 && p.jobTitles.length < 5) {
    const j = await similarJobs(p.jobTitles);
    p.jobTitles = [...p.jobTitles, ...j.related_jobs];
  }

  Object.keys(p).forEach((k) => {
    if (isArray(p[String(k)])) {
      p[String(k)] = p[String(k)].filter((s) => Boolean(s.trim()));
    }
  });

  return p;
};
