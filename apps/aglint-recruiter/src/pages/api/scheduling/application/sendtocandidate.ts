/* eslint-disable no-console */
import {
  type DatabaseTable,
  type DB,
  type PlanCombinationRespType,
  type RecruiterUserType,
} from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { type createServerClient } from '@supabase/ssr';
import dayjs from 'dayjs';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { selfScheduleMailToCandidate } from '@/src/components/Scheduling/CandidateDetails/mailUtils';
import { type SchedulingApplication } from '@/src/components/Scheduling/CandidateDetails/store';
import { scheduleDebrief } from '@/src/components/Scheduling/CandidateDetails/utils';
import { addScheduleActivity } from '@/src/components/Scheduling/Candidates/queries/utils';
import { type meetingCardType } from '@/src/components/Tasks/TaskBody/ViewTask/Progress/SessionCard';
import { createTaskProgress } from '@/src/components/Tasks/utils';
import { createTask } from '@/src/utils/scheduling/createTask';
import { handleMeetingsOrganizerResetRelations } from '@/src/utils/scheduling/upsertMeetingsWithOrganizerId';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export interface ApiBodyParamsSendToCandidate {
  is_debrief?: boolean;
  selectedApplication: SchedulingApplication['selectedApplication'];
  initialSessions: SchedulingApplication['initialSessions'];
  selectedSessionIds: SchedulingApplication['selectedSessionIds'];
  recruiter_id: string;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  selectedSlots?: PlanCombinationRespType[];
  selectedDebrief: PlanCombinationRespType;
  recruiterUser: RecruiterUserType;
  user_tz: string;
  selectedApplicationLog: DatabaseTable['application_logs'];
  task_id: string | null;
  schedule_id: string;
}

export interface ApiResponseSendToCandidate {
  data: { filter_id: string; application_id: string } | null;
  error: string | null;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const bodyParams: ApiBodyParamsSendToCandidate = req.body;

    const resSendToCandidate = await sendToCandidate({
      dateRange: bodyParams.dateRange,
      initialSessions: bodyParams.initialSessions,
      recruiter_id: bodyParams.recruiter_id,
      recruiterUser: bodyParams.recruiterUser,
      selectedDebrief: bodyParams.selectedDebrief,
      selectedApplication: bodyParams.selectedApplication,
      selectedSessionIds: bodyParams.selectedSessionIds,
      user_tz: bodyParams.user_tz,
      supabase: supabaseAdmin,
      is_debrief: bodyParams.is_debrief,
      selectedApplicationLog: bodyParams.selectedApplicationLog,
      selectedSlots: bodyParams.selectedSlots,
      task_id: bodyParams.task_id,
      schedule_id: bodyParams.schedule_id,
    });

    console.log('resSendToCandidate', resSendToCandidate);

    res.status(200).send(resSendToCandidate);
  } catch (error) {
    const resErr: ApiResponseSendToCandidate = {
      data: null,
      error: error.message,
    };
    return res.status(500).send(resErr);
  }
};

export default handler;

