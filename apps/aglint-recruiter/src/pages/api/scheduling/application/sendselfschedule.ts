/* eslint-disable no-console */
import { type PlanCombinationRespType } from '@aglint/shared-types';
import {
  createRequestProgressLogger,
  executeWorkflowAction,
  getFullName,
  type ProgressLoggerType,
} from '@aglint/shared-utils';
import dayjs from 'dayjs';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { type fetchSessionDetails } from '@/server/api/routers/requests/utils/requestSessions';
import { selfScheduleMailToCandidate } from '@/utils/scheduling/mailUtils';
import { handleMeetingsOrganizerResetRelations } from '@/utils/scheduling/upsertMeetingsWithOrganizerId';
import { addScheduleActivity } from '@/utils/scheduling/utils';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export interface ApiBodyParamsSelfSchedule {
  allSessions: Awaited<ReturnType<typeof fetchSessionDetails>>;
  application_id: string;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  selectedSlots?: PlanCombinationRespType[];
  user_id: string;
  request_id: string;
}

export interface ApiResponseSelfSchedule {
  data: { filter_id: string } | null;
  error: string | null;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseAdmin = getSupabaseServer();

  const bodyParams: ApiBodyParamsSelfSchedule = req.body;
  const reqProgressLogger = createRequestProgressLogger({
    supabaseAdmin,
    request_id: bodyParams.request_id,
    event_type: 'SELF_SCHEDULE_LINK',
  });

  try {
    const resSendToCandidate = await executeWorkflowAction(
      sendToCandidate,
      {
        ...bodyParams,
        reqProgressLogger,
      },
      reqProgressLogger,
    );

    res.status(200).send(resSendToCandidate);
  } catch (error) {
    const resErr: ApiResponseSelfSchedule = {
      data: null,
      error: error?.message || ' Something went wrong',
    };
    return res.status(500).send(resErr);
  }
};

export default handler;

const sendToCandidate = async ({
  dateRange,
  selectedSlots,
  user_id,
  allSessions,
  application_id,
  request_id,
  reqProgressLogger,
}: ApiBodyParamsSelfSchedule & {
  reqProgressLogger: ProgressLoggerType;
}) => {
  const supabaseAdmin = getSupabaseServer();

  const selectedSessionIds = allSessions
    .map((ses) => ses?.interview_session?.id)
    .filter((id) => id !== undefined);

  const schedule = (
    await supabaseAdmin
      .from('applications')
      .select('id,job_id,recruiter_id,candidates(*)')
      .eq('id', application_id)
      .single()
      .throwOnError()
  ).data;

  if (!schedule) throw new Error('Application not found');

  const candidate = schedule.candidates;

  if (!candidate) throw new Error('Candidate not found');

  const { organizer_id } = await handleMeetingsOrganizerResetRelations({
    application_id,
    selectedSessions: allSessions.map((ses) => ({
      interview_session_id: ses.interview_session.id,
      interview_meeting_id: ses?.interview_meeting?.id || '',
      job_id: ses?.interview_meeting?.job_id || '',
      recruiter_id: ses?.interview_meeting?.recruiter_id || '',
    })),
    supabase: supabaseAdmin,
    meeting_flow: 'self_scheduling',
  });

  const { data: filterJson, error: errorFilterJson } = await supabaseAdmin
    .from('interview_filter_json')
    .insert({
      filter_json: {
        start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
        end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
      },
      session_ids: selectedSessionIds,
      selected_options: selectedSlots,
      created_by: user_id,
      request_id,
      application_id,
    })
    .select();

  if (errorFilterJson) throw new Error(errorFilterJson.message);

  // filter_id = filterJson[0].id;

  await addScheduleActivity({
    title: `Sent self scheduling link to ${getFullName(candidate?.first_name, candidate?.last_name)} for ${allSessions
      .filter((ses) => selectedSessionIds.includes(ses.interview_session.id))
      .map((ses) => ses.interview_session.name)
      .join(' , ')}`,
    logged_by: 'user',
    application_id,
    supabase: supabaseAdmin,
    created_by: user_id,
  });

  selfScheduleMailToCandidate({
    filter_id: filterJson[0].id,
    organizer_id,
  });
  await reqProgressLogger({
    status: 'completed',
    is_progress_step: true,
    meta: {
      event_run_id: null,
      filter_json_id: filterJson[0].id,
    },
  });

  const res: ApiResponseSelfSchedule = {
    data: {
      filter_id: filterJson[0].id,
    },
    error: null,
  };

  return res;
};
