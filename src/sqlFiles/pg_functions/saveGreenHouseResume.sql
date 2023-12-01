CREATE OR REPLACE FUNCTION public.saveGreenHouseResume()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB;
    request_results JSONB;
    app_data RECORD;
BEGIN
    -- Initialize an empty JSON array for the results
    result := '[]'::JSONB;

    -- Loop through the selected application data
    FOR app_data IN (
       SELECT
           application_id AS application_id,
           resume AS resume
       FROM greenhouse_reference
       WHERE resume_saved = false and resume is not null
       ORDER BY created_at ASC
       LIMIT 50
    )
    LOOP
        -- Convert the row to JSON
        request_results := row_to_json(app_data);
        
        -- Make the HTTP request for each application data
        SELECT
            net.http_post(
                url := 'https://preprod.aglinthq.com/api/greenhouse/saveResume',
                body := request_results
            ) INTO request_results;

        -- UPDATE greenhouse_reference
        -- SET resume_saved = true
        -- WHERE application_id = app_data.application_id;
        
        -- Append the request result to the result array
        result := result || jsonb_build_object('request_result', request_results);
    END LOOP;


    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;


