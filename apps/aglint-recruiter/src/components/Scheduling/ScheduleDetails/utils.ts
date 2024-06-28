import { SupabaseType } from '@aglint/shared-types';

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
  application_id,
  session_id,
}: {
  supabase: SupabaseType;
  application_id: string;
  session_id: string;
}) => {
  try {
    const { data: reqAva, error: errReqAva } = await supabase
      .from('candidate_request_availability')
      .select('*')
      .eq('application_id', application_id);

    if (errReqAva) throw new Error(errReqAva.message);

    if (reqAva.length > 0) {
      const updateDbArray = reqAva.map((req) => ({
        ...req,
        session_ids: req.session_ids.filter((ses) => ses.id !== session_id),
      }));

      const { error: errReqAvaUpdate } = await supabase
        .from('candidate_request_availability')
        .upsert(updateDbArray);

      if (errReqAvaUpdate) throw new Error(errReqAvaUpdate.message);
    }
  } catch {
    //
  }
};
