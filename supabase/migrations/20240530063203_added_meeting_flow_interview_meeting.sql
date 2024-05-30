create type "public"."email_types" as enum ('debrief_calendar_invite', 'candidate_invite_confirmation', 'cancel_interview_session', 'init_email_agent', 'confirmation_mail_to_organizer');

create type "public"."meeting_flow" as enum ('self_scheduling', 'candidate_request', 'debrief');

drop view if exists "public"."meeting_details";

alter table "public"."new_tasks_progress" alter column "progress_type" drop default;

alter type "public"."progress_type" rename to "progress_type__old_version_to_be_dropped";

create type "public"."progress_type" as enum ('standard', 'interview_schedule', 'email_messages', 'call_completed', 'call_failed', 'email_failed', 'call_disconnected', 'email_follow_up', 'call_follow_up', 'email_follow_up_reminder', 'call_follow_up_reminder', 'request_availability_list');

alter table "public"."new_tasks_progress" alter column progress_type type "public"."progress_type" using progress_type::text::"public"."progress_type";

alter table "public"."new_tasks_progress" alter column "progress_type" set default 'standard'::progress_type;

drop type "public"."progress_type__old_version_to_be_dropped";

alter table "public"."company_email_template" drop column "footer";

alter table "public"."company_email_template" alter column "type" set data type email_types using "type"::email_types;

