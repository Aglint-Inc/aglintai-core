/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { addScheduleActivity } from '@/src/components/Scheduling/AllSchedules/queries/utils';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';
import { fillEmailTemplate } from '@/src/utils/support/supportUtils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.body.filter_id) {
      return res.status(200).send('Missing filter_id');
    }

    const filter_id = req.body.filter_id;

    const { data: filterJson, error: errFilterJson } = await supabaseAdmin
      .from('interview_filter_json')
      .select(
        '*,interview_schedule( *,applications( id,public_jobs(id,job_title,recruiter(name, email_template)),candidates(*) ) ),recruiter_user(first_name,last_name,user_id,email)',
      )
      .eq('id', filter_id);

    if (errFilterJson) throw new Error();
    console.log(filterJson);

    const { data: sessions, error: errSessions } = await supabaseAdmin
      .from('interview_session')
      .select('*')
      .in('id', filterJson[0].session_ids);

    if (errSessions) throw new Error();

    console.log(sessions);

    addScheduleActivity({
      title: `Candidate confirmed ${sessions.map((ses) => ses.name).join(' , ')}`,
      application_id: filterJson[0].interview_schedule.application_id,
      logger: null,
      type: 'schedule',
      supabase: supabaseAdmin,
      created_by: null,
    });

    const emailTemplate = filterJson[0].interview_schedule.applications
      .public_jobs.recruiter.email_template[
      'candidate_invite_confirmation'
    ] as {
      subject: string;
      body: string;
    };

    const company_name =
      filterJson[0].interview_schedule.applications.public_jobs.recruiter.name;
    const candidate_email =
      filterJson[0].interview_schedule.applications.candidates.email;
    const candidate_name =
      filterJson[0].interview_schedule.applications.candidates.first_name;
    const job_tile =
      filterJson[0].interview_schedule.applications.public_jobs.job_title;
    const schedule_name = `Interview for ${job_tile} - ${candidate_name}`;
    const schedule_id = filterJson[0].interview_schedule.id;

    if (emailTemplate)
      await axios
        .post(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/sendgrid`, {
          fromEmail: `messenger@aglinthq.com`,
          fromName: 'Aglint',
          email: 'admin@aglinthq.com' ?? candidate_email,
          subject: fillEmailTemplate(emailTemplate.subject, {
            company_name: company_name,
            schedule_name: schedule_name,
            first_name: candidate_name,
            last_name: '',
            job_title: job_tile,
          }),
          text: fillEmailTemplate(emailTemplate.body, {
            company_name: company_name,
            schedule_name: schedule_name,
            first_name: candidate_name,
            last_name: '',
            job_title: job_tile,
            view_details: `<a href='${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/invite/${schedule_id}?filter_id=${filter_id}'>View Details</a>`,
          }),
        })
        .then((res) => {
          if (res.status === 200 && res.data.data === 'Email sent') {
            return true;
          } else {
            // eslint-disable-next-line no-console
            console.log(
              'error',
              'Unable to send the mail. Please try again later.',
            );
            return false;
          }
        });
  } catch (error) {
    // console.log('error', error);
    return res.status(400).send(error.message);
  }
};

export default handler;
