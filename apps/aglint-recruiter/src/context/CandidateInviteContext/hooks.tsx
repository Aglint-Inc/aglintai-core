/* eslint-disable security/detect-object-injection */
import { APICandidateConfirmSlot } from '@aglint/shared-types';
import dayjs from '@utils/dayjs';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';

import { TimezoneObj } from '@/src/components/Scheduling/Settings';
import { BodyParamsCandidateInvite } from '@/src/pages/api/scheduling/invite';
import {
  useConfirmSlots,
  useInviteMeta,
  useInviteSlots,
} from '@/src/queries/candidate-invite';
import { getFullName } from '@/src/utils/jsonResume';
import timeZones from '@/src/utils/timeZone';
import toast from '@/src/utils/toast';

const useInviteActions = () => {
  const router = useRouter();

  const meta = useInviteMeta();

  const { mutateAsync, isPending } = useConfirmSlots();

  const initialTimezone = useMemo(() => {
    const tz = dayjs.tz.guess();
    return timeZones.find(({ tzCode }) => tzCode === tz);
  }, []);

  const [timezone, setTimezone] = useState<TimezoneObj>(initialTimezone);

  const params: Parameters<typeof useInviteSlots>[0] = {
    filter_json: meta?.data?.filter_json ?? null,
    recruiter: meta?.data?.recruiter ?? null,
    user_tz: timezone?.tzCode ?? null,
  };

  const [selectedSlots, setSelectedSlots] = useState<
    ReturnType<typeof useInviteSlots>['data'][number][number]
  >([]);

  const [detailsPop, setDetailsPop] = useState(false);

  const initialLoad = !meta.isPending;

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
      recruiter_id: meta.data.recruiter.id,
      user_tz: timezone.tzCode,
      candidate_email: meta.data.candidate.email,
      schedule_id: meta.data.schedule.id,
      filter_id: router.query.filter_id,
      task_id: router.query?.task_id,
      agent_type: 'self',
      candidate_id: meta.data.candidate.id,
      candidate_name: getFullName(
        meta.data.candidate.first_name,
        meta.data.candidate.last_name,
      ),
    } as APICandidateConfirmSlot;
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
  if (!meta.data) return null;

  return {
    initialLoad,
    meta,
    selectedSlots,
    setSelectedSlots,
    timezone,
    setTimezone,
    params,
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