alter table "public"."interview_meeting" add column "meeting_flow" meeting_flow not null default 'self_scheduling'::meeting_flow;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.batchcalcresumejdscore()
 RETURNS jsonb[]
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB[];
BEGIN
    -- Initialize an empty JSONB array for the results
    result := ARRAY[]::JSONB[];

    -- Select up to 50 records that meet the specified conditions
    SELECT ARRAY_AGG(row_to_json(data))
    INTO result
    FROM (
        SELECT ja.id AS application_id,
           ja.candidate_id AS candidate_id,
           ja.score_json AS jd_score,
           cf.file_url AS resume,
           cf.id AS file_id,
           cf.resume_json AS json_resume,
           cf.resume_text AS resume_text,
           ja.job_id as job_id,
           pj.company as company,
           pj.jd_json as jd_json,
           pj.parameter_weights as parameter_weights,
           0 as retry
           FROM applications ja join candidate_files cf on cf.id = ja.candidate_file_id
       JOIN public_jobs pj ON ja.job_id = pj.id
       WHERE ja.processing_status='not started' and pj.status='published' and ja.candidate_file_id is not null and pj.jd_json is not null
       ORDER BY ja.created_at ASC
       LIMIT 50
    ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.batchsavegreenhouse()
 RETURNS jsonb[]
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB[];
BEGIN
    -- Initialize an empty JSONB array for the results
    result := ARRAY[]::JSONB[];

    -- Select up to 50 records that meet the specified conditions
    SELECT ARRAY_AGG(row_to_json(data))
    INTO result
    FROM (
        SELECT
           application_id AS application_id,
           resume AS resume
       FROM greenhouse_reference
       WHERE resume_saved = false and resume is not null
       ORDER BY created_at ASC
       LIMIT 100
    ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
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
BEGIN
 -- Check the value of function_value parameter
    IF function_value = 'first' THEN
        -- Check if resumescorefirst() returns NULL
        IF batchcalcresumejdscore() IS NOT NULL THEN
            -- If not NULL, proceed with HTTP POST request
            SELECT value INTO function_url FROM env WHERE name = 'resumecron-batchscore';
            request_results := net.http_post(
                url := function_url,
                body := jsonb_build_object('function', function_value)
                -- Optionally, add headers or other parameters if required
            );
        END IF;
    ELSIF function_value = 'second' THEN
        -- Check if resumescoresecond() returns NULL
        IF retrybatchcalcresumejdscore() IS NOT NULL THEN
            -- If not NULL, proceed with HTTP POST request
            SELECT value INTO function_url FROM env WHERE name = 'resumecron-batchscore';
            request_results := net.http_post(
                url := function_url,
                body := jsonb_build_object('function', function_value)
                -- Optionally, add headers or other parameters if required
            );
        END IF;
    ELSIF function_value = 'third' THEN
        -- Check if resumescoresecond() returns NULL
        IF secondretrybatchcalcresumejdscore() IS NOT NULL THEN
            -- If not NULL, proceed with HTTP POST request
            SELECT value INTO function_url FROM env WHERE name = 'resumecron-batchscore';
            request_results := net.http_post(
                url := function_url,
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
AS $function$
DECLARE
    request_results JSONB;  -- Variable to store the HTTP request result
    function_url text;
BEGIN
    IF batchsavegreenhouse() IS NOT NULL THEN
        -- Make a single HTTP request for the aggregated data
        SELECT value INTO function_url FROM env WHERE name = 'greenhouse-batchsave';
        -- Make a single HTTP request for the aggregated data
        request_results := net.http_post(
        url := function_url
            -- Add other parameters like headers or data if needed
        );
    END IF;
    -- Return the HTTP request result
    RETURN request_results;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.calculate_resume_score(in_score_json jsonb, app_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    weight_record jsonb;
    total_score numeric := 0;
BEGIN
    -- Fetching weights from the database
    SELECT
        pj.parameter_weights
    INTO
        weight_record
    FROM
        applications ja
    JOIN
        public_jobs pj ON ja.job_id = pj.id
    WHERE
        ja.id = app_id;

    -- Checking if the record exists
    IF NOT FOUND THEN
        RETURN FALSE;
    END IF;

    -- Checking and handling missing keys in score_json
    IF NOT (in_score_json->'scores'->>'skills' IS NOT NULL AND in_score_json->'scores'->>'education' IS NOT NULL AND in_score_json->'scores'->>'experience' IS NOT NULL) THEN
        -- Handle missing keys here (set default values or skip the calculation)
        -- For simplicity, we'll set default values to 0 in this example
        RETURN FALSE;
    END IF;

    -- Calculating the total score
    total_score := TRUNC(((in_score_json->'scores'->>'skills')::numeric * COALESCE((weight_record->>'skills')::numeric, 0) +
        (in_score_json->'scores'->>'education')::numeric * COALESCE((weight_record->>'education')::numeric, 0) +
        (in_score_json->'scores'->>'experience')::numeric * COALESCE((weight_record->>'experience')::numeric, 0))/100);

    -- Updating the job_applications table with the calculated score
    UPDATE applications
    SET overall_score = total_score,
    score_json = in_score_json,
    processing_status = 'success'
    WHERE id = app_id;

    -- Returning true for success
    RETURN true;
    -- RETURN total_score;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.connectassessmenttemplate(assessmentid uuid, recruiterid uuid, templateid uuid, jobid uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    INSERT INTO assessment (id, title, description, mode, type, level, recruiter_id)
    SELECT assessmentId, title, description, mode, type, level, recruiterId
    FROM assessment_template
    WHERE id = templateId;
    INSERT INTO assessment_question (assessment_id, parent_question_id, question, answer, duration, description, type, level, required)
    SELECT assessmentId, question_bank.id, question_bank.question, question_bank.answer, question_bank.duration, question_bank.description, question_bank.type, question_bank.level, question_bank.required
    FROM template_question_relation
    LEFT JOIN question_bank ON template_question_relation.question_id = question_bank.id
    WHERE template_question_relation.template_id = templateId;
    INSERT INTO assessment_job_relation (assessment_id, job_id)
    VALUES (assessmentId, jobId);  
END;
$function$
;

CREATE OR REPLACE FUNCTION public.connectbulkassessmenttemplate(assessments uuid[], recruiterid uuid, templates jsonb[], jobid uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    template jsonb;
    assessmentId UUID;
    templateId UUID;
    assessmentUuid UUID;
BEGIN
    RAISE LOG 'Templates JSON : %', templates;
    FOREACH template IN ARRAY templates
    LOOP
        RAISE LOG 'Template from template: %', template;
        assessmentId := (template->>'assessment_id')::UUID;
        templateId := (template->>'template_id')::UUID;
        RAISE LOG 'Assessment ID from template: %', assessmentId;
        PERFORM connectassessmenttemplate(assessmentId, recruiterId, templateId, jobId);
    END LOOP;

    FOREACH assessmentUuid IN ARRAY assessments
    LOOP
        INSERT INTO assessment_job_relation (assessment_id, job_id)
        VALUES (assessmentUuid, jobId);
    END LOOP;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.createrecuriterrelation(in_user_id uuid, in_recruiter_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
is_admin boolean;
BEGIN
   is_admin := Exists(select 1 from recruiter_user where recruiter_user.user_id = auth.uid() and role = 'admin');
   if is_admin then
      insert into recruiter_relation (user_id, recruiter_id, is_active, created_by) values (in_user_id, in_recruiter_id, true, auth.uid());
   else
      return false;
   end if;
    -- Return the final result as a UUID
    RETURN is_admin;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.createrecuriterrelation(in_user_id uuid, in_recruiter_id uuid, in_is_active boolean)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
is_admin boolean;
BEGIN
   is_admin := Exists(select 1 from recruiter_user where recruiter_user.user_id = auth.uid() and role = 'admin');
   if is_admin then
      insert into recruiter_relation (user_id, recruiter_id, is_active, created_by) values (in_user_id, in_recruiter_id, in_is_active, auth.uid());
   else
      return false;
   end if;
    -- Return the final result as a UUID
    RETURN is_admin;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.delete_session(session_id uuid, interview_plan_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    WITH deleted_session AS (
        DELETE FROM interview_session 
        WHERE id = session_id
        RETURNING session_order
    ),
    sessions_to_update AS (
        SELECT isess.id, isess.session_order
        FROM interview_session isess
        JOIN deleted_session ds ON isess.interview_plan_id = delete_session.interview_plan_id
        WHERE isess.session_order >= ds.session_order
    )
    UPDATE interview_session
    SET session_order = stu.session_order - 1
    FROM sessions_to_update stu
    WHERE interview_session.id = stu.id;

    UPDATE interview_session AS iss
    SET break_duration = 0
    WHERE iss.id = (
        SELECT isss.id 
        FROM interview_session isss 
        WHERE isss.interview_plan_id = delete_session.interview_plan_id
        ORDER BY isss.session_order DESC
        LIMIT 1
    );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.duplicateassessment(assessmentid uuid, newassessmentid uuid, recruiterid uuid, newtitle text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    INSERT INTO assessment (id, title, description, mode, type, level, recruiter_id)
    SELECT newAssessmentId, newTitle, description, mode, type, level, recruiterId
    FROM assessment
    WHERE id = assessmentId;
    INSERT INTO assessment_question (assessment_id, parent_question_id, question, answer, duration, description, type, level, required)
    SELECT newAssessmentId, assessment_question.parent_question_id, assessment_question.question, assessment_question.answer, assessment_question.duration, assessment_question.description, assessment_question.type, assessment_question.level, assessment_question.required
    FROM assessment_question
    WHERE assessment_question.assessment_id = assessmentId; 
END;
$function$
;

CREATE OR REPLACE FUNCTION public.embeddingresume()
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
           json_resume AS resume_json
       FROM job_applications
       WHERE application_id='dc5c1c72-6e7b-4e14-94d8-c8df60eb79f1'
       ORDER BY created_at ASC
       LIMIT 50
    )
    LOOP
        -- Convert the row to JSON
        request_results := row_to_json(app_data);
        
        -- Make the HTTP request for each application data
        SELECT
            net.http_post(
                url := 'https://preprod.aglinthq.com/api/ai/resume-embedding',
                body := request_results
            ) INTO request_results;
        
        -- Append the request result to the result array
        result := result || jsonb_build_object('request_result', request_results);
    END LOOP;


    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_combined_resume_score(jd_data jsonb, parameter_weights jsonb)
 RETURNS integer
 LANGUAGE plpgsql
 STABLE
AS $function$
DECLARE
  overall_score numeric := 0;
BEGIN
  -- Add the weighted score to the overall score
  overall_score := TRUNC(((jd_data->'scores'->>'skills')::numeric * COALESCE((parameter_weights->>'skills')::numeric, 0) +
      (jd_data->'scores'->>'education')::numeric * COALESCE((parameter_weights->>'education')::numeric, 0) +
      (jd_data->'scores'->>'experience')::numeric * COALESCE((parameter_weights->>'experience')::numeric, 0))/100, 0);

  -- Return the truncated integer part of the overall score
  RETURN TRUNC(overall_score);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_conversion_count(recruiter_id uuid, type text)
 RETURNS TABLE(timeline timestamp with time zone, count bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
RETURN QUERY
  SELECT
  DATE_TRUNC(get_conversion_count.type, applications.converted_at) AS timeline,
  COUNT (*) AS count
FROM
  (
    SELECT
      applications.id,
      applications.converted_at
    FROM
      (
        SELECT
          applications.id,
          applications.converted_at,
          applications.job_id
        FROM
          applications
        WHERE
          status = 'qualified'
          AND converted_at IS NOT null
      ) AS applications
      INNER JOIN public_jobs ON public_jobs.id = applications.job_id
    WHERE
      public_jobs.recruiter_id = get_conversion_count.recruiter_id
  ) as applications
WHERE
  applications.id IN (
    SELECT
      interview_schedule.application_id
    FROM
      interview_schedule
    WHERE
      interview_schedule.recruiter_id = get_conversion_count.recruiter_id
  )
  AND applications.converted_at >= NOW() - INTERVAL '1 day' * (CASE
        WHEN get_conversion_count.type = 'year' THEN 36500
        WHEN get_conversion_count.type = 'month' THEN 365
        WHEN get_conversion_count.type = 'week' THEN 30
        WHEN get_conversion_count.type = 'day' THEN 7
    END)
GROUP BY timeline
ORDER BY timeline;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_data_schedule(schedule_id_param uuid, application_id_param uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    interview_data JSONB;
    application_data JSONB;
    result_data JSONB;
BEGIN
    -- Fetch interview data
    SELECT jsonb_agg(
               json_build_object(
                   'interview_session', row_to_json(intses),
                   'interview_module', row_to_json(intmod),
                   'interview_meeting', row_to_json(intmeet),
                   'interview_session_relations', interview_session_relations
               )
           )
    INTO interview_data
    FROM interview_session intses
    JOIN interview_meeting intmeet ON  intmeet.id = intses.meeting_id
    LEFT JOIN interview_module intmod ON intses.module_id = intmod.id
    LEFT JOIN (
        SELECT 
            session_id,
            jsonb_agg(
                jsonb_build_object(
                        'interview_session_relation', row_to_json(intrel),
                        'interview_module_relation', row_to_json(intmodrel),
                        'recruiter_user', 
                            CASE WHEN user_rel.user_id IS NULL THEN NULL
                                 ELSE jsonb_build_object(
                                    'user_id', user_rel.user_id,
                                    'first_name', user_rel.first_name,
                                    'last_name', user_rel.last_name,
                                    'position', user_rel.position,
                                    'email', user_rel.email,
                                    'profile_image', user_rel.profile_image
                                 )
                            END,
                        'debrief_user', 
                            CASE WHEN user_rel_debrief.user_id IS NULL THEN NULL
                                 ELSE jsonb_build_object(
                                    'user_id', user_rel_debrief.user_id,
                                    'first_name', user_rel_debrief.first_name,
                                    'last_name', user_rel_debrief.last_name,
                                    'position', user_rel_debrief.position,
                                    'email', user_rel_debrief.email,
                                    'profile_image', user_rel_debrief.profile_image
                                 )
                            END
                )
            ) as interview_module_relation
        FROM interview_session_relation intrel
        LEFT JOIN interview_module_relation intmodrel ON intrel.interview_module_relation_id = intmodrel.id
        LEFT JOIN recruiter_user user_rel ON intmodrel.user_id = user_rel.user_id
        LEFT JOIN recruiter_user user_rel_debrief ON intrel.user_id = user_rel_debrief.user_id
        GROUP BY session_id
    ) AS interview_session_relations ON intses.id = interview_session_relations.session_id
    WHERE intmeet.interview_schedule_id=schedule_id_param;



    -- Fetch application data
    SELECT jsonb_build_object(
               'application',row_to_json(applications),
               'public_jobs', jsonb_build_object(
                   'id', public_jobs.id,
                   'job_title', public_jobs.job_title,
                   'location', public_jobs.location,
                   'recruiter_id', public_jobs.recruiter_id
               ),
               'candidate',row_to_json(candidates),
               'candidate_files', jsonb_build_object(
                    'id', candidate_files.id,
                    'file_url', candidate_files.file_url,
                    'candidate_id', candidate_files.candidate_id,
                    'resume_json', candidate_files.resume_json,
                    'type', candidate_files.type
               )
           )
    INTO application_data
    FROM applications
    LEFT JOIN public_jobs ON applications.job_id = public_jobs.id
    LEFT JOIN candidates ON applications.candidate_id = candidates.id
     LEFT JOIN candidate_files ON candidate_files.id = applications.candidate_file_id
    WHERE applications.id = application_id_param;

    -- Combine interview data and application data
    result_data := jsonb_build_object(
        'interview_data', interview_data,
        'application_data', application_data
    );

    RETURN result_data;

END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_leaderboard(recruiter_id uuid, type text)
 RETURNS TABLE(user_id uuid, first_name text, last_name text, profile_image text, user_position text, duration numeric, interviews bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  RETURN QUERY
SELECT
  recruiter_user.user_id,
  recruiter_user.first_name,
  recruiter_user.last_name,
  recruiter_user.profile_image,
  recruiter_user.position AS user_position,
  interviewers.duration,
  interviewers.interviews
FROM
  recruiter_user
  INNER JOIN (
    SELECT
      interview_module_relation.user_id,
      SUM(interview_session.session_duration) AS duration,
      COUNT(*) AS interviews
    FROM
      interview_module_relation
      INNER JOIN (
        SELECT
          interview_session_relation.interview_module_relation_id,
          interview_session.session_duration
        FROM
          (
            SELECT
              interview_session.id,
              interview_session.session_duration
            FROM
              interview_session
              INNER JOIN (
                SELECT
                  interview_meeting.id
                FROM
                  interview_meeting
                  INNER JOIN interview_schedule ON interview_schedule.id = interview_meeting.interview_schedule_id
                WHERE
                  interview_schedule.recruiter_id = get_interview_leaderboard.recruiter_id
                  AND interview_meeting.status = 'completed'
                  AND interview_meeting.end_time >= NOW() - INTERVAL '1 day' * (CASE
        WHEN get_interview_leaderboard.type = 'year' THEN 36500
        WHEN get_interview_leaderboard.type = 'month' THEN 365
        WHEN get_interview_leaderboard.type = 'week' THEN 30
        WHEN get_interview_leaderboard.type = 'day' THEN 7
    END)
              ) AS interview_meeting ON interview_meeting.id = interview_session.meeting_id
          ) AS interview_session
          INNER JOIN interview_session_relation ON interview_session.id = interview_session_relation.session_id
        WHERE
          interview_session_relation.is_confirmed = true
      ) AS interview_session ON interview_session.interview_module_relation_id = interview_module_relation.id
    GROUP BY
      interview_module_relation.user_id
  ) AS interviewers ON interviewers.user_id = recruiter_user.user_id
  ORDER BY interviewers.duration DESC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_meeting_status_count(recruiter_id uuid, type text)
 RETURNS TABLE(timeline timestamp with time zone, completed bigint, cancelled bigint, not_scheduled bigint, waiting bigint, confirmed bigint, reschedule bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    DATE_TRUNC(get_interview_meeting_status_count.type, interview_meeting.created_at) AS timeline, 
    SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed, 
    SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled,
    SUM(CASE WHEN status = 'not_scheduled' THEN 1 ELSE 0 END) AS not_scheduled,
    SUM(CASE WHEN status = 'waiting' THEN 1 ELSE 0 END) AS waiting,
    SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) AS confirmed,
    SUM(CASE WHEN status = 'reschedule' THEN 1 ELSE 0 END) AS reschedule
    FROM interview_meeting 
    INNER JOIN interview_schedule ON interview_schedule.id = interview_meeting.interview_schedule_id
    WHERE 
      interview_schedule.recruiter_id = get_interview_meeting_status_count.recruiter_id 
      AND interview_meeting.created_at >= NOW() - INTERVAL '1 day' * (CASE
        WHEN get_interview_meeting_status_count.type = 'year' THEN 36500
        WHEN get_interview_meeting_status_count.type = 'month' THEN 365
        WHEN get_interview_meeting_status_count.type = 'week' THEN 30
        WHEN get_interview_meeting_status_count.type = 'day' THEN 7
    END)
    GROUP BY timeline 
    ORDER BY timeline;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_training_status_count(recruiter_id uuid)
 RETURNS TABLE(id uuid, name text, training_status_count jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN 
  RETURN QUERY 
  SELECT
  interview_module.id,
  interview_module.name,
  modules.training_status_count
FROM
  interview_module
  INNER JOIN (
    SELECT
      modules.module_id AS id,
      jsonb_build_object(
        'qualified',
        qualified_count,
        'training',
        training_count
      ) AS training_status_count
    FROM
      (
        SELECT
          interview_module_relation.module_id AS module_id,
          SUM(
            CASE
              WHEN interview_module_relation.training_status = 'qualified' THEN 1
              ELSE 0
            END
          ) AS qualified_count,
          SUM(
            CASE
              WHEN interview_module_relation.training_status = 'training' THEN 1
              ELSE 0
            END
          ) AS training_count
        FROM
          interview_module_relation
        GROUP BY
          interview_module_relation.module_id
      ) AS modules
    GROUP BY
      modules.module_id,
      modules.qualified_count,
      modules.training_count
  ) AS modules ON modules.id = interview_module.id
  WHERE interview_module.recruiter_id = get_interview_training_status_count.recruiter_id
  ORDER BY ((modules.training_status_count->>'training')::int + (modules.training_status_count->>'qualified')::int) DESC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interviewer_meetings(target_user_id uuid)
 RETURNS TABLE(interviewer_meetings json)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    RETURN QUERY
    SELECT json_build_object(
                            'start_time', im2.start_time,
                            'end_time', im2.end_time,
                            'duration', ints2.session_duration
                        )
    FROM interview_session_relation intsr2
    JOIN interview_module_relation intmr2 ON intmr2.id = intsr2.interview_module_relation_id 
    JOIN recruiter_user recuser2 ON recuser2.user_id = intmr2.user_id 
    JOIN interview_session ints2 ON intsr2.session_id = ints2.id
    JOIN interview_meeting im2 ON ints2.meeting_id = im2.id
    WHERE recuser2.user_id = target_user_id  -- Changed to target_user_id
    AND intsr2.is_confirmed = true
    AND im2.start_time >= date_trunc('week', CURRENT_DATE)  -- Start of the current week (Monday)
    AND im2.start_time < date_trunc('week', CURRENT_DATE) + INTERVAL '1 week';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interviewers(rec_id uuid)
 RETURNS TABLE(rec_user jsonb, qualified_module_names text[], training_module_names text[], upcoming_meeting_count integer, completed_meeting_count integer)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    RETURN QUERY
     SELECT
        json_build_object(
            'user_id', ru.user_id,
            'first_name', ru.first_name,
            'last_name', ru.last_name,
            'email', ru.email,
            'profile_image', ru.profile_image,
            'position', ru.position,
            'schedule_auth', ru.schedule_auth
        )::JSONB as rec_user,
        array_agg(DISTINCT CASE WHEN intmodrel.training_status = 'qualified' THEN intmod.name ELSE NULL END)::TEXT[] as qualified_module_names,
        array_agg(DISTINCT CASE WHEN intmodrel.training_status = 'training' THEN intmod.name ELSE NULL END)::TEXT[] as training_module_names,
        (SELECT COUNT(*) FROM interview_session_relation intsesrel
         JOIN interview_session intses ON intses.id=intsesrel.session_id 
         JOIN interview_meeting intm ON intm.id=intses.meeting_id 
         JOIN interview_module_relation intmodrel ON intmodrel.id=intsesrel.interview_module_relation_id 
         WHERE intmodrel.user_id= recrel.user_id AND intm.status='confirmed' AND intsesrel.is_confirmed=true)::integer AS upcoming_meeting_count,
        (SELECT COUNT(*) FROM interview_session_relation intsesrel
         JOIN interview_session intses ON intses.id=intsesrel.session_id 
         JOIN interview_meeting intm ON intm.id=intses.meeting_id 
         JOIN interview_module_relation intmodrel ON intmodrel.id=intsesrel.interview_module_relation_id 
         WHERE intmodrel.user_id= recrel.user_id AND intm.status='completed' AND intsesrel.is_confirmed=true)::integer AS completed_meeting_count
    FROM recruiter_relation recrel
    JOIN recruiter_user ru ON ru.user_id = recrel.user_id
    LEFT JOIN interview_module_relation intmodrel ON intmodrel.user_id = ru.user_id 
    LEFT JOIN interview_module intmod ON intmod.id = intmodrel.module_id
    WHERE ru.join_status = 'joined' AND recrel.recruiter_id = rec_id
    GROUP BY recrel.id, ru.user_id;  -- Ensure correct grouping
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_present_scheduled_jobs()
 RETURNS SETOF json
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
    SELECT
      json_build_object(
        'job_id', id::uuid,
        'job_title', job_title::text,
        'time_stamp', TO_TIMESTAMP(active_status -> 'interviewing' ->> 'timeStamp', 'YYYY-MM-DD')::timestamp,
        'current_date', current_date::timestamp
      )
    FROM
      public.public_jobs
    WHERE
    active_status -> 'closed' ->> 'isActive' = 'false' AND
      active_status -> 'interviewing' ->> 'timeStamp' IS NOT NULL
      AND to_timestamp(
        active_status -> 'interviewing' ->> 'timeStamp',
        'YYYY-MM-DD'
      ) = current_date;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_recruiter_name_id(in_application_id uuid)
 RETURNS TABLE(id uuid, name text)
 LANGUAGE plpgsql
AS $function$
DECLARE
    new_message_row RECORD;
BEGIN
    -- Add a new message
    SELECT r.id, r.name INTO new_message_row
    FROM recruiter r
    JOIN public_jobs pj ON pj.recruiter_id = r.id
    JOIN applications a ON a.job_id = pj.id
    WHERE a.id = in_application_id;

    -- Return the inserted row
    RETURN QUERY SELECT new_message_row.id, new_message_row.name;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getallresumematches(jobid uuid, topmatch integer DEFAULT 80, goodmatch integer DEFAULT 60, averagematch integer DEFAULT 40, poormatch integer DEFAULT 20)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE 
  matches jsonb;
BEGIN
  SELECT JSONB_OBJECT_AGG(match, count) INTO matches
  FROM(
    SELECT categories.match as match, COALESCE(match_category.count, 0) AS count
      FROM (
      SELECT 'topMatch' AS match UNION ALL
      SELECT 'goodMatch' UNION ALL
      SELECT 'averageMatch' UNION ALL
      SELECT 'poorMatch' UNION ALL
      SELECT 'noMatch' UNION ALL
      SELECT 'unknownMatch'
    ) AS categories
    LEFT JOIN (
      SELECT 
        CASE 
          WHEN overall_score <= 100 AND overall_score >=topMatch THEN 'topMatch'
          WHEN overall_score < topMatch AND overall_score >=goodMatch THEN 'goodMatch'
          WHEN overall_score < goodMatch AND overall_score >=averageMatch THEN 'averageMatch'
          WHEN overall_score < averageMatch AND overall_score >=poorMatch THEN 'poorMatch'
          WHEN overall_score < poorMatch AND overall_score >=0 THEN 'noMatch'
          ELSE 'unknownMatch'
        END AS match,
      COUNT(*) AS count
      FROM 
        applications
        WHERE 
          job_id = jobId 
        GROUP BY 
          match
    ) AS match_category
    ON categories.match = match_category.match
  ) as m;
RETURN matches;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getapplicationprocessingstatuscount(jobid uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE 
  sections jsonb;
BEGIN
  SELECT JSONB_OBJECT_AGG(processing_status, count) INTO sections
  FROM(
    SELECT categories.processing_status as processing_status, COALESCE(status_category.count, 0) AS count
      FROM (
      SELECT 'processing' AS processing_status UNION ALL
      SELECT 'not started' UNION ALL
      SELECT 'success' UNION ALL
      SELECT 'failed' 
    ) AS categories
    LEFT JOIN (
      SELECT 
      processing_status,
      COUNT(*) AS count
      FROM 
        applications
        WHERE 
          job_id = jobId 
        GROUP BY 
          processing_status
    ) AS status_category
    ON 
    categories.processing_status::application_processing_status = status_category.processing_status
  ) as s;
RETURN sections;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getassessments(recruiterid uuid)
 RETURNS TABLE(id uuid, created_at timestamp with time zone, title text, description text, type template_type, recruiter_id uuid, level question_level, mode assessment_mode, question_count bigint, duration numeric, jobs jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
      assessment.*,
      questions.question_count AS question_count,
      questions.duration AS duration,
      COALESCE(
          jsonb_agg(jsonb_build_object('id', public_jobs.id, 'title', public_jobs.job_title)) FILTER (WHERE public_jobs.id IS NOT NULL),
        '[]'::jsonb
      ) AS jobs
    FROM 
      assessment
    LEFT JOIN 
      assessment_job_relation ON assessment_job_relation.assessment_id = assessment.id
    LEFT JOIN 
      public_jobs ON assessment_job_relation.job_id = public_jobs.id
    LEFT JOIN (
      SELECT 
        assessment_id, 
        COUNT(assessment_question.id) AS question_count,
        SUM(assessment_question.duration) AS duration
      FROM 
        assessment_question
      GROUP BY 
        assessment_id
    ) AS questions ON questions.assessment_id = assessment.id
    WHERE 
      assessment.recruiter_id = recruiterId
    GROUP BY 
      assessment.id, questions.duration, questions.question_count
    ORDER BY 
      assessment.created_at DESC;
END
$function$
;

CREATE OR REPLACE FUNCTION public.getassessmenttemplates()
 RETURNS TABLE(id uuid, created_at timestamp with time zone, title text, description text, type template_type, level question_level, mode assessment_mode, duration numeric, question_count bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
      assessment_template.id as id,
      assessment_template.created_at as created_at,
      assessment_template.title as title,
      assessment_template.description as description,
      assessment_template.type as type,
      assessment_template.level as level,
      assessment_template.mode as mode,
      SUM(question_bank.duration) AS duration,
      COUNT(question_bank.id) AS question_count
    FROM assessment_template 
    LEFT JOIN template_question_relation ON assessment_template.id = template_question_relation.template_id
    LEFT JOIN question_bank ON question_bank.id = template_question_relation.question_id
    GROUP BY assessment_template.id, question_bank.duration, question_bank.id
    ORDER BY assessment_template.created_at DESC;
END
$function$
;

CREATE OR REPLACE FUNCTION public.getexperienceandtenure(jobid uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  average_tenure jsonb;
  tenure jsonb;
  average_experience jsonb;
  experience jsonb;
  result jsonb;
BEGIN
EXECUTE format(
  'CREATE MATERIALIZED VIEW resumes AS (
    SELECT 
      can.resume_json AS resume_json,
      can.id AS id
    FROM applications AS app 
    LEFT JOIN candidate_files AS can 
    ON app.candidate_file_id = can.id 
    WHERE app.job_id = ''%s'')'
,jobId);

SELECT TO_JSONB(AVG((resumes.resume_json -> 'basics' ->> 'totalExperienceInMonths')::numeric)) INTO average_experience
FROM resumes
WHERE resumes.resume_json -> 'basics' ->> 'totalExperienceInMonths' IS NOT NULL;

WITH candidate_avg_experience AS(
SELECT resumes_with_exp.id AS id, resumes_with_exp.average_experience AS average_experience
FROM (SELECT resumes.id, CEIL((resumes.resume_json -> 'basics' ->> 'totalExperienceInMonths')::numeric/12) AS average_experience
  FROM resumes
  WHERE resumes.resume_json -> 'basics' ->> 'totalExperienceInMonths' IS NOT NULL 
  GROUP BY resumes.id, average_experience
) AS resumes_with_exp),
all_possible_experience_levels AS (
  SELECT 
    generate_series(
      (SELECT MIN(candidate_avg_experience.average_experience) FROM candidate_avg_experience),
      (SELECT MAX(candidate_avg_experience.average_experience) FROM candidate_avg_experience)
    ) AS experience_level
), ae AS (
  SELECT all_possible_experience_levels.experience_level AS average_experience, COALESCE(COUNT(candidate_avg_experience.average_experience), 0) AS candidates
  FROM all_possible_experience_levels
  LEFT JOIN 
  candidate_avg_experience ON all_possible_experience_levels.experience_level = candidate_avg_experience.average_experience
  GROUP BY all_possible_experience_levels.experience_level
  ORDER BY all_possible_experience_levels.experience_level
)
SELECT JSONB_OBJECT_AGG(ae.average_experience, ae.candidates) INTO experience
FROM ae;

WITH candidate_avg_tenure AS (
    SELECT 
        resumes.id,
       (resumes.resume_json -> 'basics' ->> 'totalExperienceInMonths')::numeric AS average_tenure,
        jsonb_array_length(resumes.resume_json -> 'positions') AS positions_length
    FROM 
        resumes
        WHERE 
        resumes.resume_json -> 'basics' ->> 'totalExperienceInMonths' IS NOT NULL
        AND jsonb_array_length(resumes.resume_json -> 'positions') > 0
    GROUP BY 
        resumes.id, resumes.resume_json
)
SELECT 
    TO_JSONB(AVG(candidate_avg_tenure.average_tenure/candidate_avg_tenure.positions_length))
INTO average_tenure
FROM 
    candidate_avg_tenure;

WITH candidate_avg_tenure AS(
SELECT resumes_with_exp.id AS id, resumes_with_exp.average_tenure AS average_tenure
FROM (SELECT resumes.id, TRUNC(((resumes.resume_json -> 'basics' ->> 'totalExperienceInMonths')::numeric/jsonb_array_length(resumes.resume_json -> 'positions')::numeric)::numeric/12) AS average_tenure
  FROM resumes
  WHERE resumes.resume_json -> 'basics' ->> 'totalExperienceInMonths' IS NOT NULL 
  AND jsonb_array_length(resumes.resume_json -> 'positions') <> 0
) AS resumes_with_exp),
all_possible_tenure_levels AS (
  SELECT 
    generate_series(
      (SELECT MIN(candidate_avg_tenure.average_tenure) FROM candidate_avg_tenure),
      (SELECT MAX(candidate_avg_tenure.average_tenure) FROM candidate_avg_tenure)
    ) AS tenure_level
), at AS (
  SELECT all_possible_tenure_levels.tenure_level AS average_tenure, COALESCE(COUNT(candidate_avg_tenure.average_tenure), 0) AS candidates
  FROM all_possible_tenure_levels
  LEFT JOIN 
  candidate_avg_tenure ON all_possible_tenure_levels.tenure_level = candidate_avg_tenure.average_tenure
  GROUP BY all_possible_tenure_levels.tenure_level
  ORDER BY all_possible_tenure_levels.tenure_level
)
SELECT JSONB_OBJECT_AGG(at.average_tenure, at.candidates) INTO tenure
FROM at;

result := '{}'::jsonb;
result := jsonb_set(result, '{average_experience}', average_experience, true);
result := jsonb_set(result, '{average_tenure}', average_tenure , true);
result := jsonb_set(result, '{tenure}', tenure, true);
result := jsonb_set(result, '{experience}', experience, true);

DROP MATERIALIZED VIEW resumes;
RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getjob(jobid uuid)
 RETURNS TABLE(active_status jsonb, assessment boolean, company text, created_at timestamp with time zone, department text, description text, description_hash numeric, draft jsonb, email_template jsonb, id uuid, jd_json jsonb, job_title text, job_type public_job_type, location text, parameter_weights jsonb, phone_screen_enabled boolean, posted_by text, recruiter_id uuid, scoring_criteria_loading boolean, status public_job_status, workplace_type public_job_workplace, hiring_manager uuid, recruiter uuid, recruiting_coordinator uuid, sourcer uuid, interview_coordinator uuid, count jsonb, processing_count jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  RETURN QUERY 
  SELECT pbj.active_status, pbj.assessment, pbj.company, pbj.created_at, pbj.department, pbj.description, pbj.description_hash, pbj.draft, pbj.email_template, pbj.id, pbj.jd_json, pbj.job_title, pbj.job_type, pbj.location, pbj.parameter_weights, pbj.phone_screen_enabled, pbj.posted_by, pbj.recruiter_id, pbj.scoring_criteria_loading, pbj.status, pbj.workplace_type, pbj.hiring_manager, pbj.recruiter, pbj.recruiting_coordinator, pbj.sourcer, pbj.interview_coordinator,
       jsonb_object_agg(
           statuses.status,
           COALESCE(apps.count, 0)
       ) AS count, 
       jsonb_object_agg(
           processing_statuses.processing_status,
           COALESCE(p_apps.processing_count, 0)
       ) AS processing_count
FROM public_jobs AS pbj
CROSS JOIN (
    SELECT 'new' AS status UNION ALL
    SELECT 'screening' UNION ALL
    SELECT 'assessment' UNION ALL
    SELECT 'interview' UNION ALL
    SELECT 'qualified' UNION ALL
    SELECT 'disqualified'
) AS statuses
LEFT JOIN (
    SELECT job_id,
           applications.status,
           COUNT(applications.status) as count
    FROM applications
    WHERE job_id = applications.job_id
    GROUP BY job_id, applications.status
) AS apps ON apps.job_id = pbj.id AND apps.status = statuses.status::application_status
CROSS JOIN (
    SELECT 'not started' AS processing_status UNION ALL
    SELECT 'processing' UNION ALL
    SELECT 'success' UNION ALL
    SELECT 'failed'
) AS processing_statuses
LEFT JOIN (
    SELECT job_id,
           applications.processing_status,
           COUNT(applications.processing_status) as processing_count
    FROM applications
    WHERE job_id = applications.job_id --AND applications.candidate_file_id IS NOT NULL
    GROUP BY job_id, applications.processing_status
) AS p_apps ON p_apps.job_id = pbj.id AND p_apps.processing_status = processing_statuses.processing_status::application_processing_status
WHERE pbj.id = jobId
GROUP BY pbj.id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getjobassessments(jobid uuid)
 RETURNS TABLE(id uuid, created_at timestamp with time zone, title text, description text, type template_type, recruiter_id uuid, level question_level, mode assessment_mode, duration numeric)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
      assessment.*,
      questions.duration AS duration
    FROM 
      assessment
    LEFT JOIN 
      assessment_job_relation ON assessment_job_relation.assessment_id = assessment.id
    LEFT JOIN (
      SELECT 
        assessment_id, 
        SUM(assessment_question.duration) AS duration
      FROM 
        assessment_question
      GROUP BY 
        assessment_id
    ) AS questions ON questions.assessment_id = assessment.id
    WHERE 
      assessment_job_relation.job_id  = jobId
    GROUP BY 
      assessment.id, questions.duration
    ORDER BY 
      assessment.created_at DESC;
END
$function$
;

CREATE OR REPLACE FUNCTION public.getjobs(recruiterid uuid)
 RETURNS TABLE(active_status jsonb, assessment boolean, company text, created_at timestamp with time zone, department text, description text, description_hash numeric, draft jsonb, email_template jsonb, id uuid, jd_json jsonb, job_title text, job_type public_job_type, location text, parameter_weights jsonb, phone_screen_enabled boolean, posted_by text, recruiter_id uuid, scoring_criteria_loading boolean, status public_job_status, workplace_type public_job_workplace, count jsonb, processing_count jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  RETURN QUERY 
  SELECT pbj.active_status, pbj.assessment, pbj.company, pbj.created_at, pbj.department, pbj.description, pbj.description_hash, pbj.draft, pbj.email_template, pbj.id, pbj.jd_json, pbj.job_title, pbj.job_type, pbj.location, pbj.parameter_weights, pbj.phone_screen_enabled, pbj.posted_by, pbj.recruiter_id, pbj.scoring_criteria_loading, pbj.status, pbj.workplace_type,
       jsonb_object_agg(
           statuses.status,
           COALESCE(apps.count, 0)
       ) AS count,
       jsonb_object_agg(
           processing_statuses.processing_status,
           COALESCE(p_apps.processing_count, 0)
       ) AS processing_count
FROM public_jobs AS pbj
CROSS JOIN (
    SELECT 'new' AS status UNION ALL
    SELECT 'screening' UNION ALL
    SELECT 'assessment' UNION ALL
    SELECT 'interview' UNION ALL
    SELECT 'qualified' UNION ALL
    SELECT 'disqualified'
) AS statuses
LEFT JOIN (
    SELECT job_id,
           applications.status,
           COUNT(applications.status) as count
    FROM applications
    WHERE job_id IN (
        SELECT pj.id
        FROM public_jobs AS pj
        WHERE pj.recruiter_id = recruiterId
    )
    GROUP BY job_id, applications.status
) AS apps ON apps.job_id = pbj.id AND apps.status = statuses.status::application_status
CROSS JOIN (
    SELECT 'not started' AS processing_status UNION ALL
    SELECT 'processing' UNION ALL
    SELECT 'success' UNION ALL
    SELECT 'failed'
) AS processing_statuses
LEFT JOIN (
    SELECT job_id,
           applications.processing_status,
           COUNT(applications.processing_status) as processing_count
    FROM applications
    WHERE job_id IN (
        SELECT pj.id
        FROM public_jobs AS pj
        WHERE pj.recruiter_id = recruiterId
    ) --AND applications.candidate_file_id IS NOT NULL
    GROUP BY job_id, applications.processing_status
) AS p_apps ON p_apps.job_id = pbj.id AND p_apps.processing_status = processing_statuses.processing_status::application_processing_status 
WHERE pbj.recruiter_id = recruiterId
GROUP BY pbj.id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getjobsv2(recruiter_id uuid)
 RETURNS jsonb[]
 LANGUAGE plpgsql
AS $function$
DECLARE
  job_id UUID;
  job_results JSONB[] DEFAULT ARRAY[]::JSONB[];
BEGIN
  FOR job_id IN SELECT id FROM public_jobs WHERE public_jobs.recruiter_id = getJobsV2.recruiter_id LOOP
    job_results := ARRAY_APPEND(job_results, (SELECT row_to_json(getJob(job_id)))::JSONB);
  END LOOP;
  RETURN job_results;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getlocationspool(jobid uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE 
  location jsonb;
  city_json jsonb;
  state_json jsonb;
  country_json jsonb;
BEGIN
EXECUTE format('
  CREATE MATERIALIZED VIEW locations AS (
    SELECT 
      can.city, can.state, can.country 
    FROM applications AS app 
    LEFT JOIN candidates AS can 
    ON app.candidate_id = can.id 
    WHERE app.job_id =  ''%s''
)', jobId);
SELECT JSONB_OBJECT_AGG(city, count) INTO city_json
FROM (
    SELECT LOWER(city) AS city, count(*) FROM locations WHERE city IS NOT NULL GROUP BY city ORDER BY count(*) DESC LIMIT 5
) AS s;
city_json := jsonb_set(city_json, '{others}', 
((SELECT COALESCE(SUM(count)::text, '0') FROM (SELECT count(*) FROM locations WHERE city IS NOT NULL GROUP BY city ORDER BY count(*) DESC OFFSET 5) AS o))::jsonb, 
true);
city_json := jsonb_set(city_json, '{unknown}', 
((SELECT COALESCE(SUM(count)::text, '0') FROM (SELECT count(*) FROM locations WHERE city IS NULL GROUP BY city ) AS o))::jsonb, 
true);
SELECT JSONB_OBJECT_AGG(state, count) INTO state_json
FROM (
    SELECT LOWER(state) AS state, count(*) from locations WHERE state IS NOT NULL GROUP BY state ORDER BY count(*) DESC LIMIT 5
) AS s;
state_json := jsonb_set(state_json, '{others}', 
((SELECT COALESCE(SUM(count)::text, '0') FROM (SELECT count(*) from locations WHERE state IS NOT NULL GROUP BY state ORDER BY count(*) DESC OFFSET 5) AS o))::jsonb, 
true);
state_json := jsonb_set(state_json, '{unknown}', 
((SELECT COALESCE(SUM(count)::text, '0') FROM (SELECT count(*) from locations WHERE state IS NULL GROUP BY state ) AS o))::jsonb, 
true);
SELECT JSONB_OBJECT_AGG(country, count) INTO country_json
FROM (
    SELECT LOWER(country) AS country, count(*) from locations WHERE country IS NOT NULL GROUP BY country ORDER BY count(*) DESC LIMIT 5
) AS s;
country_json := jsonb_set(country_json, '{others}', 
((SELECT COALESCE(SUM(count)::text, '0') FROM (SELECT count(*) from locations WHERE country IS NOT NULL GROUP BY country ORDER BY count(*) DESC OFFSET 5) AS o))::jsonb, 
true);
country_json := jsonb_set(country_json, '{unknown}', 
((SELECT COALESCE(SUM(count)::text, '0') FROM (SELECT count(*) from locations WHERE country IS NULL GROUP BY country ) AS o))::jsonb, 
true);
location := '{}'::jsonb;
location := jsonb_set(location, '{city}', city_json, true);
location := jsonb_set(location, '{state}', state_json, true);
location := jsonb_set(location, '{country}', country_json, true);
DROP MATERIALIZED VIEW locations;
RETURN location;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getresumematch(jobid uuid, section application_status, topmatch integer DEFAULT 80, goodmatch integer DEFAULT 60, averagematch integer DEFAULT 40, poormatch integer DEFAULT 20)
 RETURNS TABLE(match text, count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT categories.match, COALESCE(match_category.count, 0) AS count
    FROM (
      SELECT 'topMatch' AS match UNION ALL
      SELECT 'goodMatch' UNION ALL
      SELECT 'averageMatch' UNION ALL
      SELECT 'poorMatch' UNION ALL
      SELECT 'noMatch' UNION ALL
      SELECT 'unknownMatch'
    ) AS categories
    LEFT JOIN (
      SELECT 
        CASE 
          WHEN overall_score <= 100 AND overall_score >=topMatch THEN 'topMatch'
          WHEN overall_score < topMatch AND overall_score >=goodMatch THEN 'goodMatch'
          WHEN overall_score < goodMatch AND overall_score >=averageMatch THEN 'averageMatch'
          WHEN overall_score < averageMatch AND overall_score >=poorMatch THEN 'poorMatch'
          WHEN overall_score < poorMatch AND overall_score >=0 THEN 'noMatch'
          ELSE 'unknownMatch'
        END AS match,
        COUNT(*) AS count
        FROM 
        applications
        WHERE 
            job_id = jobId AND status = section
        GROUP BY 
            match
    ) AS match_category
    ON categories.match = match_category.match;
END
$function$
;

CREATE OR REPLACE FUNCTION public.getresumematches(jobid uuid, section application_status, topmatch integer DEFAULT 80, goodmatch integer DEFAULT 60, averagematch integer DEFAULT 40, poormatch integer DEFAULT 20)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE 
  matches jsonb;
BEGIN
  SELECT JSONB_OBJECT_AGG(match, count) INTO matches
  FROM(
    SELECT categories.match as match, COALESCE(match_category.count, 0) AS count
      FROM (
      SELECT 'topMatch' AS match UNION ALL
      SELECT 'goodMatch' UNION ALL
      SELECT 'averageMatch' UNION ALL
      SELECT 'poorMatch' UNION ALL
      SELECT 'noMatch' UNION ALL
      SELECT 'unknownMatch'
    ) AS categories
    LEFT JOIN (
      SELECT 
        CASE 
          WHEN overall_score <= 100 AND overall_score >=topMatch THEN 'topMatch'
          WHEN overall_score < topMatch AND overall_score >=goodMatch THEN 'goodMatch'
          WHEN overall_score < goodMatch AND overall_score >=averageMatch THEN 'averageMatch'
          WHEN overall_score < averageMatch AND overall_score >=poorMatch THEN 'poorMatch'
          WHEN overall_score < poorMatch AND overall_score >=0 THEN 'noMatch'
          ELSE 'unknownMatch'
        END AS match,
      COUNT(*) AS count
      FROM 
        applications
        WHERE 
          job_id = jobId AND
          status = section
        GROUP BY 
          match
    ) AS match_category
    ON categories.match = match_category.match
  ) as m;
RETURN matches;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getsectioncounts(jobid uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE 
  sections jsonb;
BEGIN
  SELECT JSONB_OBJECT_AGG(status, count) INTO sections
  FROM(
    SELECT categories.status as status, COALESCE(status_category.count, 0) AS count
      FROM (
      SELECT 'new' AS status UNION ALL
      SELECT 'screening' UNION ALL
      SELECT 'assessment' UNION ALL
      SELECT 'interview' UNION ALL
      SELECT 'qualified' UNION ALL
      SELECT 'disqualified'
    ) AS categories
    LEFT JOIN (
      SELECT 
      status,
      COUNT(*) AS count
      FROM 
        applications
        WHERE 
          job_id = jobId 
        GROUP BY 
          status
    ) AS status_category
    ON 
    categories.status::application_status = status_category.status
  ) as s;
RETURN sections;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getskillpools(jobid uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE 
  skill jsonb;
  top_skills jsonb;
  required_skills jsonb;
BEGIN 
  EXECUTE format('
  CREATE MATERIALIZED VIEW candidate_skills AS (
    SELECT
      jsonb_array_elements_text((can.resume_json ->> ''skills'')::jsonb) AS all_skills
    FROM
      applications as app
    LEFT JOIN 
      candidate_files AS can ON app.candidate_file_id = can.id
    WHERE
      app.job_id = ''%s''
  )
', jobId);
  SELECT JSON_OBJECT_AGG(skills, count) INTO top_skills
  FROM (
    SELECT 
      LOWER(all_skills) as skills, 
      COUNT(all_skills)
    FROM candidate_skills
    GROUP BY LOWER(all_skills)
    ORDER BY count DESC
    LIMIT 10 
    ) AS can;
  SELECT JSON_OBJECT_AGG(skills, count) INTO required_skills
  FROM (
    SELECT
      job.skills, 
      COALESCE(can.count , 0) as count
    FROM
      (SELECT
        LOWER((jsonb_array_elements_text((jd_json -> 'skills')::jsonb)::jsonb) ->> 'field') AS skills
      FROM
        public_jobs
      WHERE
        id = jobId
        ) AS job 
    LEFT JOIN
      (SELECT 
        LOWER(all_skills) as skills, 
        COUNT(all_skills)
      FROM candidate_skills 
      GROUP BY 
        LOWER(all_skills)) AS can
    ON can.skills = job.skills
    ORDER BY count DESC
  ) as s;
skill := '{}'::jsonb;
skill := jsonb_set(skill, '{top_skills}', top_skills, true);
skill := jsonb_set(skill, '{required_skills}', required_skills, true);
DROP MATERIALIZED VIEW candidate_skills;
RETURN skill;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.getskillspool(jobid uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE 
  skill jsonb;
BEGIN 
  SELECT JSON_OBJECT_AGG(skills, count) INTO skill
  FROM (
    SELECT 
      LOWER(all_skills) as skills, 
      COUNT(all_skills)
    FROM
    (SELECT
      jsonb_array_elements_text((can.resume_json ->> 'skills')::jsonb) all_skills
      FROM
        applications as app
      LEFT JOIN 
        candidate_files AS can ON app.candidate_file_id = can.id
      WHERE
        app.job_id = jobId
    ) AS subquery
    GROUP BY all_skills
    ORDER BY COUNT(all_skills) DESC
    LIMIT 25 
    ) AS can;
RETURN skill;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.insert_interview_session(module_id uuid, interview_plan_id uuid, session_order integer, session_duration integer, break_duration integer, interviewer_cnt integer, session_type session_type, location text, schedule_type interview_schedule_type, name text, interview_module_relation_entries jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    WITH sessions_to_update AS (
    SELECT id
    FROM interview_session 
    WHERE interview_session.interview_plan_id = insert_interview_session.interview_plan_id
    AND interview_session.session_order >= insert_interview_session.session_order
    )
    UPDATE interview_session
    SET session_order = interview_session.session_order + 1
    WHERE interview_session.id 
    IN (
      SELECT id
      FROM sessions_to_update
    );
    WITH new_interview_session AS (
        INSERT INTO interview_session (
            module_id, 
            interview_plan_id, 
            session_order, 
            session_duration, 
            break_duration, 
            interviewer_cnt, 
            session_type, 
            location, 
            schedule_type, 
            name
        )
        VALUES (
            module_id,
            interview_plan_id,
            session_order,
            session_duration,
            break_duration,
            interviewer_cnt,
            session_type,
            location,
            schedule_type,
            name
        )
        RETURNING id
    )
    INSERT INTO interview_session_relation (interview_module_relation_id, session_id, interviewer_type, training_type)
    SELECT 
        (entry->>'id')::uuid AS interview_module_relation_id,
        new_interview_session.id AS session_id,
        (entry->>'interviewer_type')::status_training AS interviewer_type,
        (entry->>'training_type')::interviewer_type AS training_type
    FROM 
        jsonb_array_elements(interview_module_relation_entries) AS entry,
        new_interview_session;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.interviewing_state_active()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE public_jobs
  SET
    active_status = jsonb_set(
      active_status,
      '{interviewing, isActive}',
      'true',
      true
    )
  WHERE
    active_status -> 'closed' ->> 'isActive' = 'false' AND
    active_status -> 'interviewing' ->> 'timeStamp' IS NOT NULL
    AND to_timestamp(
      active_status -> 'interviewing' ->> 'timeStamp',
      'YYYY-MM-DD'
    ) = current_date;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.job_application_filter_sort(jb_id uuid, min_lat double precision DEFAULT 0, min_long double precision DEFAULT 0, max_lat double precision DEFAULT 0, max_long double precision DEFAULT 0, j_status text DEFAULT 'new'::text, from_rec_num numeric DEFAULT 0, end_rec_num numeric DEFAULT 100, min_resume_score numeric DEFAULT '-1'::integer, max_resume_score numeric DEFAULT 100, min_interview_score numeric DEFAULT 0, max_interview_score numeric DEFAULT 100, sort_column_text text DEFAULT 'overall_score'::text, is_sort_desc boolean DEFAULT true, text_search_qry text DEFAULT ''::text, sort_by_schedule text DEFAULT 'asc'::text, is_locat_filter_on boolean DEFAULT false)
 RETURNS TABLE(job_app json, cand json, tasks json, candfiles json, assres jsonb, schedule json, interview_session_meetings jsonb, fil_res bigint)
 LANGUAGE plpgsql
AS $function$ 
 
BEGIN
  fil_res := 0;
  RETURN QUERY 
  WITH filtered_results AS (
    SELECT
      row_to_json(ja) AS job_app,
      row_to_json(c) AS cand,
      (SELECT json_agg(new_tasks.*)
      FROM new_tasks
      WHERE ja.id = new_tasks.application_id
      ) AS tasks,
      json_build_object(
        'id', cf.id,
        'created_at', cf.created_at, 
        'file_url', cf.file_url, 
        'candidate_id', cf.candidate_id, 
        'resume_text', cf.resume_text, 
        'resume_json', cf.resume_json, 
        'type', cf.type
      ) AS  candfiles,
      (
        SELECT jsonb_agg(to_jsonb(ar.*) ORDER BY ar.created_at DESC) 
        FROM assessment_results ar 
        WHERE ar.application_id = ja.id
      ) AS assres,
      row_to_json(insc) AS schedule,
      (
            SELECT jsonb_agg(interview_sessions.interview_session_meeting) -- Changed to interview_sessions.interview_session_meeting
            FROM (
                SELECT
                    CASE
                        WHEN insc.id IS NULL THEN
                            jsonb_build_object(
                                'interview_session', row_to_json(intses),
                                'interview_meeting', null
                            )
                        ELSE
                            jsonb_build_object(
                                'interview_session', row_to_json(intses),
                                'interview_meeting', row_to_json(intmeet)
                            )
                    END AS interview_session_meeting
                FROM interview_session intses
                LEFT JOIN interview_meeting intmeet ON intmeet.id = intses.meeting_id
                LEFT JOIN interview_schedule intsch ON intsch.id = intmeet.interview_schedule_id
                WHERE
                    (insc.id IS NULL AND intses.interview_plan_id = intplan.id)
                    OR (insc.id IS NOT NULL AND insc.id = intsch.id)
                ORDER BY intses.session_order
            ) AS interview_sessions
        ) AS interview_session_meetings 
    FROM
      applications ja      
      JOIN candidates c ON ja.candidate_id = c.id     
      LEFT JOIN candidate_files cf ON cf.id = ja.candidate_file_id
      LEFT JOIN interview_plan intplan ON intplan.job_id=ja.job_id
      -- LEFT JOIN assessment_results ar ON ar.application_id = ja.id
      LEFT JOIN interview_schedule insc ON insc.application_id = ja.id
    WHERE
      ja.job_id = jb_id
      AND ja.status::text = j_status
      AND (ja.overall_score >= min_resume_score AND ja.overall_score <= max_resume_score)
      AND (
        length(text_search_qry) = 0
        OR (LOWER(c.first_name || ' ' || c.last_name || ' ' || c.email) LIKE LOWER('%' || text_search_qry || '%'))
      )
      AND (
        NOT is_locat_filter_on -- If is_locat_filter_on is false, skip the geolocation filter
        OR (is_locat_filter_on and c.geolocation && ST_SetSRID(ST_MakeBox2D(ST_Point(min_long, min_lat), ST_Point(max_long, max_lat)), 4326))
      )
  )
  SELECT 
    fr.job_app,
    fr.cand,
    fr.tasks,
    fr.candfiles,
    fr.assres,
    fr.schedule,
    fr.interview_session_meetings,
    count(*) OVER () AS fil_res
  FROM filtered_results fr
ORDER BY
    CASE WHEN sort_by_schedule = 'asc' THEN (fr.schedule->'schedule_time'->>'startTime')::timestamp END ASC,
    CASE 
        WHEN sort_column_text = 'overall_score' AND is_sort_desc THEN COALESCE((fr.job_app->>'overall_score')::numeric, -1)
    END DESC,
    CASE 
        WHEN sort_column_text = 'overall_score' AND NOT is_sort_desc THEN COALESCE((fr.job_app->>'overall_score')::numeric, -1)
    END ASC ,
    CASE 
        WHEN sort_column_text = 'full_name' AND is_sort_desc THEN concat(fr.cand->>'first_name',' ',fr.cand->>'last_name')
    END DESC,
    CASE 
        WHEN sort_column_text = 'full_name' AND NOT is_sort_desc THEN concat(fr.cand->>'first_name',' ',fr.cand->>'last_name')
    END ASC,
    CASE 
        WHEN sort_column_text = 'email' AND is_sort_desc THEN fr.cand->>'email'
    END DESC,
    CASE 
        WHEN sort_column_text = 'email' AND NOT is_sort_desc THEN fr.cand->>'email'
    END ASC,
    CASE 
        WHEN sort_column_text = 'applied_at' AND is_sort_desc THEN fr.job_app->>'applied_at'
    END DESC,
    CASE 
        WHEN sort_column_text = 'applied_at' AND NOT is_sort_desc THEN fr.job_app->>'applied_at'
    END ASC 
  LIMIT (end_rec_num-from_rec_num)
  OFFSET from_rec_num;
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

            SELECT value INTO function_url FROM env WHERE name = 'lever-sync';
            -- Make the HTTP request for each application_id
            SELECT
                net.http_post(
                    url := function_url,
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

create or replace view "public"."meeting_details" as  SELECT interview_meeting.id,
    interview_meeting.created_at,
    interview_meeting.interview_schedule_id,
    interview_meeting.meeting_json,
    interview_meeting.status,
    interview_meeting.instructions,
    interview_meeting.meeting_link,
    interview_meeting.confirmed_date,
    interview_meeting.start_time,
    interview_meeting.end_time,
    interview_meeting.cal_event_id,
    interview_meeting.candidate_feedback,
    interview_meeting.organizer_id,
    interview_session.id AS session_id,
    interview_session.name AS session_name,
    interview_session.break_duration,
    interview_session.session_order,
    interview_session.session_duration,
    interview_session.session_type,
    interview_session.schedule_type
   FROM (interview_meeting
     LEFT JOIN interview_session ON ((interview_meeting.id = interview_session.meeting_id)));


CREATE OR REPLACE FUNCTION public.move_scheduled_jobs_sourcing_to_active()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE public_jobs
  SET
    active_status = jsonb_set(
      active_status,
      '{sourcing, isActive}',
      'true',
      true
    )
  WHERE
    active_status -> 'closed' ->> 'isActive' = 'false'
    AND active_status -> 'sourcing' ->> 'timeStamp' IS NOT NULL
    AND to_date(
      active_status -> 'sourcing' ->> 'timeStamp',
      'YYYY-MM-DD'
    ) = current_date;
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
BEGIN
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
            url := function_url,
            body := aggregated_data  -- Use aggregated_data here
        ) INTO request_results;

    -- Return the HTTP request result
    RETURN request_results;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.reorder_sessions(sessions jsonb, interview_plan_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  var_session_data jsonb;
  var_session_id uuid;
  var_session_order numeric;
BEGIN
  FOR var_session_data IN SELECT * FROM jsonb_array_elements(sessions)
    LOOP
        var_session_id := (var_session_data->>'id')::uuid;
        var_session_order := (var_session_data->>'session_order')::numeric;
        UPDATE interview_session
        SET session_order = var_session_order
        WHERE id = var_session_id;
    END LOOP;

    UPDATE interview_session AS iss
    SET break_duration = 0
    WHERE iss.id = (
        SELECT isss.id 
        FROM interview_session isss 
        WHERE isss.interview_plan_id = reorder_sessions.interview_plan_id
        ORDER BY isss.session_order DESC
        LIMIT 1
    );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.retrybatchcalcresumejdscore()
 RETURNS jsonb[]
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB[];
BEGIN
    -- Initialize an empty JSONB array for the results
    result := ARRAY[]::JSONB[];

    -- Select up to 50 records that meet the specified conditions
    SELECT ARRAY_AGG(row_to_json(data))
    INTO result
    FROM (
       SELECT ja.id AS application_id,
           ja.candidate_id AS candidate_id,
           ja.score_json AS jd_score,
           cf.file_url AS resume,
           cf.id AS file_id,
           cf.resume_json AS json_resume,
           cf.resume_text AS resume_text,
           ja.job_id as job_id,
           pj.company as company,
           pj.jd_json as jd_json,
           pj.parameter_weights as parameter_weights,
           1 as retry
           FROM applications ja join candidate_files cf on cf.id = ja.candidate_file_id
       JOIN public_jobs pj ON ja.job_id = pj.id
       WHERE ja.processing_status in ('failed') and pj.status='published'  and retry < 1 and pj.jd_json is not null
       ORDER BY ja.created_at ASC
       LIMIT 25
    ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.secondretrybatchcalcresumejdscore()
 RETURNS jsonb[]
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB[];
BEGIN
    -- Initialize an empty JSONB array for the results
    result := ARRAY[]::JSONB[];

    -- Select up to 50 records that meet the specified conditions
    SELECT ARRAY_AGG(row_to_json(data))
    INTO result
    FROM (
      SELECT ja.id AS application_id,
           ja.candidate_id AS candidate_id,
           ja.score_json AS jd_score,
           cf.file_url AS resume,
           cf.id AS file_id,
           cf.resume_json AS json_resume,
           cf.resume_text AS resume_text,
           ja.job_id as job_id,
           pj.company as company,
           pj.jd_json as jd_json,
           pj.parameter_weights as parameter_weights,
           2 as retry
           FROM applications ja join candidate_files cf on cf.id = ja.candidate_file_id
       JOIN public_jobs pj ON ja.job_id = pj.id
       WHERE ja.processing_status in ('failed') and pj.status='published'  and retry >= 1 and retry < 2 and pj.jd_json is not null
       ORDER BY ja.created_at ASC
       LIMIT 10
    ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_active_rec(in_user_id uuid, in_recruiter_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
is_admin boolean;
BEGIN
      update recruiter_relation set is_active = (in_recruiter_id = recruiter_id) where user_id = in_user_id;
    RETURN true;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_conversion_timestamp()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  update applications
  set converted_at = now()
  where id = old.id and old.status <> new.status;
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_create_interview_plan()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  insert into interview_plan(job_id)
  values (new.id);
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_set_application_to_new()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  update applications 
  set is_new = true
  where id = new.id;
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.update_interview_session(session_id uuid, module_id uuid, session_duration integer, break_duration integer, interviewer_cnt integer, session_type session_type, location text, schedule_type interview_schedule_type, name text, interview_module_relation_entries jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    UPDATE interview_session
    SET  
      module_id = update_interview_session.module_id,
      session_duration = update_interview_session.session_duration,
      break_duration = update_interview_session.break_duration,
      interviewer_cnt = update_interview_session.interviewer_cnt,
      session_type = update_interview_session.session_type,
      location = update_interview_session.location,
      schedule_type = update_interview_session.schedule_type,
      name = update_interview_session.name
    WHERE interview_session.id = update_interview_session.session_id;
    DELETE FROM interview_session_relation WHERE interview_session_relation.session_id = update_interview_session.session_id;
    INSERT INTO interview_session_relation (interview_module_relation_id, session_id, interviewer_type, training_type)
    SELECT 
        (entry->>'id')::uuid AS interview_module_relation_id,
        update_interview_session.session_id AS session_id,
        (entry->>'interviewer_type')::status_training AS interviewer_type,
        (entry->>'training_type')::interviewer_type AS training_type
    FROM 
        jsonb_array_elements(interview_module_relation_entries) AS entry;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_resume_score(job_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    job_data record;
    parameter_weights_x jsonb;  -- Fixed parameter_weights for all rows
    result_score numeric;     -- Variable to store the result of get_combined_resume_score
BEGIN
    -- Fetch the fixed parameter_weights from the public_jobs table
    SELECT parameter_weights
    INTO parameter_weights_x
    FROM public_jobs
    WHERE id = job_id;
    -- Check if the parameter_weights were found, and if not, return false
    IF NOT FOUND THEN
        RETURN false;
    END IF;
    FOR job_data IN (
        SELECT score_json, id
        FROM applications
        WHERE applications.job_id = update_resume_score.job_id AND score_json IS NOT NULL
    )
    LOOP
        -- Call your get_combined_resume_score function with jd_score and fixed parameter_weights
        result_score := get_combined_resume_score(job_data.score_json, parameter_weights_x);
        -- Update the same row in the job_applications table with the result
        UPDATE applications
        SET overall_score = result_score
        WHERE id = job_data.id;
    END LOOP;
    -- If the loop completes without errors, return true
    RETURN true;
END $function$
;

CREATE OR REPLACE FUNCTION public.updatequestionorder(start_point integer, question_ids uuid[])
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    WITH question_order AS (
        SELECT 
            id,
            start_point + (ROW_NUMBER() OVER ()) - 1 AS new_order
        FROM 
            unnest(question_ids) WITH ORDINALITY AS t(id, ordinal)
    )
    UPDATE 
        assessment_question AS aq
    SET 
        "order" = qo.new_order
    FROM 
        question_order AS qo
    WHERE 
        aq.id = qo.id;
    
END
$function$
;


