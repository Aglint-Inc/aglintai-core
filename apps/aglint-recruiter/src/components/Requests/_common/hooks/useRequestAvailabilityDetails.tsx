import type { CandReqSlotsType } from '@aglint/shared-types';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import axios from '@/client/axios';
import type { ApiResponseFindAvailability } from '@/pages/api/scheduling/v1/find_availability';
import { userTzDayjs } from '@/services/CandidateScheduleV2/utils/userTzDayjs';

export const useRequestAvailabilityDetails = ({
  availability_id,
}: {
  availability_id: string;
}) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_request_availability_details', { availability_id }],
    queryFn: () => getRequestAvailabilityDetails(availability_id),
    // refetchInterval: 2000,
    enabled: !!availability_id,
  });
  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey: ['get_request_availability_details', { availability_id }],
    });
  return { ...query, refetch };
};

async function getRequestAvailabilityDetails(availability_id: string) {
  if (availability_id) {
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await axios.post(
        '/api/scheduling/v1/get-candidate-selected-slots',
        {
          cand_availability_id: availability_id,
          user_tz: userTzDayjs.tz.guess(),
        },
      );
      return data as {
        slots: CandReqSlotsType[];
        availabilities: ApiResponseFindAvailability['availabilities'];
      };
    } catch (error) {
      throw error;
    }
  }
}
