import { type DatabaseEnums } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { useState } from 'react';

import FilterHeader from '@/components/Common/FilterHeader';
import { useJobs } from '@/jobs/hooks';
import { useAllMembers } from '@/queries/members';

import { useScheduleStatesContext } from '../../contexts/ScheduleStatesContext';

function UpComingInterviewFilters() {
  const { updateUpComingFilterState, upcomingFilterState } =
    useScheduleStatesContext();

  const [searchText, setSearchText] = useState<string>('');

  const { members } = useAllMembers();
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
  ];

  const { jobs } = useJobs();
  return (
    <div className='flex flex-row justify-between'>
      <FilterHeader
        search={{
          value: searchText,
          setValue: (e) => {
            // handelSearch(e);
            setSearchText(e);
            updateUpComingFilterState('searchText', e);
          },
          placeholder: 'Search schedules.',
        }}
        filters={[
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
              updateUpComingFilterState('interviewers', val);
            },
            value: upcomingFilterState.interviewers,
          },

          {
            type: 'filter',
            name: 'Jobs',
            options:
              jobs.isFetched &&
              jobs.data.map((ele) => ({ id: ele.id, label: ele.job_title })),
            setValue: (val) => {
              updateUpComingFilterState('jobs', val);
            },

            value: upcomingFilterState.jobs,
          },
          {
            type: 'filter',
            name: 'Date range',
            options: dateRange,
            multiSelect: false,
            setValue: (val) => {
              updateUpComingFilterState('date', val);
            },
            value: upcomingFilterState.date,
          },
        ]}
      />
    </div>
  );
}

export default UpComingInterviewFilters;
