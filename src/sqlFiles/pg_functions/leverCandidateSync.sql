    CREATE OR REPLACE FUNCTION leverCandidateSync()
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
            SELECT job_id
            FROM lever_job_reference
            ORDER BY created_at ASC
        )
        LOOP
            -- Make the HTTP request for each application_id
            SELECT
                net.http_post(
                    url := 'https://preprod.aglinthq.com/api/lever/candidateSync',
                    body := jsonb_build_object('job_id', app_id)
                ) INTO request_results;

            -- Append the request result to the result array
            result := result || jsonb_build_object('request_result', request_results);
        END LOOP;

        -- Return the final result as a JSONB array
        RETURN result;
    END;
    $$ LANGUAGE plpgsql;


SELECT cron.schedule (
    'lever_candidate_sync',
    '0 7 * * *', -- Run at 7:00 AM PT
    $$
    SELECT leverCandidateSync();
    $$
);



select leverCandidateSync();