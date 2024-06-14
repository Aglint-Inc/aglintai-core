drop view if exists "public"."workflow_view";

alter type "public"."workflow_trigger" rename to "workflow_trigger__old_version_to_be_dropped";

create type "public"."workflow_trigger" as enum ('self_schedule_request_reminder', 'upcoming_interview_reminder', 'availability_request_reminder');

alter table "public"."workflow" alter column trigger type "public"."workflow_trigger" using trigger::text::"public"."workflow_trigger";

drop type "public"."workflow_trigger__old_version_to_be_dropped";

alter table "public"."workflow" alter column "trigger" set not null;

alter table "public"."workflow_action" drop column "medium";

alter table "public"."workflow_action" drop column "target";

alter table "public"."workflow_action" add column "email_template_id" uuid not null;

drop type "public"."workflow_action_medium";

drop type "public"."workflow_action_target";

alter table "public"."workflow_action" add constraint "workflow_action_email_template_id_fkey" FOREIGN KEY (email_template_id) REFERENCES company_email_template(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."workflow_action" validate constraint "workflow_action_email_template_id_fkey";

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



