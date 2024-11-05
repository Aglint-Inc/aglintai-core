/* eslint-disable no-console */
import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

const schema = z.object({ id: z.string() });

const query = async ({
  input: { id },
  ctx,
}: PrivateProcedure<typeof schema>) => {
  const db = ctx.db;

  const errors: string[] = [];
  const { data } = await db
    .from('interview_session')
    .select(
      '*,interview_meeting!inner(*),interview_plan!inner(public_jobs!inner(id,job_title))',
    )
    .eq('module_id', id);

  const connectedJobs: string[] = (data || [])
    .filter((ses) => !!ses.interview_plan_id)
    .map((ses) => ses.interview_plan?.public_jobs?.job_title)
    .filter((job) => job !== null);

  const uniqueJobs = [...new Set(connectedJobs)];

  const isActiveMeeting = (data || []).some(
    (meet) =>
      meet.interview_meeting &&
      (meet.interview_meeting.status === 'confirmed' ||
        meet.interview_meeting.status === 'waiting'),
  );

  if (isActiveMeeting) {
    errors.push(
      'Please wait until the ongoing schedules are completed to archive this interview type.',
    );
  }
  if (uniqueJobs.length) {
    uniqueJobs.map((job) => {
      errors.push(`Remove this type from  ${job} job's interview plan.`);
    });
  }

  return { errors };
};

export const archiveGetSessions = privateProcedure.input(schema).query(query);

export type ArchiveGetSessions = ProcedureDefinition<typeof archiveGetSessions>;
