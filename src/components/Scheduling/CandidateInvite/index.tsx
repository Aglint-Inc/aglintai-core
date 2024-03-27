import { Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Page404 } from '@/devlink';
import { BodyParamsConfirmCandidate } from '@/src/pages/api/scheduling/confirm';
import toast from '@/src/utils/toast';

import Loader from '../../Common/Loader';
import CheckAvailibility from './CheckAvailibility';
import ConfirmDialog from './ConfirmDialog';
import InvitationConfirmed from './InvitationConfirmed';
import InvitationPending from './InvitationPending';
import { ApiResponse } from './type';

function CandidateInvite() {
  const router = useRouter();
  const currentDate = dayjs();
  const sevenDays = currentDate.add(7, 'day');
  const [schedule, setSchedule] = useState<ApiResponse>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [changeTime, setChangeTime] = useState(false);
  const [saving, setSaving] = useState(false);
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

  const handleConfirmSlot = async () => {
    try {
      setSaving(true);

      const confOption = schedule.schedulingOptions.find(
        (option) => option.id === selectedSlot,
      );
      const res = await axios.post('/api/scheduling/confirm', {
        id: router.query.schedule_id,
        selectedSlot: confOption,
        schedule_name: schedule.schedule.schedule_name,
        candidate_email: schedule.candidate.email,
        candidate_name: schedule.candidate.first_name,
        rec_id: schedule.recruiter.id,
        position: schedule.job.job_title,
      } as BodyParamsConfirmCandidate);
      if (res.status === 200 && res.data) {
        schedule.schedule.confirmed_option = confOption;
        schedule.schedule.status = 'confirmed';
        setSchedule({
          ...schedule,
        });
        setDialogOpen(false);
      }
    } catch (e) {
      toast.error("Couldn't confirm slot, please try again later");
    } finally {
      setSaving(false);
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
      <ConfirmDialog
        dialogOpen={dialogOpen}
        handleConfirmSlot={handleConfirmSlot}
        saving={saving}
        schedule={schedule}
        selectedSlot={selectedSlot}
        setDialogOpen={setDialogOpen}
      />
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
      ) : schedule?.schedule.status == 'pending' ? (
        <InvitationPending
          schedule={schedule}
          selectedSlot={selectedSlot}
          setChangeTime={setChangeTime}
          setDialogOpen={setDialogOpen}
          setSelectedSlot={setSelectedSlot}
        />
      ) : schedule?.schedule.status == 'confirmed' ||
        schedule?.schedule.status == 'completed' ? (
        <InvitationConfirmed schedule={schedule} />
      ) : (
        <Page404 />
      )}
    </Stack>
  );
}

export default CandidateInvite;
