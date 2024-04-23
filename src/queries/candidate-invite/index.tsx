import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useInviteParams } from '@/src/context/CandidateInviteContext/hooks';
import { ApiResponseCandidateInvite } from '@/src/pages/api/scheduling/invite';
import { ConfirmApiBodyParams } from '@/src/pages/api/scheduling/v1/confirm_interview_slot';
import { SessionsCombType } from '@/src/types/scheduleTypes/types';
import toast from '@/src/utils/toast';

import { candidateInviteKeys } from './keys';

export const useInvites = () => {
  const { enabled, ...params } = useInviteParams();
  const { queryKey } = candidateInviteKeys.inviteDateWithFilter(params);
  const query = useQuery({
    queryKey,
    queryFn: () => getInviteDates(params),
    enabled,
    staleTime: Infinity,
    gcTime: 0,
  });
  return query;
};

export const useInviteSlots = (
  params: Parameters<typeof candidateInviteKeys.inviteSlotWithFilter>[0],
) => {
  const { user_tz, enabled: paramsEnabled } = useInviteParams();
  const { status, data } = useInvites();
  const enabled = !!(status === 'success' && data && paramsEnabled);
  const payload: InviteSlotParams = enabled
    ? {
        recruiter_id: data.recruiter.id,
        session_ids: data.meetings.map((m) => m.interview_session.id),
        user_tz,
        ...params,
      }
    : null;
  const { queryKey } = candidateInviteKeys.inviteSlotWithFilter(params);
  const query = useQuery({
    queryKey,
    enabled: enabled,
    queryFn: () => getInviteSlots(payload),
  });
  return query;
};

export const useConfirmSlots = () => {
  const queryClient = useQueryClient();
  // eslint-disable-next-line no-unused-vars
  const { enabled, ...params } = useInviteParams();
  const { queryKey } = candidateInviteKeys.inviteDateWithFilter(params);
  const mutation = useMutation({
    mutationFn: async (bodyParams: ConfirmApiBodyParams) => {
      await confirmSlots(bodyParams);
      await queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  return mutation;
};

const getInviteDates = async (
  params: Parameters<typeof candidateInviteKeys.inviteDateWithFilter>[0],
) => {
  const apiRoute = '/api/scheduling/invite';
  const res = await axios.post(apiRoute, params);
  if (!(res.status === 200 && res.data))
    throw new Error(`Something went wrong. (${apiRoute})`);
  return res.data as ApiResponseCandidateInvite;
};

const confirmSlots = async (bodyParams: ConfirmApiBodyParams) => {
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

export type InviteSlotParams = {
  session_ids: string[];
  recruiter_id: string;
  user_tz: string;
  start_date: string;
  end_date?: string;
};
const getInviteSlots = async (params: InviteSlotParams) => {
  const apiRoute = '/api/scheduling/v1/find_interview_slots';
  const res = await axios.post(apiRoute, params);
  if (!(res.status === 200 && res.data))
    throw new Error(`Something went wrong. (${apiRoute})`);
  return res.data.filter((d) => d.length > 0) as SessionsCombType[][];
};
