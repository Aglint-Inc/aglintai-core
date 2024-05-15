CREATE OR REPLACE FUNCTION public.batchcalcresumejdscore()
 RETURNS jsonb[]  -- Change the return type to jsonb[]
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB[];
BEGIN
    -- Initialize an empty JSONB array for the results
    result := ARRAY[]::JSONB[];

    -- Select up to 50 records that meet the specified conditions
    SELECT ARRAY_AGG(row_to_json(data))
    INTO result
    FROM (
        SELECT
           ja.application_id AS application_id,
           ja.candidate_id AS candidate_id,
           ja.jd_score AS jd_score,
           ja.resume AS resume,
           ja.json_resume AS json_resume,
           ja.resume_text AS resume_text,
           ja.job_id as job_id,
           pj.company as company,
           pj.jd_json as jd_json,
           0 as retry
       FROM job_applications ja
       JOIN public_jobs pj ON ja.job_id = pj.id
       WHERE ja.api_status='not started' and ja.resume is not null  and pj.jd_json is not null
       ORDER BY ja.created_at ASC
       LIMIT 50
    ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$;