drop trigger if exists "new_recruiters" on "public"."recruiter";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.workflow_log_on_update_interview_meeting()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    wa_record RECORD;
    trigger_case text;
    workflow_id uuid;
BEGIN
    if NEW.status::text = 'confirmed' then
      FOR wa_record IN
          SELECT wa.workflow_id as workflow_id, wa.id as workflow_action_id, w.interval as interval_minutes, w.phase as phase,w.trigger as trigger, json_build_object( 'schedule_id', i_s.id, 'application_id', i_s.application_id, 'meeting_id', NEW.id, 'start_time', NEW.start_time, 'candidate_id', a.candidate_id, 'email_type', c_e_t.type, 'recruiter_user_id', NEW.organizer_id, 'session_id', (select i_m_s.id from interview_session i_m_s where i_m_s.meeting_id = NEW.id)) as meta
          FROM 
          interview_schedule i_s 
          JOIN applications a ON i_s.application_id = a.id
          JOIN workflow_job_relation war ON war.job_id = a.job_id
          JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
          JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
          JOIN workflow w ON war.workflow_id = w.id
          WHERE i_s.id = NEW.interview_schedule_id AND (
            (w.trigger::text = 'interviewStart' AND (c_e_t.type = 'interviewStart_email_applicant' OR c_e_t.type = 'interviewStart_email_organizer')) 
            OR w.trigger::text = 'candidateBook'
            OR w.trigger::text ='interviewEnd' AND (
              c_e_t.type = 'interviewEnd_slack_organizerForMeetingStatus'  OR 
              c_e_t.type = 'interviewEnd_email_organizerForMeetingStatus' OR 
              c_e_t.type = 'interviewEnd_email_shadowTraineeForMeetingAttendence' OR 
              c_e_t.type = 'interviewEnd_email_rShadowTraineeForMeetingAttendence' OR 
              c_e_t.type = 'interviewEnd_slack_rShadowTraineeForMeetingAttendence' OR
              c_e_t.type = 'interviewEnd_slack_shadowTraineeForMeetingAttendence'
              )
            )
      LOOP
          IF wa_record.trigger::text='interviewEnd' THEN PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta, NEW.end_time);
          ELSE PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta, NEW.start_time);
          END IF;
      END LOOP;
    END if;
  RETURN NEW;
END;
$function$
;

CREATE TRIGGER new_recruiters AFTER INSERT ON public.recruiter FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('https://rested-logically-lynx.ngrok-free.app/api/pre-seed', 'POST', '{"Content-type":"application/json"}', '{}', '1000');


