import { getFullName } from '@aglint/shared-utils';

import { TaskType } from '../components/Jobs/Job/Candidate-List/Actions/createTask';
import { addScheduleActivity } from '../components/Scheduling/Candidates/queries/utils';
import { AssignerType } from '../components/Tasks/TaskStatesContext';
import { createTaskProgress } from '../components/Tasks/utils';
import { supabase } from './supabase/client';

export const createTasks = async (
  recruiter_id: string,
  recruiterUser: {
    name: string;
    id: string;
    role: string;
  },
  candidates: { name: string; id: string }[],
  task: TaskType,
  assigner: AssignerType,
) => {
  const { session_ids, ...resetTask } = task;
  const assignerName = getFullName(assigner.first_name, assigner.last_name);
  const safeData = candidates.map((candidate) => ({
    name: `Schedule interview for ${candidate.name} - ${session_ids.map((ele) => ele.name).join(', ')}.`,
    recruiter_id,
    application_id: candidate.id,
    created_by: recruiterUser.id,
    type: 'schedule',
    ...resetTask,
  }));
  const { error, data } = await supabase
    .from('new_tasks')
    .insert(safeData)
    .select('*, applications(* , candidates( * ), public_jobs( * ))');

  if (error) throw new Error(error.message);
  for (let eachTask of data) {
    const candidate = candidates.find(
      (ele) => ele.id === eachTask.application_id,
    );

    await supabase.from('task_session_relation').insert(
      session_ids.map((ele) => ({
        session_id: ele.id,
        task_id: eachTask.id,
      })),
    );

    await createTaskProgress({
      type: 'create_task',
      data: {
        task_id: eachTask.id as string,
        created_by: recruiterUser,
        progress_type: 'schedule',
      },
      optionData: {
        candidateName: candidate.name,
        sessions: session_ids,
        assignerId: assigner.user_id,
        assignerName: assignerName,
        creatorId: recruiterUser?.id,
        creatorName: recruiterUser?.name,
        creatorDesignation: recruiterUser.role, // need to change
        scheduleDateRange: {
          start_date: eachTask.schedule_date_range.start_date,
          end_date: eachTask.schedule_date_range.end_date,
        },
      },
    });
    addScheduleActivity({
      application_id: candidate.id,
      created_by: recruiterUser.id,
      logged_by: 'user',
      supabase: supabase,
      title: `Task assigned to ${assignerName} for scheduling ${session_ids.map((ele) => ele.name).join(',')}`,
      description: '',
      metadata: null,
      task_id: eachTask.id,
      module: 'scheduler',
    });
  }
};
