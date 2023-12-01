CREATE OR REPLACE FUNCTION public.secondretrybatchcalcresumejdscore()
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
           ja.application_id AS application_id,
           ja.candidate_id AS candidate_id,
           ja.jd_score AS jd_score,
           ja.resume AS resume,
           ja.json_resume AS json_resume,
           ja.resume_text AS resume_text,
           jsonb_build_object('description', pj.description, 'skills', pj.skills, 'job_title', pj.job_title) AS jd_json,
           2 as retry
       FROM job_applications ja
       JOIN public_jobs pj ON ja.job_id = pj.id
       WHERE ja.api_status in ('failed','processing')  and retry >= 1 and retry < 2
       ORDER BY ja.created_at ASC
       LIMIT 10
    )
    LOOP
        -- Convert the row to JSON
        request_results := row_to_json(app_data);
        
        -- Make the HTTP request for each application data
        SELECT
            net.http_post(
                url := 'https://northamerica-northeast2-aglint-cloud-381414.cloudfunctions.net/process_resume_and_jd_v1',
                body := request_results
            ) INTO request_results;

        UPDATE job_applications
            SET 
                processed_at = CURRENT_TIMESTAMP,
                retry = 2
            WHERE application_id = app_data.application_id;
        
        -- Append the request result to the result array
        result := result || jsonb_build_object('request_result', request_results);
    END LOOP;


    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;




