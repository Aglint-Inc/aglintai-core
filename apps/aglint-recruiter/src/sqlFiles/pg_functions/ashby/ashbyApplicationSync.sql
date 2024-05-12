CREATE OR REPLACE FUNCTION ashbyApplicationSync()
    RETURNS JSONB AS $$
DECLARE
    result JSONB := '[]'::JSONB;  -- Variable to store the result
    function_url TEXT;
    rec_id uuid;
    request_results JSONB;
BEGIN
    FOR rec_id IN (SELECT id FROM recruiter WHERE ashby_key IS NOT NULL)
    LOOP
        SELECT value INTO function_url FROM env WHERE name = 'ashby-application';

        request_results := net.http_post(
            url := function_url,
            body := jsonb_build_object('recruiter_id', rec_id::uuid)
        );
    END LOOP;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$$ LANGUAGE plpgsql;