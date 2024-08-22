/* eslint-disable no-unused-vars */
/* eslint-disable security/detect-object-injection */

import { useEffect, useMemo, useState } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRequests } from '@/src/context/RequestsContext';
import { GetRequestParams } from '@/src/queries/requests';
import { supabase } from '@/src/utils/supabase/client';

import FilterHeader from '../../Common/FilterHeader';

function FilterAndSorting() {
  const [candidateAndJobs, setCandidateAndJobs] =
    useState<Awaited<ReturnType<typeof getCandidateList>>>(null);
  const {
    filters: {
      created_at,
      end_at,
      is_new,
      title,
      jobs,
      applications,
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
      ? candidateAndJobs.jobs.map((ele: { id: string; job_title: string }) => {
          return {
            id: ele.id,
            label: ele.job_title,
          };
        })
      : [],
  } as (typeof safeFilters)[number];

  const candidateFilter = {
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

  return (
    <FilterHeader
      layoutMode='left-align'
      filters={[...safeFilters, jobFilter, candidateFilter]}
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

export default FilterAndSorting;
