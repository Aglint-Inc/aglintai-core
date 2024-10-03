import { toast } from '@components/hooks/use-toast';
import { useParams } from 'next/navigation';

import {
  api,
  type RouterInputs,
  TRPC_CLIENT_CONTEXT,
  type Unvoid,
} from '@/trpc/client';

export const useCandidateAvailabilityMeetings = () => {
  const { data: candidateRequestAvailability } = useCandidateAvailabilityData();
  const interview_sessions =
    candidateRequestAvailability?.request_session_relation
      ? candidateRequestAvailability?.request_session_relation.map(
          (ele) => ele.interview_session,
        )
      : [];
  const sessions_ids = interview_sessions.map((ele) => ele?.id ?? '');

  return api.candidate_availability.getMeetings.useQuery(
    {
      sessions_ids: sessions_ids,
    },
    {
      trpc: TRPC_CLIENT_CONTEXT,
    },
  );
};
export const useCandidateAvailabilityScheduleDMeetings = () => {
  return api.candidate_availability.getScheduledMeetings.useQuery(
    {
      application_id: '',
    },
    {
      trpc: TRPC_CLIENT_CONTEXT,
      enabled: false,
    },
  );
};
export const useCandidateAvailabilityData = () => {
  const params = useParams();
  const candidate_request_availability_id = params?.request_id as string;
  return api.candidate_availability.getCandidateAvailabilityData.useQuery(
    {
      candidate_request_availability_id: candidate_request_availability_id,
    },
    {
      enabled: !!candidate_request_availability_id,
      trpc: TRPC_CLIENT_CONTEXT,
    },
  );
};

export const useUpdateCandidateAvailability = () => {
  const utils = api.useUtils();
  const updateMutation = api.candidate_availability.update.useMutation({
    onSuccess: () => {
      utils.candidate_availability.getCandidateAvailabilityData.invalidate();
    },
    onError: (e) => {
      toast({
        title: e.shape?.message,
      });
    },
  });
  const updateRequestAvailability = async (
    payload: Unvoid<RouterInputs['candidate_availability']['update']>,
  ) => {
    return await updateMutation.mutateAsync({
      ...payload,
    });
  };
  return { ...updateMutation, updateRequestAvailability };
};
