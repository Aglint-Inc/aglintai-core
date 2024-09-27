/* eslint-disable no-unused-vars */
/* eslint-disable security/detect-object-injection */

import {
  setCompletedFilters,
  useCompletedRequestsStore,
} from '@requestHistory/contexts/completedRequeststore';
import { useEffect, useState } from 'react';

import FilterHeader from '@/components/Common/FilterHeader';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { type GetRequestParams } from '@/queries/requests';
import { supabase } from '@/utils/supabase/client';

function RequestHistoryFilter() {
  const [candidateAndJobs, setCandidateAndJobs] =
    useState<Awaited<ReturnType<typeof getCandidateList>>>(null);
  const { completedFilters } = useCompletedRequestsStore();
  const { applications, assigneeList, jobs, assignerList, title, type, date } =
    completedFilters ?? {};
  const { recruiter_id } = useAuthDetails();

  async function getCandidateList() {
    const { data } = await supabase
      .rpc('get_completed_requests_candidate_list', {
        rec_id: recruiter_id ?? '',
      })
      .single();
    setCandidateAndJobs(data);
    return data;
  }

  useEffect(() => {
    getCandidateList();
  }, []);

  const options: Partial<GetRequestParams['filters']> = {
    status: ['blocked', 'completed', 'in_progress', 'to_do'],
    type: [
      'schedule_request',
      'cancel_schedule_request',
      'decline_request',
      'reschedule_request',
    ],
  };

  return (
    <FilterHeader
      filters={[
        {
          type: 'filter',
          name: 'Date',
          options: dateRange,
          multiSelect: false,
          setValue: (newValue) => {
            setCompletedFilters({
              type: completedFilters?.type ?? [],
              assignerList: completedFilters?.assignerList,
              assigneeList: completedFilters?.assigneeList,
              title: completedFilters?.title,
              applications: completedFilters?.applications,
              jobs: completedFilters?.jobs ?? [],
              date: newValue,
            });
          },
          value: date ?? [],

          // iconname: '',
        },
        {
          name: 'Type',
          value: type ?? [],
          type: 'filter',
          icon: <></>,
          setValue: (newValue) => {
            setCompletedFilters({
              date: completedFilters?.date ?? [],
              assignerList: completedFilters?.assignerList,
              assigneeList: completedFilters?.assigneeList,
              title: completedFilters?.title,
              applications: completedFilters?.applications,
              jobs: completedFilters?.jobs ?? [],
              type: newValue,
            });
          },
          options: options.type
            ? options.type.map((ele: string) => {
                return {
                  id: ele ?? '',
                  label: ele ?? '',
                };
              })
            : [],
        },
        {
          filterSearch: true,
          searchPlaceholder: 'Search Assignees',
          name: 'Assignee',
          value: assigneeList ?? [],
          type: 'filter',
          icon: <></>,
          setValue: (newValue) => {
            setCompletedFilters({
              date: completedFilters?.date ?? [],
              assignerList: completedFilters?.assignerList,
              title: completedFilters?.title,
              type: completedFilters?.type ?? [],
              applications: completedFilters?.applications,
              jobs: completedFilters?.jobs ?? [],
              assigneeList: newValue,
            });
          },
          options: candidateAndJobs?.assigneelist
            ? candidateAndJobs?.assigneelist.map(
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
          searchPlaceholder: 'Search created by',
          name: 'Created by',
          value: assignerList ?? [],
          type: 'filter',
          icon: <></>,
          setValue: (newValue: string[]) => {
            setCompletedFilters({
              date: completedFilters?.date ?? [],
              assigneeList: completedFilters?.assigneeList,
              title: completedFilters?.title,
              type: completedFilters?.type ?? [],
              applications: completedFilters?.applications,
              jobs: completedFilters?.jobs ?? [],
              assignerList: newValue,
            });
          },
          options: candidateAndJobs?.assignerlist
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
          icon: <></>,
          setValue: (newValue: string[]) => {
            setCompletedFilters({
              date: completedFilters?.date ?? [],
              assignerList: completedFilters?.assignerList,
              assigneeList: completedFilters?.assigneeList,
              title: completedFilters?.title,
              type: completedFilters?.type ?? [],
              applications: completedFilters?.applications,
              jobs: newValue,
            });
          },
          options: candidateAndJobs?.jobs
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
        {
          filterSearch: true,
          searchPlaceholder: 'Search Candidates',
          name: 'Candidates',
          value: applications ?? [],
          type: 'filter',
          icon: <></>,
          setValue: (newValue: string[]) => {
            setCompletedFilters({
              date: completedFilters?.date ?? [],
              assignerList: completedFilters?.assignerList,
              assigneeList: completedFilters?.assigneeList,
              title: completedFilters?.title,
              type: completedFilters?.type ?? [],
              applications: newValue,
            });
          },
          options: candidateAndJobs?.applications
            ? candidateAndJobs?.applications.map(
                (ele: { candidate_name: string; application_id: string }) => {
                  return {
                    id: ele.application_id,
                    label: ele.candidate_name,
                  };
                },
              )
            : [],
        },
      ]}
      search={{
        value: title ?? '',
        setValue: (newValue: typeof title) => {
          setCompletedFilters({
            date: completedFilters?.date ?? [],
            assignerList: completedFilters?.assignerList,
            assigneeList: completedFilters?.assigneeList,
            type: completedFilters?.type ?? [],
            applications: completedFilters?.applications,
            jobs: completedFilters?.jobs ?? [],
            title: newValue,
          });
        },
        placeholder: 'Search Requests',
      }}
    />
  );
}

export default RequestHistoryFilter;

const dateRange = [
  {
    id: 'today',
    label: 'today',
  },
  {
    id: 'yesterday',
    label: 'Yesterday',
  },
  {
    id: 'last_7_days',
    label: 'Last 7 days',
  },
  {
    id: 'last_30_days',
    label: 'Last 30 days',
  },
];
