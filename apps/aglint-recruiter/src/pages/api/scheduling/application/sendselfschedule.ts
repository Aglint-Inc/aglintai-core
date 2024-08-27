/* eslint-disable no-console */
import {
  PlanCombinationRespType,
  RecruiterUserType,
} from '@aglint/shared-types';
import {
  createRequestProgressLogger,
  executeWorkflowAction,
  getFullName,
} from '@aglint/shared-utils';
import dayjs from 'dayjs';
import { NextApiRequest, NextApiResponse } from 'next';

import { selfScheduleMailToCandidate } from '@/src/components/Scheduling/CandidateDetails/mailUtils';
import { addScheduleActivity } from '@/src/components/Scheduling/Candidates/queries/utils';
import { handleMeetingsOrganizerResetRelations } from '@/src/utils/scheduling/upsertMeetingsWithOrganizerId';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { ApiInterviewSessionRequest } from './fetchInterviewSessionByRequest';

export interface ApiBodyParamsSelfSchedule {
  allSessions: ApiInterviewSessionRequest['response']['sessions'];
  application_id: string;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  selectedSlots?: PlanCombinationRespType[];
  recruiterUser: RecruiterUserType;
  request_id: string;
}

export interface ApiResponseSelfSchedule {
  data: { filter_id: string; schedule_id: string } | null;
  error: string | null;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const bodyParams: ApiBodyParamsSelfSchedule = req.body;
  const reqProgressLogger = createRequestProgressLogger({
    supabaseAdmin,
    request_id: bodyParams.request_id,
  });

  try {
    const resSendToCandidate = await executeWorkflowAction(
      sendToCandidate,
      bodyParams,
      reqProgressLogger,
      {
        event_type: 'SELF_SCHEDULE_LINK',
      },
    );

    res.status(200).send(resSendToCandidate);
  } catch (error) {
    const resErr: ApiResponseSelfSchedule = {
      data: null,
      error: error.message,
    };
    return res.status(500).send(resErr);
  }
};

export default handler;

const sendToCandidate = async ({
  dateRange,
  selectedSlots,
  recruiterUser,
  allSessions,
  application_id,
  request_id,
}: ApiBodyParamsSelfSchedule) => {
  let filter_id;
  const selectedSessionIds = allSessions.map((ses) => ses.interview_session.id);

  const schedule = (
    await supabaseAdmin
      .from('applications')
      .select('id,candidates(*)')
      .eq('id', application_id)
      .single()
      .throwOnError()
  ).data;

  const candidate = schedule.candidates;
  const schedule_id = schedule.id;

  const { organizer_id } = await handleMeetingsOrganizerResetRelations({
    application_id,
    selectedSessions: allSessions.map((ses) => ({
      interview_session_id: ses.interview_session.id,
      interview_meeting_id: ses.interview_meeting.id,
      interview_schedule_id: ses.interview_meeting.interview_schedule_id,
    })),
    supabase: supabaseAdmin,
    meeting_flow: 'self_scheduling',
  });

  await supabaseAdmin
    .from('request')
    .update({
      status: 'in_progress',
    })
    .eq('id', request_id)
    .throwOnError();

  const { data: filterJson, error: errorFilterJson } = await supabaseAdmin
    .from('interview_filter_json')
    .insert({
      filter_json: {
        start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
        end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
      },
      session_ids: selectedSessionIds,
      selected_options: selectedSlots,
      created_by: recruiterUser.user_id,
      request_id,
      application_id,
    })
    .select();

  if (errorFilterJson) throw new Error(errorFilterJson.message);

  filter_id = filterJson[0].id;

  await addScheduleActivity({
    title: `Sent self scheduling link to ${getFullName(candidate.first_name, candidate.last_name)} for ${allSessions
      .filter((ses) => selectedSessionIds.includes(ses.interview_session.id))
      .map((ses) => ses.interview_session.name)
      .join(' , ')}`,
    logged_by: 'user',
    application_id,
    supabase: supabaseAdmin,
    created_by: recruiterUser.user_id,
    task_id: null,
  });

  selfScheduleMailToCandidate({
    filter_id: filterJson[0].id,
    organizer_id,
  });

  const res: ApiResponseSelfSchedule = {
    data: {
      filter_id,
      schedule_id,
    },
    error: null,
  };

  return res;
};
