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
      status_filter: filter.status?.length > 0 ? filter.status : null,
      text_search_filter: filter.textSearch,
      sch_type: filter.scheduleType?.length > 0 ? filter.scheduleType : null,
      job_id_filter: filter.job_ids?.length > 0 ? filter.job_ids : null,
      module_id_filter: filter.panel_ids?.length > 0 ? filter.panel_ids : null,
      date_range_filter: filter.dateRange ? filter.dateRange : null,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    toast.error('Error fetching interview data');
  }
};
