'use client';

import { type CandidateDirectBookingType } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import axios from 'axios';
import {
  setSelectedSlots,
  useCandidateInviteStore,
} from 'src/app/(public)/self-scheduling/[filter]/_common/store';

import { useRouterPro } from '@/hooks/useRouterPro';
import { type ApiBodyOpenSelfScheduling } from '@/pages/api/scheduling/application/openselfscheduling';
import toast from '@/utils/toast';

import { useConfirmSlots } from './useConfirmSlots';
import { useInviteMeta } from './useInviteMeta';

const useInviteActions = () => {
  const router = useRouterPro<{ filter_id: string; task_id?: string }>();
  const { data } = useInviteMeta();
  const { mutateAsync, isPending } = useConfirmSlots();
  const { selectedSlots, timezone } = useCandidateInviteStore();

  const handleSelectSlot = (
    day: number,
    meeting: (typeof selectedSlots)[number],
  ) => {
    const newSessions = day === 0 ? [] : [...selectedSlots];
    newSessions[day] = meeting;
    setSelectedSlots(newSessions);
  };

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
          is_agent_link: !data.filter_json.selected_options,
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
        application_id: data.application_id,
        filter_id: data.filter_json.id,
        sesssion_name: data.meetings.map((ses) => ses.interview_session.name),
        timezone: dayjsLocal.tz.guess(),
        candidate_id: data.candidate.id,
      };

      await axios.post(
        '/api/scheduling/application/openselfscheduling',
        bodyParams,
      );
    } catch {
      //
    }
  };

  return {
    handleSelectSlot,
    handleSubmit,
    handleViewedOn,
    isPending,
  };
};

export default useInviteActions;
