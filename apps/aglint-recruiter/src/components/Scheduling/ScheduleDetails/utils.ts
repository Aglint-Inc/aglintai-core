import { APIEventAttendeeStatus, SupabaseType } from '@aglint/shared-types';
import axios from 'axios';

import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

export const removeSessionsFromFilterJson = async ({
  supabase,
  session_ids,
}: {
  supabase: SupabaseType;
  session_ids: string[];
}) => {
  try {
    await supabase
      .rpc('update_or_delete_filter_json', {
        session_ids_to_remove: session_ids,
      })
      .throwOnError();
    return true;
  } catch (error) {
    // Optionally, handle the error more specifically
    console.error('Failed to update filter JSON:', error);
    return false;
  }
};

export const removeSessionsFromRequestAvailability = async ({
  supabase,
  session_ids,
}: {
  supabase: SupabaseType;
  session_ids: string[];
}) => {
  try {
    for (const session_id of session_ids) {
      const { data: reqSesRel, error: reqSesRelError } = await supabase
        .from('request_session_relation')
        .select()
        .eq('session_id', session_id);

      if (reqSesRelError) throw reqSesRelError;

      if (reqSesRel.length === 0) {
        continue;
      }

      const req_id = reqSesRel[0].request_availability_id;

      const { data: reqSesRels, error: reqSesRelsError } = await supabase
        .from('request_session_relation')
        .select()
        .eq('request_availability_id', req_id);

      if (reqSesRelsError) throw reqSesRelsError;

      if (reqSesRels?.length === 1) {
        const { error: deleteReqError } = await supabase
          .from('candidate_request_availability')
          .delete()
          .eq('id', req_id);

        if (deleteReqError) throw deleteReqError;
      } else {
        const { error: deleteSesRelError } = await supabase
          .from('request_session_relation')
          .delete()
          .eq('session_id', session_id);

        if (deleteSesRelError) throw deleteSesRelError;
      }
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
  }
};

export const onClickCopyLink = async ({
  application_id,
  filter_id,
  request_id,
}: {
  application_id: string;
  filter_id: string | null;
  request_id: string | null;
}) => {
  if (filter_id) {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/invite/${application_id}?filter_id=${filter_id}`,
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
