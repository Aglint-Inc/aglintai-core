import { Stack } from '@mui/material';

import { AllInterviewEmpty } from '@/devlink2/AllInterviewEmpty';
import Loader from '@/src/components/Common/Loader';

import ScheduleMeetingList from '../../Common/ModuleSchedules/ScheduleMeetingList';
import { useScheduleStatesContext } from '../ScheduleStatesContext';

function ScheduleList() {
  const { filterSchedules, loadingSchedules } = useScheduleStatesContext();

  return (
    <Stack padding={'var(--space-4)'}>
      {loadingSchedules && (
        <Stack width={'100%'} height={'calc(100vh - 96px)'}>
          <Loader />
        </Stack>
      )}
      {!loadingSchedules && filterSchedules.length === 0 && (
        <AllInterviewEmpty textDynamic='No schedule found' />
      )}
      <ScheduleMeetingList filterSchedules={filterSchedules} />
    </Stack>
  );
}

export default ScheduleList;
