import { Stack } from '@mui/material';

import { AllInterviewEmpty } from '@/devlink2/AllInterviewEmpty';

import ScheduleMeetingList from '../../Common/ModuleSchedules/ScheduleMeetingList';
import DynamicLoader from '../../Interviewers/DynamicLoader';
import { useScheduleStatesContext } from '../ScheduleStatesContext';

function ScheduleList() {
  const { filterSchedules, loadingSchedules } = useScheduleStatesContext();
  if (loadingSchedules) {
    return <DynamicLoader height='80vh' />;
  }

  if (!loadingSchedules && filterSchedules.length === 0) {
    return <AllInterviewEmpty textDynamic='No schedule found' />;
  }
  return (
    <Stack pl={'20px'} overflow={'auto'}>
      <ScheduleMeetingList FilterSchedules={filterSchedules} />
    </Stack>
  );
}

export default ScheduleList;
