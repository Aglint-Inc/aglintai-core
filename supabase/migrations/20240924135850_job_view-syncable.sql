create or replace view
  "public"."job_view" as
WITH
  application_status_view_cte AS (
    SELECT
      application_status_view.status,
      application_status_view.job_id,
      application_status_view.resume_processing_state,
      application_status_view.application_match
    FROM
      application_status_view
  ),
  job_cte AS (
    SELECT
      public_jobs.created_at,
      public_jobs.department_id,
      departments.name AS department,
      public_jobs.description,
      public_jobs.draft,
      public_jobs.id,
      public_jobs.jd_json,
      public_jobs.job_title,
      public_jobs.job_type,
      public_jobs.location_id,
      row_to_json(office_locations.*) AS location,
      public_jobs.parameter_weights,
      public_jobs.posted_by,
      public_jobs.recruiter_id,
      public_jobs.scoring_criteria_loading,
      public_jobs.status,
      public_jobs.workplace_type,
      public_jobs.hiring_manager,
      public_jobs.recruiter,
      public_jobs.recruiting_coordinator,
      public_jobs.sourcer,
      public_jobs.interview_coordinator,
      public_jobs.interview_plan_warning_ignore,
      public_jobs.interview_session_warning_ignore,
      public_jobs.remote_sync_time,
      public_jobs.is_pinned,
      (
        case
          when public_jobs.posted_by = 'Ashby'
          and integrations.ashby_key is not null then true
          when public_jobs.posted_by = 'Lever'
          and integrations.lever_key is not null then true
          when public_jobs.posted_by = 'Greenhouse'
          and integrations.greenhouse_key is not null then true
          else false
        end
      ) as syncable
    FROM
      (
        (
          public_jobs
          LEFT JOIN departments ON ((departments.id = public_jobs.department_id))
        )
        LEFT JOIN office_locations ON ((office_locations.id = public_jobs.location_id))
      )
      LEFT JOIN integrations ON (
        (
          integrations.recruiter_id = public_jobs.recruiter_id
        )
      )
  ),
  status_count_default_cte AS (
    SELECT
      job_cte_1.id,
      defaults.status
    FROM
      (
        (
          SELECT
            'new'::text AS status
          UNION
          SELECT
            'interview'::text AS status
          UNION
          SELECT
            'qualified'::text AS status
          UNION
          SELECT
            'disqualified'::text AS status
        ) defaults
        CROSS JOIN job_cte job_cte_1
      )
  ),
  status_count_cte AS (
    SELECT
      status_count_default_cte.id,
      status_count_default_cte.status,
      COALESCE(
        count(application_status_view_cte.status),
        (0)::bigint
      ) AS count
    FROM
      (
        status_count_default_cte
        LEFT JOIN application_status_view_cte ON (
          (
            (
              status_count_default_cte.id = application_status_view_cte.job_id
            )
            AND (
              status_count_default_cte.status = application_status_view_cte.status
            )
          )
        )
      )
    GROUP BY
      status_count_default_cte.id,
      status_count_default_cte.status
  ),
  job_section_count_cte AS (
    SELECT
      status_count_cte.id,
      json_object_agg(status_count_cte.status, status_count_cte.count) AS section_count
    FROM
      status_count_cte
    GROUP BY
      status_count_cte.id
  ),
  application_match_default_cte AS (
    SELECT
      job_cte_1.id,
      defaults.application_match
    FROM
      (
        (
          SELECT
            'top_match'::application_match AS application_match
          UNION
          SELECT
            'good_match'::application_match AS application_match
          UNION
          SELECT
            'average_match'::application_match AS application_match
          UNION
          SELECT
            'poor_match'::application_match AS application_match
          UNION
          SELECT
            'not_a_match'::application_match AS application_match
          UNION
          SELECT
            'unknown_match'::application_match AS application_match
        ) defaults
        CROSS JOIN job_cte job_cte_1
      )
  ),
  application_match_cte AS (
    SELECT
      application_match_default_cte.id,
      application_match_default_cte.application_match,
      COALESCE(
        count(application_status_view_cte.application_match),
        (0)::bigint
      ) AS count
    FROM
      (
        application_match_default_cte
        LEFT JOIN application_status_view_cte ON (
          (
            (
              application_match_default_cte.id = application_status_view_cte.job_id
            )
            AND (
              application_match_default_cte.application_match = application_status_view_cte.application_match
            )
          )
        )
      )
    GROUP BY
      application_match_default_cte.id,
      application_match_default_cte.application_match
  ),
  job_application_match_cte AS (
    SELECT
      application_match_cte.id,
      json_object_agg(
        application_match_cte.application_match,
        application_match_cte.count
      ) AS application_match
    FROM
      application_match_cte
    GROUP BY
      application_match_cte.id
  ),
  processing_count_default_cte AS (
    SELECT
      job_cte_1.id,
      defaults.resume_processing_state
    FROM
      (
        (
          SELECT
            'fetching'::resume_processing_state AS resume_processing_state
          UNION
          SELECT
            'unavailable'::resume_processing_state AS resume_processing_state
          UNION
          SELECT
            'processing'::resume_processing_state AS resume_processing_state
          UNION
          SELECT
            'processed'::resume_processing_state AS resume_processing_state
          UNION
          SELECT
            'unparsable'::resume_processing_state AS resume_processing_state
          UNION
          SELECT
            'unscorable'::resume_processing_state AS resume_processing_state
        ) defaults
        CROSS JOIN job_cte job_cte_1
      )
  ),
  processing_count_cte AS (
    SELECT
      processing_count_default_cte.id,
      processing_count_default_cte.resume_processing_state,
      COALESCE(
        count(
          application_status_view_cte.resume_processing_state
        ),
        (0)::bigint
      ) AS count
    FROM
      (
        processing_count_default_cte
        LEFT JOIN application_status_view_cte ON (
          (
            (
              processing_count_default_cte.id = application_status_view_cte.job_id
            )
            AND (
              processing_count_default_cte.resume_processing_state = application_status_view_cte.resume_processing_state
            )
          )
        )
      )
    GROUP BY
      processing_count_default_cte.id,
      processing_count_default_cte.resume_processing_state
  ),
  job_processing_count_cte AS (
    SELECT
      processing_count_cte.id,
      json_object_agg(
        processing_count_cte.resume_processing_state,
        processing_count_cte.count
      ) AS processing_count
    FROM
      processing_count_cte
    GROUP BY
      processing_count_cte.id
  )
