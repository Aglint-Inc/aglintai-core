import { Stack } from '@mui/material';

import MembersAutoComplete from '@/src/components/Scheduling/Common/MembersTextField';

import { setFilters, useSelfSchedulingFlowStore } from '../../store';

function PreferedInterviewers() {
  const { schedulingOptions, filters } = useSelfSchedulingFlowStore(
    (state) => ({
      dateRange: state.dateRange,
      schedulingOptions: state.schedulingOptions,
      filters: state.filters,
    }),
  );

  const uniqueInterviewers = [];

  schedulingOptions
    .flatMap((option) => option.interview_rounds)
    .flatMap((option) => option.plans)
    .forEach((option) => {
      option.sessions.forEach((session) => {
        //quilifed interviewers
        session.qualifiedIntervs.forEach((interv) => {
          const existingIndex = uniqueInterviewers.findIndex(
            (existingInterv) => existingInterv.user_id === interv.user_id,
          );

          if (existingIndex === -1) {
            uniqueInterviewers.push(interv);
          }
        });
      });
    });

  return (
    <Stack width={'100%'}>
      <MembersAutoComplete
        pillColor={'var(--neutral-3)'}
        renderUsers={uniqueInterviewers}
        selectedUsers={filters.preferredInterviewers}
        maxWidth='100%'
        setSelectedUsers={(users) => {
          setFilters({
            preferredInterviewers: users,
          });
        }}
        disabled={false}
      />
    </Stack>
  );
}

export default PreferedInterviewers;
