import { useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

export const useCandidateAvailability = ({
  candidateAvailabilityId,
}: {
  candidateAvailabilityId: string;
}) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['get_CandidateAvailability', candidateAvailabilityId],
    refetchInterval: 30000,
    refetchOnMount: true,
    queryFn: () => getCandidateAvailability({ candidateAvailabilityId }),
    gcTime: 20000,
    enabled: !!candidateAvailabilityId,
  });

  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey: ['getCandidateAvailability', candidateAvailabilityId],
    });
  return { ...query, refetch };
};

const getCandidateAvailability = async ({
  candidateAvailabilityId,
}: {
  candidateAvailabilityId: string;
}) => {
  const { data, error } = await supabase
    .from('candidate_request_availability')
    .select('*')
    .eq('id', candidateAvailabilityId)
    .single();

  if (!error) {
    return data;
  }
};
