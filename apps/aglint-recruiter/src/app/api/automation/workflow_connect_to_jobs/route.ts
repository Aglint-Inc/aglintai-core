import { supabaseWrap } from '@aglint/shared-utils';
import { NextResponse } from 'next/server';

import { getSupabaseServer } from '@/src/utils/supabase/supabaseAdmin';

export async function POST(req) {
  try {
    const { recruiter_id } = (await req.json()) as {
      recruiter_id: string;
    };

    if (!recruiter_id) throw new Error('recruiter_id missing!!');

    const jobs = await getAllJobs(recruiter_id);
    const workflows = await getWorkflow(recruiter_id);

    if (jobs.length === 0 || workflows.length === 0)
      throw new Error('workflows or jobs is not available ');

    const filteredWorkflowsIds = workflows
      .filter((workflow) => startsWithDigitAndDot(workflow.title))
      .map((workflow) => workflow.id);

    const jobIds = jobs.map((job) => job.id);

    const dataToInsert: insertValue[] = [];

    filteredWorkflowsIds.forEach((workflow_id) => {
      jobIds.forEach((job_id) => {
        dataToInsert.push({ job_id, workflow_id });
      });
    });

    await joinWorkflow(dataToInsert);

    return NextResponse.json(
      { message: 'success', data: dataToInsert },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}

const getAllJobs = async (recruiter_id: string) => {
  const supabaseAdmin = getSupabaseServer();
  return supabaseWrap(
    await supabaseAdmin
      .from('public_jobs')
      .select('id')
      .eq('recruiter_id', recruiter_id),
  );
};

const getWorkflow = async (recruiter_id) => {
  const supabaseAdmin = getSupabaseServer();
  const { data, error } = await supabaseAdmin
    .from('workflow_view')
    .select('id,title')
    .order('created_at')
    .eq('recruiter_id', recruiter_id)
    .eq('is_request_workflow', false);
  if (error) throw new Error(error.message);
  return data;
};

type insertValue = { workflow_id: string; job_id: string };

const joinWorkflow = async (data: insertValue[]) => {
  const supabaseAdmin = getSupabaseServer();
  const { error } = await supabaseAdmin
    .from('workflow_job_relation')
    .insert(data);

  if (error) throw new Error(error.message);
};

function startsWithDigitAndDot(str) {
  return /^\d\./.test(str);
}