const sendToCandidate = async ({
  is_debrief = false,
  selectedApplication,
  initialSessions,
  selectedSessionIds,
  recruiter_id,
  dateRange,
  selectedSlots,
  selectedDebrief,
  recruiterUser,
  supabase,
  user_tz,
  selectedApplicationLog,
  task_id,
  schedule_id,
}: {
  is_debrief?: boolean;
  selectedApplication: SchedulingApplication['selectedApplication'];
  initialSessions: SchedulingApplication['initialSessions'];
  selectedSessionIds: SchedulingApplication['selectedSessionIds'];
  recruiter_id: string;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  selectedSlots: PlanCombinationRespType[];
  selectedDebrief: PlanCombinationRespType;
  recruiterUser: {
    email: string;
    first_name: string;
    last_name: string;
    user_id: string;
  };
  supabase: ReturnType<typeof createServerClient<DB>>;
  user_tz: string;
  selectedApplicationLog?: DatabaseTable['application_logs'];
  task_id: string | null;
  schedule_id: string;
}) => {
  let update_task_id = task_id;
  let filter_id;

  console.log('schedule already exists');

  const { organizer_id } = await handleMeetingsOrganizerResetRelations({
    application_id: selectedApplication.id,
    selectedSessions: initialSessions
      .filter((ses) => selectedSessionIds.includes(ses.interview_session.id))
      .map((ses) => ({
        interview_session_id: ses.interview_session.id,
        interview_meeting_id: ses.interview_meeting.id,
        interview_schedule_id: ses.interview_meeting.interview_schedule_id,
      })),
    supabase,
    meeting_flow: 'self_scheduling',
  });

  console.log('updated meetings');

  const { data: filterJson, error: errorFilterJson } = await supabase
    .from('interview_filter_json')
    .insert({
      filter_json: {
        start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
        end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
      },
      session_ids: selectedSessionIds,
      selected_options: selectedSlots,
      created_by: recruiterUser.user_id,
      application_id: selectedApplication.id,
    })
    .select();

  if (errorFilterJson) throw new Error(errorFilterJson.message);

  filter_id = filterJson[0].id;

  console.log('filterJson success');

  if (!is_debrief) {
    if (!update_task_id) {
      console.log('no task_id');

      const resTask = await createTask({
        application_id: selectedApplication.id,
        dateRange,
        filter_id: filterJson[0].id,
        rec_user_id: recruiterUser.user_id,
        recruiter_id,
        selectedSessions: initialSessions.filter((ses) =>
          selectedSessionIds.includes(ses.interview_session.id),
        ),
        type: 'user',
        recruiter_user_name: recruiterUser.first_name,
        candidate_name: getFullName(
          selectedApplication.candidates.first_name,
          selectedApplication.candidates.last_name,
        ),
        supabase,
      });

      update_task_id = resTask.id;

      console.log('created task and progress');

      await addScheduleActivity({
        title: `Sent self scheduling link to ${getFullName(selectedApplication.candidates.first_name, selectedApplication.candidates.last_name)} for ${initialSessions
          .filter((ses) =>
            selectedSessionIds.includes(ses.interview_session.id),
          )
          .map((ses) => ses.interview_session.name)
          .join(' , ')}`,
        logged_by: 'user',
        application_id: selectedApplication.id,
        supabase,
        created_by: recruiterUser.user_id,
        task_id: resTask.id,
      });

      await createTaskProgress({
        type: 'self_scheduling',
        data: {
          progress_type: 'self_schedule',
          created_by: {
            id: recruiterUser.user_id,
            name: getFullName(
              recruiterUser.first_name,
              recruiterUser.last_name,
            ),
          },
          task_id: resTask.id,
        },
        optionData: {
          candidateName: getFullName(
            selectedApplication.candidates.first_name,
            selectedApplication.candidates.last_name,
          ),
          sessions: initialSessions
            .filter((ses) =>
              selectedSessionIds.includes(ses.interview_session.id),
            )
            .map((ele) => ({
              id: ele.interview_session.id,
              name: ele.interview_session.name,
            })) as meetingCardType[],
        },
        supabaseCaller: supabase,
      });
    } else {
      console.log(`task_id ${update_task_id}`);

      await addScheduleActivity({
        title: `Sent self scheduling link to ${getFullName(selectedApplication.candidates.first_name, selectedApplication.candidates.last_name)} for ${initialSessions
          .filter((ses) =>
            selectedSessionIds.includes(ses.interview_session.id),
          )
          .map((ses) => ses.interview_session.name)
          .join(' , ')}`,
        logged_by: 'user',
        application_id: selectedApplication.id,
        supabase,
        created_by: recruiterUser.user_id,
        task_id: update_task_id,
      });

      await createTaskProgress({
        type: 'self_scheduling',
        data: {
          progress_type: 'schedule',
          created_by: {
            id: recruiterUser.user_id,
            name: getFullName(
              recruiterUser.first_name,
              recruiterUser.last_name,
            ),
          },
          task_id: update_task_id,
        },
        optionData: {
          candidateName: getFullName(
            selectedApplication.candidates.first_name,
            selectedApplication.candidates.last_name,
          ),
          sessions: initialSessions
            .filter((ses) =>
              selectedSessionIds.includes(ses.interview_session.id),
            )
            .map((ele) => ({
              id: ele.interview_session.id,
              name: ele.interview_session.name,
            })) as meetingCardType[],
        },
        supabaseCaller: supabase,
      });
    }

    console.log('created task progress');

    selfScheduleMailToCandidate({
      filter_id: filterJson[0].id,
      organizer_id,
    });
  }

  if (is_debrief && selectedDebrief) {
    await scheduleDebrief({
      selectedDebrief,
      candidate_email: selectedApplication.candidates.email,
      candidate_id: selectedApplication.candidates.id,
      candidate_name: getFullName(
        selectedApplication.candidates.first_name,
        selectedApplication.candidates.last_name,
      ),
      filter_id: filterJson[0].id,
      recruiter_id,
      schedule_id,
      user_tz,
      application_id: selectedApplication.id,
      initialSessions,
      selectedSessionIds,
      rec_user_id: recruiterUser.user_id,
      supabase,
      task_id: update_task_id,
    });
  }

  if (selectedApplicationLog?.metadata?.type === 'booking_confirmation') {
    await supabase
      .from('application_logs')
      .update({
        metadata: {
          ...selectedApplicationLog.metadata,
          action: 'rescheduled',
        },
      })
      .eq('id', selectedApplicationLog.id);

    await supabase
      .from('interview_filter_json')
      .delete()
      .eq('id', selectedApplicationLog.metadata.filter_id);

    console.log('updated application logs');
  }

  const res: ApiResponseSendToCandidate = {
    data: {
      filter_id,
      application_id: selectedApplication.id,
    },
    error: null,
  };

  return res;
};
