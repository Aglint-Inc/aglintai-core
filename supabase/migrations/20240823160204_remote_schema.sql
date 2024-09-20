alter table "public"."recruiter" alter column "scheduling_settings" set default '{"timeZone": {"utc": "+05:30", "name": "(GMT+05:30) Mumbai, Delhi, Bengaluru, Kolkata, Chennai", "label": "Asia/Calcutta (GMT+05:30)", "tzCode": "Asia/Calcutta"}, "break_hour": {"end_time": "13:00", "start_time": "12:00"}, "totalDaysOff": [{"date": "01 Jan 2024", "event_name": "New Year Day"}, {"date": "16 Jan 2024", "event_name": "Martin Luther King Jr. Day"}, {"date": "19 Feb 2024", "event_name": "Presidents Day"}, {"date": "27 May 2024", "event_name": "Memorial Day"}, {"date": "19 Jun 2024", "event_name": "National Independence Day"}, {"date": "04 Jul 2024", "event_name": "Independence Day"}, {"date": "02 Sep 2024", "event_name": "Labor Day"}, {"date": "14 Oct 2024", "event_name": "Columbus Day"}, {"date": "11 Nov 2024", "event_name": "Veterans Day"}, {"date": "28 Nov 2024", "event_name": "Thanksgiving Day"}, {"date": "25 Dec 2024", "event_name": "Christmas Day"}], "workingHours": [{"day": "sunday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "monday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "tuesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "wednesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "thursday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "friday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "saturday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}], "interviewLoad": {"dailyLimit": {"type": "Interviews", "value": 8}, "weeklyLimit": {"type": "Interviews", "value": 41}}, "debrief_defaults": {"sourcer": false, "recruiter": false, "hiring_manager": true, "previous_interviewers": false, "recruiting_coordinator": false}, "schedulingKeyWords": {"free": ["Personal Time", "Break", "Team Lunch", "Networking Event", "Office Hours", "Casual Meetup"], "outOfOffice": ["Maternity Leave", "Vacation", "PTO", "Out of Office"], "SoftConflicts": ["Daily Standup", "Project Review", "Sprint Planning", "Strategy Session", "Team Briefing"], "recruitingBlocks": ["Dedicated Recruiting", "Recruiting Block"]}, "isAutomaticTimeZone": false}'::jsonb;

alter table "public"."recruiter_user" add column "calendar_sync" jsonb;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.batchtriggergreenhouse()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$DECLARE
    request_results JSONB;  -- Variable to store the HTTP request result
    function_url text;
BEGIN

    -- Check if result is not NULL and make an HTTP request if it's not empty
    IF exists( SELECT
           id AS application_id
       FROM applications
       WHERE is_resume_fetching
       ORDER BY created_at ASC ) THEN
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
END;$function$
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

