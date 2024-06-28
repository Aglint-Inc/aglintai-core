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
  },
  candidates: { name: string; id: string }[],
  task: TaskType,
  assigner: AssignerType,
) => {
  const assignerName = getFullName(assigner.first_name, assigner.last_name);
  const safeData = candidates.map((candidate) => ({
    name: `Schedule interview for ${candidate.name} - ${task.session_ids.map((ele) => ele.name).join(', ')}.`,
    recruiter_id,
    application_id: candidate.id,
    created_by: recruiterUser.id,
    type: 'schedule',
    ...task,
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
      task.session_ids.map((ele) => ({
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
        sessions: task.session_ids,
      },
    });
    addScheduleActivity({
      application_id: candidate.id,
      created_by: recruiterUser.id,
      logged_by: 'user',
      supabase: supabase,
      title: `Task assigned to ${assignerName} for scheduling ${task.session_ids.map((ele) => ele.name).join(',')}`,
      description: '',
      metadata: null,
      task_id: eachTask.id,
      module: 'scheduler',
    });
  }
};
