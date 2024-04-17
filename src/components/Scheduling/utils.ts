import axios from 'axios';
import dayjs from 'dayjs';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';
import { fillEmailTemplate } from '@/src/utils/support/supportUtils';

export function getLastDayOfMonth(date: string) {
  return dayjs(date).endOf('month').date();
}

export const mailThankYouHandler = async ({
  filter_id,
}: {
  filter_id: string;
}) => {
  try {
    const { data: filterJson, error: errFilterJson } = await supabaseAdmin
      .from('interview_filter_json')
      .select(
        '*,interview_schedule( *,applications( id,public_jobs(id,job_title,recruiter(name, email_template)),candidates(*) ) )',
      )
      .eq('id', filter_id);

    if (errFilterJson) throw new Error();

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
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('error', e);
  }
};
