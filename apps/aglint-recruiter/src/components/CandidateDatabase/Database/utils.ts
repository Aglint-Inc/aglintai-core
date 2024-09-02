import { type JsonResume } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import { supabase } from '@/src/utils/supabase/client';

import { type Candidate } from './candFilter.type';

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
  candfile_id: string;
  total_results: number;
};

export const getFilteredCands = async ({
  currPage,
  location_filter,
  name_filter,
  recruiter_id,
  job_role,
  is_sort_desc,
  sort_param,
}: {
  recruiter_id: string;
  currPage: number;
  name_filter: string;
  location_filter: string;
  job_role: string;
  sort_param: 'first_name' | 'location' | 'job_title';
  is_sort_desc: boolean;
}) => {
  const candidates = supabaseWrap(
    await supabase.rpc('test_filter3', {
      rec_id: recruiter_id,
      page_size: 100,
      page_number: currPage,
      sort_param: sort_param,
      is_job_title_sort_desc: is_sort_desc,
      is_location_sort_desc: is_sort_desc,
      is_name_sort_desc: is_sort_desc,
      name_filter: filterSqlQryfromString(name_filter),
      location_filter: filterSqlQryfromString(location_filter),
      job_title_filter: filterSqlQryfromString(job_role),
    }),
  ) as CandidateSearchType[];
  //TODO: supabaseWrap type fix needed

  //NOTE: filter cands old json
  const filteredCands = candidates
    .map((cand) => {
      return {
        ...cand,
        email: cand.email.startsWith('temp-') ? '' : cand.email,
      };
    })
    .map((cand) => {
      if (
        cand.json_resume.basics.location &&
        typeof cand.json_resume.basics.location === 'object'
      ) {
        const { city } = cand.json_resume.basics.location as any;
        cand.json_resume.basics.location = [city].filter(Boolean).join(', ');
      }
      return cand;
    });
  const candjobs = await supabaseWrap(
    await supabase.rpc('getjobapplicationcountforcandidates2', {
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
        candfile_id: c.candfile_id,
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
    total_results: candidates.length > 0 ? candidates[0].total_results : 0,
  };
};

const filterSqlQryfromString = (filter: string) => {
  if (!filter) return '';
  return filter.split(' ').join('<->');
};
