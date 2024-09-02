/* eslint-disable no-console */
/* eslint-disable security/detect-object-injection */
import {
  type APIFindAvailability,
  type APIScheduleDebreif,
  type PlanCombinationRespType,
} from '@aglint/shared-types';
import axios from 'axios';
import dayjs from 'dayjs';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { type ApiResponseFindAvailability } from '@/src/components/Scheduling/CandidateDetails/types';
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

    if (
      !application_id ||
      !rec_user_id ||
      !recruiter_id ||
      !session_id ||
      !task_id ||
      !user_tz ||
      !filter_id
    ) {
      return res.status(400).send('Missing required parameters');
    }

    const { data: schedule } = await supabaseAdmin
      .from('interview_schedule')
      .select()
      .eq('application_id', application_id)
      .single()
      .throwOnError();

    const availabilities = await findAvailibilityNoConflictOnly({
      recruiter_id: recruiter_id,
      session_id,
      dateRange,
    });

    const firstSlot = availabilities.slots
      ?.flatMap((item) => item?.interview_rounds)
      ?.flatMap((item) => item?.plans);

    if (availabilities.slots?.length > 0 && firstSlot?.length > 0) {
      await confirmSlot({
        schedule_id: schedule.id,
        task_id,
        user_tz,
        selectedDebrief: firstSlot[0],
        filter_id,
      });
      return res.status(200).send('success');
    } else {
      console.log('no availibity found');
      await updateFailedTask({
        dateRange,
        rec_user_id,
        recruiter_user_name,
        task_id,
      });
      return res.status(200).send('no availibity found');
    }
  } catch (error) {
    console.log(error.message);
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

const findAvailibilityNoConflictOnly = async ({
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
  const bodyParams: APIFindAvailability = {
    session_ids: [session_id],
    recruiter_id: recruiter_id,
    start_date_str: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
    end_date_str: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
    candidate_tz: 'America/Los_Angeles',
  };

  const resAllOptions = await axios.post(
    `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/find_availability`,
    bodyParams,
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