CREATE OR REPLACE FUNCTION public.create_new_workflow_action_log(triggered_table workflow_cron_trigger_tables, triggered_table_pkey uuid, workflow_id uuid, workflow_action_id uuid, interval_minutes numeric, phase text, meta json, base_time timestamp with time zone DEFAULT now())
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    execute_at TIMESTAMP with time zone;
BEGIN
    IF base_time IS NULL THEN
        base_time := NOW();
    END IF;
    -- Calculate execution time based on the phase and interval
    IF phase = 'before' THEN
        execute_at := base_time - (interval_minutes * INTERVAL '1 minute');
    ELSE
        execute_at := base_time + (interval_minutes * INTERVAL '1 minute');
    END IF;

    -- Insert record into workflow_action_logs
    INSERT INTO workflow_action_logs (workflow_id, workflow_action_id, meta, execute_at,related_table,related_table_pkey)
    VALUES (workflow_id, workflow_action_id, meta, execute_at,triggered_table,triggered_table_pkey);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_session_requests(applications uuid[] DEFAULT '{}'::uuid[], sessions uuid[] DEFAULT '{}'::uuid[], request jsonb DEFAULT NULL::jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  application uuid;
BEGIN
    FOR application IN SELECT UNNEST(applications) LOOP
      PERFORM create_session_request(application, sessions, request);
    END LOOP;
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

CREATE OR REPLACE FUNCTION public.get_requests_candidate_list(rec_id uuid)
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

CREATE OR REPLACE FUNCTION public.scheduling_analytics_completed_interviews(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], type text DEFAULT 'day'::text)
 RETURNS TABLE(date date, count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
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
          date_trunc(
            (
              case
                when scheduling_analytics_completed_interviews.type = 'month' then 'month'
                else 'day'
              end
            ),
            interviews.end_time
          )::date as end_time
        from
          interviews
        where
          interviews.recruiter_id = scheduling_analytics_completed_interviews.recruiter_id
          and interviews.status = 'completed'
          and date_trunc(
            (
              case
                when scheduling_analytics_completed_interviews.type = 'month' then 'month'
                else 'day'
              end
            ),
            interviews.end_time
          )::date <= date_trunc(
            (
              case
                when scheduling_analytics_completed_interviews.type = 'month' then 'month'
                else 'day'
              end
            ),
            now()::date
          )::date
          and date_trunc(
            (
              case
                when scheduling_analytics_completed_interviews.type = 'month' then 'month'
                else 'day'
              end
            ),
            interviews.end_time
          )::date >= date_trunc(
            (
              case
                when scheduling_analytics_completed_interviews.type = 'month' then 'month'
                else 'day'
              end
            ),
            now()::date
          )::date - (
            case
              when scheduling_analytics_completed_interviews.type = 'month' then '12 months'
              else '30 days'
            end
          )::interval
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
                  date_trunc(
                    (
                      case
                        when scheduling_analytics_completed_interviews.type = 'month' then 'month'
                        else 'day'
                      end
                    ),
                    now()::date
                  )::date - (
                    case
                      when scheduling_analytics_completed_interviews.type = 'month' then '11 months'
                      else '29 days'
                    end
                  )::interval
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
                      date_trunc(
                        (
                          case
                            when scheduling_analytics_completed_interviews.type = 'month' then 'month'
                            else 'day'
                          end
                        ),
                        now()::date
                      )::date
                    )
                )
              )
            )::date,
            date_trunc(
              (
                case
                  when scheduling_analytics_completed_interviews.type = 'month' then 'month'
                  else 'day'
                end
              ),
              now()::date
            )::date,
            (
              case
                when scheduling_analytics_completed_interviews.type = 'month' then '1 month'
                else '1 day'
              end
            )::interval
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

CREATE OR REPLACE FUNCTION public.scheduling_analytics_training_progress(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], type status_training DEFAULT 'qualified'::status_training)
 RETURNS TABLE(number_of_shadow bigint, noshadow numeric, number_of_reverse_shadow bigint, noreverseshadow numeric, user_id uuid, name text, "position" text)
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
         ( modules.settings ->> 'noReverseShadow')::numeric as noReverseShadow,
          recruiter_user.user_id,
          modules.name,
          recruiter_user.position
        from
          interview_module_relation
          left join modules on modules.id = interview_module_relation.module_id
          left join recruiter_user on recruiter_user.user_id = interview_module_relation.user_id
        where
          modules.recruiter_id = scheduling_analytics_training_progress.recruiter_id
          and interview_module_relation.training_status = scheduling_analytics_training_progress.type
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

CREATE OR REPLACE FUNCTION public.trigger_clone_interview_session()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    company_id uuid;
    appl_job_id uuid;
    int_schedule_id uuid := gen_random_uuid();  -- Assuming this is to generate a new UUID
    session_rec record;
    sesn_reln_record record;
    inserted_sesn_id uuid;
    inserted_meet_id uuid;
    inserted_plan_id uuid;
    int_plan_loop record;
