/* eslint-disable no-console */
/* eslint-disable security/detect-object-injection */
import dayjs from 'dayjs';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { createFilterJson } from '@/src/utils/scheduling/createFilterJson';
import { getOrganizerId } from '@/src/utils/scheduling/getOrganizerId';
import { addScheduleActivity } from '@/src/utils/scheduling/utils';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export type ApiBodyParamTaskCreate = {
  schedule_id: string;
  application_id: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { schedule_id, application_id } = req.body as ApiBodyParamTaskCreate;

    console.log(schedule_id, 'schedule_id');
    console.log(application_id, 'application_id');

    if (!schedule_id) {
      return res.status(400).send('Missing required parameters');
    }
    const scheduleMeetingsSessions =
      await fetchScheduleMeetingsSession(schedule_id);

    if (!scheduleMeetingsSessions) {
      console.log('unable to fetch schedule meetings sessions relations');
      return res.status(400).send('Missing required parameters');
    }

    const sortFilterConfirmedMeetings =
      sortBySessionOrderFilterConfirmedRelations(scheduleMeetingsSessions);

    console.log(sortFilterConfirmedMeetings);

    const checkSessionRelations = findSessionRelations(
      sortFilterConfirmedMeetings,
    );

    if (!checkSessionRelations) {
      console.log('findSessionRelations is null');
      return res.status(200).send('findSessionRelations is null');
    }

    const selectedDebrief = sortFilterConfirmedMeetings.find(
      (meet) => meet.id === checkSessionRelations.meeting_id,
    );

    const previousMeeting =
      sortFilterConfirmedMeetings[
        selectedDebrief.interview_session.session_order - 2
      ];

    const today = dayjs(previousMeeting.end_time).add(1, 'day').format(); // trying to book debrief the next day of the previous confirmed meeting
    const endDay = dayjs(today).add(9, 'day').format();

    const dateRange = {
      start_date: today,
      end_date: endDay,
    };

    const jobData = await fetchJob(application_id);
    const session_id = selectedDebrief.interview_session.id;
    const recruiter_user = jobData.public_jobs.recruiter_user;
    const organizer_id = await getOrganizerId(application_id, supabaseAdmin);

    await createFilterJson({
      dateRange,
      organizer_name: recruiter_user.first_name,
      sessions_ids: [session_id],
      supabase: supabaseAdmin,
      rec_user_id: organizer_id,
      application_id,
    });

    await addScheduleActivity({
      title: `Auto scheduling ${selectedDebrief.interview_session.name}`,
      logged_by: 'user',
      application_id,
      supabase: supabaseAdmin,
      created_by: recruiter_user.user_id,
    });

    return res.status(200).send({
      checkSessionRelations,
      previousMeeting,
      selectedDebrief,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export default handler;

const findSessionRelations = (
  sessions: ReturnType<typeof sortBySessionOrderFilterConfirmedRelations>,
) => {
  let previousDebriefCompleted = false;
  let sessionRelationIds = [];
  let selectedDebriefId = null;

  for (let i = 0; i < sessions.length; i++) {
    const session = sessions[i];
    const isDebrief = session.interview_session.session_type === 'debrief';

    if (isDebrief) {
      if (session.status === 'not_scheduled') {
        if (previousDebriefCompleted || !selectedDebriefId) {
          // Check if all previous sessions are confirmed or completed
          let allConfirmedOrCompleted = true;
          for (let j = 0; j < i; j++) {
            if (
              sessions[j].status !== 'confirmed' &&
              sessions[j].status !== 'completed'
            ) {
              allConfirmedOrCompleted = false;
              break;
            }
          }
          if (allConfirmedOrCompleted) {
            selectedDebriefId = session.id;
            break;
          }
        }
      } else if (
        session.status === 'completed' ||
        session.status === 'confirmed'
      ) {
        previousDebriefCompleted = true;
        sessionRelationIds = [];
      }
    } else if (!isDebrief && (previousDebriefCompleted || !selectedDebriefId)) {
      if (session.status === 'confirmed' || session.status === 'completed') {
        sessionRelationIds.push(
          ...session.interview_session.interview_session_relation.map(
            (relation) => relation,
          ),
        );
      }
    }
  }

  if (!selectedDebriefId) {
    return null;
  }

  return {
    session_relations: sessionRelationIds as Awaited<
      ReturnType<typeof fetchScheduleMeetingsSession>
    >[0]['interview_session'][0]['interview_session_relation'],
    meeting_id: selectedDebriefId as string,
  };
};

const fetchScheduleMeetingsSession = async (application_id: string) => {
  const { data, error } = await supabaseAdmin
    .from('interview_plan')
    .select(
      '*,interview_session(*,interview_meeting(*),interview_session_relation(id,is_confirmed,interview_module_relation(user_id)))',
    )
    .eq('id', application_id);

  if (error) throw new Error(error.message);
  else return data;
};

const sortBySessionOrderFilterConfirmedRelations = (
  scheduleMeetingsSessions: Awaited<
    ReturnType<typeof fetchScheduleMeetingsSession>
  >,
) => {
  return scheduleMeetingsSessions
    .sort(
      (s1, s2) =>
        s1.interview_session[0].session_order -
        s2.interview_session[0].session_order,
    )
    .map((ses) => {
      const session = ses.interview_session[0];
      const meet = ses.interview_session[0].interview_meeting[0];
      return {
        id: meet.id,
        status: meet.status,
        start_time: meet.start_time,
        end_time: meet.end_time,
        interview_session: {
          id: session.id,
          name: session.name,
          session_order: session.session_order,
          session_type: session.session_type,
          interview_session_relation: session.interview_session_relation.filter(
            (sesresl) => sesresl.is_confirmed,
          ),
        },
      };
    });
};

const fetchJob = async (application_id: string) => {
  const { data, error } = await supabaseAdmin
    .from('applications')
    .select(
      'id,candidates(*),public_jobs(id,job_title,sourcer,recruiter,hiring_manager,recruiting_coordinator,recruiter!public_jobs_recruiter_id_fkey(id),recruiter_user!public_jobs_hiring_manager_fkey(user_id,first_name,last_name,email,profile_image))',
    )
    .eq('id', application_id)
    .single();

  if (error) throw new Error(error.message);
  else return data;
};
