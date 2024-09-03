/* eslint-disable no-console */
import {
  type DatabaseTableInsert,
  type SupabaseType,
} from '@aglint/shared-types';
import { EmailAgentId, PhoneAgentId } from '@aglint/shared-utils';

import { type SchedulingApplication } from '@/src/components/Scheduling/CandidateDetails/store';

export const createTask = async ({
  selectedSessions,
  application_id,
  rec_user_id,
  recruiter_id,
  dateRange,
  filter_id,
  type,
  // eslint-disable-next-line no-unused-vars
  recruiter_user_name,
  supabase,
  candidate_name,
}: {
  selectedSessions: SchedulingApplication['initialSessions'];
  application_id: string;
  rec_user_id: string;
  recruiter_id: string;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  filter_id: string;
  type: 'phone_agent' | 'email_agent' | 'user';
  recruiter_user_name: string;
  candidate_name: string;
  supabase: SupabaseType;
}) => {
  const assignee =
    type == 'email_agent'
      ? EmailAgentId
      : type == 'phone_agent'
        ? PhoneAgentId
        : rec_user_id;

  const { data: task } = await supabase
    .from('new_tasks')
    .insert({
      name: `Schedule interview for ${candidate_name} - ${selectedSessions
        .map((ses) => ses.interview_session.name)
        .join(' , ')}`,
      application_id,
      created_by: rec_user_id,
      status: 'in_progress',
      recruiter_id,
      due_date: dateRange.end_date,
      schedule_date_range: dateRange,
      start_date: new Date().toISOString(),
      assignee: [assignee],
      filter_id: filter_id,
      type: type === 'user' ? 'self_schedule' : 'schedule',
      trigger_count: 1,
      task_owner: rec_user_id,
    })
    .select()
    .single()
    .throwOnError();

  const insertTaskSesRels: DatabaseTableInsert['task_session_relation'][] =
    selectedSessions.map((ses) => {
      return {
        task_id: task.id,
        session_id: ses.interview_session.id,
      };
    });

  await supabase
    .from('task_session_relation')
    .insert(insertTaskSesRels)
    .throwOnError();

  return task;
};
