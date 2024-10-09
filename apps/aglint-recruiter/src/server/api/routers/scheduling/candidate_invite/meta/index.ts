import { z } from 'zod';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const schema = z.object({
  filter_id: z.string(),
});

const query = async ({
  input: { filter_id },
}: PublicProcedure<typeof schema>) => {
  const { applications, ...filter } = await getScheduleDetails(filter_id);

  const { resMeetings } = await getInterviewSessionsMeetings(
    filter.session_ids,
  );

  const isBooked = (resMeetings || []).some(
    ({ interview_meeting: { status } }) => status !== 'waiting',
  );

  const redRes = {
    isBooked,
    job: applications.public_jobs,
    application_id: applications.id,
    candidate: applications.candidates,
    filter_json: filter,
    recruiter: applications.candidates.recruiter,
    meetings: resMeetings,
  };

  if (!redRes) {
    throw new Error();
  }

  return redRes;
};

export const metaCandidateInvite = publicProcedure.input(schema).query(query);

const getScheduleDetails = async (filter_id: string) => {
  const db = createPublicClient();
  return (
    await db
      .from('interview_filter_json')
      .select(
        '*,applications!inner(*, public_jobs!inner(id,job_title,recruiter_id),candidates!inner(*,recruiter!inner(logo,name)),candidate_files(id,file_url,candidate_id,resume_json,type))',
      )
      .eq('id', filter_id)
      .single()
      .throwOnError()
  ).data!;
};

const getInterviewSessionsMeetings = async (session_ids: string[]) => {
  const db = createPublicClient();
  const { data: intSes, error: errSes } = await db
    .from('interview_session')
    .select('*,interview_meeting!inner(*)')
    .in('id', session_ids)
    .order('session_order', {
      ascending: true,
    });

  if (errSes) throw new Error(errSes.message);

  const maxBreakDuration = Math.max(
    intSes.reduce((acc, curr) => Math.max(acc, curr.break_duration), 0),
  );

  const maxDurationInDays = Math.floor((maxBreakDuration + 1440) / 1440);

  const resMeetings = intSes.map((session) => {
    const { interview_meeting, ...interview_session } = session;
    return {
      interview_session,
      interview_meeting,
    };
  });

  return { resMeetings, maxDurationInDays };
};
