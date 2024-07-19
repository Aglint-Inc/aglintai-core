create schema if not exists "agent";


alter type "public"."email_slack_types" rename to "email_slack_types__old_version_to_be_dropped";

create type "public"."email_slack_types" as enum ('interviewEnd_slack_interviewers', 'interviewerConfirmation_slack_interviewers', 'interviewStart_slack_interviewers', 'agent_email_candidate', 'applicantReject_email_applicant', 'applicationRecieved_email_applicant', 'confInterview_email_organizer', 'confirmInterview_email_applicant', 'debrief_email_interviewer', 'interReschedReq_email_recruiter', 'interviewCancel_email_applicant', 'InterviewCancelReq_email_recruiter', 'interviewReschedule_email_applicant', 'interviewStart_email_applicant', 'interviewStart_email_interviewers', 'phoneScreen_email_candidate', 'phoneScreenRemind_email_applicant', 'selfScheduleReminder_email_applicant', 'sendAvailReqReminder_email_applicant', 'sendSelfScheduleRequest_email_applicant', 'sendAvailabilityRequest_email_applicant', 'availabilityReqResend_email_candidate', 'interviewDetails_calender_interviewer', 'rescheduleSelfSchedule_email_applicant', 'interviewStart_email_organizer', 'meetingDeclined_email_organizer', 'meetingAccepted_email_organizer', 'candidateBook_slack_interviewerForFeedback', 'candidateBook_email_interviewerForFeedback', 'interviewEnd_slack_interviewerForFeedback', 'interviewEnd_email_interviewerForFeedback', 'candidateBook_slack_interviewerForConfirmation', 'onSignup_email_admin', 'onInvite_email_user', 'onShadowComplete_email_interviewer', 'onRShadowComplete_email_interviewer', 'onShadowComplete_slack_interviewer', 'onRShadowComplete_slack_interviewer', 'onQualified_email_interviewer', 'onQualified_email_approved', 'onQualified_slack_interviewer', 'onQualified_slack_approved', 'onQualified_slack_approver', 'onQualified_email_approver');

alter table "public"."application_email_status" alter column email type "public"."email_slack_types" using email::text::"public"."email_slack_types";

alter table "public"."company_email_template" alter column type type "public"."email_slack_types" using type::text::"public"."email_slack_types";

alter table "public"."job_email_template" alter column type type "public"."email_slack_types" using type::text::"public"."email_slack_types";

drop type "public"."email_slack_types__old_version_to_be_dropped";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_auth_user(email text, password text, user_id uuid, app_meta_data jsonb, user_meta_data jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
  declare
  encrypted_pw text;
BEGIN
  -- user_id := gen_random_uuid();
  encrypted_pw := crypt(password, gen_salt('bf'));
  
  INSERT INTO auth.users
    (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at,created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token,raw_app_meta_data,raw_user_meta_data)
  VALUES
    ('00000000-0000-0000-0000-000000000000', user_id, 'authenticated', 'authenticated', email, encrypted_pw, '2023-05-03 19:41:43.585805+00', '2023-04-22 13:10:03.275387+00', '2023-04-22 13:10:31.458239+00',  '2023-05-03 19:41:43.580424+00', '2023-05-03 19:41:43.585948+00', '', '', '', '',app_meta_data,user_meta_data);
  
  INSERT INTO auth.identities (id, user_id,provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  VALUES
    (gen_random_uuid(), user_id,gen_random_uuid(), format('{"sub":"%s","email":"%s"}', user_id::text, email)::jsonb, 'email', '2023-05-03 19:41:43.582456+00', '2023-05-03 19:41:43.582497+00', '2023-05-03 19:41:43.582497+00');
END;
$function$
;

CREATE OR REPLACE FUNCTION public.delete_interview_schedule_on_status_update()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF OLD.status = 'disqualified' AND NEW.status = 'new' THEN
    DELETE FROM interview_schedule WHERE application_id = NEW.id;
    DELETE FROM candidate_request_availability WHERE application_id = NEW.id;
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.reset_auth_users_identities(user_email text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    DELETE FROM auth.users
    where email=user_email;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_application_score_log()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  score numeric;
  log_count numeric;
BEGIN
  IF NEW.processing_status = 'success' AND NEW.score_json -> 'scores' IS NOT NULL THEN
    select into score, log_count
      score_application(
        applications.score_json -> 'scores',
        public_jobs.parameter_weights
      ),
      coalesce(logs.logs, 0)
    from
      applications
    left join (
      select
        application_id as id,
        coalesce(count(*)) as logs
      from
        application_logs
      where
        title similar to 'Application was scored %'
      group by
        id
    ) as logs on
      logs.id = applications.id
    inner join
      public_jobs on
        public_jobs.id = applications.job_id
    where
      applications.id = NEW.id;
    IF score IS NOT NULL AND score >= 0 THEN
      INSERT INTO application_logs(application_id, title, logged_by, module)
      VALUES (NEW.id, 
      'Application was '|| (
        case
          when log_count = 0 then 'scored'
          else 'rescored'
        end
      ) || ' ' || score || '%',
      'system', 'jobs');
    END IF;
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_application_score_log2()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  score numeric;
  title TEXT;
BEGIN
  with scores as (
    select 
      application_status_view.id,
      application_status_view.resume_score,
      coalesce(logs.logs, 0) as logs
    from
      application_status_view
    left join (
      select
        application_id as id,
        count(*) as logs
      from
        application_logs
      where
        application_logs.title similar to 'Application was scored %'
      group by
        id
    ) as logs on
      logs.id = application_status_view.id
    where
      application_status_view.job_id = NEW.id and
      application_status_view.resume_score >= 0 
  )
  insert into application_logs(application_id, title, logged_by, module)
  select 
    scores.id,
    'Application was '|| (
      case
        when scores.logs = 0 then 'scored'
        else 'rescored'
      end
    ) || ' ' || scores.resume_score || '%',
    'system',
    'jobs'
  from
    scores;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.workflow_log_on_insert_candidate_request_availability()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$DECLARE
    wa_record RECORD;
    trigger_case text;
    workflow_id uuid;
BEGIN
    -- if NEW.slots is not null then
        FOR wa_record IN
            select w_a.workflow_id as workflow_id, w_a.id as workflow_action_id, w.interval as interval_minutes, w.phase as phase,
                  json_build_object('schedule_id', i_s.id, 'application_id', i_s.application_id, 'email_type', c_e_t.type, 'avail_req_id', NEW.id) as meta
            from interview_schedule i_s 
            JOIN applications a ON a.id = i_s.application_id
            JOIN workflow_job_relation w_a_r ON w_a_r.job_id = a.job_id
            JOIN workflow w ON w.id = w_a_r.workflow_id
            JOIN workflow_action w_a ON w_a.workflow_id = w_a_r.workflow_id
            JOIN company_email_template c_e_t ON c_e_t.id = w_a.email_template_id
            WHERE i_s.application_id = NEW.application_id
            AND w.trigger::text = 'sendAvailReqReminder' 
        LOOP
            PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta);
        END LOOP;
    -- END if;
  RETURN NEW;
END;$function$
;



