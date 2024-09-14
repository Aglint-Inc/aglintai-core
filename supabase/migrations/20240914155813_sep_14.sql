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

CREATE OR REPLACE FUNCTION public.calculate_experience(start_time jsonb, end_time jsonb)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
    start_year INTEGER;
    start_month INTEGER;
    end_year INTEGER;
    end_month INTEGER;
    current_year INTEGER;
    current_month INTEGER;
    total_months INTEGER;
BEGIN
    -- Extract the start year and month
    start_year := (start_time->>'year')::INTEGER;
    start_month := (start_time->>'month')::INTEGER;

    -- If start year or month is 0, return 0 experience
    IF start_year is null OR start_month is null THEN
        RETURN 0;
    END IF;

    -- Extract the end year and month
    end_year := (end_time->>'year')::INTEGER;
    end_month := (end_time->>'month')::INTEGER;

    -- If end year or month is 0, use the current date
    IF end_year is null OR end_month is null THEN
        SELECT EXTRACT(YEAR FROM CURRENT_DATE), EXTRACT(MONTH FROM CURRENT_DATE)
        INTO current_year, current_month;
        end_year := current_year;
        end_month := current_month;
    END IF;

    -- Calculate total experience in months
    total_months := (end_year - start_year) * 12 + (end_month - start_month);

    -- Return the total experience
    RETURN total_months;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.candidate_exp_analytic(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], locations numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], start_datetime timestamp with time zone DEFAULT NULL::timestamp with time zone, end_datetime timestamp with time zone DEFAULT now())
 RETURNS TABLE(app_id uuid, total_exp bigint, count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY select position_list.app_id
    , SUM(calculate_experience(position->'start',position->'end')) as total_exp
    , count(*) as count
    from (
        select 
        applications.id as app_id,
        jsonb_array_elements(candidate_files.resume_json->'positions') as position
        FROM applications
        JOIN candidate_files ON applications.candidate_file_id = candidate_files.id
        JOIN public_jobs ON applications.job_id = public_jobs.id
        where  public_jobs.recruiter_id = candidate_exp_analytic.recruiter_id
            AND (CARDINALITY(departments) = 0 OR public_jobs.department_id = ANY(departments))
            AND (CARDINALITY(locations) = 0 OR public_jobs.location_id = ANY(locations))
            AND (CARDINALITY(jobs) = 0 OR public_jobs.id = ANY(jobs))
            AND (start_datetime IS NULL OR applications.created_at >= start_datetime)
            AND applications.created_at <= end_datetime
    ) AS position_list 
    where
    position_list.position->'start'->>'month' is not null
    AND position_list.position->'end'->>'month' is not null
    GROUP BY position_list.app_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.candidate_skills_analysis(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], locations numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], start_datetime timestamp with time zone DEFAULT NULL::timestamp with time zone, end_datetime timestamp with time zone DEFAULT now())
 RETURNS TABLE(skill text, frequency bigint)
 LANGUAGE plpgsql
AS $function$
  BEGIN
    RETURN QUERY SELECT skill_list.skill
      , COUNT(*) AS frequency
      FROM (
          SELECT jsonb_array_elements_text(candidate_files.resume_json -> 'skills') AS skill
          FROM candidates
            JOIN candidate_files ON candidates.id = candidate_files.candidate_id
            JOIN applications ON applications.candidate_id = candidates.id
            JOIN public_jobs ON public_jobs.id = applications.job_id
          WHERE candidate_files.resume_json -> 'skills' IS NOT NULL
            AND public_jobs.recruiter_id = candidate_skills_analysis.recruiter_id
            AND (CARDINALITY(departments) = 0 OR public_jobs.department_id = ANY(departments))
            AND (CARDINALITY(locations) = 0 OR public_jobs.location_id = ANY(locations))
            AND (CARDINALITY(jobs) = 0 OR applications.job_id = ANY(jobs))
            AND (start_datetime IS NULL OR applications.created_at >= start_datetime)
            AND applications.created_at <= end_datetime
      ) AS skill_list
      GROUP BY skill_list.skill ORDER BY frequency DESC;
  END;
  $function$
;

CREATE OR REPLACE FUNCTION public.check_user_auth()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    rec RECORD;
    response text;
    host text;
