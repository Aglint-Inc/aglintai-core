import {
  APIFindAltenativeTimeSlotResponse,
  APIUpdateMeetingInterviewers,
  SessionCombinationRespType,
} from '@aglint/shared-types';
import { addErrorHandlerWrap } from '@aglint/shared-utils';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const target_api = req.body.target_api as DatabaseEnums['email_slack_types'];
  const {
    declined_int_sesn_reln_id,
    session_id,
  }: {
    declined_int_sesn_reln_id: string;
    session_id: string;
  } = req.body;

  try {
    // list interviewers
    const api_payload: APIFindAltenativeTimeSlotResponse = {
      session_id,
      ignore_int_session_ids: [declined_int_sesn_reln_id],
      user_tz: 'Asia/Colombo',
    };
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/find-alternative-time-slots`,
      api_payload,
    );

    const alternate_slots: SessionCombinationRespType[] = data;
    const filtered_slots: SessionCombinationRespType[] = alternate_slots.filter(
      (slot) => {
        slot.ints_conflicts;
      },
    );
  } catch (error) {
    return res.status(200).json({
      //
    });
  }
};

export default addErrorHandlerWrap(handler);

// const { data: interviewerList } = await axios.post(
//   '/api/agent-workflow/interviewer-decline',
//   {
//     listInterviewerPayload: {
//       ...bodyParams,
//     } as APIFindAltenativeTimeSlot,
//   },
// );
