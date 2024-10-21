drop trigger if exists "event_trigger_candidate_request_availability_delete" on "public"."candidate_request_availability";

drop trigger if exists "event_trigger_interview_filter_json_delete" on "public"."interview_filter_json";

drop trigger if exists "event_trigger_interview_filter_json_insert" on "public"."interview_filter_json";

drop trigger if exists "event_trigger_interview_meeting_delete" on "public"."interview_meeting";

drop trigger if exists "event_trigger_interview_meeting_insert" on "public"."interview_meeting";

drop trigger if exists "event_trigger_interview_session_cancel_insert" on "public"."interview_session_cancel";

drop trigger if exists "event_trigger_request_update" on "public"."request";



drop trigger if exists "event_trigger_request_insert" on "public"."request";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.clone_job_workflow_to_req()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
  DECLARE
    r_job_id uuid;
    w_trigger RECORD;
    w_action RECORD;

  BEGIN
      SELECT applications.job_id 
      INTO r_job_id
      FROM applications
      INNER JOIN request ON request.application_id = applications.id
      WHERE applications.id = NEW.application_id;

      FOR w_trigger IN 
          SELECT workflow.*      
          FROM workflow_job_relation 
          INNER JOIN workflow ON workflow.id = workflow_job_relation.workflow_id
          WHERE workflow_job_relation.job_id = r_job_id AND workflow.workflow_type = 'job' AND workflow.is_active=TRUE
      LOOP
          FOR w_action IN
              SELECT * FROM workflow_action
              WHERE workflow_action.workflow_id = w_trigger.id
          LOOP
              WITH inserted_w_trig AS (
                  INSERT INTO workflow(phase, interval, title, recruiter_id, workflow_type, trigger, request_id, is_active)
                  VALUES (w_trigger.phase, w_trigger.interval, w_trigger.title, w_trigger.recruiter_id, 'request', w_trigger.trigger, NEW.id, true)
                  RETURNING id
              )
              INSERT INTO workflow_action (workflow_id, "order", payload, action_type, target_api)
              SELECT inserted_w_trig.id, w_action."order", w_action.payload, w_action.action_type, w_action.target_api
              FROM inserted_w_trig;
          END LOOP;
      END LOOP;

      RETURN NEW;
  END;
  $function$
;

CREATE TRIGGER clone_wf_request AFTER INSERT ON public.request FOR EACH ROW EXECUTE FUNCTION clone_job_workflow_to_req();


