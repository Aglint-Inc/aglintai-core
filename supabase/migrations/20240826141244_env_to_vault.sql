set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.ashbyapplicationsync()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB := '[]'::JSONB;  -- Variable to store the result
    function_url TEXT;
    rec_id uuid;
    request_results JSONB;
    host text;
BEGIN

    SELECT decrypted_secret 
    INTO host
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';

    FOR rec_id IN (SELECT id FROM recruiter WHERE ashby_key IS NOT NULL)
    LOOP
        IF ashbyjobreference(rec_id) IS NOT NULL THEN
            request_results := net.http_post(
                url := concat(host,'/api/ashby/batchsave'),
                body := jsonb_build_object('recruiter_id', rec_id::uuid)
            );
        END IF;
    END LOOP;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.ashbysync()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    request_results JSONB;  -- Variable to store the HTTP request result
    function_url text;
    host text;
BEGIN
    SELECT decrypted_secret 
    INTO host
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';
    -- Make a single HTTP request for the aggregated data
   
    request_results := net.http_post(
        url := concat(host,'/api/ashby/cron')
        -- Add other parameters like headers or data if needed
    );
    -- Return the HTTP request result
    RETURN request_results;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.batchscorecron(function_value text)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    request_results JSONB;  -- Variable to store the HTTP request result
    function_url text;
    host text;
BEGIN
    SELECT decrypted_secret 
    INTO host
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';

    IF function_value = 'first' THEN
        -- Check if resumescorefirst() returns NULL
        IF batchcalcresumejdscore() IS NOT NULL THEN
            -- If not NULL, proceed with HTTP POST request
            request_results := net.http_post(
                url := concat(host,'/api/resumecron/batchscore'),
                body := jsonb_build_object('function', function_value)
                -- Optionally, add headers or other parameters if required
            );
        END IF;
    ELSIF function_value = 'second' THEN
        -- Check if resumescoresecond() returns NULL
        IF retrybatchcalcresumejdscore() IS NOT NULL THEN
            -- If not NULL, proceed with HTTP POST request
            request_results := net.http_post(
                url := concat(host,'/api/resumecron/batchscore'),
                body := jsonb_build_object('function', function_value)
                -- Optionally, add headers or other parameters if required
            );
        END IF;
    ELSIF function_value = 'third' THEN
        -- Check if resumescoresecond() returns NULL
        IF secondretrybatchcalcresumejdscore() IS NOT NULL THEN
            -- If not NULL, proceed with HTTP POST request
            request_results := net.http_post(
                url := concat(host,'/api/resumecron/batchscore'),
                body := jsonb_build_object('function', function_value)
                -- Optionally, add headers or other parameters if required
            );
        END IF;
    END IF;
    RETURN request_results;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.batchtriggergreenhouse()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$DECLARE
    request_results JSONB;  -- Variable to store the HTTP request result
    host text;
BEGIN

    SELECT decrypted_secret 
    INTO host
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';

    IF exists( SELECT
           id AS application_id
       FROM applications
       WHERE is_resume_fetching
       ORDER BY created_at ASC ) THEN
        request_results := net.http_post(
        url :=  concat(host,'/api/greenhouse/batchsave')
            -- Add other parameters like headers or data if needed
        );
    END IF;
    
    RETURN request_results;
END;$function$
;

CREATE OR REPLACE FUNCTION public.emailcroncandidatedb()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB := '[]'::JSONB;  -- Variable to store the result
    function_url TEXT;
    request_results JSONB;
    outreach_emails jsonb[];
    host text;
BEGIN

    SELECT decrypted_secret 
    INTO host
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';

    -- Call the getoutreachemails function to retrieve outreach emails
    outreach_emails := emailHandlerCandidateDb();

    -- Check if there are any outreach emails to process
    IF array_length(outreach_emails, 1) IS NOT NULL THEN
        -- Retrieve the function URL from the 'env' table
        SELECT value INTO function_url FROM env WHERE name = 'email-handler-candidatedb';

        -- Send a single POST request with the entire array as the body
        request_results := net.http_post(
            url := concat(host,'/api/candidatedb/cron-email-sender'),
            body := to_jsonb(outreach_emails)
        );

        -- Update the result variable with the response from the POST request
        result := result || request_results;
    END IF;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.levercandidatesync()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
    DECLARE
        result JSONB;
        request_results JSONB;
        app_id UUID;
        function_url TEXT;
        host text;
    BEGIN

         SELECT decrypted_secret 
         INTO host
         FROM vault.decrypted_secrets 
         WHERE name = 'APP_URL';

        -- Initialize an empty JSON array for the results
        result := '[]'::JSONB;

        -- Loop through the selected application IDs
        FOR app_id IN (
            SELECT job_id
            FROM lever_job_reference
            ORDER BY created_at ASC
        )
        LOOP
            SELECT
                net.http_post(
                    url := concat(host,'/api/lever/candidateSync'),
                    body := jsonb_build_object('job_id', app_id)
                ) INTO request_results;

            -- Append the request result to the result array
            result := result || jsonb_build_object('request_result', request_results);
        END LOOP;

        -- Return the final result as a JSONB array
        RETURN result;
    END;
    $function$
;

CREATE OR REPLACE FUNCTION public.outreachhandler()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB := '[]'::JSONB;  -- Variable to store the result
    function_url TEXT;
    request_results JSONB;
    outreach_emails jsonb[];
    host text;
BEGIN

    SELECT decrypted_secret 
    INTO host
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';
    -- Call the getoutreachemails function to retrieve outreach emails
    outreach_emails := getoutreachemails();

    -- Check if there are any outreach emails to process
    IF array_length(outreach_emails, 1) IS NOT NULL THEN
        -- Retrieve the function URL from the 'env' table
        SELECT value INTO function_url FROM env WHERE name = 'outreach-handler';

        -- Send a single POST request with the entire array as the body
        request_results := net.http_post(
            url := concat(host,'/api/ashby/batchsave'),
            body := to_jsonb(outreach_emails)
        );

        -- Update the result variable with the response from the POST request
        result := result || request_results;
    END IF;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.overviewgenerate()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    aggregated_data JSONB;  -- Variable to store the aggregated JSON data
    request_results JSONB;  -- Variable to store the HTTP request result
    function_url text;
    host text;
BEGIN

    SELECT decrypted_secret 
    INTO host
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';
    -- Aggregate the selected application data into a JSON array
    SELECT json_agg(row_to_json(test)) 
    INTO aggregated_data  -- Store the result into aggregated_data
    FROM (
        SELECT
            id as file_id,
            resume_json
        FROM candidate_files
        WHERE resume_json IS NOT NULL  AND resume_json->>'basics' IS NOT NULL AND resume_json->>'positions' IS NOT NULL  AND resume_json->>'skills' IS NOT NULL AND resume_json->>'overview' IS NULL 
        ORDER BY created_at DESC
        LIMIT 50
    ) as test;

    IF aggregated_data IS NULL THEN
        RETURN '{"message": "No records found"}';
    END IF;

    
    SELECT value INTO function_url FROM env WHERE name = 'overview-handler';
    -- Make a single HTTP request for the aggregated data
    SELECT
        net.http_post(
            url := concat(host,'/api/google/overview-handler'),
            body := aggregated_data  -- Use aggregated_data here
        ) INTO request_results;

    -- Return the HTTP request result
    RETURN request_results;
END;
$function$
;


DROP FUNCTION IF EXISTS public.greenhousecandidatesync();

select cron.unschedule('greenhouse_candidate_sync');

select cron.unschedule('scheduler_cron_trigger');

