import ModuleSchedules, {
  useScheduleList,
} from '@/src/components/Scheduling/Common/ModuleSchedules';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

function Interviews() {
  const { recruiterUser } = useAuthDetails();
  const { data: scheduleList, isFetched } = useScheduleList({
    user_id: recruiterUser.user_id,
  });
  
  return (
    <>
      {<ModuleSchedules newScheduleList={scheduleList} isFetched={isFetched} />}
    </>
  );
}

export default Interviews;
