import { Stack, Typography } from '@mui/material';

import MembersAutoComplete from '@/src/components/Scheduling/Common/MembersTextField';

import {
  setFilters,
  setLocalFilters,
  useSelfSchedulingFlowStore,
} from '../../store';

function PreferedInterviewers() {
  const { schedulingOptions, localFilters } = useSelfSchedulingFlowStore(
    (state) => ({
      dateRange: state.dateRange,
      schedulingOptions: state.schedulingOptions,
      localFilters: state.localFilters,
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
    <Stack width={'100%'} spacing={0.5}>
      <Typography variant='body1'>Preferred Interviewers</Typography>
      <MembersAutoComplete
        pillColor={'var(--neutral-3)'}
        renderUsers={uniqueInterviewers}
        selectedUsers={localFilters.preferredInterviewers}
        maxWidth='100%'
        setSelectedUsers={(users) => {
          setLocalFilters({
            preferredInterviewers: users,
          });
        }}
        disabled={false}
      />
    </Stack>
  );
}

export default PreferedInterviewers;
