/* eslint-disable no-console */
import { DatabaseTableInsert, SupabaseType } from '@aglint/shared-types';
import { meetingCardType } from '@aglint/shared-types/src/db/tables/new_tasks.types';
import { EmailAgentId, getFullName, PhoneAgentId } from '@aglint/shared-utils';
import axios from 'axios';

import { SchedulingApplication } from '@/src/components/Scheduling/CandidateDetails/store';
import { MemberType } from '@/src/components/Scheduling/InterviewTypes/types';
import { createTaskProgress } from '@/src/components/Tasks/utils';
import { agentsDetails } from '@/src/context/TasksContextProvider/TasksContextProvider';
import { BodyParamsFetchUserDetails } from '@/src/pages/api/scheduling/fetchUserDetails';

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
  const bodyParams: BodyParamsFetchUserDetails = {
    recruiter_id: task.recruiter_id,
    includeSupended: true,
  };
  const resMem = (await axios.post(
    '/api/scheduling/fetchUserDetails',
    bodyParams,
  )) as { data: MemberType[] };
  const members = resMem.data;
  const assigner = [...members, ...agentsDetails].find(
    (item) => item.user_id === task.assignee[0],
  );
  const creator = [...members, ...agentsDetails].find(
    (item) => item.user_id === task.created_by,
  );
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
      creatorDesignation: creator.role, // need to change
      creatorName: getFullName(creator.first_name, creator.last_name),
      assignerName: getFullName(assigner.first_name, assigner.last_name),
      creatorId: creator.user_id,
      assignerId: assigner.user_id,
      scheduleDateRange: {
        start_date: task.schedule_date_range.start_date,
        end_date: task.schedule_date_range.end_date,
      },
    },
    supabaseCaller: supabase,
  });

  console.log(`Created task ${task.id}`);

  return task;
};
