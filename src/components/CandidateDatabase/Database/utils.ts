import { supabase } from '@/src/utils/supabaseClient';

import { Candidate } from './candFilter.type';
import { supabaseWrap } from '../../JobsDashboard/JobPostCreateUpdate/utils';

export const getFilteredCands = async (jobIds: string[], currPage: number) => {
  const candidates = supabaseWrap(
    await supabase.rpc('filter_candidates', {
      job_ids: jobIds,
      max_records: 100,
      offset_records: (currPage - 1) * 100,
    }),
  );

  const candjobs = await supabaseWrap(
    await supabase.rpc('getjobapplicationcountforcandidates', {
      candidate_ids: candidates.map((c) => c.candidate_id),
    }),
  );
  let mp = new Map();

  candjobs.forEach((c) => {
    mp.set(c.candidate_id, {
      job_titles: c.job_titles,
      job_ids: c.job_ids,
    });
  });
  const canididatesDto: Candidate[] = candidates
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
