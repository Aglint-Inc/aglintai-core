import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/utils/supabase/client';

export type ProgressSteps =
  | Awaited<ReturnType<typeof fetchProgressByJobId>>
  | Awaited<ReturnType<typeof fetchProgressByApplicationId>>;

export const useInterviewPlanProgress = ({
  job_id,
  application_id,
}: {
  job_id: string;
  application_id: string;
}) => {
  const result = useQuery({
    queryKey: ['interview_plan_progress', job_id],
    queryFn: () => fetchProgress({ job_id, application_id }),
    retry: false,
  });

  return result;
};

const fetchProgress = async ({
  job_id,
  application_id,
}: {
  job_id: string | null;
  application_id: string | null;
}) => {
  let result = [];
  if (job_id) {
    result = await fetchProgressByJobId(job_id);
  }
  if (application_id) {
    result = await fetchProgressByApplicationId(application_id);
  }
  return result as ProgressSteps;
};

const fetchProgressByJobId = async (job_id) => {
  const { data, error } = await supabase
    .from('interview_progress')
    .select(
      'icon,id,job_id,application_id,name,order,icon,description,is_completed',
    )
    .eq('job_id', job_id);
  if (error) throw new Error(error.message);
  return data;
};
const fetchProgressByApplicationId = async (application_id: string) => {
  const { data, error } = await supabase
    .from('interview_progress')
    .select(
      'icon,id,job_id,application_id,name,order,icon,description,is_completed',
    )
    .eq('application_id', application_id);
  if (error) throw new Error(error.message);
  return data;
};
