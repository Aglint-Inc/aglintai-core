CREATE OR REPLACE FUNCTION public.batchsavegreenhouse()
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
           application_id AS application_id,
           resume AS resume
       FROM greenhouse_reference
       WHERE resume_saved = false and resume is not null
       ORDER BY created_at ASC
       LIMIT 100
    ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$;