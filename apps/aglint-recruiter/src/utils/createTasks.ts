import { TaskType } from '../components/Jobs/Job/Candidate-List/Actions/createTask';
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
) => {
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
    await createTaskProgress({
      type: 'create_task',
      data: {
        task_id: eachTask.id as string,
        created_by: recruiterUser,
        progress_type: 'standard',
      },
      optionData: {
        candidateName: candidate.name,
        sessions: eachTask.session_ids as any,
      },
    });
    // await supabase.from('new_tasks_progress').insert({
    //   title: `Task created by <span class="mention">@${job.recruiterUser.name}</span>`,
    //   progress_type: 'standard',
    //   created_by: job.recruiterUser,
    //   task_id: eachTask.id,
    // });
  }
};
