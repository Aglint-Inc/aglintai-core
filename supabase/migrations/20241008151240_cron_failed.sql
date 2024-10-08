alter table "public"."recruiter" alter column "scheduling_settings" set default '{"timeZone": {"utc": "+05:30", "name": "(GMT+05:30) Mumbai, Delhi, Bengaluru, Kolkata, Chennai", "label": "Asia/Calcutta (GMT+05:30)", "tzCode": "Asia/Calcutta"}, "break_hour": {"end_time": "13:00", "start_time": "12:00"}, "totalDaysOff": [{"date": "01 Jan 2024", "event_name": "New Year Day"}, {"date": "16 Jan 2024", "event_name": "Martin Luther King Jr. Day"}, {"date": "19 Feb 2024", "event_name": "Presidents Day"}, {"date": "27 May 2024", "event_name": "Memorial Day"}, {"date": "19 Jun 2024", "event_name": "National Independence Day"}, {"date": "04 Jul 2024", "event_name": "Independence Day"}, {"date": "02 Sep 2024", "event_name": "Labor Day"}, {"date": "14 Oct 2024", "event_name": "Columbus Day"}, {"date": "11 Nov 2024", "event_name": "Veterans Day"}, {"date": "28 Nov 2024", "event_name": "Thanksgiving Day"}, {"date": "25 Dec 2024", "event_name": "Christmas Day"}], "workingHours": [{"day": "sunday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "monday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "tuesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "wednesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "thursday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "friday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "saturday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}], "interviewLoad": {"dailyLimit": {"type": "Interviews", "value": 8}, "weeklyLimit": {"type": "Interviews", "value": 41}}, "debrief_defaults": {"sourcer": false, "recruiter": false, "hiring_manager": true, "previous_interviewers": false, "recruiting_coordinator": false}, "schedulingKeyWords": {"free": ["Personal Time", "Break", "Team Lunch", "Networking Event", "Office Hours", "Casual Meetup"], "outOfOffice": ["Maternity Leave", "Vacation", "PTO", "Out of Office"], "SoftConflicts": ["Daily Standup", "Project Review", "Sprint Planning", "Strategy Session", "Team Briefing"], "recruitingBlocks": ["Dedicated Recruiting", "Recruiting Block"]}, "isAutomaticTimeZone": false}'::jsonb;

alter table "public"."recruiter_user" alter column "scheduling_settings" set default '{"timeZone": {"utc": "-08:00", "name": "(GMT-08:00) Los Angeles, San Diego, San Jose, San Francisco, Seattle", "label": "America/Los_Angeles (GMT-08:00)", "tzCode": "America/Los_Angeles"}, "break_hour": {"end_time": "13:30", "start_time": "13:00"}, "totalDaysOff": [{"date": "01 Jan 2024", "event_name": "New Year Day"}, {"date": "16 Jan 2024", "event_name": "Martin Luther King Jr. Day"}, {"date": "19 Feb 2024", "event_name": "Presidents Day"}, {"date": "27 May 2024", "event_name": "Memorial Day"}, {"date": "19 Jun 2024", "event_name": "Juneteenth National Independence Day"}, {"date": "04 Jul 2024", "event_name": "Independence Day"}, {"date": "02 Sep 2024", "event_name": "Labor Day"}, {"date": "14 Oct 2024", "event_name": "Columbus Day"}, {"date": "11 Nov 2024", "event_name": "Veterans Day"}, {"date": "28 Nov 2024", "event_name": "Thanksgiving Day"}, {"date": "25 Dec 2024", "event_name": "Christmas Day"}], "workingHours": [{"day": "sunday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "monday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "tuesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "wednesday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "thursday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "friday", "isWorkDay": true, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}, {"day": "saturday", "isWorkDay": false, "timeRange": {"endTime": "17:00", "startTime": "09:00"}}], "interviewLoad": {"dailyLimit": {"type": "Hours", "value": 4}, "weeklyLimit": {"type": "Hours", "value": 20}}, "schedulingKeyWords": {"free": ["Personal Time", "Break", "Team Lunch", "Networking Event", "Office Hours", "Casual Meetup"], "outOfOffice": ["Maternity leave", "vacation", "pto", "out of office", "ooo"], "SoftConflicts": ["Daily Standup", "Sync Up", "Project Review", "Sprint Planning", "Strategy Session", "Team Briefing"], "recruitingBlocks": ["dedicated recruiting", "Recruiting Block"]}, "isAutomaticTimeZone": false}'::jsonb;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_user(first_name text, last_name text, employment text, "position" text, phone text, scheduling_settings json, user_id uuid, recruiter_id uuid, department_id integer DEFAULT NULL::integer, manager_id uuid DEFAULT NULL::uuid, role_id uuid DEFAULT NULL::uuid, office_location_id integer DEFAULT NULL::integer, linked_in text DEFAULT NULL::text, profile_image text DEFAULT NULL::text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    UPDATE recruiter_user
    SET
        department_id = update_user.department_id,
        employment = update_user.employment::employment_type_enum,
        first_name = update_user.first_name,
        last_name = update_user.last_name,
        linked_in = update_user.linked_in,
        office_location_id = update_user.office_location_id,
        phone = update_user.phone,
        "position" = update_user."position",
        profile_image = update_user.profile_image
    WHERE
        recruiter_user.user_id = update_user.user_id;
    UPDATE recruiter_relation
    SET
        manager_id = update_user.manager_id,
        role_id = update_user.role_id
    WHERE
        recruiter_relation.user_id = update_user.user_id
        AND recruiter_relation.recruiter_id = update_user.recruiter_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.workflow_action_log_cron()
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    url_x text;
    headers_x jsonb;
    wa_record record;
BEGIN
    SELECT decrypted_secret 
    INTO  url_x
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';
    
    url_x := concat(url_x,'/api/workflow-cron' );

    headers_x := '{"Content-Type": "application/json"}'::jsonb;

    FOR wa_record IN
        SELECT json_build_object('id', w_a_l.id,'workflow_id', w_a_l.workflow_id, 'workflow_action_id', w_a_l.workflow_action_id, 'meta', w_a_l.meta, 'payload', w_a.payload, 'execution_time', w_a_l.execute_at ) AS body,
               w_a_l.id AS id,
               w_a_l.tries AS tries
        FROM workflow_action_logs w_a_l
        JOIN workflow_action w_a ON w_a_l.workflow_action_id = w_a.id
        WHERE (w_a_l.status = 'not_started' AND w_a_l.execute_at < CURRENT_TIMESTAMP + INTERVAL '1 minute')
    LOOP
        PERFORM net.http_post(
            url := url_x,
            headers := headers_x,
            body := wa_record.body::jsonb
        );

        UPDATE workflow_action_logs
        SET status = 'processing', tries = wa_record.tries + 1, started_at = NOW()
        WHERE id = wa_record.id;
    END LOOP;

    RETURN true;
END;
$function$
;


