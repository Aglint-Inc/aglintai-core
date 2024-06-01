import {
  APICandidateConfirmSlot,
  APIFindSlotsDateRange,
} from '@aglint/shared-types';
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
    retry: 3,
    queryFn: () => getInviteSlots(params),
  });
  return query;
};

export const useConfirmSlots = () => {
  const queryClient = useQueryClient();
  // eslint-disable-next-line no-unused-vars
  const { enabled, ...params } = useInviteParams();
  const { queryKey } = candidateInviteKeys.inviteMetaWithFilter(params);
  const mutation = useMutation({
    mutationFn: async (bodyParams: APICandidateConfirmSlot) => {
      await confirmSlots(bodyParams);
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

const confirmSlots = async (bodyParams: APICandidateConfirmSlot) => {
  try {
    const res = await axios.post(
      '/api/scheduling/v1/confirm_interview_slot',
      bodyParams,
    );
    if (res.status !== 200) throw new Error('Internal server error');
  } catch (e) {
    throw new Error(e);
  }
};

export type InviteMetaParams = {
  session_ids: string[];
  recruiter_id: string;
  user_tz: string;
  start_date: string;
  end_date?: string;
};

export type InviteSlotsParams = {
  filter_json: ApiResponseCandidateInvite['filter_json'];
  recruiter: ApiResponseCandidateInvite['recruiter'];
  user_tz: string;
};
const getInviteSlots = async ({ filter_json, user_tz }: InviteSlotsParams) => {
  try {
    const paylod: APIFindSlotsDateRange = {
      session_ids: filter_json.session_ids,
      recruiter_id: filter_json.recruiter_id,
      start_date_str: filter_json.start_date,
      end_date_str: filter_json.end_date,
      candidate_tz: user_tz,
    };
    const resSchOpt = await axios.post(
      '/api/scheduling/v1/find_slots_date_range',
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
