CREATE OR REPLACE FUNCTION batchCalcResumeJDScore()
RETURNS JSONB AS $$
DECLARE
    result JSONB;
    request_results JSONB;
    app_id UUID;
BEGIN
    -- Initialize an empty JSON array for the results
    result := '[]'::JSONB;

    -- Loop through the selected application IDs
    FOR app_id IN (
        SELECT application_id
        FROM job_applications
        WHERE api_logs->>'scoreStatus' = 'not started'
        ORDER BY created_at ASC
        LIMIT 5
    )
    LOOP
        -- Make the HTTP request for each application_id
        SELECT
            net.http_post(
                url := 'https://us-central1-aglint-cloud-381414.cloudfunctions.net/resume-score-gen',
                body := jsonb_build_object('application_id', app_id)
            ) INTO request_results;

        -- Append the request result to the result array
        result := result || jsonb_build_object('request_result', request_results);
    END LOOP;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$$ LANGUAGE plpgsql;