import {
  ApiError,
  candidate_new_schedule_schema,
  getFullName,
  supabaseWrap,
} from '@aglint/shared-utils';
import axios from 'axios';
import * as v from 'valibot';

import { InitAgentBodyParams } from '@/src/components/ScheduleAgent/types';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export const selfScheduleAgent = async ({
  agent_type,
  cloned_sessn_ids,
  agent_assigned_user_id,
  req_body,
  schedule_id,
}: {
  req_body: any;
  agent_assigned_user_id: string;
  cloned_sessn_ids: string[];
  schedule_id: string;
  agent_type: 'email' | 'phone';
}) => {
  const { date_range } = v.parse(candidate_new_schedule_schema, req_body);
  const [new_task] = supabaseWrap(
    await supabaseAdmin
      .from('new_tasks')
      .insert({
        assignee: [],
        created_by: agent_assigned_user_id,
        name: `REMOVE THIS IN API`,
      })
      .select(),
  );
  const [agent_assigned_user] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select()
      .eq('user_id', agent_assigned_user_id),
  );
  const [filter_json] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .insert({
        session_ids: cloned_sessn_ids,
        schedule_id: schedule_id,
        filter_json: {
          start_date: date_range.start_date,
          end_date: date_range.end_date,
        },
        selected_options: [],
      })
      .select(
        '*,interview_schedule(applications(public_jobs(*),candidates(*)))',
      ),
  );
  if (!agent_assigned_user.phone) {
    throw new ApiError('PHONE_AGENT', 'phone number not set', 400);
  }
  if (agent_type === 'phone') {
    const job_details = filter_json.interview_schedule.applications.public_jobs;
    const candidate = filter_json.interview_schedule.applications.candidates;
    const bodyParams = {
      begin_sentence_template: `Hi ${candidate.first_name}, this is ${getFullName(agent_assigned_user.first_name, agent_assigned_user.last_name)} calling from ${job_details.company}. We wanted to schedule an interview for the position of ${job_details.job_title}, Is this the right time to talk?`,
      interviewer_name: getFullName(
        agent_assigned_user.first_name,
        agent_assigned_user.last_name,
      ),
      filter_json_id: filter_json.id,
      from_phone_no: '+12512066348',
      to_phone_no: formatPhoneNumber(agent_assigned_user.phone),
      retell_agent_id: process.env.RETELL_AGENT_ID,
      task_id: new_task.id,
    };

    await axios.post(
      `${process.env.NEXT_PUBLIC_AGENT_API}/api/schedule-agent/create-phone-call`,
      bodyParams,
    );
  } else {
    const bodyParams: InitAgentBodyParams = {
      filter_json_id: filter_json.id,
      task_id: new_task.id,
      recruiter_user_id: agent_assigned_user_id,
    };
    await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/mail-agent/init-agent`,
      bodyParams,
    );
  }
};

function formatPhoneNumber(phoneNumber) {
  // Remove all non-numeric characters except '+'
  const numericPhoneNumber = phoneNumber?.replace(/[^\d+]/g, '');

  return numericPhoneNumber;
}
