/* eslint-disable security/detect-object-injection */
import {
  APIVerifyRecruiterSelectedSlots,
  PlanCombinationRespType,
  SessionCombinationRespType,
  SessionsCombType,
} from '@aglint/shared-types';
import { ScheduleUtils } from '@aglint/shared-utils';
import { nanoid } from 'nanoid';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { planCombineSlots } from '@/src/services/CandidateScheduleV2/utils/planCombine';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { scheduling_options_schema } from '@/src/types/scheduling/schema_find_availability_payload';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { api_options, filter_json_id } =
    req.body as APIVerifyRecruiterSelectedSlots;
  try {
    const { filter_json_data } = await fetch_details_from_db(filter_json_id);
    const zod_options = scheduling_options_schema.parse({
      ...api_options,
      include_conflicting_slots: api_options?.include_conflicting_slots || {},
    });

    const selected_options =
      filter_json_data.selected_options as PlanCombinationRespType[];
    const cand_schedule = new CandidatesSchedulingV2(
      {
        candidate_tz: filter_json_data.filter_json.user_tz,
        end_date_str: filter_json_data.filter_json.end_date,
        recruiter_id: filter_json_data.filter_json.recruiter_id,
        session_ids: selected_options[0].sessions.map((s) => s.session_id),
        start_date_str: filter_json_data.filter_json.start_date,
      },
      zod_options,
    );
    await cand_schedule.fetchDetails();
    await cand_schedule.fetchIntsEventsFreeTimeWorkHrs();
    const verified_slots =
      cand_schedule.verifyIntSelectedSlots(selected_options);
    convertToCandSideResp(verified_slots, filter_json_data.filter_json.user_tz);
    return res.status(200).send('ok');
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export default handler;

const fetch_details_from_db = async (filter_json_id: string) => {
  const [filter_json_data] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .select('*,interview_schedule(recruiter_id)')
      .eq('id', filter_json_id),
  );
  if (!filter_json_data) throw new Error('invalid filter_json_id');

  return {
    filter_json_data,
  };
};

const convertToCandSideResp = (
  verified_slots: PlanCombinationRespType[],
  candidate_tz,
) => {
  let all_day_plans: SessionsCombType[][][] = [];
  const day_map_slots: {
    [int_start_day: string]: PlanCombinationRespType[][];
  } = {};

  for (let curr_int_day_slots of verified_slots) {
    const session_rounds = ScheduleUtils.getSessionRounds(
      curr_int_day_slots.sessions,
    ) as unknown as SessionCombinationRespType[][];
    const int_start_day = userTzDayjs(session_rounds[0][0].start_time)
      .tz(candidate_tz)
      .startOf('day')
      .format();
    const plan_combs: PlanCombinationRespType[] = session_rounds.map((s) => {
      return {
        plan_comb_id: nanoid(),
        sessions: s,
      };
    });
    if (!day_map_slots[int_start_day]) {
      day_map_slots[int_start_day] = [];
    }
    day_map_slots[int_start_day].push([...plan_combs]);
  }
  for (const slots of Object.values(day_map_slots)) {
    const session_combs = planCombineSlots(slots);
    all_day_plans = [...all_day_plans, session_combs];
  }
};
