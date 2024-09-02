import { get } from 'lodash';

import { type CandidateSearchState } from '@/src/context/CandidateSearchProvider/CandidateSearchProvider';

import { extractJson } from '../addNewJob';
import { type MessageType } from '../types';
import { similarJobs } from './similarJobs';
import { similarSkills } from './similarSkills';

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
  const queryJson: CandidateSearchState['queryJson'] = {
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

  const seedJobsSkills = [];

  if (queryJson.jobTitles.length > 0) {
    seedJobsSkills.push((async () => await similarJobs(queryJson.jobTitles))());
  }
  if (queryJson.skills.length > 0) {
    seedJobsSkills.push((async () => await similarSkills(queryJson.skills))());
  }
  const r = await Promise.allSettled(seedJobsSkills);
  if (r.length > 0 && r[0].status === 'fulfilled' && r[0].value) {
    queryJson.jobTitles = [...queryJson.jobTitles, ...r[0].value.related_jobs];
  }

  if (
    r.length > 0 &&
    queryJson.skills.length > 0 &&
    r[1].status === 'fulfilled' &&
    r[1].value
  ) {
    queryJson.skills = [...queryJson.skills, ...r[1].value.related_skills];
  }

  return queryJson;
};
