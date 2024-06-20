import axios from 'axios';
import { useRouter } from 'next/router';

import { MyScheduleLanding } from '@/devlink/MyScheduleLanding';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import toast from '@/src/utils/toast';

import { ShowCode } from '../../Common/ShowCode';
import { API_FAIL_MSG } from '../../Jobs/Dashboard/JobPostCreateUpdate/utils';
import ModuleSchedules from '../Common/ModuleSchedules';
import { useScheduleList } from '../Common/ModuleSchedules/hooks';

function MySchedule() {
  const { recruiterUser, recruiter } = useAuthDetails();

  const router = useRouter();

  const getConsent = async () => {
    try {
      localStorage.setItem(
        'gmail-redirect-path',
        `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling?tab=mySchedules`,
      );
      const { data } = await axios.get('/api/scheduling/google-consent');

      return router.push(data);
    } catch (error) {
      toast.error(API_FAIL_MSG);
    }
  };

  const { data, isFetched } = useScheduleList({
    user_id: recruiterUser.user_id,
  });

  const scheduleList = data?.schedules || [];

  return (
    <>
      <ShowCode>
        <ShowCode.When
          isTrue={
            (!!recruiter.service_json &&
              recruiter.email.split('@')[1] ===
                recruiterUser.email.split('@')[1]) ||
            !!(recruiterUser.schedule_auth as any)?.access_token
          }
        >
          <ModuleSchedules
            isFetched={isFetched}
            newScheduleList={scheduleList}
          />
        </ShowCode.When>
        <ShowCode.When
          isTrue={!recruiter.service_json || !recruiterUser.schedule_auth}
        >
          <MyScheduleLanding
            onClickConnectCalender={{
              onClick: getConsent,
            }}
            textConnectedTo={`Connected to ${(recruiterUser.schedule_auth as any)?.email}`}
            isConnectedVisible={!!recruiterUser.schedule_auth}
            isConnectCalenderVisible={!recruiterUser.schedule_auth}
          />
        </ShowCode.When>
      </ShowCode>
    </>
  );
}

export default MySchedule;