BEGIN

    SELECT decrypted_secret 
    INTO host
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';

    FOR rec IN
        SELECT id
        FROM public.recruiter
    LOOP

        -- Make the HTTP POST request
        response := (
            SELECT content
            FROM http_post(
                concat(host,'/api/scheduling/calendar_check_recruiter'),
                json_build_object('recruiter_id', rec.id)::text,
                'application/json'
            )
        );
        
        RAISE NOTICE 'User ID: %, Response: %', rec.id, response;
        BEGIN
        EXCEPTION
            WHEN others THEN
                RAISE NOTICE 'Response is not valid JSON for User ID: %', user_record.user_id;
        END;
    END LOOP;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.count_requests()
 RETURNS TABLE(date text, created_at_count bigint, completed_at_count bigint, on_progress_count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        to_char(dates.date, 'DD-MM-YYYY') AS date,
        COUNT(r.id) FILTER (WHERE r.created_at::date = dates.date) AS created_at_count,
        COUNT(r.id) FILTER (WHERE r.completed_at::date = dates.date) AS completed_at_count,
        COUNT(r.id) FILTER (WHERE r.status = 'in_progress' AND r.created_at::date <= dates.date AND (r.completed_at::date IS NULL OR r.completed_at::date > dates.date)) AS on_progress_count
    FROM 
        (
            SELECT DISTINCT created_at::date AS date FROM public.request WHERE created_at IS NOT NULL
            UNION
            SELECT DISTINCT completed_at::date AS date FROM public.request WHERE completed_at IS NOT NULL
        ) AS dates
    LEFT JOIN 
        public.request r ON r.created_at::date = dates.date OR r.completed_at::date = dates.date
    WHERE 
        dates.date IS NOT NULL
    GROUP BY 
        dates.date
    ORDER BY 
        dates.date ASC;

END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_interview_meeting_log()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    temp_column_name TEXT;
    old_value TEXT;
    new_value TEXT;
    query TEXT;
    delta_json jsonb = '{}'::jsonb;
BEGIN
    -- Iterate over the columns
    FOREACH temp_column_name IN ARRAY ARRAY['status', 'start_time', 'end_time', 'organizer_id', 'meeting_flow', 'delta']
    LOOP
        -- Dynamically construct the query to handle different data types
        old_value := COALESCE(row_to_json(OLD)->>temp_column_name, 'null');
        new_value := COALESCE(row_to_json(NEW)->>temp_column_name, 'null');
        -- insert log if values have changed
        IF old_value IS DISTINCT FROM new_value THEN
            delta_json := delta_json || jsonb_build_object(temp_column_name, new_value); 
        END IF;
    END LOOP;

    INSERT INTO public.interview_meeting_log (
        meeting_id
        , status
        , start_time
        , end_time
        , organizer_id
        , meeting_flow
        , delta
        )
        VALUES (
            OLD.id
            , OLD.status
            , OLD.start_time
            , OLD.end_time
            , OLD.organizer_id
            , OLD.meeting_flow
            , delta_json
        );  
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_request_meeting_log()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    temp_column_name TEXT;
    old_value TEXT;
    new_value TEXT;
    query TEXT;
    delta_json jsonb = '{}'::jsonb;
BEGIN
    -- Iterate over the columns
    FOREACH temp_column_name IN ARRAY ARRAY['assignee_id', 'status', 'type', 'priority']
    LOOP
        -- Dynamically construct the query to handle different data types
        old_value := COALESCE(row_to_json(OLD)->>temp_column_name, 'null');
        new_value := COALESCE(row_to_json(NEW)->>temp_column_name, 'null');
        -- insert log if values have changed
        IF old_value IS DISTINCT FROM new_value THEN
            delta_json := delta_json || jsonb_build_object(temp_column_name, old_value); 
        END IF;
    END LOOP;

    INSERT INTO public.request_log (
        request_id
        , assignee_id
        , status
        , type
        , priority  
        , delta
        )
        VALUES (
            NEW.id
            , NEW.assignee_id
            , NEW.status
            , NEW.type
            , NEW.priority
            , delta_json
        );  
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_session_request(application uuid DEFAULT NULL::uuid, sessions uuid[] DEFAULT '{}'::uuid[], request jsonb DEFAULT NULL::jsonb)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
DECLARE
    request_id uuid;
    session_id uuid;
BEGIN
  IF application IS NOT NULL
  AND request IS NOT NULL
  AND request ->> 'assigner_id' IS NOT NULL
  AND request ->> 'assignee_id' IS NOT NULL 
  THEN
    INSERT INTO
      request (
        application_id,
        assigner_id,
        assignee_id,
        title,
        type,
        status,
        priority,
        schedule_end_date,
        schedule_start_date
      )
    VALUES
      (
        application,
        (request ->> 'assigner_id')::uuid,
        (request ->> 'assignee_id')::uuid,
        COALESCE(request ->> 'title', 'New request'),
        COALESCE(request ->> 'type', 'schedule_request'),
        COALESCE(request ->> 'status', 'to_do'),
        COALESCE(request ->> 'priority', 'standard'),
        COALESCE(request ->> 'schedule_end_date', NULL)::timestamp with time zone,
        COALESCE(request ->> 'schedule_start_date', NULL)::timestamp with time zone
      )
    RETURNING
      id INTO request_id;
    IF request_id IS NOT NULL AND request ->> 'note' IS NOT NULL AND TRIM(request ->> 'note') <> '' 
    THEN
      INSERT INTO
        request_note (request_id, note)
      VALUES
        (request_id, request ->> 'note');
    END IF;
    IF request_id IS NOT NULL AND array_length(sessions, 1) > 0 
    THEN 
      FOR session_id IN
        SELECT
          UNNEST(sessions) 
        LOOP
          INSERT INTO
            request_relation (request_id, session_id)
          VALUES
            (request_id, session_id);
        END LOOP;
    END IF;
  END IF;
  RETURN request_id;
END;
$function$
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

CREATE OR REPLACE FUNCTION public.expire_new_requests()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
begin
  UPDATE request
  SET is_new = false
  WHERE is_new = true AND created_at < now() - interval '6 hours';
end;
$function$
;

CREATE OR REPLACE FUNCTION public.get_all_interviewers(recruiter_id_param uuid, start_time_param timestamp with time zone, end_time_param timestamp with time zone, department_ids_params integer[], office_location_ids_params integer[], job_ids_params uuid[], module_ids_params uuid[])
 RETURNS TABLE(user_id uuid, first_name text, last_name text, email text, profile_image text, "position" text, schedule_auth jsonb, scheduling_settings jsonb, status text, department_id integer, office_location_id integer, recruiter_id uuid, is_calendar_connected boolean, upcoming_meeting_count bigint, completed_meeting_count bigint, completed_meetings jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        ru.user_id,
        ru.first_name,
        ru.last_name,
        ru.email,
        ru.profile_image,
        ru."position",
        ru.schedule_auth,
        ru.scheduling_settings,
        ru.status,
        ru.department_id,
        ru.office_location_id,
        recrel.recruiter_id,
        ru.is_calendar_connected,
        (SELECT count(*) FROM interview_session_relation intsesrel
            JOIN interview_session intses ON intses.id = intsesrel.session_id
            JOIN interview_meeting intm ON intm.id = intses.meeting_id
            JOIN interview_module_relation intmodrel_1 ON intmodrel_1.id = intsesrel.interview_module_relation_id
            WHERE (intmodrel_1.user_id = ru.user_id OR intsesrel.user_id = ru.user_id)
            AND intm.status = 'confirmed' 
            AND intm.start_time >= start_time_param 
            AND intm.start_time < end_time_param
            AND intsesrel.is_confirmed = true) AS upcoming_meeting_count,
        (SELECT count(*) FROM interview_session_relation intsesrel
            JOIN interview_session intses ON intses.id = intsesrel.session_id
            JOIN interview_meeting intm ON intm.id = intses.meeting_id
            JOIN interview_module_relation intmodrel_1 ON intmodrel_1.id = intsesrel.interview_module_relation_id
            WHERE (intmodrel_1.user_id = ru.user_id OR intsesrel.user_id = ru.user_id)
            AND intm.status = 'completed' 
            AND intm.start_time >= start_time_param 
            AND intm.start_time < end_time_param
            AND intsesrel.is_confirmed = true) AS completed_meeting_count,
        (SELECT jsonb_object_agg(daily_counts.day, daily_counts.meeting_count)
            FROM (SELECT date_trunc('day', intm.start_time) AS day, count(*) AS meeting_count
                FROM interview_session_relation intsesrel
                JOIN interview_session intses ON intses.id = intsesrel.session_id
                JOIN interview_meeting intm ON intm.id = intses.meeting_id
                JOIN interview_module_relation intmodrel_1 ON intmodrel_1.id = intsesrel.interview_module_relation_id
                WHERE (intmodrel_1.user_id = ru.user_id OR intsesrel.user_id = ru.user_id)
                AND intm.status = 'completed' 
                AND intsesrel.is_confirmed = true 
                AND intm.start_time >= start_time_param 
                AND intm.start_time < end_time_param
                GROUP BY date_trunc('day', intm.start_time)) daily_counts) AS completed_meetings
    FROM recruiter_user ru
    LEFT JOIN recruiter_relation recrel ON recrel.user_id = ru.user_id
    LEFT JOIN interview_module_relation intmodrel ON intmodrel.user_id = ru.user_id
    LEFT JOIN interview_module intmod ON intmod.id = intmodrel.module_id
    WHERE recrel.recruiter_id = recruiter_id_param
    AND (department_ids_params IS NULL OR department_ids_params = '{}' OR ru.department_id = ANY(department_ids_params))
    AND (office_location_ids_params IS NULL OR office_location_ids_params = '{}' OR ru.office_location_id = ANY(office_location_ids_params))
    AND (
        job_ids_params IS NULL OR job_ids_params = '{}' OR EXISTS (
            SELECT 1
            FROM (
                SELECT COALESCE(array_agg(DISTINCT interview_plan.job_id), array[]::uuid[]) AS user_job_ids
                FROM interview_session_relation
                LEFT JOIN interview_module_relation ON interview_session_relation.interview_module_relation_id = interview_module_relation.id
                LEFT JOIN recruiter_user ON interview_module_relation.user_id = recruiter_user.user_id
                LEFT JOIN recruiter_user debrief_user ON interview_session_relation.user_id = recruiter_user.user_id
                LEFT JOIN interview_session ON interview_session.id = interview_session_relation.session_id
                LEFT JOIN interview_plan ON interview_plan.id = interview_session.interview_plan_id
                WHERE interview_plan.job_id IS NOT NULL
                AND (ru.user_id = recruiter_user.user_id OR ru.user_id = debrief_user.user_id)
            ) AS job_ids_subquery
            WHERE job_ids_subquery.user_job_ids && job_ids_params
        )
    )
    AND (
        module_ids_params IS NULL OR module_ids_params = '{}' OR EXISTS (
            SELECT 1
            FROM (
                SELECT COALESCE(array_agg(DISTINCT interview_module.id), array[]::uuid[]) AS user_module_ids
                FROM interview_session_relation
                LEFT JOIN interview_module_relation ON interview_session_relation.interview_module_relation_id = interview_module_relation.id
                LEFT JOIN recruiter_user ON interview_module_relation.user_id = recruiter_user.user_id
                LEFT JOIN recruiter_user debrief_user ON interview_session_relation.user_id = recruiter_user.user_id
                LEFT JOIN interview_session ON interview_session.id = interview_session_relation.session_id
                LEFT JOIN interview_module ON interview_module.id = interview_session.module_id
                WHERE (ru.user_id = recruiter_user.user_id OR ru.user_id = debrief_user.user_id)
            ) AS module_ids_subquery
            WHERE module_ids_subquery.user_module_ids && module_ids_params
        )
    )
    GROUP BY ru.user_id, recrel.recruiter_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_completed_requests_candidate_list(rec_id uuid)
 RETURNS TABLE(applications jsonb[], jobs jsonb[], assignerlist jsonb[], assigneelist jsonb[])
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY  
    WITH candidates_cte AS (
        SELECT DISTINCT
            a.id AS application_id,
            CONCAT(c.first_name, ' ', COALESCE(c.last_name, '')) AS candidate_name,
            pj.id AS job_id,
            pj.job_title,
            r.assigner_id,
            r.assignee_id,
            CONCAT(ru_assigner.first_name, ' ', COALESCE(ru_assigner.last_name,'')) AS assigner_name,
            CONCAT(ru_assignee.first_name, ' ', COALESCE(ru_assignee.last_name,'')) AS assignee_name
        FROM
            public.applications a
            INNER JOIN public.public_jobs pj ON pj.id = a.job_id
            INNER JOIN public.candidates c ON a.candidate_id = c.id
            INNER JOIN public.request r ON a.id = r.application_id
            LEFT JOIN public.recruiter_user ru_assigner ON r.assigner_id = ru_assigner.user_id
            LEFT JOIN public.recruiter_user ru_assignee ON r.assignee_id = ru_assignee.user_id
        WHERE
            c.recruiter_id = rec_id
            AND r.status = 'completed'
    ),
    applications AS (
        SELECT
            array_agg(
                DISTINCT jsonb_build_object(
                    'application_id', application_id,
                    'candidate_name', candidate_name
                )
            )::jsonb[] AS applications
        FROM
            candidates_cte
    ),
    jobs AS (
        SELECT
            array_agg(
                DISTINCT jsonb_build_object(
                    'job_id', job_id,
                    'job_title', job_title
                )
            )::jsonb[] AS jobs
        FROM
            candidates_cte
    ),
    assignerList AS (
        SELECT
            array_agg(
                DISTINCT jsonb_build_object(
                    'id', assigner_id,
                    'name', assigner_name
                )
            )::jsonb[] AS assignerList
        FROM
            candidates_cte
    ),
    assigneeList AS (
        SELECT
            array_agg(
                DISTINCT jsonb_build_object(
                    'id', assignee_id,
                    'name', assignee_name
                )
            )::jsonb[] AS assigneeList
        FROM
            candidates_cte
    )
    
    SELECT
        applications.applications,
        jobs.jobs,
        assignerList.assignerList,
        assigneeList.assigneeList
    FROM
        applications, jobs, assignerList, assigneeList;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_filtered_job_ids(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[])
 RETURNS SETOF uuid
 LANGUAGE plpgsql
AS $function$
DECLARE
  departments_length numeric;
  jobs_length numeric;
BEGIN
  departments_length := coalesce(
    array_length(get_filtered_job_ids.departments, 1),
    0
  );
  jobs_length := coalesce(array_length(get_filtered_job_ids.jobs, 1), 0);
  RETURN QUERY
    WITH
      department_jobs AS (
        SELECT
          public_jobs.id
        FROM
          public_jobs
        WHERE
          (
            (
              departments_length = 0
              AND jobs_length = 0
            )
            OR (public_jobs.department_id = ANY (departments))
          )
          AND public_jobs.recruiter_id = get_filtered_job_ids.recruiter_id
      ),
      all_jobs AS (
        SELECT
          department_jobs.id
        FROM
          department_jobs
        UNION
        SELECT
          unnest(COALESCE(jobs, ARRAY[]::uuid[]))
      )
    SELECT
      id
    FROM
      all_jobs;
  END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_session_data(session_ids uuid[], company_id uuid, meet_start_date timestamp without time zone, meet_end_date timestamp without time zone)
 RETURNS TABLE(interview_sessions jsonb[], interviewers jsonb[], service_cred text, interview_modules jsonb[], comp_schedule_setting jsonb, int_meetings jsonb[])
 LANGUAGE plpgsql
AS $function$DECLARE
  session_record interview_session;
  interviewers jsonb[] := '{}'::jsonb[]; 
BEGIN
  -- Open cursor to fetch interview sessions (consider error handling)
  FOR session_record IN
    SELECT *
    FROM interview_session AS int_sess
    WHERE int_sess.id = any(session_ids)
  LOOP
    -- Append each session as JSONB directly to interview_sessions
    interview_sessions := interview_sessions || ROW_TO_JSON(session_record)::jsonb;

 IF session_record.session_type = 'debrief' THEN
     interviewers := interviewers || (
      SELECT jsonb_agg(jsonb_build_object(
      'user_id', rec_user.user_id,
      'first_name', rec_user.first_name,
      'position', rec_user.position,
      'last_name', rec_user.last_name,
      'scheduling_settings', rec_user.scheduling_settings,
      'schedule_auth', rec_user.schedule_auth,
      'profile_image', rec_user.profile_image,       
      'email', rec_user.email,
      'session_id', sess_reln.session_id,
      'training_type', sess_reln.training_type,
      'interviewer_type', sess_reln.interviewer_type,
      'session_relation_id',sess_reln.id,
      'pause_json', null,
      'interview_module_relation_id', null
      )) 
        FROM recruiter_user rec_user
        LEFT JOIN interview_session_relation sess_reln ON sess_reln.user_id = rec_user.user_id
        WHERE sess_reln.session_id = session_record.id
      );
    ELSE
      interviewers := interviewers || (
        SELECT jsonb_agg(jsonb_build_object(
          'user_id', recruiter_user.user_id,
        'first_name', recruiter_user.first_name,
        'last_name', recruiter_user.last_name,
        'position', recruiter_user.position,
        'scheduling_settings',recruiter_user.scheduling_settings,
        'schedule_auth',recruiter_user.schedule_auth,
        'profile_image',recruiter_user.profile_image,       
        'email',recruiter_user.email,
        'session_id',session_record.id,
        'session_relation_id',sess_reln.id,
        'training_type',sess_reln.training_type,
        'interviewer_type', sess_reln.interviewer_type,
        'pause_json',interview_module_relation.pause_json,
        'interview_module_relation_id',sess_reln.interview_module_relation_id
        ))
        FROM interview_session_relation sess_reln
        LEFT JOIN interview_module_relation ON sess_reln.interview_module_relation_id = interview_module_relation.id
        LEFT JOIN recruiter_user ON interview_module_relation.user_id = recruiter_user.user_id
        WHERE sess_reln.session_id = session_record.id
      );
    END IF;

    interview_modules := interview_modules||(select jsonb_agg(interview_module.*) from interview_module where  interview_module.id=session_record.module_id);

  END LOOP;

  IF meet_start_date IS NOT NULL THEN
    SELECT ARRAY(select 
      jsonb_build_object(
            'meeting_start_time', interview_meeting.start_time,
            'meeting_id', interview_meeting.id,
            'int_session_id', interview_session.id,
            'meeting_duration', interview_session.session_duration,
            'interv_user_id', interview_module_relation.user_id  
        )
     from 
      interview_module_relation
      right join interview_session_relation on interview_session_relation.interview_module_relation_id=interview_module_relation.id
      right join interview_session on interview_session.id = interview_session_relation.session_id
      left join interview_meeting on interview_meeting.id = interview_session.meeting_id
      where interview_module_relation.user_id = any(select interview_module_relation.user_id from 
      interview_module_relation
      right join interview_session_relation on interview_session_relation.interview_module_relation_id=interview_module_relation.id
      where interview_session_relation.session_id = any(session_ids) 
    ) and interview_session_relation.is_confirmed=true and interview_meeting.status in ('confirmed','completed')) INTO int_meetings;
  END IF ;

  SELECT INTO service_cred integr.service_json
      FROM recruiter r
      JOIN integrations integr ON integr.recruiter_id = r.id
      WHERE r.id = company_id; 
  
  SELECT scheduling_settings INTO comp_schedule_setting
  FROM recruiter
  WHERE id = company_id;


  -- Return the interview_sessions and interviewers arrays
  RETURN QUERY SELECT interview_sessions, interviewers, service_cred, interview_modules, comp_schedule_setting, coalesce(int_meetings,Array[]::jsonb[]);
END;$function$
;

CREATE OR REPLACE FUNCTION public.get_request_count_stats(assigner_id uuid)
 RETURNS TABLE(date date, counts json)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  with count_cte as (
    select 
      request.created_at::date as count_date,
      request.type,
      request.status,
      request.priority,
      count(*) as count
    from
      request
    where 
      request.assigner_id = get_request_count_stats.assigner_id
    group by
      count_date, request.type, request.status, request.priority
  ), date_series as (
      select 
        generate_series(
          greatest((now() - '30 days'::interval)::date, (SELECT min(count_date) FROM count_cte)),
          now()::date, 
          '1 day'::interval
        )::date as date
  ), status_cte as (
    select 'to_do' as placeholder_status
    union
    select 'in_progress' as placeholder_status
    union
    select 'blocked' as placeholder_status
    union
    select 'completed' as placeholder_status
  ), type_cte as (
    select 'schedule_request' as placeholder_type
    union
    select 'cancel_schedule_request' as placeholder_type
    union
    select 'reschedule_request' as placeholder_type
    union
    select 'decline_request' as placeholder_type
  ), priority_cte as (
    select 'standard' as placeholder_priority
    union
    select 'urgent' as placeholder_priority
  ), expanded_cte as (
    select 
      date_series.date,
      type_cte.placeholder_type as type,
      status_cte.placeholder_status as status,
      priority_cte.placeholder_priority as priority,
      coalesce(count_cte.count, 0) as count
    from 
      date_series
    cross join 
      status_cte
    cross join 
      type_cte
    cross join
      priority_cte
    left join 
      count_cte on 
        date_series.date = count_cte.count_date and 
        status_cte.placeholder_status = count_cte.status and 
        type_cte.placeholder_type = count_cte.type and
        priority_cte.placeholder_priority = count_cte.priority
  ), priority_aggregate_cte as (
    select 
      expanded_cte.date, 
      expanded_cte.status,
      expanded_cte.type, 
      json_object_agg(
        expanded_cte.priority,
        expanded_cte.count
      ) as priority_count
    from
      expanded_cte
    group by
      expanded_cte.date, expanded_cte.status, expanded_cte.type
  ), type_aggregate_cte as (
    select 
      priority_aggregate_cte.date,
      priority_aggregate_cte.status,
      json_object_agg(
        priority_aggregate_cte.type,
        priority_aggregate_cte.priority_count
      ) as type_count
    from 
      priority_aggregate_cte
    group by 
      priority_aggregate_cte.date, priority_aggregate_cte.status
  )
  select 
    type_aggregate_cte.date,
    json_object_agg(
      type_aggregate_cte.status,
      type_aggregate_cte.type_count
    ) as counts
  from 
    type_aggregate_cte
  group by 
    type_aggregate_cte.date
  order by 
  type_aggregate_cte.date;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.greenhouse_sync()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
BASE_URL text;
BEGIN
  SELECT value into BASE_URL from env where name = 'BASE_URL';
  PERFORM 
    net.http_post(
      url := BASE_URL||'/api/sync/greenhouse/full_db',
      body := jsonb_build_object('recruiter_id', recruiter_id, 'key', greenhouse_key),
      headers := '{ "Content-Type": "application/json"}'
    )
  FROM integrations WHERE greenhouse_key IS NOT NULL;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.interviewers_analytic_extra(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], locations numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], start_datetime timestamp with time zone DEFAULT NULL::timestamp with time zone, end_datetime timestamp with time zone DEFAULT now())
 RETURNS TABLE(user_id uuid, average_weekly_count numeric, average_weekly_duration numeric, upcoming numeric, qualified numeric, training numeric)
 LANGUAGE plpgsql
