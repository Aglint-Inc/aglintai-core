import { useRequests } from '@requests/hooks';
import { useEffect, useState } from 'react';

import { useTenant } from '@/company/hooks';
import FilterHeader from '@/components/Common/FilterHeader';
import { supabase } from '@/utils/supabase/client';

function RequestListFilter() {
  const [candidateAndJobs, setCandidateAndJobs] =
    useState<Awaited<ReturnType<typeof getCandidateList>>>(null);
  const {
    filters: {
      created_at: _c,
      end_at: _e,
      is_new: _i,
      title,
      jobs,
      assignerList,
      type,
      status,
    },
    setFilters,
  } = useRequests();
  const { recruiter_id } = useTenant();

  async function getCandidateList() {
    const { data } = await supabase
      .rpc('get_requests_candidate_list', {
        rec_id: recruiter_id ?? '',
      })
      .single();
    setCandidateAndJobs(data);
    return data;
  }

  useEffect(() => {
    getCandidateList();
  }, []);

  // const options: string[] | Partial<GetRequestParams['filters']> = {
  //   status: ['blocked', 'completed', 'in_progress', 'to_do'],
  //   type: [
  //     'schedule_request',
  //     'cancel_schedule_request',
  //     'decline_request',
  //     'reschedule_request',
  //   ],
  // };
  return (
    <FilterHeader
      filters={[
        {
          name: 'Status',
          type: 'filter',
          icon: <></>,
          setValue: (newValue) => {
            setFilters((prev) => ({ ...prev, status: newValue }));
          },
          options: ['blocked', 'completed', 'in_progress', 'to_do'],
          value: status ?? [],
        },
        {
          name: 'Type',
          type: 'filter',
          icon: <></>,
          setValue: (newValue) => {
            setFilters((prev) => ({ ...prev, type: newValue }));
          },
          options: [
            'schedule_request',
            'cancel_schedule_request',
            'decline_request',
            'reschedule_request',
          ],
          value: type ?? [],
        },
        {
          filterSearch: true,
          searchPlaceholder: 'Search created by',
          name: 'Created by',
          value: assignerList ?? [],
          type: 'filter',
          setValue: (newValue) => {
            setFilters((prev) => ({ ...prev, assignerList: newValue }));
          },
          options: candidateAndJobs
            ? candidateAndJobs?.assignerlist.map(
                (ele: { name: string; id: string }) => {
                  return {
                    id: ele.id,
                    label: ele.name,
                  };
                },
              )
            : [],
        },
        {
          filterSearch: true,
          searchPlaceholder: 'Search Jobs',
          name: 'Jobs',
          value: jobs ?? [],
          type: 'filter',
          setValue: (newValue) => {
            setFilters((prev) => ({ ...prev, jobs: newValue }));
          },
          options: candidateAndJobs
            ? candidateAndJobs.jobs.map(
                (ele: { job_id: string; job_title: string }) => {
                  return {
                    id: ele.job_id,
                    label: ele.job_title,
                  };
                },
              )
            : [],
        },
      ]}
      search={{
        value: title ?? '',
        setValue: (newValue: typeof title) => {
          setFilters((prev) => ({ ...prev, title: newValue }));
        },
        placeholder: 'Search Requests',
      }}
    />
  );
}

export default RequestListFilter;
