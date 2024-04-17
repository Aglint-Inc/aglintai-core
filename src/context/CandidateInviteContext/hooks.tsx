/* eslint-disable security/detect-object-injection */
import dayjs from '@utils/dayjs';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { BodyParamsCandidateInvite } from '@/src/pages/api/scheduling/invite';
import { ConfirmApiBodyParams } from '@/src/pages/api/scheduling/v1/confirm_interview_slot';
import { useConfirmSlots, useInvites } from '@/src/queries/candidate-invite';
import toast from '@/src/utils/toast';

const useInviteActions = () => {
  const router = useRouter();
  const invites = useInvites();
  const { mutateAsync, isPending } = useConfirmSlots();
  const [selectedSlots, setSelectedSlots] = useState<
    (typeof invites.data.allSlots)[number][number]
  >([]);
  const [detailsPop, setDetailsPop] = useState(false);
  const initialLoad = !!(invites.status !== 'pending');

  const handleSelectSlot = useCallback(
    (day: number, meeting: (typeof selectedSlots)[number]) => {
      setSelectedSlots((prev) => {
        const newSessions = day === 0 ? [] : [...prev];
        newSessions[day] = meeting;
        return newSessions;
      });
    },
    [],
  );

  const handleSubmit = async () => {
    const bodyParams = {
      candidate_plan: selectedSlots,
      recruiter_id: invites.data.recruiter.id,
      user_tz: dayjs.tz.guess(),
      candidate_email: invites.data.candidate.email,
      schedule_id: invites.data.schedule.id,
      filter_id: router.query.filter_id,
    } as ConfirmApiBodyParams;
    try {
      if (!isPending) {
        await mutateAsync(bodyParams);
      } else {
        toast.warning('Confirming slots. Please wait.');
      }
    } catch {
      //
    }
  };

  if (!initialLoad || isPending) return undefined;
  if (!invites.data || (invites.data && invites.data.allSlots.length === 0))
    return null;

  return {
    initialLoad,
    invites,
    selectedSlots,
    setSelectedSlots,
    detailsPop,
    setDetailsPop,
    handleSelectSlot,
    handleSubmit,
  };
};

export default useInviteActions;

export const useInviteParams = (): BodyParamsCandidateInvite & {
  enabled: boolean;
} => {
  const { query } = useRouter();
  const schedule_id = (query?.id ?? null) as string;
  const filter_id = (query?.filter_id ?? null) as string;
  const user_tz = dayjs?.tz?.guess() ?? null;
  return {
    schedule_id,
    filter_id,
    user_tz,
    enabled: !!(schedule_id && filter_id && user_tz),
  };
};
