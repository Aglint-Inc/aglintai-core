drop view if exists "public"."workflow_view";

create or replace view "public"."workflow_view" as  WITH job_cte AS (
         SELECT workflow_job_relation.workflow_id,
            array_agg(json_build_object('id', workflow_job_relation.job_id, 'job_title', public_jobs.job_title, 'department', departments.name, 'location', row_to_json(office_locations.*), 'status', public_jobs.status)) AS jobs
           FROM (((workflow_job_relation
             LEFT JOIN public_jobs ON ((workflow_job_relation.job_id = public_jobs.id)))
             LEFT JOIN departments ON ((departments.id = public_jobs.department_id)))
             LEFT JOIN office_locations ON ((office_locations.id = public_jobs.location_id)))
          WHERE (public_jobs.status <> 'closed'::public_job_status)
          GROUP BY workflow_job_relation.workflow_id
        ), action_cte AS (
         SELECT workflow_action.workflow_id,
            COALESCE(array_agg(DISTINCT
                CASE
                    WHEN ((workflow_action.action_type = 'end_point'::text) OR (workflow_action.action_type = 'agent_instruction'::text)) THEN 'system'::text
                    ELSE workflow_action.action_type
                END), ARRAY[]::text[]) AS tags
           FROM workflow_action
          GROUP BY workflow_action.workflow_id
        )
 SELECT workflow.id,
    workflow.created_at,
    workflow.trigger,
    workflow.phase,
    workflow."interval",
    workflow.title,
    workflow.recruiter_id,
    workflow.auto_connect,
    workflow.description,
    COALESCE(job_cte.jobs, ARRAY[]::json[]) AS jobs,
    workflow.workflow_type,
    workflow.is_paused,
    workflow.is_request_workflow,
    array_append(action_cte.tags, (workflow.trigger)::text) AS tags
   FROM ((workflow
     LEFT JOIN job_cte ON ((job_cte.workflow_id = workflow.id)))
     LEFT JOIN action_cte ON ((action_cte.workflow_id = workflow.id)));



