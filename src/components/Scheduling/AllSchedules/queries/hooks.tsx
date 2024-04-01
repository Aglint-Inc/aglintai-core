import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { ApplicationList, InterviewSlice, setPagination } from '../store';
import { getPaginationDB } from './utils';

export const useAllInterviewSchedules = ({ page, filter, rec_id }) => {
  const query = useQuery({
    queryKey: ['schedules', page, filter],
    queryFn: () => fetchInterviewData({ page: page, filter, rec_id }),
    placeholderData: keepPreviousData,
    initialData: [],
    refetchOnWindowFocus: false,
  });
  return query;
};

const fetchInterviewData = async ({
  page = 1,
  rec_id,
  filter,
}: {
  page: number;
  rec_id: string;
  filter: InterviewSlice['filter'];
}) => {
  setPagination({ page });
  getPagination({ rec_id, filter });
  const { data: appNew, error } = await supabase.rpc('fetch_interview_data', {
    rec_id: rec_id,
    text_search_filter: filter.textSearch,
    sort_by: filter.sortBy,
    job_id_filter: filter.job_ids.length > 0 ? filter.job_ids : null,
    page_number: page,
    cord_ids:
      filter.coordinator_ids?.length > 0 ? filter.coordinator_ids : null,
    status_filter: filter.status.length > 0 ? filter.status : null,
  });
  if (error) {
    throw new Error(error.message);
  }
  return appNew as unknown as ApplicationList[];
};

const getPagination = async ({ rec_id, filter }) => {
  try {
    const totalCount = await getPaginationDB({
      recruiter: { id: rec_id },
      filter: {
        ...filter,
      },
    });
    setPagination({ total: totalCount });
  } catch (error) {
    toast.error('Error fetching interview data');
  }
};
