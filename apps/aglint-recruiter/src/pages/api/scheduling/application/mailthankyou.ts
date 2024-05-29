/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import {
  APICandScheduleMailThankYou,
  APISendgridPayload,
  CalendarEvent,
} from '@aglint/shared-types';
import axios from 'axios';
import { has } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { addScheduleActivity } from '@/src/components/Scheduling/Candidates/queries/utils';
import { CompanyEmailsTypeDB } from '@/src/types/companyEmailTypes';
import { createICSAttachment } from '@/src/utils/apiUtils/mailthankyou/ceateIcsContent';
import { EmailTemplateFiller } from '@/src/utils/emailTemplate/EmailTemplateFiller';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';
const required_fields: (keyof APICandScheduleMailThankYou)[] = [
  'cand_tz',
  'filter_id',
];
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { cand_tz, filter_id, task_id } =
      req.body as APICandScheduleMailThankYou;
    required_fields.forEach((field) => {
      if (!has(req.body, field)) {
        throw new Error(`missing Field ${field}`);
      }
    });

    const [filterJson] = supabaseWrap(
      await supabaseAdmin
        .from('interview_filter_json')
        .select(
          '*,interview_schedule( *,applications( id,public_jobs(id,job_title,recruiter!public_jobs_recruiter_id_fkey(name, email_template)),candidates(*) ) ),recruiter_user(first_name,last_name,user_id,email)',
        )
        .eq('id', filter_id),
    );
    const email_templates = filterJson.interview_schedule.applications
      .public_jobs.recruiter.email_template as CompanyEmailsTypeDB;

    const session_details = supabaseWrap(
      await supabaseAdmin
        .from('interview_session')
        .select(
          '*,interview_meeting(*),interview_session_relation(*,interview_module_relation(*,recruiter_user(user_id,email,first_name,last_name,profile_image)))',
        )
        .in('id', filterJson.session_ids),
    );

    addScheduleActivity({
      title: `Booked ${session_details.map((ses) => ses.name).join(' , ')}`,
      application_id: filterJson.interview_schedule.application_id,
      logger: filterJson.interview_schedule.application_id,
      type: 'schedule',
      supabase: supabaseAdmin,
      created_by: null,
      filter_id,
      task_id,
      metadata: {
        type: 'booking_confirmation',
        sessions: session_details,
      },
    });

    const company_name =
      filterJson.interview_schedule.applications.public_jobs.recruiter.name;
    const candidate_email =
      filterJson.interview_schedule.applications.candidates.email;

    const candidate_name =
      filterJson.interview_schedule.applications.candidates.first_name;
    const job_tile =
      filterJson.interview_schedule.applications.public_jobs.job_title;
    const schedule_name = `Interview for ${job_tile} - ${candidate_name}`;
    const schedule_id = filterJson.interview_schedule.id;

    const template_filler = new EmailTemplateFiller(email_templates);
    const filled_template = template_filler.fillEmail(
      'candidate_invite_confirmation',
      {
        '[companyName]': company_name,
        '[firstName]': candidate_name,
        '[jobTitle]': job_tile,
        '[schedule_name]': schedule_name,
        '[viewDetailsLink]': `<a href='${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/invite/${schedule_id}?filter_id=${filter_id}'>View Details</a>`,
      },
    );
    const mail_attachments = session_details.map((s) => {
      const cal_event = s.interview_meeting.meeting_json as CalendarEvent;
      const cand_cal_event_name = `Interview Invite: ${job_tile} at ${company_name}`;
      const meeting_info =
        `<h3>${s.name}</h3>` +
        `<p> Duration ${s.session_duration} </p>` +
        `<p> meeting place ${s.schedule_type} </p>` +
        `<p> meeting link ${s.interview_meeting.meeting_link} </p>` +
        `<p><a href='${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/invite/${schedule_id}?filter_id=${filter_id}'>View Details</a></p>`;
      return createICSAttachment(
        cal_event,
        cand_cal_event_name,
        meeting_info,
        s.interview_meeting.meeting_link,
        s.name,
        cand_tz,
      );
    });
    const sendgrid_payload: APISendgridPayload = {
      fromEmail: `messenger@aglinthq.com`,
      fromName: filled_template.fromName,
      email: process.env.LOCAL_CAND_EMAIL ?? candidate_email,
      subject: filled_template.subject,
      text: filled_template.body,
      attachments: mail_attachments,
    };
    await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/sendgrid`,
      sendgrid_payload,
    );
    return res.status(200).send('ok');
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error.message);
  }
};

export default handler;
