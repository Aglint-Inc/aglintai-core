CREATE OR REPLACE FUNCTION public.lever_resume_save()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    rec_id uuid;
    app_id uuid;
    request_results JSONB;
    function_url TEXT;
BEGIN

    FOR rec_id IN 
        SELECT recruiter_id 
        FROM integrations 
        JOIN recruiter ON recruiter.id = integrations.recruiter_id 
        WHERE integrations.lever_key IS NOT NULL
    LOOP
        SELECT decrypted_secret 
        INTO function_url
        FROM vault.decrypted_secrets 
        WHERE name = 'APP_URL';

        FOR app_id IN 
            SELECT applications.id 
            FROM applications 
            JOIN public_jobs ON public_jobs.id = applications.job_id 
            WHERE public_jobs.posted_by = 'Lever' 
            AND applications.is_resume_fetching = TRUE 
            AND applications.processing_status <> 'failed' LIMIT 10
        LOOP
            request_results := net.http_post(
                url := concat(function_url,'/api/lever/saveResume' ),
                body := jsonb_build_object('application_id', app_id),
                headers := jsonb_build_object('Content-Type', 'application/json')
            );
            RAISE NOTICE 'HTTP request result for application_id %: %', app_id, request_results;
        END LOOP;

    END LOOP;
END $function$
;