import { type ActionPayloadType } from '@aglint/shared-types';
import {
  type candidate_new_schedule_schema,
  type ProgressLoggerType,
} from '@aglint/shared-utils';
import { type z } from 'zod';

import { candidateSelfScheduleLink } from '../utils/candidateSelfScheduleLink';
import { findPlansForSelfSchedule } from '../utils/findPlansForSelfSchedule';

export const sendSelfScheduleLink = async ({
  agent_instruction,
  date_range,
  recruiter_id,
  session_ids,
  time_zone,
  reqProgressLogger,
  parsed_body,
  job_payload,
}: {
  agent_instruction: string;
  date_range: { start_date_str: string; end_date_str: string };
  recruiter_id: string;
  time_zone: string;
  job_payload: ActionPayloadType['agent_instruction'];
  session_ids: string[];
  reqProgressLogger: ProgressLoggerType;
  parsed_body: z.infer<typeof candidate_new_schedule_schema>;
}) => {
  const filtered_slots = await findPlansForSelfSchedule({
    agent_instruction,
    date_range,
    recruiter_id,
    session_ids,
    time_zone,
  });
  await candidateSelfScheduleLink({
    date_range,
    job_payload: job_payload,
    organizer_id: recruiter_id,
    parsed_body,
    reqProgressLogger: reqProgressLogger,
    req_assignee_tz: time_zone,
    selected_slots_from_instruction: filtered_slots,
  });
};
