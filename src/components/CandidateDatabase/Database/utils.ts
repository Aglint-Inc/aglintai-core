import { JsonResume } from '@/src/types/resume_json.types';
import { supabase } from '@/src/utils/supabaseClient';

import { Candidate } from './candFilter.type';
import { supabaseWrap } from '../../JobsDashboard/JobPostCreateUpdate/utils';

type CandidateSearchType = {
  candidate_id: string;
  application_id: string;
  first_name: string;
  last_name: string;
  job_title: string | null;
  email: string;
  json_resume: JsonResume;
  profile_image?: string;
  resume_link: string;
  created_at: string;
  job_id: string | null;
  total_results: number;
};

export const getFilteredCands = async ({
  currPage,
  location_filter,
  name_filter,
  recruiter_id,
  job_role,
}: {
  recruiter_id: string;
  currPage: number;
  name_filter: string;
  location_filter: string;
  job_role: string;
}) => {
  const candidates = supabaseWrap(
    await supabase.rpc('filter_candidates2', {
      rec_id: recruiter_id,
      max_records: 100,
      offset_records: (currPage - 1) * 100,
      name_filter: filterSqlQryfromString(name_filter),
      location_filter: filterSqlQryfromString(location_filter),
      job_title_filter: filterSqlQryfromString(job_role),
    }),
  ) as CandidateSearchType[];

  //NOTE: filter cands old json
  const filteredCands = candidates.filter(
    (c) => c.json_resume && typeof c.json_resume.basics.location === 'string',
  );

  const candjobs = await supabaseWrap(
    await supabase.rpc('getjobapplicationcountforcandidates', {
      candidate_ids: filteredCands.map((c) => c.candidate_id),
    }),
  );
  let mp = new Map();
  candjobs.forEach((c) => {
    mp.set(c.candidate_id, {
      job_titles: c.job_titles,
      job_ids: c.job_ids,
    });
  });

  const canididatesDto: Candidate[] = filteredCands
    .filter((c) => Boolean(c.json_resume))
    .map((c) => {
      return {
        application_id: c.application_id,
        candidate_id: c.candidate_id,
        email: c.email,
        first_name: c.first_name,
        job_title: c.job_title,
        json_resume: c.json_resume as any,
        last_name: c.last_name,
        resume_link: c.resume_link,
        profile_image: c.profile_image,
        is_checked: false,
        applied_job_posts:
          mp.get(c.candidate_id)?.job_titles.map((_, idx) => {
            return {
              job_id: mp.get(c.candidate_id).job_ids[Number(idx)],
              job_title: mp.get(c.candidate_id).job_titles[Number(idx)],
            };
          }) ?? [],
      };
    });

  return {
    filteredCands: canididatesDto,
    total_results:
      filteredCands.length > 0 ? filteredCands[0].total_results : 0,
  };
};

const filterSqlQryfromString = (filter: string) => {
  if (!filter) return '';
  return filter.split(' ').join('<->');
};
