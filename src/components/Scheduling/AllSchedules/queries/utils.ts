import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { InterviewSlice } from '../store';

export const getPaginationDB = async ({
  recruiter,
  filter,
}: {
  recruiter: { id: string };
  filter: InterviewSlice['filter'];
}) => {
  try {
    const { data, error } = await supabase.rpc('get_interview_data_count', {
      rec_id: recruiter.id,
      text_search_filter: filter.textSearch,
      job_id_filter: filter.job_ids?.length > 0 ? filter.job_ids : null,
      cord_ids:
        filter.coordinator_ids?.length > 0 ? filter.coordinator_ids : null,
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
    toast.error('Error fetching interview data');
  }
};
