import {CallBack, fetchJobsUser} from '@aglint/shared-utils';
import {DynamicStructuredTool} from 'langchain/tools';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import z from 'zod';

export const fetchUserJobs = ({
  user_id,
  recruiter_id,
  callback,
}: {
  user_id: string;
  recruiter_id: string;
  callback: (x: CallBack<'fetch_jobs_user'>) => void;
}) => {
  return new DynamicStructuredTool({
    name: 'fetch_jobs_user',
    description: 'Fetch all jobs for a user',
    schema: z.object({}),
    func: async () => {
      const jobs = await fetchJobsUser({
        user_id,
        supabase: supabaseAdmin,
        recruiter_id,
      });
      if (jobs.length === 0) {
        return `No jobs found for user ${user_id}`;
      }
      callback({
        function_name: 'fetch_jobs_user',
        payload: jobs,
        called_at: new Date().toISOString(),
      });
      const resp = jobs.map(job => {
        return {
          job_title: job.job_title,
          status: job.status,
        };
      });
      return JSON.stringify(resp);
    },
  });
};