BEGIN
    -- Delete any existing interview schedules for this application
    DELETE FROM interview_schedule WHERE interview_schedule.application_id = NEW.id;

    -- Fetch the recruiter ID for the application
    SELECT public_jobs.recruiter_id 
    INTO company_id 
    FROM applications
    LEFT JOIN public_jobs ON public_jobs.id = applications.job_id 
    WHERE applications.id = NEW.id;

    -- Insert a new interview schedule record
    INSERT INTO interview_schedule(id, application_id, recruiter_id) 
    VALUES (int_schedule_id, NEW.id, company_id);

    -- Fetch the job ID for the application
    SELECT job_id 
    INTO appl_job_id 
    FROM applications 
    WHERE id = NEW.id;

    -- Loop through each interview plan related to the job
    FOR int_plan_loop IN 
        SELECT 
            interview_plan.id AS plan_id,
            interview_plan.name,
            interview_plan.plan_order
        FROM interview_plan 
        WHERE interview_plan.job_id = appl_job_id
    LOOP
        -- Insert into interview_plan and get the inserted plan_id
        INSERT INTO interview_plan (name, plan_order)
        VALUES (int_plan_loop.name, int_plan_loop.plan_order)
        RETURNING id INTO inserted_plan_id;

        FOR session_rec IN
            SELECT 
                interview_session.id AS id,
                interview_session.break_duration,
                interview_session.interviewer_cnt,
                interview_session.location,
                interview_session.module_id,
                interview_session.name,
                interview_session.schedule_type,
                interview_session.session_duration,
                interview_session.session_order,
                interview_session.session_type
            FROM interview_session
            WHERE interview_session.interview_plan_id = int_plan_loop.plan_id
        LOOP
            -- Insert interview meeting and session within a single SQL command using CTEs
            WITH inserted_meeting_cte AS (
                INSERT INTO interview_meeting (interview_schedule_id, status,application_id)
                VALUES (int_schedule_id, 'not_scheduled',NEW.id)
                RETURNING id
            ),
            inserted_session_cte AS (
                INSERT INTO interview_session (
                    break_duration,
                    interviewer_cnt,
                    location,
                    module_id,
                    name,
                    schedule_type,
                    session_duration,
                    session_order,
                    session_type,
                    parent_session_id,
                    meeting_id,
                    interview_plan_id
                )
                VALUES (
                    session_rec.break_duration,
                    session_rec.interviewer_cnt,
                    session_rec.location,
                    session_rec.module_id,
                    session_rec.name,
                    session_rec.schedule_type,
                    session_rec.session_duration,
                    session_rec.session_order,
                    session_rec.session_type,
                    session_rec.id,
                    (SELECT id FROM inserted_meeting_cte),
                    inserted_plan_id
                )
                RETURNING id
            )
            SELECT 
                (SELECT id FROM inserted_meeting_cte),
                (SELECT id FROM inserted_session_cte)
            INTO inserted_meet_id, inserted_sesn_id;

            -- Insert relations for the session
            FOR sesn_reln_record IN 
            (
                SELECT 
                    interview_session_relation.interview_module_relation_id,
                    interview_session_relation.interviewer_type,
                    interview_session_relation.user_id,
                    interview_session_relation.training_type
                FROM interview_session_relation 
                WHERE interview_session_relation.session_id = session_rec.id
            )
            LOOP
                INSERT INTO interview_session_relation(
                    interview_module_relation_id,
                    interviewer_type,
                    user_id,
                    training_type,
                    session_id
                ) 
                VALUES (
                    sesn_reln_record.interview_module_relation_id,
                    sesn_reln_record.interviewer_type,
                    sesn_reln_record.user_id,
                    sesn_reln_record.training_type,
                    inserted_sesn_id
                );
            END LOOP;
        END LOOP;
    END LOOP;

    RETURN NEW;
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


