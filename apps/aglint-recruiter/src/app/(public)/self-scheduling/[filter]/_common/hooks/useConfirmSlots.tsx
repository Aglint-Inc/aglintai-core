import {
  type APICandidateConfirmSlotNoConflict,
  type CandidateDirectBookingType,
} from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useConfirmSlots = () => {
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
      };
      if (is_agent_link) {
        await confirmSlotNoConflict(no_conf_payload);
      } else {
        await confirmSlots(bodyParams);
      }
    },
  });
  return mutation;
};

const confirmSlots = async (bodyParams: CandidateDirectBookingType) => {
  await axios.post(
    '/api/scheduling/v1/booking/candidate-self-schedule',
    bodyParams,
  );
};
const confirmSlotNoConflict = async (
  bodyParams: APICandidateConfirmSlotNoConflict,
) => {
  await axios.post(
    '/api/scheduling/v1/booking/confirm-slot-no-conflicts',
    bodyParams,
  );
};
