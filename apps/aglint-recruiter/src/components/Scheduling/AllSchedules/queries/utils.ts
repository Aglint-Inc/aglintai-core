import { ApplicationLogsTypeDb } from '@aglint/shared-types';
import { Database } from '@aglint/shared-types';
import { createServerClient } from '@supabase/ssr';

import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { FilterCandidateState } from '../filter-store';

export const getPaginationDB = async ({
  recruiter,
  filter,
}: {
  recruiter: { id: string };
  filter: FilterCandidateState['filter'];
}) => {
  try {
    const { data, error } = await supabase.rpc('get_interview_data_count', {
      rec_id: recruiter.id,
      text_search_filter: filter.textSearch,
      job_id_filter: filter.job_ids?.length > 0 ? filter.job_ids : null,
      cord_ids:
        filter.coordinator_ids?.length > 0
          ? filter.coordinator_ids.map((user) => user.user_id)
          : null,
      status_filter: filter.status.length > 0 ? filter.status : null,
      schedule_type_filter:
        filter.scheduleType.length > 0 ? filter.scheduleType : null,
      module_ids: filter.module_ids.length > 0 ? filter.module_ids : null,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    toast.error('Error fetching interview data.');
  }
};

export const addScheduleActivity = async ({
  title,
  application_id,
  description,
  task_id,
  type,
  logger,
  supabase,
  created_by,
}: {
  title: string;
  application_id: string;
  description?: string;
  task_id?: string;
  type: ApplicationLogsTypeDb['type'];
  logger: string;
  supabase: ReturnType<typeof createServerClient<Database>>;
  created_by: string;
}) => {
  const { error } = await supabase.from('application_logs').insert({
    application_id,
    title,
    description,
    task_id,
    type,
    logger,
    created_by,
  });

  // eslint-disable-next-line no-console
  console.log(error);
};
