import { EmailTemplateAPi } from '@aglint/shared-types';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';
import { fillCompEmailTemplate } from '../../../utils/apiUtils/fillCompEmailTemplate';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/userTzDayjs';
import {
  CAND_DATE_FORMAT,
  CAND_TIME_FORMAT,
} from '../../../utils/types/constants';
import { getFullName } from '@aglint/shared-utils';
type EmailType = EmailTemplateAPi<'interviewReminder_email_interviewer'>;
export async function fetchUtil(req_body: EmailType['api_payload']) {
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,last_name,email,recruiter_id,recruiter(logo),timezone),public_jobs(recruiter,job_title,company)',
      )
      .eq('id', req_body.application_id),
  );

  const [job_recruiter] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select()
      .eq('user_id', candidateJob.public_jobs.recruiter),
  );

  const [meeting_details] = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select('id,name,interview_meeting(start_time)')
      .eq('id', req_body.session_id),
  );
  const meeting_inters = supabaseWrap(
    await supabaseAdmin
      .from('meeting_interviewers')
      .select('email,first_name')
      .eq('session_id', req_body.session_id),
  );
  const comp_email_temp = await fetchCompEmailTemp(
    candidateJob.candidates.recruiter_id,
    'interviewReminder_email_interviewer',
  );
  if (!candidateJob || !meeting_details) {
    throw new Error('invalid meeting id or application_id');
  }

  const {
    candidates: {
      recruiter: { logo },
    },
  } = candidateJob;

  const meeting_time = dayjsLocal(
    meeting_details.interview_meeting.start_time,
  ).tz(candidateJob.candidates.timezone);
  const inter_mail_details = meeting_inters.map((inter) => {
    const comp_email_placeholder: EmailType['comp_email_placeholders'] = {
      '{{ candidateName }}': getFullName(
        candidateJob.candidates.first_name,
        candidateJob.candidates.last_name,
      ),
      '{{ jobTitle }}': candidateJob.public_jobs.job_title,
      '{{ companyName }}': candidateJob.public_jobs.company,
      '{{ jobRecruiter }}': job_recruiter.first_name,
      '{{ sessionName }}': meeting_details.name,
      '{{ date }}': meeting_time.format(CAND_DATE_FORMAT),
      '{{ time }}': `${meeting_time.format(CAND_TIME_FORMAT)} (${candidateJob.candidates.timezone})`,
      '{{ interviewerFirstName }}': inter.first_name,
    };
    const filled_comp_template = fillCompEmailTemplate(
      comp_email_placeholder,
      comp_email_temp,
    );
    const react_email_placeholders: EmailType['react_email_placeholders'] = {
      companyLogo: logo,
      emailBody: filled_comp_template.body,
      subject: filled_comp_template.subject,
    };

    return {
      recipient_email: inter.email,
      react_email_placeholders,
      filled_comp_template,
    };
  });

  return {
    inter_mail_details,
  };
}
