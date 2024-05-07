import { Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

import { MyScheduleLanding } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import toast from '@/src/utils/toast';

import { ShowCode } from '../../Common/ShowCode';
import { API_FAIL_MSG } from '../../JobsDashboard/JobPostCreateUpdate/utils';
import ModuleSchedules from '../Common/ModuleSchedules';

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

  return (
    <Stack paddingRight={'0px'}>
      <ShowCode>
        <ShowCode.When
          isTrue={
            (!!recruiter.service_json &&
              recruiter.email.split('@')[1] ===
                recruiterUser.email.split('@')[1]) ||
            !!(recruiterUser.schedule_auth as any)?.access_token
          }
        >
          <ModuleSchedules />
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
    </Stack>
  );
}

export default MySchedule;
