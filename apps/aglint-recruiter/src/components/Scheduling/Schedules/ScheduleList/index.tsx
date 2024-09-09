import { AllInterviewEmpty } from '@devlink2/AllInterviewEmpty';

import Loader from '@/components/Common/Loader';

import ScheduleMeetingList from '../../Common/ModuleSchedules/ScheduleMeetingList';
import { useScheduleStatesContext } from '../ScheduleStatesContext';

function ScheduleList() {
  const { filteredSchedules, loadingSchedules } = useScheduleStatesContext();

  return (
    <div className='p-4'>
      {loadingSchedules && (
        <div className='w-full h-[calc(100vh-96px)]'>
          <Loader />
        </div>
      )}
      {!loadingSchedules && filteredSchedules.length === 0 && (
        <div className='flex justify-center items-center min-h-[calc(100vh-128px)] bg-[var(--neutral-2)] rounded-[var(--radius-2)]'>
          <div className='max-w-sm w-[300px] p-2'>
            <AllInterviewEmpty textDynamic='No schedule found' />
          </div>
        </div>
      )}
      <ScheduleMeetingList filterSchedules={filteredSchedules} />
    </div>
  );
}

export default ScheduleList;
