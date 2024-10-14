import {
  type APICandScheduleMailThankYou,
  type DatabaseEnums,
  type DatabaseTable,
  type TargetApiPayloadType,
} from '@aglint/shared-types';
import { type CustomMeta } from '@aglint/shared-types/src/db/tables/application_logs.types';
import { CApiError, supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { getWActions } from '@/services/event-triggers/utils/w_actions';
import { mailSender } from '@/utils/mailSender';
import { addScheduleActivity } from '@/utils/scheduling/utils';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { type ApiDebriefAddUsers } from './debrief-add-users';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseAdmin = getSupabaseServer();

  try {
    const {
      session_ids,
      application_id,
      filter_id,
      availability_request_id,
      is_debreif,
    } = req.body as APICandScheduleMailThankYou;

    const { meeting_data } = await fetchSessionDetails(
      session_ids,
      application_id,
    );

    if (!meeting_data) {
      return res.status(400).send('No meeting data found');
    }

    addScheduleActivity({
      title: `Booked ${meeting_data.map((ses) => ses.name).join(' , ')}`,
      application_id: application_id,
      logged_by: 'candidate',
      supabase: supabaseAdmin,
      created_by: null,
      metadata: {
        type: 'booking_confirmation',
        sessions: meeting_data,
        filter_id: filter_id ?? undefined,
        availability_request_id: availability_request_id ?? undefined,
        action: 'waiting',
      },
    });

    if (filter_id) {
      const payloadDebriefAddUsers: ApiDebriefAddUsers = {
        filter_id,
      };
      axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/application/debrief-add-users`,
        payloadDebriefAddUsers,
      );
      supabaseWrap(
        await supabaseAdmin
          .from('interview_filter_json')
          .update({
            confirmed_on: dayjsLocal().toISOString(),
          })
          .eq('id', filter_id),
      );
    }

    if (!is_debreif) {
      const payload: TargetApiPayloadType<'confirmInterview_email_applicant'> =
        {
          availability_req_id: availability_request_id,
          application_id: application_id,
          session_ids: session_ids,
          filter_id: filter_id,
          is_preview: false,
        };
      await mailSender({
        target_api: 'confirmInterview_email_applicant',
        payload: {
          ...payload,
        },
      });
    }

    const workflowJobs = meeting_data.map(async (m) => {
      await addJobsToQueue(m.interview_meeting as any);
    });
    await Promise.all(workflowJobs);
    return res.status(200).send('ok');
  } catch (error) {
    console.error(error);
    return res.status(500).send((error as Error).message);
  }
};

export default handler;

export const fetchSessionDetails = async (
  session_ids: string[],
  application_id: string,
) => {
  const supabaseAdmin = getSupabaseServer();

  const meeting_data = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select(
        '*,interview_meeting(*),interview_session_relation(*,interview_module_relation(id,recruiter_user(user_id,email,first_name,last_name,profile_image)))',
      )
      .in('id', session_ids)
      .returns<CustomMeta[]>(),
  );
  const app_data = (
    await supabaseAdmin
      .from('applications')
      .select('id,candidates(id,first_name,last_name,email)')
      .eq('id', application_id)
      .single()
  ).data;
  return {
    meeting_data: meeting_data,
    candidate: app_data?.candidates,
  };
};

const addJobsToQueue = async (new_data: DatabaseTable['interview_meeting']) => {
  try {
    const supabaseAdmin = getSupabaseServer();
    const session_details = supabaseWrap(
      await supabaseAdmin
        .from('interview_session')
        .select()
        .eq('meeting_id', new_data.id)
        .single(),
    );
    let actions: DatabaseEnums['email_slack_types'][] = [
      'interviewStart_email_applicant',
      'interviewStart_email_organizer',
      'candidateBook_slack_interviewerForConfirmation',
      'interviewEnd_slack_organizerForMeetingStatus',
      'interviewEnd_email_organizerForMeetingStatus',
      'interviewEnd_email_shadowTraineeForMeetingAttendence',
      'interviewEnd_email_rShadowTraineeForMeetingAttendence',
      'interviewEnd_slack_rShadowTraineeForMeetingAttendence',
      'interviewEnd_slack_shadowTraineeForMeetingAttendence',
    ];
    if (session_details.session_type === 'debrief') {
      actions = [
        'interviewStart_email_applicant',
        'interviewStart_email_organizer',
        'candidateBook_slack_interviewerForConfirmation',
        'interviewEnd_slack_organizerForMeetingStatus',
        'interviewEnd_email_organizerForMeetingStatus',
      ];
    } else {
      actions = [
        'interviewStart_email_applicant',
        'interviewStart_email_organizer',
        'candidateBook_slack_interviewerForConfirmation',
        'interviewEnd_slack_organizerForMeetingStatus',
        'interviewEnd_email_organizerForMeetingStatus',
        'interviewEnd_email_shadowTraineeForMeetingAttendence',
        'interviewEnd_email_rShadowTraineeForMeetingAttendence',
        'interviewEnd_slack_rShadowTraineeForMeetingAttendence',
        'interviewEnd_slack_shadowTraineeForMeetingAttendence',
      ];
    }
    const jobs_set: Set<DatabaseEnums['email_slack_types']> = new Set(actions);
    await stopJobPreviouslyQueuedJobs(new_data);
    const schedule_application = (
      await supabaseAdmin
        .from('applications')
        .select('*,public_jobs(*)')
        .eq('id', new_data.application_id)
        .single()
        .throwOnError()
    ).data;
    if (!schedule_application) {
      throw new CApiError('SERVER_ERROR', 'Application not found');
    }
    if (!schedule_application.public_jobs) {
      throw new CApiError('SERVER_ERROR', 'Job not found');
    }

    const { request_workflows, company_actions } = await getWActions({
      company_id: schedule_application.public_jobs.recruiter_id,
      request_id: new_data.schedule_request_id,
    });
    const meeting_details = (
      await supabaseAdmin
        .from('meeting_details')
        .select()
        .eq('id', new_data.id)
        .single()
        .throwOnError()
    ).data;
    if (!meeting_details) {
      throw new CApiError('SERVER_ERROR', 'Meeting details not found');
    }
    const all_actions = [...request_workflows, ...company_actions]
      .filter((act) => jobs_set.has(act.target_api))
      .map(async (act) => {
        let base_time = dayjsLocal().toISOString();
        if (act.workflow.trigger === 'interviewEnd' && new_data.end_time) {
          base_time = new_data.end_time;
        }
        supabaseWrap(
          await supabaseAdmin.rpc('create_new_workflow_action_log', {
            base_time: base_time,
            triggered_table: 'interview_meeting',
            triggered_table_pkey: new_data.id,
            workflow_id: act.workflow_id,
            workflow_action_id: act.id,
            interval_minutes: act.workflow.interval,
            phase: act.workflow.phase,
            meta: {
              meeting_id: new_data.id,
              application_id: schedule_application.id,
              target_api: act.target_api,
              organizer_id: new_data.organizer_id,
              session_id: meeting_details.session_id,
              payload: act.payload,
              request_id: new_data.schedule_request_id,
            },
          }),
        );
      });
    await Promise.allSettled(all_actions);
  } catch (err: any) {
    console.error('Failed to perform', err.message);
  }
};
const stopJobPreviouslyQueuedJobs = async (
  new_data: DatabaseTable['interview_meeting'],
) => {
  const supabaseAdmin = getSupabaseServer();

  supabaseWrap(
    await supabaseAdmin
      .from('workflow_action_logs')
      .update({
        status: 'stopped',
      })
      .eq('related_table', 'interview_meeting')
      .eq('related_table_pkey', new_data.id)
      .eq('status', 'not_started'),
  );
};
