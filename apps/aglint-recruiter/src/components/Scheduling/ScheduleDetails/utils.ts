import { APIEventAttendeeStatus, SupabaseType } from '@aglint/shared-types';
import axios from 'axios';

import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

export const removeSessionFromFilterJson = async ({
  supabase,
  session_id,
}: {
  supabase: SupabaseType;
  session_id: string;
}) => {
  try {
    const { data: checkFilterJson, error: errMeetFilterJson } = await supabase
      .from('interview_filter_json')
      .select('*')
      .contains('session_ids', [session_id]);

    if (errMeetFilterJson) throw new Error(errMeetFilterJson.message);

    if (checkFilterJson.length > 0) {
      const updateDbArray = checkFilterJson.map((filterJson) => ({
        ...filterJson,
        session_ids: filterJson.session_ids.filter((id) => id !== session_id),
      }));

      const { error: errFilterJson } = await supabase
        .from('interview_filter_json')
        .upsert(updateDbArray);

      if (errFilterJson) throw new Error(errFilterJson.message);
    }

    return true;
  } catch {
    //
  }
};

export const removeSessionFromRequestAvailibility = async ({
  supabase,
  session_id,
}: {
  supabase: SupabaseType;
  session_id: string;
}) => {
  try {
    const { data: reqSesRel } = await supabase
      .from('request_session_relation')
      .select()
      .eq('session_id', session_id)
      .single()
      .throwOnError();

    const req_id = reqSesRel.request_availability_id;

    const { data: reqSesRels } = await supabase
      .from('request_session_relation')
      .select()
      .eq('request_availability_id', req_id)
      .throwOnError();

    if (reqSesRels?.length === 1) {
      await supabase
        .from('candidate_request_availability')
        .delete()
        .eq('id', req_id)
        .throwOnError();
    } else {
      await supabase
        .from('request_session_relation')
        .delete()
        .eq('session_id', session_id)
        .throwOnError();
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
  }
};

export const onClickCopyLink = async ({
  schedule_id,
  filter_id,
  request_id,
  task_id,
}: {
  schedule_id: string;
  filter_id: string | null;
  request_id: string | null;
  task_id: string | null;
}) => {
  if (filter_id) {
    navigator.clipboard.writeText(
      task_id
        ? `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/invite/${schedule_id}?filter_id=${filter_id}&task_id=${task_id}`
        : `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/invite/${schedule_id}?filter_id=${filter_id}`,
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

export const fetchFilterJson = async (session_ids: string[]) => {
  try {
    const { data } = await supabase
      .from('interview_filter_json')
      .select('*,new_tasks(id)')
      .contains('session_ids', session_ids)
      .single()
      .throwOnError();

    return data;
  } catch (e) {
    //
  }
};
