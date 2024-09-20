set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_filtered_job_ids(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[])
 RETURNS SETOF uuid
 LANGUAGE plpgsql
AS $function$
DECLARE
  departments_length numeric;
  jobs_length numeric;
BEGIN
  departments_length := coalesce(
    array_length(get_filtered_job_ids.departments, 1),
    0
  );
  jobs_length := coalesce(array_length(get_filtered_job_ids.jobs, 1), 0);
  RETURN QUERY
    WITH
      department_jobs AS (
        SELECT
          public_jobs.id
        FROM
          public_jobs
        WHERE
          (
            (
              departments_length = 0
              AND jobs_length = 0
            )
            OR (public_jobs.department_id = ANY (departments))
          )
          AND public_jobs.recruiter_id = get_filtered_job_ids.recruiter_id
      ),
      all_jobs AS (
        SELECT
          department_jobs.id
        FROM
          department_jobs
        UNION
        SELECT
          unnest(COALESCE(jobs, ARRAY[]::uuid[]))
      )
    SELECT
      id
    FROM
      all_jobs;
  END;
$function$
;

