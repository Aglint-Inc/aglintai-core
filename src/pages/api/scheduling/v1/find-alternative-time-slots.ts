/* eslint-disable no-unused-vars */
import { has } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

import { CandidatesScheduling } from '@/src/services/CandidateSchedule/CandidateSchedule';
import { userTzDayjs } from '@/src/services/CandidateSchedule/utils/userTzDayjs';
import { APIFindAltenativeTimeSlot } from '@/src/types/aglintApi/schedulingApi';
import { SessionCombinationType } from '@/src/types/scheduleTypes/types';

const required_fields = [
  'recruiter_id',
  'session_id',
  'slot_start_time',
  'user_tz',
  'replacement_ints',
];
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      recruiter_id,
      session_id,
      slot_start_time,
      user_tz,
      replacement_ints,
    } = req.body as APIFindAltenativeTimeSlot;
    required_fields.forEach((req_field) => {
      if (!has(req.body, req_field)) {
        return res.status(400).send(`missing field ${req_field}`);
      }
    });
    const slot_date = userTzDayjs(slot_start_time).tz(user_tz);
    const cand_schedule = new CandidatesScheduling(
      {
        company_id: recruiter_id,
        session_ids: [session_id],
        user_tz,
      },
      {
        start_date_js: slot_date.startOf('day'),
        end_date_js: slot_date.endOf('day'),
      },
    );
    await cand_schedule.fetchDetails();
    await cand_schedule.fetchInterviewrsCalEvents();
    const [single_day_slots] = cand_schedule.findCandSlotForTheDay();
    const slot_combs = single_day_slots.map((comb) => comb.sessions[0]);
    const time_filtered_slots = slot_combs.filter((comb) =>
      filter_slots(comb, slot_start_time),
    );
    // time_filtered_slots.forEach((s) => {
    //   s.qualifiedIntervs.forEach((i) => {
    //     console.log(i.email);
    //     console.log(i.user_id);
    //   });
    // });
    const ideal_slot = time_filtered_slots.some((slot) => {
      return replacement_ints.every((int_id) =>
        slot.qualifiedIntervs.find((q) => q.user_id === int_id),
      );
    });

    return res.status(200).json(Boolean(ideal_slot));
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export default handler;

const filter_slots = (sess_comb: SessionCombinationType, slot_time: string) => {
  return userTzDayjs(sess_comb.start_time).isSame(slot_time, 'minutes');
};

// // TODO: this is redundant type refactor later
// const getRespInterviewer = (r: SessionInterviewerType) => {
//   let int: SlotInterviwerType = {
//     interview_module_relation_id: r.interview_module_relation_id,
//     interviewer_type: r.interviewer_type,
//     user_id: r.user_id,
//     first_name: r.first_name,
//     last_name: r.last_name,
//     profile_image: r.profile_image,
//     training_type: r.training_type,
//     email: r.email,
//   };
//   return int;
// };

// const mapSessionComb = (session_comb: SessionCombinationType) => {
//   const t = {
//     session_id: session_comb.session_id,
//     module_id: session_comb.module_id,
//     session_name: session_comb.session_name,
//     duration: session_comb.duration,
//     location: session_comb.location,
//     schedule_type: session_comb.schedule_type,
//     session_type: session_comb.session_type,
//     break_duration: session_comb.break_duration,
//     session_order: session_comb.session_order,
//     interviewer_cnt: session_comb.interviewer_cnt,
//     module_name: session_comb.module_name,
//     start_time: session_comb.start_time,
//     end_time: session_comb.end_time,
//     qualified_intervs: session_comb.qualifiedIntervs.map((i) =>
//       getRespInterviewer(i),
//     ),
//     training_intervs: session_comb.trainingIntervs.map((i) =>
//       getRespInterviewer(i),
//     ),
//   };

//   return t;
// };
