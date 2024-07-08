/* eslint-disable no-console */
/* eslint-disable security/detect-object-injection */
import {
  APIFindAvailability,
  APIScheduleDebreif,
  DatabaseTableInsert,
  PlanCombinationRespType,
} from '@aglint/shared-types';
import axios from 'axios';
import dayjs from 'dayjs';
import { NextApiRequest, NextApiResponse } from 'next';

import { ApiResponseFindAvailability } from '@/src/components/Scheduling/CandidateDetails/types';
import { createTaskProgress } from '@/src/components/Tasks/utils';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export type ApiBodyParamScheduleIndividual = {
  session_id: string;
  application_id: string;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  recruiter_id: string;
  task_id: string;
  recruiter_user_name: string;
  rec_user_id: string;
  user_tz: string;
  filter_id: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      application_id,
      dateRange,
      rec_user_id,
      recruiter_id,
      session_id,
      recruiter_user_name,
      task_id,
      user_tz,
      filter_id,
    } = req.body as ApiBodyParamScheduleIndividual;

    console.log(application_id, 'application_id');

    if (!application_id) {
      return res.status(400).send('Missing required parameters');
    }
    const scheduleMeetingsSessions =
      await fetchScheduleMeetingsSession(application_id);

    const schedule_id = scheduleMeetingsSessions.id;

    if (!scheduleMeetingsSessions) {
      console.log('unable to fetch schedule meetings sessions relations');
      return res.status(400).send('Missing required parameters');
    }

    const sortFilterConfirmedMeetings =
      sortBySessionOrderFilterConfirmedRelations(scheduleMeetingsSessions);

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

    const jobData = await fetchJob(application_id);

    const sessionRelationHandler = await sessionRelationHander({
      session_id,
      jobData: jobData.public_jobs,
      sortFilterConfirmedMeetings,
    });

    const availabilities = await findAvailibility({
      recruiter_id: recruiter_id,
      session_id,
      dateRange,
    });

    if (availabilities[0][0].length === 0) {
      console.log('no availibity found');
      await updateFailedTask({
        dateRange,
        rec_user_id,
        recruiter_user_name,
        task_id,
      });
      return res.status(200).send('no availibity found');
    }

    //try to book the first slot available on next day
    const firstSlot = availabilities[1][0].filter(
      (item) => !item.sessions[0].is_conflict,
    )[0];

    await confirmSlot({
      schedule_id,
      task_id,
      user_tz,
      selectedDebrief: firstSlot,
      filter_id,
    });

    return res.status(200).send({
      jobData,
      sessionRelationHandler,
      checkSessionRelations,
      selectedDebrief,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export default handler;

const confirmSlot = async ({
  user_tz,
  schedule_id,
  task_id,
  selectedDebrief,
  filter_id,
}: {
  task_id: string;
  user_tz: string;
  schedule_id: string;
  selectedDebrief: PlanCombinationRespType;
  filter_id: string;
}) => {
  const bodyParams: APIScheduleDebreif = {
    session_id: selectedDebrief.sessions[0].session_id,
    schedule_id,
    user_tz,
    selectedOption: selectedDebrief,
    task_id,
    filter_id,
  };

  const resConfirmSlot = await axios.post(
    `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/booking/schedule-debreif`,
    bodyParams,
  );

  if (resConfirmSlot.status === 200) {
    console.log(`confirmed slot`);
    return true;
  } else {
    throw new Error('error in confirm_interview_slot api');
  }
};

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

const fetchScheduleMeetingsSession = async (application_id: string) => {
  const { data, error } = await supabaseAdmin
    .from('interview_schedule')
    .select(
      '*,interview_meeting(*,interview_session(*,interview_session_relation(id,is_confirmed,interview_module_relation(user_id))))',
    )
    .eq('application_id', application_id);

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

const sessionRelationHander = async ({
  session_id,
  jobData,
  sortFilterConfirmedMeetings,
}: {
  session_id: string;
  jobData: Awaited<ReturnType<typeof fetchJob>>['public_jobs'];
  sortFilterConfirmedMeetings: ReturnType<
    typeof sortBySessionOrderFilterConfirmedRelations
  >;
}) => {
  const { data, error } = await supabaseAdmin
    .from('interview_session')
    .select(
      '*,interview_session_relation(id,recruiter_user(user_id)),interview_meeting(*)',
    )
    .eq('session_type', 'debrief') // not needed actually
    .eq('id', session_id)
    .single();

  if (error) throw new Error(error.message);

  const existingUserIds = [];

  data.interview_session_relation.map((sesrel) =>
    existingUserIds.push(sesrel.recruiter_user.user_id),
  );

  const userIds = [];

  const {
    hiring_manager,
    sourcer,
    recruiter,
    previous_interviewers,
    recruiting_coordinator,
  } = data.members_meta as {
    sourcer: false;
    recruiter: false;
    hiring_manager: false;
    previous_interviewers: false;
    recruiting_coordinator: false;
  };

  if (hiring_manager && jobData.hiring_manager) {
    userIds.push(jobData.hiring_manager);
  }
  if (sourcer && jobData.sourcer) {
    userIds.push(jobData.sourcer);
  }
  if (recruiter && jobData.recruiter) {
    userIds.push(jobData.recruiter);
  }
  if (recruiting_coordinator && jobData.recruiting_coordinator) {
    userIds.push(jobData.recruiting_coordinator);
  }
  if (previous_interviewers) {
    const sessionRelations = findSessionRelations(sortFilterConfirmedMeetings);
    sessionRelations.session_relations.map((item) =>
      userIds.push(item.interview_module_relation.user_id),
    );
  }

  const filterUserIds = userIds.filter(
    (user_id) => !existingUserIds.includes(user_id),
  );

  const intertableUserIds = [...new Set(filterUserIds)];

  const insertSessionRelations: DatabaseTableInsert['interview_session_relation'][] =
    intertableUserIds.map((user_id) => ({
      session_id: session_id,
      user_id: user_id,
    }));

  if (intertableUserIds.length > 0) {
    const { error } = await supabaseAdmin
      .from('interview_session_relation')
      .upsert(insertSessionRelations)
      .select();

    if (error) throw new Error(error.message);
    else {
      console.log(
        `insterted session relations ${intertableUserIds.map((user_id) => user_id).join(' , ')}`,
      );
    }
  }

  return { allUserIds: [...intertableUserIds, ...existingUserIds], ...data };
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

const findAvailibility = async ({
  session_id,
  recruiter_id,
  dateRange,
}: {
  session_id: string;
  recruiter_id: string;
  dateRange: {
    start_date: string;
    end_date: string;
  };
}) => {
  const resAllOptions = await axios.post(
    `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/find_availability`,
    {
      session_ids: [session_id],
      recruiter_id: recruiter_id,
      start_date_str: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
      end_date_str: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
      candidate_tz: 'America/Los_Angeles',
      is_debreif: true,
    } as APIFindAvailability,
  );

  if (resAllOptions.data.length === 0) {
    console.log('No availability found.');
    return;
  } else return resAllOptions.data as ApiResponseFindAvailability;
};

const updateFailedTask = async ({
  task_id,
  rec_user_id,
  recruiter_user_name,
  dateRange,
}: {
  task_id: string;
  rec_user_id: string;
  recruiter_user_name: string;
  dateRange: {
    start_date: string;
    end_date: string;
  };
}) => {
  const { error: errorTasks } = await supabaseAdmin
    .from('new_tasks')
    .update({
      status: 'failed',
    })
    .eq('id', task_id);

  if (errorTasks) throw new Error(errorTasks.message);

  await createTaskProgress({
    type: 'slots_failed',
    data: {
      progress_type: 'standard',
      created_by: { id: rec_user_id, name: recruiter_user_name },
      task_id: task_id,
    },
    optionData: {
      prevScheduleDateRange: {
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
      },
    },
    supabaseCaller: supabaseAdmin,
  });
};
