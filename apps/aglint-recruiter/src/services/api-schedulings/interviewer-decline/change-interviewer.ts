import {
  APIFindAltenativeTimeSlotResponse,
  APIRespFindReplaceMentInts,
  APIUpdateMeetingInterviewers,
} from '@aglint/shared-types';
import axios, { AxiosError } from 'axios';
type BodyParams = {
  declined_int_sesn_reln_id: string;
  session_id: string;
};
export const changeInterviewer = async (payload: BodyParams) => {
  try {
    // list interviewers
    const api_payload1: APIFindAltenativeTimeSlotResponse = {
      session_id: payload.session_id,
      declined_int_sesn_reln_id: payload.declined_int_sesn_reln_id,
      user_tz: 'Asia/Colombo',
    };
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/find-replacement-ints`,
      api_payload1,
    );

    const alternate_slots: APIRespFindReplaceMentInts = data;
    if (alternate_slots.length === 0) {
      //NOTE: handle
    }
    if (alternate_slots.every((r) => r.conflicts.length > 0)) {
      //NOTE: handle
    }
    const api_payload2: APIUpdateMeetingInterviewers = {
      session_id: payload.session_id,
      curr_declined_int_sesn_reln_id: payload.declined_int_sesn_reln_id,
      new_int_sesn_reln_id: alternate_slots[0].replacement_int.id,
    };
    await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/update-meeting-interviewers`,
      api_payload2,
    );
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error('Failed to perform changeInterviewer', err.response);
    }
    console.error(err.message);
  }
};
