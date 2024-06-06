drop trigger if exists "after_insert_new_applications" on "public"."applications";

drop function if exists "public"."insert_into_workflow_log"();


-- CREATE OR REPLACE FUNCTION public.insert_into_workflow_log()
--  RETURNS trigger
--  LANGUAGE plpgsql
-- AS $function$
-- DECLARE
--     wa_record RECORD;
-- BEGIN
--     -- Loop over the selected workflow_action ids
--     FOR wa_record IN
--         SELECT wa.id as workflow_action_id, w.id as workflow_id, w.interval as interval_minutes, w.phase as phase
--         FROM workflow_job_relation war
--         JOIN workflow_action wa ON wa.workflow_id = war.workflow_id join workflow w on war.workflow_id = w.id
--         WHERE war.job_id = NEW.job_id
--           AND war.workflow_id = (SELECT id FROM workflow WHERE trigger::text = 'application_new')
--     LOOP
--         -- Insert a row into the workflow_job_relation_log table for each workflow_action id
--         select create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase, json_build_object('application_id', NEW.id));
--     END LOOP;

--     RETURN NEW;
-- END;
-- $function$
-- ;
