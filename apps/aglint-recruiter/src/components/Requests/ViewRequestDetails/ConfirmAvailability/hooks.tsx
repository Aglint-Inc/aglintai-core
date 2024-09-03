import { CandReqSlotsType } from '@aglint/shared-types';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import axios from '@/src/client/axios';
import { ApiResponseFindAvailability } from '@/src/pages/api/scheduling/v1/find_availability';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';

export const useRequestAvailabilityDetails = ({
  request_id,
}: {
  request_id: string;
}) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_request_availability_details', { request_id }],
    queryFn: () => getRequestAvailabilityDetails(request_id),
    // refetchInterval: 2000,
    enabled: true,
  });
  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey: ['get_request_availability_details', { request_id }],
    });
  return { ...query, refetch };
};

async function getRequestAvailabilityDetails(request_id: string) {
  if (request_id) {
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await axios.post(
        '/api/scheduling/v1/get-candidate-selected-slots',
        {
          cand_availability_id: request_id,
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
