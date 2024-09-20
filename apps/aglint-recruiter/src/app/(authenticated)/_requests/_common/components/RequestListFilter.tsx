/* eslint-disable no-unused-vars */
/* eslint-disable security/detect-object-injection */

import { useEffect, useMemo, useState } from 'react';

import FilterHeader from '@/components/Common/FilterHeader';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRequests } from '@/context/RequestsContext';
import { type GetRequestParams } from '@/queries/requests';
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
      applications,
      assigneeList,
      assignerList,
      ...filters
    },
    setFilters,
  } = useRequests();
  const { recruiter_id } = useAuthDetails();

  async function getCandidateList() {
    const { data } = await supabase
      .rpc('get_requests_candidate_list', {
        rec_id: recruiter_id,
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

  const safeOptions = useMemo(
    () =>
      Object.keys(filters).reduce(
        (acc, curr) => {
          const safeKey = curr as keyof typeof filters;
          let value;
          switch (safeKey) {
            case 'status':
              value = options.status;
              break;
            case 'type':
              value = options.type;
              break;
          }
          acc[safeKey] = value;
          return acc;
        },
        {} as typeof filters,
      ),
    [options, filters],
  );

  const safeFilters: Parameters<typeof FilterHeader>[0]['filters'] =
    Object.entries(filters).map(
      ([key, value]) =>
        ({
          active: value.length,
          name: key,
          value: value ?? [],
          type: 'filter',
          iconname: '',
          icon: <></>,
          setValue: (newValue: typeof value) =>
            setFilters((prev) => ({ ...prev, [key]: newValue })),
          options: safeOptions[key] ?? [],
        }) as (typeof safeFilters)[number],
    );

  const jobFilter = {
    filterSearch: true,
    searchPlaceholder: 'Search Jobs',
    active: jobs.length,
    name: 'Jobs',
    value: jobs ?? [],
    type: 'filter',
    iconname: '',
    icon: <></>,
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
  } as (typeof safeFilters)[number];

  const _candidateFilter = {
    filterSearch: true,
    searchPlaceholder: 'Search Candidates',
    active: applications.length,
    name: 'Candidates',
    value: applications ?? [],
    type: 'filter',
    iconname: '',
    icon: <></>,
    setValue: (newValue) => {
      setFilters((prev) => ({ ...prev, applications: newValue }));
    },
    options: candidateAndJobs
      ? candidateAndJobs?.applications.map(
          (ele: { candidate_name: string; application_id: string }) => {
            return {
              id: ele.application_id,
              label: ele.candidate_name,
            };
          },
        )
      : [],
  } as (typeof safeFilters)[number];
  const assignerFilter = {
    filterSearch: true,
    searchPlaceholder: 'Search created by',
    active: assignerList.length,
    name: 'Created by',
    value: assignerList ?? [],
    type: 'filter',
    iconname: '',
    icon: <></>,
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
  } as (typeof safeFilters)[number];

  const _assigneeFilter = {
    filterSearch: true,
    searchPlaceholder: 'Search Assignees',
    active: assigneeList.length,
    name: 'Assignee',
    value: assigneeList ?? [],
    type: 'filter',
    iconname: '',
    icon: <></>,
    setValue: (newValue) => {
      setFilters((prev) => ({ ...prev, assigneeList: newValue }));
    },
    options: candidateAndJobs
      ? candidateAndJobs?.assigneelist.map(
          (ele: { name: string; id: string }) => {
            return {
              id: ele.id,
              label: ele.name,
            };
          },
        )
      : [],
  } as (typeof safeFilters)[number];

  return (
    <FilterHeader
      filters={[
        ...safeFilters,
        // assigneeFilter,
        assignerFilter,
        jobFilter,
        // candidateFilter,
      ]}
      search={{
        value: title,
        setValue: (newValue: typeof title) => {
          setFilters((prev) => ({ ...prev, title: newValue }));
        },
        placeholder: 'Search Requests',
      }}
    />
  );
}

export default RequestListFilter;
