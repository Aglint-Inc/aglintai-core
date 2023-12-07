CREATE OR REPLACE FUNCTION public.batchscorecron(
    function_value text  -- Parameter for the "function" value
) RETURNS jsonb LANGUAGE plpgsql AS $function$
DECLARE
    request_results JSONB;  -- Variable to store the HTTP request result
    function_url text;
BEGIN
    -- Retrieve the URL from the environment variable
    SELECT value INTO function_url FROM env WHERE name = 'resumecron-batchscore';
    -- Make an HTTP POST request
     request_results := net.http_post(
            url := function_url,
            body := jsonb_build_object('function', function_value)
            -- Optionally, add headers or other parameters if required
    );
    -- Return the HTTP request result
    RETURN request_results;
END;
$function$;