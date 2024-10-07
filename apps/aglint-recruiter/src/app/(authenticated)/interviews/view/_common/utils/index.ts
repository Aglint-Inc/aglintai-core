import { type APIEventAttendeeStatus } from '@aglint/shared-types';
import axios from 'axios';

import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';

export const onClickCopyLink = async ({
  filter_id,
  request_id,
}: {
  filter_id: string | null;
  request_id: string | null;
}) => {
  if (filter_id) {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/self-scheduling/${filter_id}`,
    );
  } else if (request_id) {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/request-availability/${request_id}`,
    );
  }
};

export const fetchCalendarStatus = async ({
  event_id,
  user_id,
}: {
  event_id: string;
  user_id: string;
}) => {
  try {
    const res = await axios.post('/api/scheduling/v1/event_attendee_status', {
      attendee_interv_id: user_id,
      event_id: event_id,
    } as APIEventAttendeeStatus);

    if (res?.data?.event_attendees_status) {
      return res.data.event_attendees_status;
    }
  } catch (e) {
    //
  }
};

export const onClickAccept = async (session_relation_id: string) => {
  try {
    const { error } = await supabase
      .from('interview_session_relation')
      .update({ accepted_status: 'accepted' })
      .eq('id', session_relation_id);

    if (error) throw new Error(error.message);
  } catch {
    toast.error('Failed to accept the interview');
  }
};
