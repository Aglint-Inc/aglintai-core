/* eslint-disable no-unused-vars */
/* eslint-disable security/detect-object-injection */

import { useEffect, useState } from 'react';

import FilterHeader from '@/src/components/Common/FilterHeader';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { GetRequestParams } from '@/src/queries/requests';
import { supabase } from '@/src/utils/supabase/client';

import { setCompletedFilters, useCompletedRequestsStore } from '../store';

function FilterAndSorting() {
  const [candidateAndJobs, setCandidateAndJobs] =
    useState<Awaited<ReturnType<typeof getCandidateList>>>(null);
  const { completedFilters } = useCompletedRequestsStore();
  const { applications, assigneeList, jobs, assignerList, title, type, date } =
    completedFilters;
  const { recruiter_id } = useAuthDetails();

  async function getCandidateList() {
    const { data } = await supabase
      .rpc('get_completed_requests_candidate_list', {
        rec_id: recruiter_id,
      })
      .single();
    setCandidateAndJobs(data);
    console.log(data);
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

  const jobFilter = {
    filterSearch: true,
    searchPlaceholder: 'Search Jobs',
    active: jobs && jobs.length,
    name: 'Jobs',
    value: jobs ?? [],
    type: 'filter',
    iconname: '',
    icon: <></>,
    setValue: (newValue) => {
      setCompletedFilters({
        ...completedFilters,
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
  } as Parameters<typeof FilterHeader>[0]['filters'][number];

  const candidateFilter = {
    filterSearch: true,
    searchPlaceholder: 'Search Candidates',
    active: applications && applications.length,
    name: 'Candidates',
    value: applications ?? [],
    type: 'filter',
    iconname: '',
    icon: <></>,
    setValue: (newValue) => {
      setCompletedFilters({
        ...completedFilters,
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
  } as Parameters<typeof FilterHeader>[0]['filters'][number];
  const assignerFilter = {
    filterSearch: true,
    searchPlaceholder: 'Search created by',
    active: assignerList && assignerList.length,
    name: 'Created by',
    value: assignerList ?? [],
    type: 'filter',
    iconname: '',
    icon: <></>,
    setValue: (newValue) => {
      setCompletedFilters({
        ...completedFilters,
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
  } as Parameters<typeof FilterHeader>[0]['filters'][number];

  const assigneeFilter = {
    filterSearch: true,
    searchPlaceholder: 'Search Assignees',
    active: assigneeList && assigneeList.length,
    name: 'Assignee',
    value: assigneeList ?? [],
    type: 'filter',
    iconname: '',
    icon: <></>,
    setValue: (newValue) => {
      setCompletedFilters({
        ...completedFilters,
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
  } as Parameters<typeof FilterHeader>[0]['filters'][number];
  const typeFilter = {
    active: type && type.length,
    name: 'Type',
    value: type ?? [],
    type: 'filter',
    iconname: '',
    icon: <></>,
    setValue: (newValue) => {
      setCompletedFilters({
        ...completedFilters,
        type: newValue,
      });
    },
    options: options.type.map((ele: string) => {
      return {
        id: ele,
        label: ele,
      };
    }),
  } as Parameters<typeof FilterHeader>[0]['filters'][number];

  return (
    <FilterHeader
      layoutMode='left-align'
      filters={[
        {
          type: 'filter',
          name: 'Date',
          options: dateRange,
          multiSelect: false,
          setValue: (newValue) => {
            console.log(newValue);
            setCompletedFilters({
              ...completedFilters,
              date: newValue,
            });
          },
          value: date,
          iconname: '',
        },
        typeFilter,
        assigneeFilter,
        assignerFilter,
        jobFilter,
        candidateFilter,
      ]}
      search={{
        value: title,
        setValue: (newValue: typeof title) => {
          setCompletedFilters({
            ...completedFilters,
            title: newValue,
          });
        },
        placeholder: 'Search Requests',
      }}
    />
  );
}

export default FilterAndSorting;

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
