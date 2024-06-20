import dayjs from 'dayjs';
import {supabaseAdmin} from '../../../../services/supabase/SupabaseAdmin';

import {getFullName} from '../../../../utils/getFullName';
import {EmailAgentPayload} from '../../../../types/email_agent/apiPayload.types';
import {DatabaseTable, EmailTemplateFields} from '@aglint/shared-types';
import {envConfig} from 'src/config';
import {supabaseWrap} from '@aglint/shared-utils';

export const fetchEmailAgentCandDetails = async (
  thread_id: string,
  cand_email_body: string
) => {
  const [cand_rec] = supabaseWrap(
    await supabaseAdmin
      .from('scheduling-agent-chat-history')
      .select(
        '*, interview_filter_json(* ,interview_schedule(id,application_id, applications(*,public_jobs(id,recruiter_id,logo,job_title,company,description,recruiter!public_jobs_recruiter_id_fkey(scheduling_settings,email_template)), candidates(id,email,first_name,last_name,timezone))))'
      )
      .eq('thread_id', thread_id)
  );
  const job =
    cand_rec.interview_filter_json.interview_schedule.applications.public_jobs;
  const [agent_data] = supabaseWrap(
    await supabaseAdmin
      .from('integrations')
      .select()
      .eq('recruiter_id', job.recruiter_id)
  );
  if (!cand_rec) {
    // this email is not from candidate
    // handle this later
    return null;
  }

  const candidate =
    cand_rec.interview_filter_json.interview_schedule.applications.candidates;

  const filter_json = cand_rec.interview_filter_json.filter_json;

  const sessions = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select(
        '*,interview_meeting(*,recruiter_user(first_name,last_name,scheduling_settings))'
      )
      .in('id', cand_rec.interview_filter_json.session_ids)
  );
  if (!sessions[0].interview_meeting) {
    throw new Error('No meeting found');
  }
  const meet_status = sessions[0].interview_meeting.status;

  if (meet_status === 'completed') {
    // meeting completed
    return null;
  }

  let plan_summary = '';
  let meeting_summary = '';

  if (meet_status === 'waiting' || meet_status === 'cancelled') {
    sessions.forEach((sess, idx) => {
      if (sess.session_type === 'debrief') return;
      plan_summary +=
        `Session ${idx + 1}. ${sess.name}\n` +
        `- Duration ${sess.session_duration} ` +
        `- meeting place ${sess.schedule_type} ` +
        `- meeting break ${sess.break_duration} \n\n`;
    });
  } else if (meet_status === 'confirmed') {
    sessions.forEach((sess, idx) => {
      // let sess = sessions.find((s) => s.id === m.session_id);
      meeting_summary +=
        `Meeting ${idx + 1}. ${sess.name}\n` +
        `Meeting Date and time ${dayjs(sess.interview_meeting.start_time)
          .tz(candidate.timezone)
          .format('h a dddd DD MMMM')}` +
        `- Duration ${sess.session_duration} ` +
        `- meeting place ${sess.schedule_type} ` +
        `- meeting link ${sess.interview_meeting.meeting_link} ` +
        `- meeting break ${sess.break_duration} \n\n`;
    });
  }

  const getInitialEmailTemplate = () => {
    const email_details = {
      '[candidateFirstName]': candidate.first_name,
      '[companyName]': job.company,
      '[jobRole]': job.job_title,
    };
    const templates = job.recruiter.email_template as any;
    if (!templates['init_email_agent']) {
      throw new Error('init_email_agent Email template not found');
    }
    return fillEmailTemplate(templates['init_email_agent'], email_details);
  };

  const email_details = getInitialEmailTemplate();

  // TODO: delete this code later
  const getUsTime = (d: string) => {
    const [date, month, year] = d.split('/');
    return [month, date, year].join('/');
  };
  const meeting_organizer = sessions[0].interview_meeting.recruiter_user;
  const agent_payload: EmailAgentPayload = {
    history: cand_rec.chat_history,
    payload: {
      candidate_email:
        cand_rec.interview_filter_json.interview_schedule.applications
          .candidates.email,
      candidate_name: getFullName(candidate.first_name, candidate.last_name),
      company_name: job.company,
      start_date: getUsTime(filter_json.start_date),
      end_date: getUsTime(filter_json.end_date),
      job_role: job.job_title,
      company_logo: job.logo,
      company_id: job.recruiter_id,
      job_id: job.id,
      schedule_id: cand_rec.interview_filter_json.schedule_id,
      cand_application_status: sessions[0].interview_meeting.status,
      candidate_time_zone: candidate.timezone,
      interv_plan_summary: plan_summary,
      application_id: cand_rec.application_id,
      new_cand_msg: cand_email_body,
      interview_sessions: sessions.filter(s => s.session_type !== 'debrief'),
      task_id: cand_rec.task_id,
      candidate_id:
        cand_rec.interview_filter_json.interview_schedule.applications
          .candidates.id,
      organizer_name: getFullName(
        meeting_organizer.first_name,
        meeting_organizer.last_name
      ),
      organizer_timezone: meeting_organizer.scheduling_settings.timeZone.tzCode,
      interview_meetings: sessions.map(
        ses => ses.interview_meeting as DatabaseTable['interview_meeting']
      ),
      meeting_summary,
      job_description: job.description,
      comp_scheduling_setting: job.recruiter.scheduling_settings as any,
      filter_id: cand_rec.interview_filter_json.id,
      email_subject: email_details.subject,
      agent_email:
        envConfig.LOCAL_AGENT_EMAIL ?? agent_data.schedule_agent_email,
    },
    schedule_chat_history: {
      from_name: cand_rec.email_from_name,
      subject: cand_rec.email_subject,
    },
  };

  return agent_payload;
};

const fillEmailTemplate = (
  email_template: EmailTemplateFields,
  dynamic_fields: Record<string, string>
): EmailTemplateFields => {
  const updated_template = {...email_template};
  for (const key of Object.keys(dynamic_fields)) {
    updated_template.subject = updated_template.subject.replaceAll(
      key,
      dynamic_fields[String(key)]
    );
    updated_template.body = updated_template.body.replaceAll(
      key,
      dynamic_fields[String(key)]
    );
  }

  return updated_template;
};
