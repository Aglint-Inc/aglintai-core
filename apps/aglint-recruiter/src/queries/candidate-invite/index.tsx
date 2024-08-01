import {
  APICandidateConfirmSlotNoConflict,
  APIVerifyRecruiterSelectedSlots,
  CandidateDirectBookingType,
} from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useInviteParams } from '@/src/context/CandidateInviteContext/hooks';
import {
  ApiResponseAllSlots,
  ApiResponseCandidateInvite,
} from '@/src/pages/api/scheduling/invite';

import { candidateInviteKeys } from './keys';

export const useInviteMeta = () => {
  const { enabled, ...params } = useInviteParams();

  const { queryKey } = candidateInviteKeys.inviteMetaWithFilter(params);
  const query = useQuery({
    queryKey,
    queryFn: () => getInviteMeta(params),
    enabled,
    staleTime: Infinity,
    gcTime: 0,
  });
  return query;
};

export const useInviteSlots = (params: InviteSlotsParams) => {
  const { queryKey } = candidateInviteKeys.inviteSlotsWithFilter(params);
  const query = useQuery({
    queryKey,
    queryFn: () => getInviteSlots(params),
  });
  return query;
};

export const useConfirmSlots = () => {
  const queryClient = useQueryClient();
  // eslint-disable-next-line no-unused-vars
  const { enabled, ...params } = useInviteParams();
  // meta.data.filter_json.selected_options
  const { queryKey } = candidateInviteKeys.inviteMetaWithFilter(params);
  const mutation = useMutation({
    mutationFn: async ({
      bodyParams,
      is_agent_link,
    }: {
      bodyParams: CandidateDirectBookingType;
      is_agent_link: boolean;
    }) => {
      const no_conf_payload: APICandidateConfirmSlotNoConflict = {
        cand_tz: dayjsLocal.tz.guess(),
        filter_id: bodyParams.filter_id,
        selected_slot: {
          slot_start_time: bodyParams.selected_plan[0].start_time,
        },
        agent_type: 'candidate',
        task_id: bodyParams.task_id,
      };
      if (is_agent_link) {
        await confirmSlotNoConflict(no_conf_payload);
      } else {
        await confirmSlots(bodyParams);
      }
      await queryClient.invalidateQueries({ queryKey });
    },
  });
  return mutation;
};

const getInviteMeta = async (
  params: Parameters<typeof candidateInviteKeys.inviteMetaWithFilter>[0],
) => {
  const apiRoute = '/api/scheduling/invite';
  const res = await axios.post(apiRoute, params);
  if (!(res.status === 200 && res.data))
    throw new Error(`Something went wrong. (${apiRoute})`);
  return res.data as ApiResponseCandidateInvite;
};

const confirmSlots = async (bodyParams: CandidateDirectBookingType) => {
  try {
    const res = await axios.post(
      '/api/scheduling/v1/booking/candidate-self-schedule',
      bodyParams,
    );
    if (res.status !== 200) throw new Error('Internal server error');
  } catch (e) {
    throw new Error(e);
  }
};
const confirmSlotNoConflict = async (
  bodyParams: APICandidateConfirmSlotNoConflict,
) => {
  await axios.post(
    '/api/scheduling/v1/booking/confirm-slot-no-conflicts',
    bodyParams,
  );
};

export type InviteMetaParams = {
  session_ids: string[];
  recruiter_id: string;
  user_tz: string;
  start_date: string;
  end_date?: string;
};

export type InviteSlotsParams = {
  filter_json_id: string;
  user_tz: string;
};
const getInviteSlots = async ({
  filter_json_id,
  user_tz,
}: InviteSlotsParams) => {
  try {
    const paylod: APIVerifyRecruiterSelectedSlots = {
      filter_json_id,
      candidate_tz: user_tz,
      api_options: {
        include_conflicting_slots: {
          show_conflicts_events: true,
          show_soft_conflicts: true,
          out_of_working_hrs: true,
        },
      },
    };
    const resSchOpt = await axios.post(
      '/api/scheduling/v1/verify-recruiter-selected-slots',
      {
        ...paylod,
      },
    );
    if (resSchOpt.status !== 200) {
      throw new Error('Failed to fetch slots');
    }
    return resSchOpt.data.filter(
      (d) => d.length !== 0,
    ) as unknown as ApiResponseAllSlots;
  } catch (e) {
    throw new Error(e);
  }
};
