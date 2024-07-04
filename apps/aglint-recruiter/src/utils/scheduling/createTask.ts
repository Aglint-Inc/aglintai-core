/* eslint-disable no-console */
import { DatabaseTableInsert, SupabaseType } from '@aglint/shared-types';
import { meetingCardType } from '@aglint/shared-types/src/db/tables/new_tasks.types';
import { EmailAgentId, PhoneAgentId } from '@aglint/shared-utils';

import { fetchInterviewDataJob } from '@/src/components/Scheduling/CandidateDetails/hooks';
import { createTaskProgress } from '@/src/components/Tasks/utils';

export const createTask = async ({
  selectedSessions,
  application_id,
  rec_user_id,
  recruiter_id,
  dateRange,
  filter_id,
  type,
  recruiter_user_name,
  supabase,
  candidate_name,
}: {
  selectedSessions: Awaited<
    ReturnType<typeof fetchInterviewDataJob>
  >['sessions'];
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

  const { data: task, error: errorTasks } = await supabase
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
    .single();

  if (errorTasks) throw new Error(errorTasks.message);

  const insertTaskSesRels: DatabaseTableInsert['task_session_relation'][] =
    selectedSessions.map((ses) => {
      return {
        task_id: task.id,
        session_id: ses.interview_session.id,
      };
    });

  const { error: errorTaskSesRel } = await supabase
    .from('task_session_relation')
    .insert(insertTaskSesRels);

  if (errorTaskSesRel) throw new Error(errorTaskSesRel.message);

  await createTaskProgress({
    type: 'create_task',
    data: {
      progress_type: 'schedule',
      created_by: { id: rec_user_id, name: recruiter_user_name },
      task_id: task.id,
    },
    optionData: {
      candidateName: candidate_name,
      sessions: selectedSessions.map((ele) => ({
        id: ele.interview_session.id,
        name: ele.interview_session.name,
      })) as meetingCardType[],
    },
    supabaseCaller: supabase,
  });

  console.log(`Created task ${task.id}`);

  return task;
};