AS $function$
BEGIN
RETURN QUERY WITH weekly_counts AS (
     SELECT 
        interview_module_relation.user_id
        , DATE_TRUNC('week', interview_meeting.created_at) AS created_at
        , COUNT(*) AS weekly_count
        , SUM(interview_session.session_duration) AS weekly_duration
        , count(interview_meeting.status) FILTER (WHERE interview_meeting.status::text = 'confirmed') AS upcoming
        , count(interview_module_relation.training_status) FILTER (WHERE interview_module_relation.training_status = 'qualified') AS qualified
        , count(interview_module_relation.training_status) FILTER (WHERE interview_module_relation.training_status = 'training') AS training
    FROM interview_session_relation
      JOIN interview_module_relation ON interview_module_relation.id = interview_session_relation.interview_module_relation_id
      JOIN interview_session on interview_session.id = interview_session_relation.session_id
      JOIN interview_meeting ON interview_meeting.id = interview_session.meeting_id
      JOIN public_jobs ON interview_meeting.job_id = public_jobs.id
    WHERE
      interview_meeting.recruiter_id = interviewers_analytic_extra.recruiter_id
      AND (CARDINALITY(departments) = 0 OR public_jobs.department_id = ANY(departments))
      AND (CARDINALITY(locations) = 0 OR public_jobs.location_id = ANY(locations))
      AND (CARDINALITY(jobs) = 0 OR interview_meeting.job_id = ANY(jobs))
      AND (start_datetime IS NULL OR interview_meeting.start_time >= start_datetime)
      AND interview_meeting.start_time <= end_datetime
    GROUP BY 
        interview_module_relation.user_id,DATE_TRUNC('week', interview_meeting.created_at)
)
SELECT 
    weekly_counts.user_id
    , ROUND(AVG(weekly_count),1) AS average_weekly_count
    , ROUND(AVG(weekly_duration),1) AS average_weekly_duration
    , SUM(weekly_counts.upcoming) AS upcoming
    , SUM(weekly_counts.qualified) AS qualified
    , SUM(weekly_counts.training) AS training
