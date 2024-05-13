import { createServerClient } from '@supabase/ssr';

import { Database } from '@/src/types/schema';

import { JobApplicationDelete } from '../../../../pages/api/job/jobApplications/candidateDelete';
import { handleRead, readNewJobApplicationDbAction } from '../read/utils';

export const clearApplications = async (
  supabase: ReturnType<typeof createServerClient<Database>>,
  applicationIds: JobApplicationDelete['request']['applications'][number]['id'][],
) => {
  const { error } = await supabase
    .from('applications')
    .delete()
    .in('id', applicationIds);
  if (error) throw new Error(error.message);
};

const orphanCandidates = async (
  supabase: ReturnType<typeof createServerClient<Database>>,
  candidates: {
    id: JobApplicationDelete['request']['applications'][number]['candidate_id'];
    email: JobApplicationDelete['request']['applications'][number]['email'];
    recruiter_id: null;
  }[],
) => {
  const { error } = await supabase.from('candidates').upsert(candidates);
  if (error) throw new Error(error.message);
};

export const deleteApplications = async (
  supabase: ReturnType<typeof createServerClient<Database>>,
  applications: JobApplicationDelete['request']['applications'],
  clearCandidate: JobApplicationDelete['request']['clearCandidate'],
) => {
  const { applicationIds, candidates } = applications.reduce(
    (acc, curr) => {
      acc.applicationIds.push(curr.id);
      acc.candidates.push({
        id: curr.candidate_id,
        recruiter_id: null,
        email: curr.email,
      });
      return acc;
    },
    {
      applicationIds: [],
      candidates: [] as Parameters<typeof orphanCandidates>[1],
    },
  );
  if (!clearCandidate) {
    await clearApplications(supabase, applicationIds);
    return;
  }
  await Promise.allSettled([
    clearApplications(supabase, applicationIds),
    orphanCandidates(supabase, candidates),
  ]);
};

export const readAllApplications = async (
  supabase: ReturnType<typeof createServerClient<Database>>,
  jobId: JobApplicationDelete['request']['jobId'],
  section: JobApplicationDelete['request']['section'],
  parameter: JobApplicationDelete['request']['parameter'],
) => {
  const { sort, filter, search } = parameter;
  const { data } = await readNewJobApplicationDbAction(
    jobId,
    supabase,
    section,
    sort,
    null,
    search,
    filter,
  );
  const result = data.map((a) => ({
    id: a.id,
    candidate_id: a.candidate_id,
    email: a.candidates.email,
  }));
  return result;
};

export const readApplications = async (
  supabase: ReturnType<typeof createServerClient<Database>>,
  jobId: JobApplicationDelete['request']['jobId'],
  section: JobApplicationDelete['request']['section'],
  parameter: JobApplicationDelete['request']['parameter'],
) => {
  const { ranges, sort, filter, search } = parameter;
  const results = await handleRead(
    [section],
    jobId,
    supabase,
    ranges,
    sort,
    filter,
    search,
  );
  return results;
};
