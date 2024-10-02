/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { cancelMailHandler } from '@/utils/scheduling/mailUtils';
import { removeSessionsFromFilterJson } from '@/utils/scheduling/removeSessionsFromFilterJson';
import { removeSessionsFromRequestAvailability } from '@/utils/scheduling/removeSessionsFromRequestAvailability';
import { addScheduleActivity } from '@/utils/scheduling/utils';
import { createClient } from '@/utils/supabase/server';

export interface ApiBodyParamsCancelSchedule {
  meeting_id: string;
  session_id: string;
  reason: string;
  notes: string;
  cancel_user_id: string;
  application_id: string;
  application_log_id: string | null;
}

export type ApiResponseCancelSchedule = 'cancelled';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const supabase = createClient();

    const {
      meeting_id,
      session_id,
      reason,
      notes,
      cancel_user_id,
      application_id,
    } = req.body as ApiBodyParamsCancelSchedule;

    console.log();

    if (
      !(meeting_id && session_id && reason && cancel_user_id && application_id)
    ) {
      return res.status(400).send('Missing required fields');
    }

    if (meeting_id && session_id) {
      const { data: meetSession, error: errMeet } = await supabase
        .from('interview_meeting')
        .update({
          status: 'cancelled',
          cal_event_id: null,
          meeting_link: null,
          meeting_json: null,
        })
        .eq('id', meeting_id)
        .select('*,interview_session(*)');

      if (errMeet) throw new Error(errMeet.message);

      const { error: errSesRel } = await supabase
        .from('interview_session_relation')
        .update({
          accepted_status: 'waiting',
          is_confirmed: false,
        })
        .eq('session_id', session_id);

      if (errSesRel) throw new Error(errSesRel.message);

      await supabase
        .from('interview_session_cancel')
        .delete()
        .eq('session_id', session_id)
        .throwOnError();

      const { error: errIntSesCancel } = await supabase
        .from('interview_session_cancel')
        .insert({
          reason,
          type: 'declined',
          session_id,
          other_details: {
            dateRange: undefined,
            note: notes,
          },
          cancel_user_id: cancel_user_id,
          is_resolved: false,
        });
      if (errIntSesCancel) throw new Error(errIntSesCancel.message);

      const meeting_flow = meetSession[0].meeting_flow;
      const session_name = meetSession[0].interview_session[0].name;

      if (meeting_flow !== 'candidate_request') {
        await removeSessionsFromFilterJson({
          session_ids: [session_id],
          supabase,
        });
      } else if (meeting_flow === 'candidate_request') {
        await removeSessionsFromRequestAvailability({
          session_ids: [session_id],
          supabase,
        });
      }

      cancelMailHandler({
        application_id,
        session_ids: [session_id],
      });

      await addScheduleActivity({
        title: `Canceled ${session_name}`,
        description: `Reason: ${reason}`,
        application_id,
        logged_by: 'user',
        supabase: supabase,
        created_by: cancel_user_id,
      });

      if (meetSession[0].meeting_json) {
        axios.post(
          `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v2/cancel_calender_event`,
          {
            calender_event: meetSession[0].meeting_json,
          },
        );
      }

      return res.status(200).send('cancelled');
    } else {
      return res.status(400).send('Invalid meeting_id or session_id');
    }
  } catch (error) {
    // console.log('error', error);
    res.status(400).send(error.message);
  }
};

export default handler;
