import { Stack } from '@mui/material';

import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { setCandidateAvailabilityDrawerOpen } from '@/src/components/Requests/ViewRequestDetails/CandidateAvailability/store';
import { setIsSelfScheduleDrawerOpen } from '@/src/components/Requests/ViewRequestDetails/SelfSchedulingDrawer/store';

const ScheduleFlows = () => {
  return (
    <Stack width={'100%'} direction={'row'} justifyContent={'end'} gap={2}>
      <ButtonSoft
        size={1}
        color={'accent'}
        onClickButton={{
          onClick: () => {
            setCandidateAvailabilityDrawerOpen(true);
          },
        }}
        textButton={'Send Availability Link'}
      />
      <ButtonSoft
        size={1}
        color={'accent'}
        onClickButton={{
          onClick: () => {
            setIsSelfScheduleDrawerOpen(true);
          },
        }}
        textButton={'Send SelfScheduling Link'}
      />
    </Stack>
  );
};

export default ScheduleFlows;