FROM 
    weekly_counts
GROUP BY 
    weekly_counts.user_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.interviewers_analytic_rejections(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], locations numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], start_datetime timestamp with time zone DEFAULT NULL::timestamp with time zone, end_datetime timestamp with time zone DEFAULT now())
 RETURNS TABLE(user_id uuid, decline bigint, lead_time numeric, reason text[], note text[])
 LANGUAGE plpgsql
AS $function$
  BEGIN
    RETURN QUERY select interview_module_relation.user_id as user_id
      , COUNT(*) as decline
      , AVG(extract(epoch from interview_session_cancel.created_at - interview_session.created_at)) as lead_time
      , ARRAY_AGG(interview_session_cancel.reason) as reasons
      , ARRAY_AGG(interview_session_cancel.other_details ->> 'note') as notes
      FROM interview_session_cancel 
      JOIN interview_session ON interview_session.id = interview_session_cancel.session_id 
      JOIN interview_session_relation ON interview_session_cancel.session_relation_id = interview_session_relation.id
      JOIN interview_module_relation ON interview_module_relation.id = interview_session_relation.interview_module_relation_id
      JOIN interview_meeting ON interview_meeting.id = interview_session.meeting_id
      JOIN public_jobs ON public_jobs.id = interview_meeting.job_id
      WHERE interview_session_cancel.session_relation_id IS NOT NULL
      AND interview_meeting.recruiter_id = interviewers_analytic_rejections.recruiter_id
      AND (CARDINALITY(departments) = 0 OR public_jobs.department_id = ANY(departments))
      AND (CARDINALITY(locations) = 0 OR public_jobs.location_id = ANY(locations))
      AND (CARDINALITY(jobs) = 0 OR public_jobs.id = ANY(jobs))
      AND (start_datetime IS NULL OR interview_session.created_at >= start_datetime)
      AND interview_session.created_at <= end_datetime
      GROUP BY interview_module_relation.user_id;
  END;
  $function$
