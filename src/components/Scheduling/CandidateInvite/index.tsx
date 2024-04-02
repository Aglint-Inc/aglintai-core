import { Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Page404 } from '@/devlink';

import Loader from '../../Common/Loader';
import CheckAvailibility from './CheckAvailibility';
import InvitationConfirmed from './InvitationConfirmed';
import InvitationPending from './InvitationPending';
import { ApiResponse } from './type';

function CandidateInvite() {
  const router = useRouter();
  const currentDate = dayjs();
  const sevenDays = currentDate.add(7, 'day');
  const [schedule, setSchedule] = useState<ApiResponse>(null);
  const [loading, setLoading] = useState(true);
  const [changeTime, setChangeTime] = useState(false);
  const [dateRange, setDateRange] = useState<{
    start_date: string;
    end_date: string;
  }>({
    start_date: currentDate.toISOString(),
    end_date: sevenDays.toISOString(),
  });

  useEffect(() => {
    if (router.isReady && router.query.schedule_id) initialFetch();
  }, [router.isReady]);

  const initialFetch = async () => {
    try {
      const res = await axios.post('/api/scheduling/invite', {
        id: router.query.schedule_id,
        filter_id: router.query.filter_id,
      });
      if (res.status === 200 && res.data) {
        setSchedule(res.data);
      }
    } catch (e) {
      //
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <CheckAvailibility
        changeTime={changeTime}
        setChangeTime={setChangeTime}
        dateRange={dateRange}
        setDateRange={setDateRange}
        schedule={schedule}
        setSchedule={setSchedule}
      />

      {loading ? (
        <Stack height={'100vh'} width={'100%'}>
          <Loader />
        </Stack>
      ) : !schedule?.schedule.is_completed ? (
        <InvitationPending schedule={schedule} />
      ) : schedule?.schedule.is_completed ? (
        <InvitationConfirmed schedule={schedule} />
      ) : (
        <Page404 />
      )}
    </Stack>
  );
}

export default CandidateInvite;
