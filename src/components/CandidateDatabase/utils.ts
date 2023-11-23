import axios from 'axios';

import { supabase } from '@/src/utils/supabaseClient';

import { CandidateSearchState } from './context/CandidateSearchProvider';

export const getRelevantCndidates = async (
  newQueryJson: CandidateSearchState['queryJson'],
  job_ids: string[],
  max_records: number,
) => {
  let embeddings = {
    skills: null,
    education: null,
    experience: null,
    resume: null,
  };

  const preqs = [
    (async () => await getEmbedding(newQueryJson.skills.join(' ').trim()))(),
    (async () =>
      await getEmbedding(
        [...newQueryJson.degrees, ...newQueryJson.universities]
          .join(' ')
          .trim(),
      ))(),
    (async () =>
      await getEmbedding(
        [
          ...newQueryJson.jobTitles,
          [newQueryJson.minExp, newQueryJson.maxExp]
            .filter(Boolean)
            .join(' years'),
          ...newQueryJson.prefferedCompanies,
        ].join(' '),
      ))(),
    (async () =>
      await getEmbedding(
        [
          ...newQueryJson.skills,
          ...newQueryJson.jobTitles,
          ...newQueryJson.languages,
          ...newQueryJson.prefferedCompanies,
          ...newQueryJson.location,
          [newQueryJson.minExp, newQueryJson.maxExp]
            .filter(Boolean)
            .join(' years'),
          ...newQueryJson.degrees,
          ...newQueryJson.universities,
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

  const { data: cands, error } = await supabase.rpc('calc_sim_score', {
    edu_qry_emb: embeddings.education,
    skill_qry_emb: embeddings.skills,
    exp_qry_emb: embeddings.experience,
    resume_qry_emb: embeddings.resume,
    job_ids,
    max_records: max_records,
  });

  if (error) {
    throw new Error(error.message);
  }

  return cands;
};

const getEmbedding = async (str: string) => {
  if (!str) return null;
  const { data } = await axios.post('/api/ai/create-embeddings', {
    text: str,
  });

  return data;
};
