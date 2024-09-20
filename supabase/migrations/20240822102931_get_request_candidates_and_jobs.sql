set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_requests_candidate_list(rec_id uuid)
 RETURNS TABLE(applications jsonb[], jobs jsonb[])
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY  
    WITH
      candidates_cte AS (
        SELECT
          a.id AS application_id,
          CONCAT(c.first_name, ' ', COALESCE(c.last_name, '')) AS candidate_name,
          pj.id,
          pj.job_title
        FROM
          public.applications a
          INNER JOIN public_jobs pj ON pj.id = a.job_id
          INNER JOIN public.candidates c ON a.candidate_id = c.id
          INNER JOIN public.request r ON a.id = r.application_id
        WHERE
          c.recruiter_id = get_requests_candidate_list.rec_id
      ),
      applications_cte AS (
        select distinct
          candidates_cte.application_id,
          candidates_cte.candidate_name
        from
          candidates_cte
      ),
      jobs_cte AS (
        select distinct
          candidates_cte.id,
          candidates_cte.job_title
        from
          candidates_cte
      ),
      applications as (
        select
          array_agg(
            json_build_object(
              'application_id',
              applications_cte.application_id,
              'candidate_name',
              applications_cte.candidate_name
            )
          )::jsonb[] as applications
        from
          applications_cte
      ),
      jobs as (
        select
          array_agg(
            json_build_object(
              'id',
              jobs_cte.id,
              'job_title',
              jobs_cte.job_title
            )
          )::jsonb[] as jobs
        from
          jobs_cte
      )
    select
      *
    from
      applications
      cross join jobs;
END;
$function$
;


