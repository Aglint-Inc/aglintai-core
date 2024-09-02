import { type JsonResume } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import axios from 'axios';
import { isArray } from 'lodash';

import { supabase } from '@/src/utils/supabase/client';

import {
  type CandidateSearchRes,
  type CandidateSearchState,
} from '../../context/CandidateSearchProvider/CandidateSearchProvider';

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
    await supabase.rpc('calc_sim_score3', {
      edu_qry_emb: embeddings.education,
      skill_qry_emb: embeddings.skills,
      exp_qry_emb: embeddings.experience,
      resume_qry_emb: embeddings.resume,
      job_ids,
      max_records: max_records,
      ts_query: getFtsearchQry(modifyQryJson.jobTitles),
      filter_companies: getFilterSearchQry(modifyQryJson.excludedCompanies),
    }),
  ) as unknown as Omit<CandidateSearchRes, 'is_bookmarked' | 'is_checked'>[];
  //TODO: supabaseWrap type fix needed

  const canididatesDto: CandidateSearchRes[] =
    await joinSearchResultWithBookMarkAndJobApplied(cands, bookmarked_cands);
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

export const joinSearchResultWithBookMarkAndJobApplied = async (
  candidates: Omit<CandidateSearchRes, 'is_bookmarked' | 'is_checked'>[],
  bookmarkedCands: string[],
) => {
  const candjobs = await supabaseWrap(
    await supabase.rpc('getjobapplicationcountforcandidates2', {
      candidate_ids: candidates.map((c) => c.candidate_id),
    }),
  );
  let mp = new Map();

  candjobs.forEach((c) => {
    mp.set(c.candidate_id, { job_titles: c.job_titles, job_ids: c.job_ids });
  });
  const canididatesDto: CandidateSearchRes[] = candidates
    .filter((c) => Boolean(c.json_resume))
    .filter((c) => Boolean(c.json_resume.skills))
    .map((c) => {
      let loc = '';
      if (
        c.json_resume.basics.location &&
        typeof c.json_resume.basics.location === 'object'
      ) {
        const { city } = c.json_resume.basics.location as any;
        loc = [city].filter(Boolean).join(', ');
      }
      let jsonRes: JsonResume = {
        ...c.json_resume,
        basics: {
          ...c.json_resume.basics,
          location: loc,
        },
      };
      return {
        application_id: c.application_id,
        candidate_id: c.candidate_id,
        email: c.email,
        first_name: c.first_name,
        job_title: c.job_title,
        json_resume: jsonRes,
        last_name: c.last_name,
        resume_link: c.resume_link,
        similarity: c.similarity,
        profile_image: c.profile_image,
        is_bookmarked: bookmarkedCands.includes(c.application_id),
        is_checked: false,
        candfile_id: c.candfile_id,
        applied_job_posts: mp.get(c.candidate_id).job_titles.map((_, idx) => {
          return {
            job_id: mp.get(c.candidate_id).job_ids[Number(idx)],
            job_title: mp.get(c.candidate_id).job_titles[Number(idx)],
          };
        }),
      };
    });

  return canididatesDto;
};

export const dialogFormContent = {
  jobTitles: {
    placeholder: 'Start typing the job title or choose from the list',
    emptyMsg: 'No prefered job roles added',
  },
  languages: {
    placeholder: 'Start typing the languages or choose from the list',
    emptyMsg: 'No languages added',
  },
  location: {
    placeholder: 'Start typing the location or choose from the list',
    emptyMsg: 'No location added',
  },
  universities: {
    placeholder: 'Start typing the universities or choose from the list',
    emptyMsg: 'No universities added',
  },
  degrees: {
    placeholder: 'Start typing the degrees or choose from the list',
    emptyMsg: 'No degrees added',
  },
  skills: {
    placeholder: 'Start typing the skills or choose from the list',
    emptyMsg: 'No skills added',
  },
  excludedCompanies: {
    placeholder: 'Start typing the skills or choose from the list',
    emptyMsg: 'No excluded companies added',
  },
  prefferedCompanies: {
    placeholder: 'Start typing the skills or choose from the list',
    emptyMsg: 'No preferred companies',
  },
  freeKeywords: {
    placeholder: 'Enter free keyword',
    emptyMsg: 'No preferred keywords',
  },
  softConflictsKeywords: {
    placeholder: 'Enter soft conflicts keyword',
    emptyMsg: 'No preferred keywords',
  },
  recruitingBlocksKeywords: {
    placeholder: 'Enter recruiting blocks keyword',
    emptyMsg: 'No preferred keywords',
  },
  outOfOfficeKeywords: {
    placeholder: 'Enter out of office keyword',
    emptyMsg: 'No preferred keywords',
  },
};
