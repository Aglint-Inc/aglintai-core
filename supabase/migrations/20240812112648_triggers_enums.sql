drop view if exists "public"."workflow_view";
DROP TRIGGER IF EXISTS workflow_action_deletion ON "public"."workflow";
alter type "public"."workflow_trigger" rename to "workflow_trigger__old_version_to_be_dropped";

create type "public"."workflow_trigger" as enum ('selfScheduleReminder', 'interviewStart', 'sendAvailReqReminder', 'interviewerConfirmation', 'interviewEnd', 'meetingDeclined', 'meetingAccepted', 'candidateBook', 'onQualified', 'onTrainingComplete', 'onAvailReqAgent', 'onReceivingAvailReq', 'onSelfScheduleReqAgent', 'onRequestCancel', 'onRequestReschedule');

alter table "public"."workflow" alter column trigger type "public"."workflow_trigger" using trigger::text::"public"."workflow_trigger";

drop type "public"."workflow_trigger__old_version_to_be_dropped";

create or replace view "public"."workflow_view" as  SELECT workflow.id,
    workflow.created_at,
    workflow.trigger,
    workflow.phase,
    workflow."interval",
    workflow.title,
    workflow.recruiter_id,
    workflow.auto_connect,
    workflow.description,
    COALESCE(workflow_jobs.jobs, '[]'::json) AS jobs,
    workflow.workflow_type,
    workflow.is_paused
   FROM (workflow
     LEFT JOIN ( SELECT workflow_job_relation.workflow_id,
            json_agg(json_build_object('id', workflow_job_relation.job_id, 'job_title', public_jobs.job_title, 'department', departments.name, 'location', public_jobs.location, 'status', public_jobs.status)) AS jobs
           FROM ((workflow_job_relation
             LEFT JOIN public_jobs ON ((workflow_job_relation.job_id = public_jobs.id)))
             LEFT JOIN departments ON ((departments.id = public_jobs.department_id)))
          GROUP BY workflow_job_relation.workflow_id) workflow_jobs ON ((workflow_jobs.workflow_id = workflow.id)));

CREATE TRIGGER workflow_action_deletion AFTER UPDATE OF trigger ON public.workflow FOR EACH ROW EXECUTE FUNCTION trigger_workflow_action_deletion();