SELECT
  job_cte.created_at,
  job_cte.department_id,
  job_cte.department,
  job_cte.description,
  job_cte.draft,
  job_cte.id,
  job_cte.jd_json,
  job_cte.job_title,
  job_cte.job_type,
  job_cte.location_id,
  job_cte.location,
  job_cte.parameter_weights,
  job_cte.posted_by,
  job_cte.recruiter_id,
  job_cte.scoring_criteria_loading,
  job_cte.status,
  job_cte.workplace_type,
  job_cte.hiring_manager,
  job_cte.recruiter,
  job_cte.recruiting_coordinator,
  job_cte.sourcer,
  job_cte.interview_coordinator,
  job_cte.interview_plan_warning_ignore,
  job_cte.interview_session_warning_ignore,
  job_cte.remote_sync_time,
  job_section_count_cte.section_count,
  job_processing_count_cte.processing_count,
  job_application_match_cte.application_match,
  job_cte.is_pinned,
  job_cte.syncable
FROM
  (
    (
      (
        job_cte
        LEFT JOIN job_section_count_cte ON ((job_section_count_cte.id = job_cte.id))
      )
      LEFT JOIN job_processing_count_cte ON ((job_processing_count_cte.id = job_cte.id))
    )
    LEFT JOIN job_application_match_cte ON ((job_application_match_cte.id = job_cte.id))
  );
