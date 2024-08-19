import {
  APICreateInterviewerRequest,
  DatabaseEnums,
  DatabaseTable,
} from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import axios from 'axios';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { getWActions } from '../utils/w_actions';

export const onInsertInterviewSessionCancel = async ({
  new_data,
}: {
  new_data: DatabaseTable['interview_session_cancel'];
}) => {
  if (new_data.session_relation_id && new_data.type === 'declined') {
    await createInterviewerDeclineRequest({
      new_data,
    });
  }
};

const createInterviewerDeclineRequest = async ({
  new_data,
}: {
  new_data: DatabaseTable['interview_session_cancel'];
}) => {
  try {
    const payload: APICreateInterviewerRequest = {
      interview_cancel_id: new_data.id,
      session_id: new_data.session_id,
    };
    await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/request/interviewer-request`,
      payload,
    );
  } catch (err) {
    console.error(
      `Failed to perform createInterviewerDeclineRequest`,
      err.message,
    );
  }
};

const onInterviewerDecline = async (
  new_data: DatabaseTable['interview_session_cancel'],
) => {
  try {
    const trigg_actions: DatabaseEnums['email_slack_types'][] = [
      'onInterviewerDecline_agent_changeInterviewer',
    ];
    const [meeting_int] = supabaseWrap(
      await supabaseAdmin
        .from('meeting_interviewers')
        .select()
        .eq('session_relation_id', new_data.session_relation_id),
    );
    const [meeting_details] = supabaseWrap(
      await supabaseAdmin
        .from('interview_meeting')
        .select('*,applications(*)')
        .eq('id', meeting_int.meeting_id),
    );
    const { job_level_actions } = await getWActions(
      meeting_details.applications.job_id,
    );

    const promises = job_level_actions
      .filter((j_l_a) => trigg_actions.includes(j_l_a.target_api))
      .map(async (j_l_a) => {
        supabaseWrap(
          await supabaseAdmin.rpc('create_new_workflow_action_log', {
            triggered_table: 'interview_session_cancel',
            triggered_table_pkey: new_data.id,
            base_time: dayjsLocal().toISOString(),
            workflow_action_id: j_l_a.id,
            workflow_id: j_l_a.workflow_id,
            interval_minutes: j_l_a.workflow.interval,
            meta: {
              target_api: j_l_a.target_api,
              payload: j_l_a.payload,
              session_id: meeting_int.session_id,
              declined_int_sesn_reln_id: new_data.session_relation_id,
            },
            phase: j_l_a.workflow.phase,
          }),
        );
      });

    await Promise.allSettled(promises);
  } catch (error) {
    console.error(`failed to perform onInterviewerDecline`, error.message);
  }
};
