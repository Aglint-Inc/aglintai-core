/* eslint-disable security/detect-object-injection */
import { type CandidateDirectBookingType } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import axios from 'axios';
import { useCallback, useMemo, useState } from 'react';

import { TimezoneObj } from '@/components/CompanyDetailComp/Scheduling';
import { useRouterPro } from '@/hooks/useRouterPro';
import { type ApiBodyOpenSelfScheduling } from '@/pages/api/scheduling/application/openselfscheduling';
import {
  useConfirmSlots,
  useInviteMeta,
  type useInviteSlots,
} from '@/queries/candidate-invite';
import dayjs from '@/utils/dayjs';
import timeZones from '@/utils/timeZone';
import toast from '@/utils/toast';

const useInviteActions = () => {
  const router = useRouterPro<{ filter_id: string; task_id?: string }>();
  const meta = useInviteMeta();

  const { mutateAsync, isPending } = useConfirmSlots();

  const initialTimezone = useMemo(() => {
    const tz = dayjs.tz.guess();
    return timeZones.find(({ tzCode }) => tzCode === tz);
  }, []);

  const [timezone, setTimezone] = useState<TimezoneObj>(initialTimezone);

  const params: Parameters<typeof useInviteSlots>[0] = {
    filter_json_id: meta?.data?.filter_json.id ?? null,
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
    const candSelectedSlots = selectedSlots.map((s) => s.sessions);

    const bodyParams: CandidateDirectBookingType = {
      cand_tz: timezone.tzCode,
      filter_id: router.queryParams.filter_id as string,
      selected_plan: candSelectedSlots.map((slot) => ({
        start_time: slot[0].start_time,
        end_time: slot[slot.length - 1].end_time,
      })),
    };
    try {
      if (!isPending) {
        await mutateAsync({
          bodyParams,
          is_agent_link: !meta.data.filter_json.selected_options,
        });
      } else {
        toast.warning('Confirming slots. Please wait.');
      }
    } catch {
      toast.error('Unable to book slots.');
    }
  };

  const handleViewedOn = async () => {
    try {
      const bodyParams: ApiBodyOpenSelfScheduling = {
        application_id: meta.data.application_id,
        filter_id: meta.data.filter_json.id,
        sesssion_name: meta.data.meetings.map(
          (ses) => ses.interview_session.name,
        ),
        timezone: dayjsLocal.tz.guess(),
        candidate_id: meta.data.candidate.id,
      };

      await axios.post(
        '/api/scheduling/application/openselfscheduling',
        bodyParams,
      );
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
    handleViewedOn,
  };
};

export default useInviteActions;


