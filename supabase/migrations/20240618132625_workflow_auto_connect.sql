drop view if exists "public"."workflow_view";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.trigger_workflow_auto_connect()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  workflow RECORD;
BEGIN
  FOR workflow IN 
    SELECT id 
    FROM workflow 
    WHERE recruiter_id = NEW.recruiter_id 
      AND auto_connect = TRUE
  LOOP
    INSERT INTO workflow_job_relation(job_id, workflow_id)
    VALUES (NEW.id, workflow.id);
  END LOOP;
  return new;
end;
$function$
;

create or replace view "public"."workflow_view" as  SELECT workflow.id,
    workflow.created_at,
    workflow.trigger,
    workflow.phase,
    workflow."interval",
    workflow.title,
    workflow.recruiter_id,
    workflow.description,
    workflow.auto_connect,
    COALESCE(workflow_jobs.jobs, '[]'::json) AS jobs
   FROM (workflow
     LEFT JOIN ( SELECT workflow_job_relation.workflow_id,
            json_agg(workflow_job_relation.job_id) AS jobs
           FROM workflow_job_relation
          GROUP BY workflow_job_relation.workflow_id) workflow_jobs ON ((workflow_jobs.workflow_id = workflow.id)));


CREATE TRIGGER workflow_auto_connect AFTER INSERT ON public.public_jobs FOR EACH ROW EXECUTE FUNCTION trigger_workflow_auto_connect();


