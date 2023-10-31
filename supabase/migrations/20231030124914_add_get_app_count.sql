set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.getjobapplications(ids uuid[])
 RETURNS TABLE(job_id uuid, status text, count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
    SELECT ja.job_id, ja.status, count(*)
    FROM public.job_applications AS ja
    WHERE ja.job_id = ANY(ids)
    GROUP BY ja.job_id, ja.status
    ORDER BY ja.job_id, ja.status;
END;
$function$
;


