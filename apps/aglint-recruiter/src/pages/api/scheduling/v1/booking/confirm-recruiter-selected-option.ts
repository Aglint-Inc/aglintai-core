/* eslint-disable security/detect-object-injection */
import { APIConfirmRecruiterSelectedOption } from '@aglint/shared-types';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { bookInterviewPlan } from '@/src/services/CandidateScheduleV2/utils/bookingUtils/bookInterviewPlan';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { scheduling_options_schema } from '@/src/types/scheduling/schema_find_availability_payload';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = req.body as APIConfirmRecruiterSelectedOption;
    const fetched_details = await fetchCandidateAvailability(body);

    const cand_schedule = new CandidatesSchedulingV2(
      {
        candidate_tz: body.user_tz,
        start_date_str: fetched_details.start_date_str,
        end_date_str: fetched_details.end_date_str,
        recruiter_id: fetched_details.recruiter_id,
        session_ids: body.selectedOption.sessions.map((s) => s.session_id),
      },
      fetched_details.zod_options,
    );

    await cand_schedule.fetchDetails();

    await cand_schedule.fetchIntsEventsFreeTimeWorkHrs();
    const verified_plans = cand_schedule.verifyIntSelectedSlots([
      body.selectedOption,
    ]);
    if (verified_plans.length === 0) {
      throw new Error('Requested plan does not exist');
    }
    const details = await bookInterviewPlan(cand_schedule, verified_plans[0], {
      application: {
        id: fetched_details.application.id,
      },
      candidate: {
        first_name: fetched_details.application.candidates.first_name,
        last_name: fetched_details.application.candidates.last_name,
      },
      company: {
        id: fetched_details.company.id,
        name: fetched_details.company.name,
      },
      job: {
        job_title: fetched_details.job.job_title,
      },
    });
    return res.status(200).json(details);
  } catch (err) {
    console.error(err);
    return res.status(200).send(err.message);
  }
};
export default handler;

export const fetchCandidateAvailability = async (
  req_body: APIConfirmRecruiterSelectedOption,
) => {
  const [avail_details] = supabaseWrap(
    await supabaseAdmin
      .from('candidate_request_availability')
      .select(
        'session_ids,slots,availability,date_range,recruiter_id,recruiter(id,name),applications(id,candidates(first_name,last_name,timezone),public_jobs(job_title))',
      )
      .eq('id', req_body.availability_req_id),
  );
  if (!avail_details) {
    throw new Error('Availabiluty does not exist');
  }
  const zod_options = scheduling_options_schema.parse({
    include_conflicting_slots: {
      day_off: true,
      day_passed: true,
      holiday: true,
      interviewer_pause: true,
      interviewers_load: true,
      out_of_office: true,
      out_of_working_hrs: true,
      show_conflicts_events: true,
      show_soft_conflicts: true,
    },
    include_free_time: avail_details.availability.free_keywords,
    use_recruiting_blocks: avail_details.availability.recruiting_block_keywords,
  });

  return {
    session_ids: avail_details.session_ids,
    application: avail_details.applications,
    start_date_str: userTzDayjs(avail_details.date_range[0])
      .tz(req_body.user_tz)
      .format('DD/MM/YYYY'),
    end_date_str: userTzDayjs(avail_details.date_range[1])
      .tz(req_body.user_tz)
      .format('DD/MM/YYYY'),
    recruiter_id: avail_details.recruiter_id,
    company: avail_details.recruiter,
    job: avail_details.applications.public_jobs,
    zod_options,
  };
};
