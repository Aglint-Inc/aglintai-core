import type { SupabaseType } from '@aglint/shared-types';

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
    console.log((e as Error).message);
  }
};
