CREATE
OR REPLACE FUNCTION public.batchtriggergreenhouse () RETURNS jsonb LANGUAGE plpgsql AS $function$DECLARE
    request_results JSONB;  -- Variable to store the HTTP request result
    host text;
BEGIN

    SELECT decrypted_secret 
    INTO host
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';

    IF exists( 
      SELECT
        id AS application_id
       FROM applications
       WHERE is_resume_fetching AND source='greenhouse'
       ORDER BY created_at ASC ) THEN
        request_results := net.http_post(
        url :=  concat(host,'/api/greenhouse/batchsave')
            -- Add other parameters like headers or data if needed
        );
    END IF;
    
    RETURN request_results;
END;$function$;