import axios from 'axios';

import { searchJdToJson } from '@/src/utils/prompts/candidateDb/jdToJson';
import { searchQueryToJson } from '@/src/utils/prompts/candidateDb/searchToJson';
import { supabase } from '@/src/utils/supabaseClient';

import {
  CandidateSearchRes,
  CandidateSearchState,
} from './context/CandidateSearchProvider';
import { supabaseWrap } from '../JobsDashboard/JobPostCreateUpdate/utils';

export function createJobSummary(queryJson: CandidateSearchState['queryJson']) {
  let summary = '';

  if (queryJson.jobTitles && queryJson.jobTitles.length > 0) {
    summary += `Titles: ${queryJson.jobTitles.join(', ')} `;
  }

  if (queryJson.location && queryJson.location.length > 0) {
    summary += `Location: ${queryJson.location.join(', ')} `;
  }

  if (queryJson.languages && queryJson.languages.length > 0) {
    summary += `Languages: ${queryJson.languages.join(', ')} `;
  }

  if (queryJson.minExp || queryJson.maxExp) {
    summary += `Experience: ${queryJson.minExp || 0} - ${
      queryJson.maxExp || 'N/A'
    } years `;
  }

  if (queryJson.universities && queryJson.universities.length > 0) {
    summary += `Universities: ${queryJson.universities.join(', ')} `;
  }

  return summary;
}

export const candidateSearchByQuery = async (
  searchQry: string,
  jobIds: string[],
  recruiterId: string,
  profileLimit: number,
) => {
  const resp = await searchQueryToJson(searchQry);

  const newQueryJson: CandidateSearchState['queryJson'] = {
    jobTitles: [...resp.jobTitles],
    languages: [...resp.spokenLanguages],
    location: [...resp.locations],
    maxExp: resp.maxExperienceInYears,
    minExp: resp.minExperienceInYears,
    universities: [...resp.universities],
    excludedCompanies: [],
    prefferedCompanies: [],
  };

  const { result } = await getqueriedCandidates(
    newQueryJson,
    jobIds,
    profileLimit,
  );

  supabaseWrap(
    await supabase.from('candidate_search_history').insert({
      recruiter_id: recruiterId,
      is_search_jd: false,
      search_query: searchQry,
    }),
  );

  const newSearchState: CandidateSearchState = {
    candidates: result,
    componentinView: 'search',
    queryJson: newQueryJson,
    searchInfo: {
      searchText: searchQry,
      searchType: 'query',
    },
    maxProfiles: profileLimit,
  };

  return newSearchState;
};

export const candidateSearchByJD = async (
  jdText: string,
  jobIds: string[],
  recruiterId: string,
  profileLimit: number,
) => {
  const resp = await searchJdToJson(jdText);
  const newQueryJson: CandidateSearchState['queryJson'] = {
    jobTitles: [resp.jobTitle],
    languages: [...resp.spokenLanguagesMentioned],
    location: [resp.jobLocation],
    maxExp: resp.maxExperienceInYears,
    minExp: resp.minExperienceInYears,
    universities: [...resp.university],
    excludedCompanies: [],
    prefferedCompanies: [],
  };

  const { result, summary } = await getqueriedCandidates(
    newQueryJson,
    jobIds,
    profileLimit,
  );

  const newSearchState: CandidateSearchState = {
    candidates: result,
    componentinView: 'search',
    queryJson: newQueryJson,
    searchInfo: {
      searchText: summary,
      searchType: 'jd',
    },
    maxProfiles: profileLimit,
  };
  supabaseWrap(
    await supabase.from('candidate_search_history').insert({
      recruiter_id: recruiterId,
      is_search_jd: true,
      search_query: summary,
    }),
  );
  return newSearchState;
};

export const getqueriedCandidates = async (
  queryJson: CandidateSearchState['queryJson'],
  jobIds,
  profileLimit,
) => {
  const summary = createJobSummary(queryJson);
  const { data: emb } = await axios.post('/api/ai/create-embeddings', {
    text: summary,
  });
  const embedding = emb.data[0].embedding;
  const result = supabaseWrap(
    await supabase.rpc('match_job_applications', {
      job_ids: jobIds,
      match_count: profileLimit,
      match_threshold: 0.5,
      query_embedding: embedding,
    }),
  ) as CandidateSearchRes[];

  return { result, summary };
};
