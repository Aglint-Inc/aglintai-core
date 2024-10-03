import { z } from 'zod';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const schema = z.object({
  application_id: z.string(),
  filter_id: z.string(),
});

const query = async ({
  input: { application_id, filter_id },
}: PublicProcedure<typeof schema>) => {
  const schedule = await getScheduleDetails(application_id, filter_id);

  const filterJson = schedule.interview_filter_json[0];

  const recruiter = schedule.candidates.recruiter;

  const { resMeetings } = await getInterviewSessionsMeetings(
    filterJson.session_ids,
  );

  const redRes = {
    job: schedule.public_jobs,
    application_id,
    candidate: schedule.candidates,
    filter_json: filterJson,
    recruiter: recruiter,
    meetings: resMeetings,
  };

  if (!redRes) {
    throw new Error();
  }

  return redRes;
};

export const metaCandidateInvite = publicProcedure.input(schema).query(query);

const getScheduleDetails = async (
  application_id: string,
  filter_id: string,
) => {
  const db = createPublicClient();
  const { data: sch, error: errSch } = await db
    .from('applications')
    .select(
      '*, public_jobs!inner(id,job_title,recruiter_id),candidates!inner(*,recruiter!inner(id,logo,name)),candidate_files(id,file_url,candidate_id,resume_json,type),interview_filter_json!inner(*)',
    )
    .eq('id', application_id)
    .eq('interview_filter_json.id', filter_id)
    .single();

  if (errSch) throw new Error(errSch.message);

  if (!sch) {
    throw new Error('Schedule not found.');
  }

  return sch;
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

  const resMeetings = intSes.map((session) => ({
    interview_session: session,
    interview_meeting: session.interview_meeting,
  }));

  return { resMeetings, maxDurationInDays };
};
