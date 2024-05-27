/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { DatabaseTable } from '@aglint/shared-types';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export type ApiDebriefAddUsers = {
  filter_id: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { filter_id } = req.body as ApiDebriefAddUsers;

    const { data: filterJson, error: errorFilterJson } = await supabaseAdmin
      .from('interview_filter_json')
      .select(
        '*,interview_schedule( *,applications( id,public_jobs(id,job_title,recruiter!public_jobs_recruiter_id_fkey(name, email_template)),candidates(*) ) ),recruiter_user(first_name,last_name,user_id,email)',
      )
      .eq('id', filter_id)
      .single();

    if (errorFilterJson) throw new Error(errorFilterJson.message);

    const intMeetSessions = await fetchMeetingsSessions(
      filterJson.interview_schedule.id,
    );

    let debriefSessionId = null;

    //find next debrief session
    for (let i = 0; i < intMeetSessions.length; i++) {
      if (intMeetSessions[i].interview_session[0].session_type === 'debrief') {
        debriefSessionId = intMeetSessions[i].interview_session[0].id;
        break;
      }
    }

    if (!debriefSessionId) {
      return res.status(200).send('No debrief session found');
    }

    let eligibleUserIds = [
      ...new Set(
        findSessionRelations({
          sessions: intMeetSessions,
          debriefSessionId,
        }).user_ids || [],
      ),
    ];

    const existingUserIds = intMeetSessions
      .find((meet) => meet.interview_session[0].id === debriefSessionId)
      .interview_session[0].interview_session_relation.map(
        (sesrel) => sesrel.user_id,
      );

    const insertTableUserIds = eligibleUserIds.filter(
      (userId) => !existingUserIds.includes(userId),
    );

    if (insertTableUserIds.length === 0) {
      return res.status(200).send('No new users to add');
    }

    const { data: debriefSession, error: errDebSes } = await supabaseAdmin
      .from('interview_session_relation')
      .upsert(
        insertTableUserIds.map((user_id) => ({
          user_id,
          session_id: debriefSessionId,
          interviewer_type: 'qualified',
          training_type: 'qualified',
        })) as DatabaseTable['interview_session_relation'][],
      )
      .select();

    if (errDebSes) throw new Error(errDebSes.message);

    return res.status(200).send({
      debriefSession,
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error.message);
  }
};

export default handler;

const fetchMeetingsSessions = async (interview_schedule_id: string) => {
  const { data: intMeetSessions, error: errSessions } = await supabaseAdmin
    .from('interview_meeting')
    .select(
      'id,interview_schedule_id,status,interview_session(id,session_type,interview_session_relation(*,interview_module_relation(*)))',
    )
    .eq('interview_schedule_id', interview_schedule_id);

  if (errSessions) throw new Error(errSessions.message);

  return intMeetSessions;
};

function findSessionRelations({
  sessions,
  debriefSessionId,
}: {
  sessions: Awaited<ReturnType<typeof fetchMeetingsSessions>>;
  debriefSessionId: string;
}) {
  let user_ids = [];
  let previousDebriefIndex = -1;
  let selectedDebriefIndex = -1;

  // Find the index of the specified debrief meeting and the previous debrief meeting
  for (let i = 0; i < sessions.length; i++) {
    if (sessions[i].interview_session[0].session_type === 'debrief') {
      if (sessions[i].interview_session[0].id === debriefSessionId) {
        selectedDebriefIndex = i;
        break;
      }
      previousDebriefIndex = i;
    }
  }

  console.log(selectedDebriefIndex, previousDebriefIndex);

  // If no debrief meeting was found or the specified debrief meeting is not valid, return null
  if (selectedDebriefIndex === -1) {
    return null;
  }

  // Collect session relation IDs between the previous debrief and the specified debrief
  for (let i = previousDebriefIndex + 1; i < selectedDebriefIndex; i++) {
    const session = sessions[i];

    session.interview_session[0].interview_session_relation.map((sesrel) => {
      if (sesrel.is_confirmed)
        user_ids.push(sesrel.interview_module_relation.user_id);
    });
  }

  return {
    user_ids: user_ids,
    debriefSessionId: debriefSessionId,
  };
}
