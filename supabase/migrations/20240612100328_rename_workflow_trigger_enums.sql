drop view if exists "public"."workflow_view";

alter type "public"."workflow_trigger" rename to "workflow_trigger__old_version_to_be_dropped";

create type "public"."workflow_trigger" as enum ('selfScheduleReminder', 'interviewStart', 'sendAvailReqReminder', 'interviewerConfirmation', 'interviewEnd');

alter table "public"."workflow" alter column trigger type "public"."workflow_trigger" using trigger::text::"public"."workflow_trigger";

drop type "public"."workflow_trigger__old_version_to_be_dropped";

create or replace view "public"."workflow_view" as  SELECT workflow.id,
    workflow.created_at,
    workflow.phase,
    workflow."interval",
    workflow.title,
    workflow.recruiter_id,
    workflow.trigger,
    COALESCE(workflow_jobs.jobs, '[]'::json) AS jobs
   FROM (workflow
     LEFT JOIN ( SELECT workflow_job_relation.workflow_id,
            json_agg(workflow_job_relation.job_id) AS jobs
           FROM workflow_job_relation
          GROUP BY workflow_job_relation.workflow_id) workflow_jobs ON ((workflow_jobs.workflow_id = workflow.id)));



