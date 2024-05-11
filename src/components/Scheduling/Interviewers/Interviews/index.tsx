import ModuleSchedules from '@/src/components/Scheduling/Common/ModuleSchedules';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import { useScheduleList } from '../../Common/ModuleSchedules/hooks';

function Interviews() {
  const { recruiterUser } = useAuthDetails();
  const {
    data: { schedules: scheduleList },
    isFetched,
  } = useScheduleList({
    user_id: recruiterUser.user_id,
  });

  return (
    <>
      {<ModuleSchedules newScheduleList={scheduleList} isFetched={isFetched} />}
    </>
  );
}

export default Interviews;
