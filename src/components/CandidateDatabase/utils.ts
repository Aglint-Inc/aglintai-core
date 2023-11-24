import axios from 'axios';
import { isArray } from 'lodash';

import { supabase } from '@/src/utils/supabaseClient';

import {
  CandidateSearchRes,
  CandidateSearchState,
} from './context/CandidateSearchProvider';
import { supabaseWrap } from '../JobsDashboard/JobPostCreateUpdate/utils';

export const getRelevantCndidates = async (
  newQueryJson: CandidateSearchState['queryJson'],
  job_ids: string[],
  max_records: number,
  bookmarked_cands: string[] = [],
) => {
  let embeddings = {
    skills: null,
    education: null,
    experience: null,
    resume: null,
  };

  const modifyQryJson = {
    ...newQueryJson,
  };

  Object.keys(modifyQryJson).forEach((k) => {
    if (isArray(modifyQryJson[String(k)])) {
      modifyQryJson[String(k)] = modifyQryJson[String(k)].filter((s) =>
        Boolean(s.trim()),
      );
    }
  });

  const preqs = [
    (async () => await getEmbedding(modifyQryJson.skills.join(' ').trim()))(),
    (async () =>
      await getEmbedding(
        [...modifyQryJson.degrees, ...modifyQryJson.universities]
          .join(' ')
          .trim(),
      ))(),
    (async () =>
      await getEmbedding(
        [
          ...modifyQryJson.jobTitles,
          [modifyQryJson.minExp, modifyQryJson.maxExp]
            .filter(Boolean)
            .join(' years'),
          ...modifyQryJson.prefferedCompanies,
        ].join(' '),
      ))(),
    (async () =>
      await getEmbedding(
        [
          ...modifyQryJson.skills,
          ...modifyQryJson.jobTitles,
          ...modifyQryJson.languages,
          ...modifyQryJson.prefferedCompanies,
          ...modifyQryJson.location,
          [modifyQryJson.minExp, modifyQryJson.maxExp]
            .filter(Boolean)
            .join(' years'),
          ...modifyQryJson.degrees,
          ...modifyQryJson.universities,
        ]
          .join(' ')
          .trim(),
      ))(),
  ];

  const resp = await Promise.allSettled(preqs);

  embeddings.skills =
    resp[0].status === 'fulfilled' &&
    resp[0].value &&
    resp[0].value.data[0].embedding;

  embeddings.education =
    resp[1].status === 'fulfilled' &&
    resp[1].value &&
    resp[1].value.data[0].embedding;

  embeddings.experience =
    resp[2].status === 'fulfilled' &&
    resp[2].value &&
    resp[2].value.data[0].embedding;

  embeddings.resume =
    resp[3].status === 'fulfilled' &&
    resp[3].value &&
    resp[3].value.data[0].embedding;

  const cands = supabaseWrap(
    await supabase.rpc('calc_sim_score', {
      edu_qry_emb: embeddings.education,
      skill_qry_emb: embeddings.skills,
      exp_qry_emb: embeddings.experience,
      resume_qry_emb: embeddings.resume,
      job_ids,
      max_records: max_records,
      ts_query: getFtsearchQry(modifyQryJson.jobTitles),
      filter_companies: getFilterSearchQry(modifyQryJson.excludedCompanies),
    }),
  ) as Omit<CandidateSearchRes, 'is_bookmarked' | 'is_checked'>[];

  const canididatesDto: CandidateSearchRes[] = joinSearchResultWithBookMark(
    cands,
    bookmarked_cands,
  );
  return canididatesDto;
};

const getEmbedding = async (str: string) => {
  if (!str) return null;
  const { data } = await axios.post('/api/ai/create-embeddings', {
    text: str,
  });

  return data;
};

const getFtsearchQry = (jobTitles: string[]) => {
  return jobTitles
    .map((j) => j.split(' ').join(' & ').toLowerCase())
    .join(' | ');
};

const getFilterSearchQry = (companies: string[]) => {
  return companies
    .map((c) => c.split(' ').join('&').toLowerCase())
    .map((c) => `!${c}`)
    .join(' & ');
};

export const joinSearchResultWithBookMark = (
  candidates: Omit<CandidateSearchRes, 'is_bookmarked' | 'is_checked'>[],
  bookmarkedCands: string[],
) => {
  const canididatesDto: CandidateSearchRes[] = candidates.map((c) => ({
    ...c,
    is_bookmarked: bookmarkedCands.includes(c.application_id),
    is_checked: false,
  }));
  return canididatesDto;
};
