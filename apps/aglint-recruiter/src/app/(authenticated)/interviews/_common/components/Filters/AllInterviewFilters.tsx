import { type DatabaseEnums } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { useInterviewsFiltersJob } from '@interviews/hooks/useInterviewsFiltersJob';
import { useState } from 'react';

import { useTenantMembers } from '@/company/hooks';
import FilterHeader from '@/components/Common/FilterHeader';

import { useScheduleStatesContext } from '../../contexts/ScheduleStatesContext';

function AllInterviewFilters() {
  const { updateFilterState, filterState } = useScheduleStatesContext();

  const [searchText, setSearchText] = useState<string>('');

  const { members } = useTenantMembers();
  // eslint-disable-next-line no-unused-vars
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

  const jobs = useInterviewsFiltersJob();
  return (
    <div className='flex flex-row space-x-3'>
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
              { id: 'cancelled', label: 'Canceled' },
              { id: 'confirmed', label: 'Confirmed' },
              { id: 'waiting', label: 'Waiting' },
            ],
            setValue: (val) => {
              updateFilterState('status', val);
            },
            value: filterState.status,
            // iconname: 'filter_tilt_shift',
          },
          {
            type: 'filter',
            name: 'Interviewer',
            options: members
              ? members
                  .filter((ele) => ele.status === 'active')
                  .map((member) => ({
                    id: member.user_id ?? '',
                    label:
                      getFullName(
                        member.first_name ?? '',
                        member.last_name ?? '',
                      ) ?? '',
                  }))
              : [],
            filterSearch: true,
            searchPlaceholder: 'Interviewer',
            setValue: (val) => {
              updateFilterState('interviewers', val);
            },
            value: filterState.interviewers,
          },

          {
            type: 'filter',
            name: 'Jobs',
            options:
              jobs.status === 'success' && jobs.data
                ? jobs.data.map((ele) => ({
                    id: ele.id ?? '',
                    label: ele.job_title ?? '',
                  }))
                : [],
            setValue: (val) => {
              updateFilterState('jobs', val);
            },

            value: filterState.jobs,
            // iconname: 'filter_tilt_shift',
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
            // iconname: 'filter_tilt_shift',
          },
        ]}
      />
    </div>
  );
}

export default AllInterviewFilters;
