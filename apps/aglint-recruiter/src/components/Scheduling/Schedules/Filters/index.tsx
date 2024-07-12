import { DatabaseEnums } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack } from '@mui/material';
import { useState } from 'react';

import FilterHeader from '@/src/components/Common/FilterHeader';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';

import { useScheduleStatesContext } from '../ScheduleStatesContext';



function Filters() {
  const { updateFilterState, filterState } = useScheduleStatesContext();

  const [searchText, setSearchText] = useState<string>('');

  const { members } = useAuthDetails();

  const ScheduleTypes = [
    {
      id: 'google_meet' as DatabaseEnums['interview_schedule_type'],
      label: 'google_meet' as DatabaseEnums['interview_schedule_type'],
    },
    {
      id: 'zoom' as DatabaseEnums['interview_schedule_type'],
      label: 'zoom' as DatabaseEnums['interview_schedule_type'],
    },
    {
      id: 'in_person_meeting' as DatabaseEnums['interview_schedule_type'],
      label: 'in_person_meeting' as DatabaseEnums['interview_schedule_type'],
    },
    {
      id: 'phone_call' as DatabaseEnums['interview_schedule_type'],
      label: 'phone_call' as DatabaseEnums['interview_schedule_type'],
    },
  ];
  const dateRange = [
    {
      id: dayjsLocal().format('YYYY-MM-DD'),
      label: 'today',
    },
    {
      id: dayjsLocal().add(1, 'day').format('YYYY-MM-DD'),
      label: 'Tomorrow',
    },
    {
      id: dayjsLocal().add(7, 'day').format('YYYY-MM-DD'),
      label: 'Next 7 days',
    },
    {
      id: dayjsLocal().add(30, 'day').format('YYYY-MM-DD'),
      label: 'Next 30 days',
    },
    {
      id: dayjsLocal().add(-7, 'day').format('YYYY-MM-DD'),
      label: 'Last 7 days',
    },
    {
      id: dayjsLocal().add(-30, 'day').format('YYYY-MM-DD'),
      label: 'Last 30 days',
    },
  ];

  const { jobs } = useJobs();
  return (
    <Stack direction={'row'} spacing={'var(--space-3)'}>
      <FilterHeader
        search={{
          value: searchText,
          setValue: (e) => {
            // handelSearch(e);
            setSearchText(e);
            updateFilterState('searchText', e);
          },
          placeholder: 'Search schedules.',
        }}
        filters={[
          {
            type: 'filter',
            name: 'Status',
            options: [
              { id: 'completed', label: 'Completed' },
              { id: 'cancelled', label: 'Cancelled' },
              { id: 'confirmed', label: 'Confirmed' },
              { id: 'waiting', label: 'Waiting' },
            ],
            setValue: (val) => {
              // const preData =
              //   JSON.parse(localStorage.getItem('taskFilters')) || {};
              // preData.Candidate = [...val];
              // localStorage.setItem('taskFilters', JSON.stringify(preData));
              // handelFilter({
              //   ...filter,
              //   candidate: { ...filter.candidate, values: val },
              // });
              updateFilterState('status', val);
            },
            value: filterState.status,
          },
          {
            type: 'filter',
            name: 'Interviewer',
            options: members
              .filter((ele) => !ele.is_suspended)
              .map((member) => ({
                id: member.user_id,
                label: getFullName(member.first_name, member.last_name),
              })),
            filterSearch: true,
            searchPlaceholder: 'Interviewer',
            setValue: (val) => {
              updateFilterState('interviewers', val);
            },
            value: filterState.interviewers,
          },
          {
            type: 'filter',
            name: 'Schedule types',
            options: ScheduleTypes,
            setValue: (val) => {
              updateFilterState('schedule_types', val);
            },
            value: filterState.schedule_types,
          },
          {
            type: 'filter',
            name: 'Jobs',
            options:
              jobs.isFetched &&
              jobs.data.map((ele) => ({ id: ele.id, label: ele.job_title })),
            setValue: (val) => {
              updateFilterState('jobs', val);
            },

            value: filterState.jobs,
          },
          {
            type: 'filter',
            name: 'Date range',
            options: dateRange,
            setValue: (val) => {
              updateFilterState('date_range', val);
            },
            value: [filterState.date_range[filterState.date_range.length - 1]],
          },
        ]}
      />
    </Stack>
  );
}

export default Filters;
