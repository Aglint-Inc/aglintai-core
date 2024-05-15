CREATE OR REPLACE FUNCTION public.ashbyjobreference(rec_id UUID)
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
          app.ats_json AS ats_json,
          job.public_job_id AS job_id,
          job.recruiter_id AS recruiter_id,
          rec.ashby_key AS apikey 
       FROM application_reference app
       JOIN job_reference job ON (app.ats_json -> 'job'->>'id')::uuid = job.ats_job_id
       JOIN recruiter rec ON rec.id = job.recruiter_id
       WHERE app.is_processed = false AND rec.id = rec_id limit 25
    ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$;