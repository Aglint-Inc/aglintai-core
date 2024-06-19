drop view if exists "public"."workflow_view";

create or replace view "public"."workflow_view" as  SELECT workflow.id,
    workflow.created_at,
    workflow.trigger,
    workflow.phase,
    workflow."interval",
    workflow.title,
    workflow.recruiter_id,
    workflow.auto_connect,
    workflow.description,
    COALESCE(workflow_jobs.jobs, '[]'::json) AS jobs
   FROM (workflow
     LEFT JOIN ( SELECT workflow_job_relation.workflow_id,
            json_agg(json_build_object('job_id', workflow_job_relation.job_id, 'title', public_jobs.job_title)) AS jobs
           FROM (workflow_job_relation
             LEFT JOIN public_jobs ON ((workflow_job_relation.job_id = public_jobs.id)))
          GROUP BY workflow_job_relation.workflow_id) workflow_jobs ON ((workflow_jobs.workflow_id = workflow.id)));



