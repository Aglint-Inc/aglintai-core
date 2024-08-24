import { setCandidateAvailabilityDrawerOpen } from '@/src/components/Requests/ViewRequestDetails/CandidateAvailability/store';
import { setIsSelfScheduleDrawerOpen } from '@/src/components/Requests/ViewRequestDetails/SelfSchedulingDrawer/store';
import { Button } from '@mui/material';

const ScheduleFlows = () => {
  return (
    <div>
      <Button
        onClick={() => {
          setCandidateAvailabilityDrawerOpen(true);
        }}
      >
        Send Availability Link
      </Button>
      <Button
        onClick={() => {
          setIsSelfScheduleDrawerOpen(true);
        }}
      >
        Send SelfScheduling Link
      </Button>
    </div>
  );
};

export default ScheduleFlows;
