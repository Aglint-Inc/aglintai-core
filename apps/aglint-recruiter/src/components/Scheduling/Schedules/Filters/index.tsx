import { type DatabaseEnums } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import { useState } from 'react';

import FilterHeader from '@/src/components/Common/FilterHeader';
import { useJobs } from '@/src/context/JobsContext';
import { useAllMembers } from '@/src/queries/members';

import { useScheduleStatesContext } from '../ScheduleStatesContext';

function Filters() {
  const { updateFilterState, filterState } = useScheduleStatesContext();

  const [searchText, setSearchText] = useState<string>('');

  const { members } = useAllMembers();
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
      id: 'today',
      label: 'today',
    },
    {
      id: 'tomorrow',
      label: 'Tomorrow',
    },
    {
      id: 'next_7_days',
      label: 'Next 7 days',
    },
    {
      id: 'next_30_days',
      label: 'Next 30 days',
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
              updateFilterState('status', val);
            },
            value: filterState.status,
            iconname: 'filter_tilt_shift',
          },
          {
            type: 'filter',
            name: 'Interviewer',
            options: members
              ? members
                  .filter((ele) => ele.status === 'active')
                  .map((member) => ({
                    id: member.user_id,
                    label: getFullName(member.first_name, member.last_name),
                  }))
              : [],
            filterSearch: true,
            searchPlaceholder: 'Interviewer',
            setValue: (val) => {
              updateFilterState('interviewers', val);
            },
            value: filterState.interviewers,
            iconname: 'person',
          },
          {
            type: 'filter',
            name: 'Schedule types',
            options: ScheduleTypes,
            setValue: (val) => {
              updateFilterState('schedule_types', val);
            },
            value: filterState.schedule_types,
            iconname: 'filter_tilt_shift',
          },
          {
            type: 'filter',
            name: 'Interview mode',
            options: [
              {
                id: 'panel' as DatabaseEnums['session_type'],
                label: 'panel' as DatabaseEnums['session_type'],
              },
              {
                id: 'individual' as DatabaseEnums['session_type'],
                label: 'individual' as DatabaseEnums['session_type'],
              },
              {
                id: 'debrief' as DatabaseEnums['session_type'],
                label: 'debrief' as DatabaseEnums['session_type'],
              },
            ],
            setValue: (val) => {
              updateFilterState('session_types', val);
            },

            value: filterState.session_types,
            iconname: 'filter_tilt_shift',
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
            iconname: 'filter_tilt_shift',
          },
          {
            type: 'filter',
            name: 'Date range',
            options: dateRange,
            multiSelect: false,
            setValue: (val) => {
              updateFilterState('date', val);
            },
            value: filterState.date,
            iconname: 'filter_tilt_shift',
          },
        ]}
      />
    </Stack>
  );
}

export default Filters;
