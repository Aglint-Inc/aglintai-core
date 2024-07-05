/* eslint-disable no-console */
/* eslint-disable security/detect-object-injection */
import { SystemAgentId } from '@aglint/shared-utils';
import dayjs from 'dayjs';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  createFilterJson,
} from '@/src/components/Scheduling/CandidateDetails/utils';
import { addScheduleActivity } from '@/src/components/Scheduling/Candidates/queries/utils';
import { meetingCardType } from '@/src/components/Tasks/TaskBody/ViewTask/Progress/SessionCard';
import { createTaskProgress } from '@/src/components/Tasks/utils';
import { getFullName } from '@/src/utils/jsonResume';
import { getOrganizerId } from '@/src/utils/scheduling/getOrganizerId';
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
    const recruiter_id = jobData.public_jobs.recruiter.id;
    const session_id = selectedDebrief.interview_session.id;
    const recruiter_user = jobData.public_jobs.recruiter_user;
    const organizer_id = await getOrganizerId(application_id, supabaseAdmin);

    const filterJson = await createFilterJson({
      dateRange,
      organizer_name: recruiter_user.first_name,
      sessions_ids: [session_id],
      schedule_id: schedule_id,
      supabase: supabaseAdmin,
      rec_user_id: organizer_id,
    });

    const filter_id = filterJson.id;

    // create task for scheduling debrief which picks and hit shcedule_individual api
    const task = await createTask({
      application_id,
      dateRange,
      filter_id,
      recruiter_user_name: getFullName(
        recruiter_user.first_name,
        recruiter_user.last_name,
      ),
      rec_user_id: recruiter_user.user_id,
      recruiter_id,
      session_id,
    });

    addScheduleActivity({
      title: `Auto scheduling ${selectedDebrief.interview_session.name}`,
      logged_by: 'user',
      application_id,
      task_id: task.task.id,
      supabase: supabaseAdmin,
      created_by: recruiter_user.user_id,
    });

    return res.status(200).send({
      task,
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
    >['interview_meeting'][0]['interview_session'][0]['interview_session_relation'],
    meeting_id: selectedDebriefId as string,
  };
};

const fetchScheduleMeetingsSession = async (schedule_id: string) => {
  const { data, error } = await supabaseAdmin
    .from('interview_schedule')
    .select(
      '*,interview_meeting(*,interview_session(*,interview_session_relation(id,is_confirmed,interview_module_relation(user_id))))',
    )
    .eq('id', schedule_id);

  if (error) throw new Error(error.message);
  else return data[0];
};

const sortBySessionOrderFilterConfirmedRelations = (
  scheduleMeetingsSessions: Awaited<
    ReturnType<typeof fetchScheduleMeetingsSession>
  >,
) => {
  return scheduleMeetingsSessions.interview_meeting
    .sort(
      (s1, s2) =>
        s1.interview_session[0].session_order -
        s2.interview_session[0].session_order,
    )
    .map((meet) => {
      return {
        id: meet.id,
        status: meet.status,
        start_time: meet.start_time,
        end_time: meet.end_time,
        interview_session: {
          id: meet.interview_session[0].id,
          name: meet.interview_session[0].name,
          session_order: meet.interview_session[0].session_order,
          session_type: meet.interview_session[0].session_type,
          interview_session_relation:
            meet.interview_session[0].interview_session_relation.filter(
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

const createTask = async ({
  session_id,
  application_id,
  rec_user_id,
  recruiter_id,
  dateRange,
  filter_id,
  recruiter_user_name,
}: {
  session_id: string;
  application_id: string;
  rec_user_id: string;
  recruiter_id: string;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  filter_id: string;
  recruiter_user_name: string;
}) => {
  const { data: session, error } = await supabaseAdmin
    .from('interview_session')
    .select(
      '*,interview_meeting(*),interview_session_relation(*,recruiter_user(user_id,first_name,last_name,email,profile_image))',
    )
    .eq('id', session_id)
    .single();

  if (error) throw new Error(error.message);

  const { data: task, error: errorTasks } = await supabaseAdmin
    .from('new_tasks')
    .insert({
      name: `Scheduling Debrief ${session.name}`,
      application_id,
      created_by: rec_user_id,
      type: 'schedule',
      status: 'scheduled',
      recruiter_id,
      due_date: dateRange.end_date,
      start_date: new Date().toISOString(),
      schedule_date_range: dateRange,
      assignee: [SystemAgentId],
      filter_id: filter_id,
      trigger_count: 0,
      session_ids: [
        {
          id: session_id,
          name: session.name,
          interview_meeting: session.interview_meeting,
          session_order: session.session_order,
          users: [],
        },
      ] as meetingCardType[],
    })
    .select()
    .single();

  if (errorTasks) throw new Error(errorTasks.message);

  await createTaskProgress({
    type: 'create_debrief_task',
    data: {
      progress_type: 'standard',
      created_by: { id: rec_user_id, name: recruiter_user_name },
      task_id: task.id,
    },
    optionData: {
      sessions: [
        {
          name: session.name,
          id: session.id,
          interview_meeting: session.interview_meeting,
          session_order: session.session_order,
          users: [],
        },
      ],
      debriefDateRange: dateRange,
    },
    supabaseCaller: supabaseAdmin,
  });

  console.log(`Created task ${task.id}`);

  return { task, session };
};