;

CREATE OR REPLACE FUNCTION public.interviewers_leaderboard_by_v(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], locations numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], start_datetime timestamp with time zone DEFAULT NULL::timestamp with time zone, end_datetime timestamp with time zone DEFAULT now())
 RETURNS TABLE(user_id uuid, duration bigint, total_hours bigint, accepted bigint, rejected bigint, feedback integer)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY SELECT interview_module_relation.user_id
        , SUM(interview_session.session_duration::int) as duration
        , COUNT(accepted_status) AS total_hours
        , COUNT(accepted_status) FILTER (WHERE interview_session_relation.accepted_status = 'accepted') AS accepted
        , COUNT(accepted_status) FILTER (WHERE interview_session_relation.accepted_status = 'declined') AS rejected
        , 0 AS feedback
        FROM interview_session_relation
            JOIN interview_module_relation ON interview_module_relation.id = interview_session_relation.interview_module_relation_id
            JOIN interview_session on interview_session.id = interview_session_relation.session_id
            JOIN interview_meeting ON interview_meeting.id = interview_session.meeting_id
            JOIN public_jobs ON public_jobs.id = interview_meeting.job_id
        WHERE
            interview_meeting.recruiter_id = interviewers_leaderboard_by_v.recruiter_id
            AND interview_meeting.status = 'completed' 
            AND interview_session_relation.accepted_status in ('accepted','declined')
            AND (CARDINALITY(departments) = 0 OR public_jobs.department_id = ANY(departments))
            AND (CARDINALITY(locations) = 0 OR public_jobs.location_id = ANY(locations))
            AND (CARDINALITY(jobs) = 0 OR interview_meeting.job_id = ANY(jobs))
            AND (start_datetime IS NULL OR interview_meeting.start_time >= start_datetime)
            AND interview_meeting.start_time <= end_datetime
        GROUP BY interview_module_relation.user_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.jobs_locations_count(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], locations numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], start_datetime timestamp with time zone DEFAULT NULL::timestamp with time zone, end_datetime timestamp with time zone DEFAULT now())
 RETURNS TABLE(country text, state text, city text, app_count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
RETURN QUERY SELECT candidates.country, candidates.state, candidates.city, count(*) as app_count
  FROM candidates
  JOIN applications ON applications.candidate_id = candidates.id
  JOIN public_jobs ON public_jobs.id = applications.job_id
  WHERE public_jobs.recruiter_id = jobs_locations_count.recruiter_id
  AND (CARDINALITY(departments) = 0 OR public_jobs.department_id = ANY(departments))
  AND (CARDINALITY(locations) = 0 OR public_jobs.location_id = ANY(locations))
  AND (CARDINALITY(jobs) = 0 OR applications.job_id = ANY(jobs))
  AND (start_datetime IS NULL OR applications.created_at >= start_datetime)
  AND applications.created_at <= end_datetime
  GROUP BY candidates.country, candidates.state, candidates.city, applications.job_id;
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

create or replace view "public"."module_relations_view" as  WITH interview_data AS (
         SELECT interview_module_relation.id,
            interview_module_relation.pause_json,
            interview_module_relation.training_status AS module_training_status,
            interview_module_relation.user_id,
            interview_module_relation.module_id,
            interview_module_relation.number_of_shadow,
            interview_module_relation.number_of_reverse_shadow,
            interview_module_relation.is_archived,
            recruiter_user.first_name,
            recruiter_user."position",
            recruiter_user.profile_image,
            recruiter_user.scheduling_settings,
            recruiter_user.phone,
            interview_module.name AS module_name,
            interview_module.description AS module_description,
            ( SELECT json_agg(json_build_object('interview_session', row_to_json(interview_session.*), 'interview_meeting', row_to_json(interview_meeting.*), 'interview_session_relation', row_to_json(interview_session_relation.*))) AS json_agg
                   FROM (((interview_session_relation
                     LEFT JOIN interview_session ON ((interview_session.id = interview_session_relation.session_id)))
                     LEFT JOIN interview_meeting ON ((interview_meeting.id = interview_session.meeting_id)))
                     LEFT JOIN interview_module interview_module_1 ON ((interview_module_1.id = interview_session.module_id)))
                  WHERE ((interview_session_relation.interview_module_relation_id = interview_module_relation.id) AND ((interview_meeting.status = 'completed'::interview_schedule_status) OR (interview_meeting.status = 'confirmed'::interview_schedule_status)) AND (interview_session_relation.is_confirmed = true))) AS meetings
           FROM ((interview_module_relation
             LEFT JOIN interview_module ON ((interview_module.id = interview_module_relation.module_id)))
             LEFT JOIN recruiter_user ON ((interview_module_relation.user_id = recruiter_user.user_id)))
        )
 SELECT interview_data.id,
    interview_data.pause_json,
    interview_data.module_training_status,
    interview_data.user_id,
    interview_data.module_id,
    interview_data.number_of_shadow,
    interview_data.number_of_reverse_shadow,
    interview_data.first_name,
    interview_data."position",
    interview_data.profile_image,
    interview_data.scheduling_settings,
    interview_data.phone,
    interview_data.meetings,
    interview_data.module_name,
    interview_data.module_description,
    interview_data.is_archived,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE (((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text)) AS completed_meeting_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE (((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text)) AS cancelled_meeting_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE (((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text)) AS confirmed_meeting_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE ((((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text) AND (((meeting_elements.value -> 'interview_session_relation'::text) ->> 'training_type'::text) = 'shadow'::text))) AS shadow_completed_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE ((((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text) AND (((meeting_elements.value -> 'interview_session_relation'::text) ->> 'training_type'::text) = 'reverse_shadow'::text))) AS reverse_shadow_completed_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE ((((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'confirmed'::text) AND (((meeting_elements.value -> 'interview_session_relation'::text) ->> 'training_type'::text) = 'reverse_shadow'::text))) AS reverse_shadow_confirmed_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE ((((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'confirmed'::text) AND (((meeting_elements.value -> 'interview_session_relation'::text) ->> 'training_type'::text) = 'shadow'::text))) AS shadow_confirmed_count,
    ( SELECT sum((((meeting_elements.value -> 'interview_session'::text) ->> 'session_duration'::text))::numeric) AS sum
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE (((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text)) AS completed_meeting_duration
   FROM interview_data;


CREATE OR REPLACE FUNCTION public.move_to_interview(applications uuid[] DEFAULT '{}'::uuid[], sessions uuid[] DEFAULT '{}'::uuid[], requests jsonb[] DEFAULT NULL::jsonb[])
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  response record;
BEGIN
    UPDATE applications
    SET status = 'interview'
    WHERE id = ANY(move_to_interview.applications);
    FOR response IN (
      WITH requests_cte AS (
        SELECT UNNEST(move_to_interview.requests)::jsonb as request
      ), sessions_cte AS (
        SELECT UNNEST(move_to_interview.sessions)::uuid as session_id
      )
      SELECT requests_cte.request, array_agg(meeting_details.session_id) as session_ids
      FROM meeting_details
      INNER JOIN requests_cte ON (requests_cte.request->>'application_id')::uuid = meeting_details.application_id
      INNER JOIN sessions_cte ON sessions_cte.session_id = meeting_details.parent_session_id
      GROUP BY requests_cte.request
    ) 
    LOOP
      PERFORM create_session_request((response.request ->> 'application_id')::uuid, response.session_ids, response.request - 'application_id');
    END LOOP;
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

CREATE OR REPLACE FUNCTION public.run_workflow_action(action_id numeric)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    url_x text;
    headers_x jsonb;
    wa_record record;
BEGIN
    SELECT decrypted_secret 
    INTO url_x
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';
    
    url_x := concat(url_x, '/api/workflow-cron');

    headers_x := '{"Content-Type": "application/json"}'::jsonb;

    FOR wa_record IN
        SELECT w_a_l.*, w_a.payload
        FROM workflow_action_logs w_a_l
        JOIN workflow_action w_a ON w_a_l.workflow_action_id = w_a.id
        WHERE w_a_l.id = action_id
    LOOP
        PERFORM net.http_post(
            url := url_x,
            headers := headers_x,
            body := json_build_object(
                'id', wa_record.id,
                'workflow_id', wa_record.workflow_id,
                'workflow_action_id', wa_record.workflow_action_id,
                'meta', wa_record.meta,
                'payload', wa_record.payload,
                'execution_time', wa_record.execute_at
            )::jsonb
        );

        UPDATE workflow_action_logs
        SET status = 'processing', tries = wa_record.tries + 1, started_at = NOW()
        WHERE id = wa_record.id;
    END LOOP;

    RETURN true;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_completed_interviews(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], type text DEFAULT 'month'::text)
 RETURNS TABLE(date date, count bigint)
 LANGUAGE plpgsql
AS $function$
DECLARE
  trunc_field text;
  interval_field text;
  series_field text;
  group_field text;
BEGIN
  trunc_field:= (
    case
      when scheduling_analytics_completed_interviews.type = 'year' then 'month'
      when scheduling_analytics_completed_interviews.type = 'quarter' then 'week'
      else 'day'
    end
  );
  interval_field:= (
    case
      when scheduling_analytics_completed_interviews.type = 'year' then '12 months'
      when scheduling_analytics_completed_interviews.type = 'quarter' then '12 weeks'
      else '30 days'
    end
  );
  series_field:= (
    case
      when scheduling_analytics_completed_interviews.type = 'year' then '11 months'
      when scheduling_analytics_completed_interviews.type = 'quarter' then '11 weeks'
      else '29 days'
    end
  );
  group_field:= (
    case
      when scheduling_analytics_completed_interviews.type = 'year' then '1 month'
      when scheduling_analytics_completed_interviews.type = 'quarter' then '1 week'
      else '1 day'
    end
  );
   RETURN QUERY
    with
      interviews as (
        select
          interview_meeting.status,
          interview_meeting.end_time::date as end_time,
          applications.job_id,
          public_jobs.recruiter_id
        from
          interview_meeting
          left join applications on applications.id = interview_meeting.application_id
          left join public_jobs on public_jobs.id = applications.job_id
      ),
      filtered_interviews as (
        select
          date_trunc(trunc_field, interviews.end_time)::date as end_time
        from
          interviews
        where
          interviews.recruiter_id = scheduling_analytics_completed_interviews.recruiter_id
          and interviews.status = 'completed'
          and date_trunc(trunc_field, interviews.end_time)::date <= date_trunc(trunc_field, now()::date)::date
          and date_trunc(trunc_field, interviews.end_time)::date >= date_trunc(trunc_field, now()::date)::date - (interval_field)::interval
          and interviews.job_id IN (
            SELECT
              *
            FROM
              get_filtered_job_ids (
                scheduling_analytics_completed_interviews.recruiter_id,
                scheduling_analytics_completed_interviews.departments,
                scheduling_analytics_completed_interviews.jobs
              )
          )
      ),
      valid_dates as (
        select
          filtered_interviews.end_time,
          count(*)
        from
          filtered_interviews
        group by
          filtered_interviews.end_time
      ),
      date_series as (
        select
          generate_series(
            (
              greatest(
                (
                  date_trunc(trunc_field, now()::date)::date - (series_field)::interval
                ),
                (
                  select
                    coalesce(
                      (
                        select
                          min(valid_dates.end_time)
                        from
                          valid_dates
                      ),
                      date_trunc(trunc_field, now()::date)::date
                    )
                )
              )
            )::date,
            date_trunc(trunc_field, now()::date)::date,
            (group_field)::interval
          ) as end_time
      )
    select
      (date_series.end_time)::date as date,
      coalesce(valid_dates.count, 0)::bigint as count
    from
      date_series
      left join valid_dates on valid_dates.end_time = date_series.end_time;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_decline_requests(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[])
 RETURNS TABLE(completed_at date, count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY
    with
      requests as (
        select
          request.completed_at::date as date,
          request.type,
          applications.job_id,
          public_jobs.recruiter_id
        from
          request
          left join applications on applications.id = request.application_id
          left join public_jobs on public_jobs.id = applications.job_id
      ),
      filtered_requests as (
        select
          date_trunc('month', requests.date)::date as date
        from
          requests
        where
          requests.recruiter_id = scheduling_analytics_decline_requests.recruiter_id
          and (
            requests.type = 'decline_request'
            or requests.type = 'cancel_schedule_request'
          )
          and requests.job_id IN (
            SELECT
               *
            FROM
               get_filtered_job_ids (
                  scheduling_analytics_decline_requests.recruiter_id,
                  scheduling_analytics_decline_requests.departments,
                  scheduling_analytics_decline_requests.jobs
               )
            )
      ),
      valid_dates as (
          select
          filtered_requests.date,
          count(*)
        from
          filtered_requests
        group by
          filtered_requests.date
      ),
      date_series as (
        select
          generate_series(
            greatest(
              (
                date_trunc('month', now()::date)::date - '11 months'::interval
              )::date,
              (
                select
                  coalesce(
                    (
                      select
                        min(valid_dates.date)
                      from
                        valid_dates
                    ),
                    date_trunc('month', now())::date
                  )
              )
            )::date,
            date_trunc('month', now()::date)::date,
            '1 month'::interval
          ) as date
      )
    select
      (date_series.date)::date as date,
      coalesce(valid_dates.count, 0)::bigint as count
    from
      date_series
      left join valid_dates on valid_dates.date = date_series.date; 
END;
$function$
;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_filters(recruiter_id uuid)
 RETURNS TABLE(jobs jsonb[], departments jsonb[])
 LANGUAGE plpgsql
AS $function$
begin
  return query
  with
    jobs_cte as (
      select
        public_jobs.id,
        public_jobs.job_title
      from
        public_jobs
      where
        public_jobs.recruiter_id = scheduling_analytics_filters.recruiter_id
        and public_jobs.id is not null
        and public_jobs.job_title is not null
    ),
    departments_cte as (
      select
        departments.id,
        departments.name
      from
        departments
      where
        departments.recruiter_id = scheduling_analytics_filters.recruiter_id
        and departments.id is not null
        and departments.name is not null
    )
  select
    *
  from
    (
      select
        (
          array_agg(
            jsonb_build_object(
              'id',
              jobs_cte.id,
              'job_title',
              jobs_cte.job_title
            )
          )
        )::jsonb[] as jobs
      from
        jobs_cte
    ) as jobs
    cross join (
      select
        (
          array_agg(
            jsonb_build_object(
              'id',
              departments_cte.id,
              'name',
              departments_cte.name
            )
          )
        )::jsonb[] as departments
      from
        departments_cte
    ) as departments;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_interview_types(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[])
 RETURNS TABLE(id uuid, name text, qualified bigint, training bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY 
    with
      modules as (
        select distinct
          interview_module.id,
          interview_module.name,
          interview_module.recruiter_id,
          public_jobs.id as job_id
        from
          interview_module
          left join interview_session on interview_session.module_id = interview_module.id
          left join interview_plan on interview_plan.id = interview_session.interview_plan_id
          left join public_jobs on public_jobs.id = interview_plan.job_id
      ),
      filtered_modules as (
        select distinct
          interview_module_relation.training_status,
          interview_module_relation.user_id,
          modules.id,
          modules.name
        from
          interview_module_relation
          left join modules on modules.id = interview_module_relation.module_id
        where
          interview_module_relation.is_archived = false
          and modules.recruiter_id = scheduling_analytics_interview_types.recruiter_id
          and modules.job_id IN (
            SELECT
              *
            FROM
              get_filtered_job_ids (
                scheduling_analytics_interview_types.recruiter_id,
                scheduling_analytics_interview_types.departments,
                scheduling_analytics_interview_types.jobs
              )
          )
      )
    select
      filtered_modules.id,
      filtered_modules.name,
      COUNT(*) FILTER (
        WHERE
          filtered_modules.training_status = 'qualified'
      ) as qualified,
      COUNT(*) FILTER (
        WHERE
          filtered_modules.training_status = 'training'
      ) as training
    from
      filtered_modules
    group by
      filtered_modules.id,
      filtered_modules.name
    order by
      qualified desc,
      training desc;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_interviewers(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], type status_training DEFAULT 'qualified'::status_training)
 RETURNS TABLE(name text, user_id uuid, profile_image text, accepted bigint, declined bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY
    with
      interviewers as (
          select
            interview_session_relation.accepted_status,
            interview_module_relation.training_status,
            interview_meeting.created_at::date as created_at,
            applications.job_id,
            public_jobs.recruiter_id,
            recruiter_user.user_id,
            (
              recruiter_user.first_name || ' ' || recruiter_user.last_name
            ) as name,
            recruiter_user.profile_image
          from
            interview_session_relation
            left join interview_module_relation on interview_module_relation.id = interview_session_relation.interview_module_relation_id
            left join recruiter_user on recruiter_user.user_id = interview_module_relation.user_id
            left join interview_session on interview_session.id = interview_session_relation.session_id
            left join interview_meeting on interview_meeting.id = interview_session.meeting_id
            left join applications on applications.id = interview_meeting.application_id
            left join public_jobs on public_jobs.id = applications.job_id
      ),
      filtered_interviewers as (
        select
          interviewers.user_id,
          interviewers.profile_image,
          interviewers.name,
          interviewers.accepted_status
        from
          interviewers
        where
          interviewers.recruiter_id = scheduling_analytics_interviewers.recruiter_id
          and interviewers.training_status = scheduling_analytics_interviewers.type
          and (
            interviewers.accepted_status = 'accepted'
            or interviewers.accepted_status = 'declined'
          )
          and interviewers.job_id IN (
            SELECT
               *
            FROM
               get_filtered_job_ids (
                  scheduling_analytics_interviewers.recruiter_id,
                  scheduling_analytics_interviewers.departments,
                  scheduling_analytics_interviewers.jobs
               )
            )
      )
    select
      filtered_interviewers.name,
      filtered_interviewers.user_id,
      filtered_interviewers.profile_image,
      COUNT(*) FILTER (
        WHERE
          filtered_interviewers.accepted_status = 'accepted'
      ) as accepted,
      COUNT(*) FILTER (
        WHERE
          filtered_interviewers.accepted_status = 'declined'
      ) as declined
    from
      filtered_interviewers
    group by
      filtered_interviewers.name,
      filtered_interviewers.user_id,
      filtered_interviewers.profile_image;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_leaderboard(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], type text DEFAULT 'all_time'::text)
 RETURNS TABLE(name text, "position" text, profile_image text, user_id uuid, duration numeric, interviews bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY
   with
      sessions as (
        select
          interview_session.session_duration,
          interview_meeting.status,
          interview_meeting.end_time,
          recruiter_user.user_id,
          recruiter_user.profile_image,
          (
            recruiter_user.first_name || ' ' || recruiter_user.last_name
          ) as name,
          recruiter_user.position,
          applications.job_id,
          public_jobs.recruiter_id
        from
          interview_session_relation
          left join interview_module_relation on interview_module_relation.id = interview_module_relation.id
          left join recruiter_user on recruiter_user.user_id = interview_module_relation.user_id
          left join interview_session on interview_session.id = interview_session_relation.session_id
          left join interview_meeting on interview_meeting.id = interview_session.meeting_id
          left join applications on applications.id = interview_meeting.application_id
          left join public_jobs on public_jobs.id = applications.job_id
      ),
      filtered_users as (
        select
          sessions.session_duration,
          sessions.name,
          sessions.position,
          sessions.profile_image,
          sessions.user_id
        from
          sessions
        where
          sessions.recruiter_id = scheduling_analytics_leaderboard.recruiter_id
          and sessions.status = 'completed'
          and sessions.end_time >= (
            case
              when scheduling_analytics_leaderboard.type = 'year' then (now() - '1 year'::interval)::date
              when scheduling_analytics_leaderboard.type = 'month' then (now() - '1 month'::interval)::date
              when scheduling_analytics_leaderboard.type = 'week' then (now() - '1 week'::interval)::date
              else '1900-01-01'::date
            end
          )
          and sessions.job_id IN (
            SELECT
               *
            FROM
               get_filtered_job_ids (
                  scheduling_analytics_leaderboard.recruiter_id,
                  scheduling_analytics_leaderboard.departments,
                  scheduling_analytics_leaderboard.jobs
               )
            )
      )
    select
      filtered_users.name,
      filtered_users.position,
      filtered_users.profile_image,
      filtered_users.user_id,
      sum(filtered_users.session_duration) as duration,
      count(*) as interviews
    from
      filtered_users
    group by
      filtered_users.name,
      filtered_users.position,
      filtered_users.profile_image,
      filtered_users.user_id
    order by
      duration desc,
      interviews desc;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_reasons(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], type cancel_type DEFAULT 'declined'::cancel_type)
 RETURNS TABLE(reason text, count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY
    with
      cancellations as (
        select
          interview_session_cancel.reason,
          interview_session_cancel.type,
          applications.job_id,
          public_jobs.recruiter_id
        from
          interview_session_cancel
          left join interview_session on interview_session.id = interview_session_cancel.session_id
          left join interview_meeting on interview_meeting.id = interview_session.meeting_id
          left join applications on applications.id = interview_meeting.application_id
          left join public_jobs on public_jobs.id = applications.job_id
      ),
      filtered_cancellation as (
        select
          cancellations.reason
        from
          cancellations
        where
          cancellations.recruiter_id = scheduling_analytics_reasons.recruiter_id
          and cancellations.type = scheduling_analytics_reasons.type
          and cancellations.job_id IN (
            SELECT
               *
            FROM
               get_filtered_job_ids (
                  scheduling_analytics_reasons.recruiter_id,
                  scheduling_analytics_reasons.departments,
                  scheduling_analytics_reasons.jobs
               )
            )
      )
    select
      filtered_cancellation.reason,
      count(*)
    from
      filtered_cancellation
    where
      filtered_cancellation.reason is not null
    group by
      filtered_cancellation.reason;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_recent_decline_reschedule(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[])
 RETURNS TABLE(profile_image text, name text, note text, id uuid, type cancel_type)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY   
    with
      requests as (
        select
          interview_session_cancel.created_at::date as created_at,
          interview_session_cancel.id,
          interview_session_cancel.type,
          interview_session_cancel.other_details ->> 'note' as note,
          applications.job_id,
          public_jobs.recruiter_id,
          recruiter_user.profile_image,
          (
            recruiter_user.first_name || ' ' || recruiter_user.last_name
          ) as name
        from
          interview_session_cancel
          left join interview_session_relation on interview_session_relation.id = interview_session_cancel.session_relation_id
          left join interview_module_relation on interview_module_relation.id = interview_session_relation.interview_module_relation_id
          left join recruiter_user on recruiter_user.user_id = interview_module_relation.user_id
          left join interview_session on interview_session.id = interview_session_relation.session_id
          left join interview_meeting on interview_meeting.id = interview_session.meeting_id
          left join applications on applications.id = interview_meeting.application_id
          left join public_jobs on public_jobs.id = applications.job_id
      ),
      filtered_requests as (
        select
          requests.profile_image,
          requests.name,
          requests.note,
          requests.id,
          requests.type
        from
          requests
        where
          requests.recruiter_id = scheduling_analytics_recent_decline_reschedule.recruiter_id
          and requests.job_id IN (
            SELECT
               *
            FROM
               get_filtered_job_ids (
                  scheduling_analytics_recent_decline_reschedule.recruiter_id,
                  scheduling_analytics_recent_decline_reschedule.departments,
                  scheduling_analytics_recent_decline_reschedule.jobs
               )
            )
        order by 
          requests.created_at
      )
    select
      *
    from
      filtered_requests;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_tabs(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[])
 RETURNS TABLE(cancelled bigint, waiting bigint, completed bigint, confirmed bigint, not_scheduled bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
   RETURN QUERY
      with
      meetings as (
         select
            interview_meeting.status,
            applications.job_id,
            public_jobs.recruiter_id
         from
            interview_meeting
            left join applications on applications.id = interview_meeting.application_id
            left join public_jobs on public_jobs.id = applications.job_id
      ),
      filtered_meetings as (
         select
            meetings.status
         from
            meetings
         where
            meetings.recruiter_id = scheduling_analytics_tabs.recruiter_id
            and meetings.job_id IN (
            SELECT
               *
            FROM
               get_filtered_job_ids (
                  scheduling_analytics_tabs.recruiter_id,
                  scheduling_analytics_tabs.departments,
                  scheduling_analytics_tabs.jobs
               )
            )
      )
      select
      COUNT(*) FILTER (
         WHERE
            filtered_meetings.status = 'cancelled'
      ) as cancelled,
      COUNT(*) FILTER (
         WHERE
            filtered_meetings.status = 'waiting'
      ) as waiting,
      COUNT(*) FILTER (
         WHERE
            filtered_meetings.status = 'completed'
      ) as completed,
      COUNT(*) FILTER (
         WHERE
            filtered_meetings.status = 'confirmed'
      ) as confirmed,
      COUNT(*) FILTER (
         WHERE
            filtered_meetings.status = 'not_scheduled'
      ) as not_scheduled
      from
      filtered_meetings;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_training_progress(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], locations numeric[] DEFAULT ARRAY[]::numeric[])
 RETURNS TABLE(number_of_shadow bigint, noshadow numeric, number_of_reverse_shadow bigint, noreverseshadow numeric, user_id uuid, name text, "position" text)
 LANGUAGE plpgsql
AS $function$
DECLARE
  locations_length numeric;
BEGIN
  locations_length := coalesce(
    array_length(scheduling_analytics_training_progress.locations, 1),
    0
  );
   RETURN QUERY
    with
      modules as (
        select distinct
          interview_module.id,
          interview_module.name,
          interview_module.recruiter_id,
          interview_module.settings,
          public_jobs.id as job_id
        from
          interview_module
          left join interview_session on interview_session.module_id = interview_module.id
          left join interview_plan on interview_plan.id = interview_session.interview_plan_id
          left join public_jobs on public_jobs.id = interview_plan.id
      ),
      filtered_module_members as (
        select
          interview_module_relation.number_of_shadow,
          (modules.settings ->> 'noShadow')::numeric as noShadow,
          interview_module_relation.number_of_reverse_shadow,
          (modules.settings ->> 'noReverseShadow')::numeric as noReverseShadow,
          recruiter_user.user_id,
          modules.name,
          recruiter_user.position
        from
          interview_module_relation
          left join modules on modules.id = interview_module_relation.module_id
          left join recruiter_user on recruiter_user.user_id = interview_module_relation.user_id
        where
          modules.recruiter_id = scheduling_analytics_training_progress.recruiter_id
          and modules.job_id IN (
            SELECT
              *
            FROM
              get_filtered_job_ids (
                scheduling_analytics_training_progress.recruiter_id,
                scheduling_analytics_training_progress.departments,
                scheduling_analytics_training_progress.jobs
              )
          )
          and recruiter_user.office_location_id IN (
            SELECT
              office_locations.id
            FROM
              office_locations
            WHERE
              office_locations.recruiter_id = scheduling_analytics_training_progress.recruiter_id
              AND (
                locations_length = 0
                OR office_locations.id = ANY (scheduling_analytics_training_progress.locations)
              )
          )
      )
    select
      *
    from
      filtered_module_members
    order by
      number_of_shadow desc,
      noShadow desc,
      number_of_reverse_shadow desc,
      noReverseShadow desc;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.swap_stage_order(plan_id_1 uuid, plan_id_2 uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  job_id_1 uuid;
  plan_order_1 numeric;
  job_id_2 uuid;
  plan_order_2 numeric;
BEGIN
  SELECT job_id, plan_order INTO job_id_1, plan_order_1
  FROM interview_plan
  WHERE id = plan_id_1;

  SELECT job_id, plan_order INTO job_id_2, plan_order_2
  FROM interview_plan
  WHERE id = plan_id_2;

  IF job_id_1 = job_id_2 THEN
    UPDATE interview_plan
    SET plan_order = plan_order_2
    WHERE id = plan_id_1;
    UPDATE interview_plan
    SET plan_order = plan_order_1
    WHERE id = plan_id_2;
  END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_candidate_portal()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  IF NEW.status = 'interview' THEN
   
   INSERT INTO "interview_progress" (application_id, name, is_completed, "order", update_at, icon, description)
      SELECT NEW.id, name, is_completed, "order", NOW(), icon, description
      FROM interview_progress
      WHERE job_id = NEW.job_id;
    
  END IF;
  RETURN NEW;
END;$function$
;

CREATE OR REPLACE FUNCTION public.trigger_interview_stage_delete()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  WITH ordered_stages AS (
    select
      interview_plan.id,
      row_number() over(order by interview_plan.plan_order, interview_plan.name, interview_plan.id) as plan_order
    from
      interview_plan
    where
      interview_plan.job_id = OLD.job_id
  )
  UPDATE interview_plan
  SET plan_order = ordered_stages.plan_order
  FROM ordered_stages
  WHERE interview_plan.id = ordered_stages.id;
  RETURN NULL;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_request_progress_delete()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE request
  SET updated_at = now()
  WHERE id = OLD.request_id;
  RETURN OLD;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_request_progress_insert()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE request
  SET updated_at = now()
  WHERE id = NEW.request_id;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_request_progress_update()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE request
  SET updated_at = now()
  WHERE id = NEW.request_id;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_request_update()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF (to_jsonb(OLD.*) - 'updated_at') <> (to_jsonb(NEW.*) - 'updated_at') THEN
    NEW.updated_at = now();
    RETURN NEW;
  ELSE
    RETURN NULL;
  END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_set_request_to_new()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    UPDATE request 
    SET is_new = true
    WHERE request.id = NEW.id;
    RETURN NEW;
END;
$function$
;


