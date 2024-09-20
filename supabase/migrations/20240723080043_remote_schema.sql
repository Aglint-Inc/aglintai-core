drop view if exists "public"."all_interviewers";

drop view if exists "public"."application_view";

drop view if exists "public"."meeting_details";

drop view if exists "public"."module_relations_view";

drop view if exists "public"."tasks_view";

drop view if exists "public"."meeting_interviewers";

alter table "public"."interview_module_relation" add column "is_archived" boolean not null default false;

alter table "public"."interview_module_relation" alter column "number_of_reverse_shadow" set default '0'::bigint;

alter table "public"."interview_module_relation" alter column "number_of_shadow" set default '0'::bigint;

set check_function_bodies = off;

create or replace view "public"."all_interviewers" as  SELECT ru.user_id,
    ru.first_name,
    ru.last_name,
    ru.email,
    ru.profile_image,
    ru."position",
    ru.schedule_auth,
    ru.scheduling_settings,
    COALESCE(array_agg(DISTINCT
        CASE
            WHEN (intmodrel.training_status = 'qualified'::status_training) THEN intmod.name
            ELSE NULL::text
        END), '{}'::text[]) AS qualified_module_names,
    COALESCE(array_agg(DISTINCT
        CASE
            WHEN (intmodrel.training_status = 'training'::status_training) THEN intmod.name
            ELSE NULL::text
        END), '{}'::text[]) AS training_module_names,
    (( SELECT count(*) AS count
           FROM (((interview_session_relation intsesrel
             JOIN interview_session intses ON ((intses.id = intsesrel.session_id)))
             JOIN interview_meeting intm ON ((intm.id = intses.meeting_id)))
             JOIN interview_module_relation intmodrel_1 ON ((intmodrel_1.id = intsesrel.interview_module_relation_id)))
          WHERE ((intmodrel_1.user_id = ru.user_id) AND (intm.status = 'confirmed'::interview_schedule_status) AND (intsesrel.is_confirmed = true))))::integer AS upcoming_meeting_count,
    (( SELECT count(*) AS count
           FROM (((interview_session_relation intsesrel
             JOIN interview_session intses ON ((intses.id = intsesrel.session_id)))
             JOIN interview_meeting intm ON ((intm.id = intses.meeting_id)))
             JOIN interview_module_relation intmodrel_1 ON ((intmodrel_1.id = intsesrel.interview_module_relation_id)))
          WHERE ((intmodrel_1.user_id = ru.user_id) AND (intm.status = 'completed'::interview_schedule_status) AND (intsesrel.is_confirmed = true))))::integer AS completed_meeting_count,
    ( SELECT (COALESCE(sum(intses.session_duration), (0)::numeric) / 60.0)
           FROM (((interview_session_relation intsesrel
             JOIN interview_session intses ON ((intses.id = intsesrel.session_id)))
             JOIN interview_meeting intm ON ((intm.id = intses.meeting_id)))
             JOIN interview_module_relation intmodrel_1 ON ((intmodrel_1.id = intsesrel.interview_module_relation_id)))
          WHERE ((intmodrel_1.user_id = ru.user_id) AND ((intm.status = 'completed'::interview_schedule_status) OR (intm.status = 'confirmed'::interview_schedule_status)) AND (intsesrel.is_confirmed = true) AND (intm.start_time >= date_trunc('week'::text, (CURRENT_DATE)::timestamp with time zone)) AND (intm.start_time < (date_trunc('week'::text, (CURRENT_DATE)::timestamp with time zone) + '7 days'::interval)))) AS total_hours_this_week,
    ( SELECT count(*) AS count
           FROM (((interview_session_relation intsesrel
             JOIN interview_session intses ON ((intses.id = intsesrel.session_id)))
             JOIN interview_meeting intm ON ((intm.id = intses.meeting_id)))
             JOIN interview_module_relation intmodrel_1 ON ((intmodrel_1.id = intsesrel.interview_module_relation_id)))
          WHERE ((intmodrel_1.user_id = ru.user_id) AND ((intm.status = 'completed'::interview_schedule_status) OR (intm.status = 'confirmed'::interview_schedule_status)) AND (intsesrel.is_confirmed = true) AND (intm.start_time >= date_trunc('week'::text, (CURRENT_DATE)::timestamp with time zone)) AND (intm.start_time < (date_trunc('week'::text, (CURRENT_DATE)::timestamp with time zone) + '7 days'::interval)))) AS total_interviews_this_week,
    ( SELECT (COALESCE(sum(intses.session_duration), (0)::numeric) / 60.0)
           FROM (((interview_session_relation intsesrel
             JOIN interview_session intses ON ((intses.id = intsesrel.session_id)))
             JOIN interview_meeting intm ON ((intm.id = intses.meeting_id)))
             JOIN interview_module_relation intmodrel_1 ON ((intmodrel_1.id = intsesrel.interview_module_relation_id)))
          WHERE ((intmodrel_1.user_id = ru.user_id) AND ((intm.status = 'completed'::interview_schedule_status) OR (intm.status = 'confirmed'::interview_schedule_status)) AND (intsesrel.is_confirmed = true) AND (intm.start_time >= CURRENT_DATE) AND (intm.start_time < (CURRENT_DATE + '1 day'::interval)))) AS total_hours_today,
    ( SELECT count(*) AS count
           FROM (((interview_session_relation intsesrel
             JOIN interview_session intses ON ((intses.id = intsesrel.session_id)))
             JOIN interview_meeting intm ON ((intm.id = intses.meeting_id)))
             JOIN interview_module_relation intmodrel_1 ON ((intmodrel_1.id = intsesrel.interview_module_relation_id)))
          WHERE ((intmodrel_1.user_id = ru.user_id) AND ((intm.status = 'completed'::interview_schedule_status) OR (intm.status = 'confirmed'::interview_schedule_status)) AND (intsesrel.is_confirmed = true) AND (intm.start_time >= CURRENT_DATE) AND (intm.start_time < (CURRENT_DATE + '1 day'::interval)))) AS total_interviews_today
   FROM ((recruiter_user ru
     LEFT JOIN interview_module_relation intmodrel ON ((intmodrel.user_id = ru.user_id)))
     LEFT JOIN interview_module intmod ON ((intmod.id = intmodrel.module_id)))
  GROUP BY ru.user_id;


CREATE OR REPLACE FUNCTION public.create_auth_user(email text, password text, user_id uuid, app_meta_data jsonb, user_meta_data jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
  declare
  encrypted_pw text;
BEGIN
  -- user_id := gen_random_uuid();
  encrypted_pw := crypt(password, gen_salt('bf'));
  
  INSERT INTO auth.users
    (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at,created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token,raw_app_meta_data,raw_user_meta_data)
  VALUES
    ('00000000-0000-0000-0000-000000000000', user_id, 'authenticated', 'authenticated', email, encrypted_pw, '2023-05-03 19:41:43.585805+00', '2023-04-22 13:10:03.275387+00', '2023-04-22 13:10:31.458239+00',  '2023-05-03 19:41:43.580424+00', '2023-05-03 19:41:43.585948+00', '', '', '', '',app_meta_data,user_meta_data);
  
  INSERT INTO auth.identities (id, user_id,provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  VALUES
    (gen_random_uuid(), user_id,gen_random_uuid(), format('{"sub":"%s","email":"%s"}', user_id::text, email)::jsonb, 'email', '2023-05-03 19:41:43.582456+00', '2023-05-03 19:41:43.582497+00', '2023-05-03 19:41:43.582497+00');
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_training_progress()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  session_relation RECORD;
BEGIN
  IF OLD.status = 'confirmed' AND NEW.status = 'completed' THEN
    FOR session_relation IN
      SELECT interview_session_relation.id 
      FROM interview_session_relation 
      JOIN interview_session ON interview_session.id = interview_session_relation.session_id
      JOIN interview_meeting ON interview_meeting.id = interview_session.meeting_id
      WHERE interview_session_relation.is_confirmed = true
        AND (interview_session_relation.training_type = 'shadow' 
          OR interview_session_relation.training_type = 'reverse_shadow') 
        AND interview_meeting.id = NEW.id
    LOOP
      -- Insert into interview_training_progress
      INSERT INTO interview_training_progress (session_relation_id)
      VALUES (session_relation.id);
    END LOOP;
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    claims jsonb;
    allpermissions jsonb;
    role_name text;
    recruiter_id uuid;
BEGIN
    -- Retrieve and convert permissions to JSONB array
    SELECT jsonb_agg(permissions.name) INTO allpermissions
    FROM public.permissions
    JOIN public.role_permissions ON role_permissions.permission_id = permissions.id
    JOIN public.roles ON roles.id = role_permissions.role_id
    JOIN public.recruiter_relation ON recruiter_relation.role_id = roles.id
    WHERE permissions.is_enable = true 
      AND recruiter_relation.user_id = (event->>'user_id')::uuid;

    -- Handle case where no permissions are found
    allpermissions := COALESCE(allpermissions, '[]'::jsonb);

    -- Retrieve the role name
    SELECT roles.name, recruiter_relation.recruiter_id INTO role_name ,recruiter_id
    FROM public.roles
    JOIN public.recruiter_relation ON recruiter_relation.role_id = roles.id
    WHERE recruiter_relation.user_id = (event->>'user_id')::uuid;

    -- Proceed with claims
    claims := event->'claims';

    -- Check if 'app_metadata' exists in claims
    IF jsonb_typeof(claims->'app_metadata') IS NULL THEN
        -- If 'app_metadata' does not exist, create an empty object
        claims := jsonb_set(claims, '{app_metadata}', '{}');
    END IF;

    -- Set a claim of 'permissions' and 'role'
    claims := jsonb_set(
        claims, 
        '{app_metadata, role_permissions}', 
        jsonb_build_object('permissions', allpermissions, 'role', role_name,'recruiter_id',recruiter_id)
    );

    -- Update the 'claims' object in the original event
    event := jsonb_set(event, '{claims}', claims);

    -- Return the modified event
    RETURN event;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.delete_interview_schedule_on_status_update()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF OLD.status = 'disqualified' AND NEW.status = 'new' THEN
    DELETE FROM interview_schedule WHERE application_id = NEW.id;
    DELETE FROM candidate_request_availability WHERE application_id = NEW.id;
  END IF;
  RETURN NEW;
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
    interview_session.schedule_type,
    interview_schedule.application_id,
    interview_meeting.meeting_flow,
    applications.job_id,
    public_jobs.recruiter_id,
    interview_session.module_id,
    ( SELECT array_agg(
                CASE
                    WHEN (interview_session.session_type = 'debrief'::session_type) THEN debrief_user.user_id
                    ELSE recruiter_user.user_id
                END) AS array_agg
           FROM (((interview_session_relation
             LEFT JOIN interview_module_relation ON ((interview_session_relation.interview_module_relation_id = interview_module_relation.id)))
             LEFT JOIN recruiter_user ON ((recruiter_user.user_id = interview_module_relation.user_id)))
             LEFT JOIN recruiter_user debrief_user ON ((debrief_user.user_id = interview_session_relation.user_id)))
          WHERE ((interview_session_relation.session_id = interview_session.id) AND (interview_session_relation.is_confirmed = true))) AS confirmed_user_ids,
    ( SELECT array_agg(interview_module_relation.id) AS array_agg
           FROM (interview_session_relation
             LEFT JOIN interview_module_relation ON ((interview_session_relation.interview_module_relation_id = interview_module_relation.id)))
          WHERE ((interview_session_relation.session_id = interview_session.id) AND (interview_session_relation.is_confirmed = true))) AS confirmed_module_relation_ids
   FROM ((((interview_meeting
     LEFT JOIN interview_session ON ((interview_meeting.id = interview_session.meeting_id)))
     LEFT JOIN interview_schedule ON ((interview_schedule.id = interview_meeting.interview_schedule_id)))
     LEFT JOIN applications ON ((applications.id = interview_schedule.application_id)))
     LEFT JOIN public_jobs ON ((applications.job_id = public_jobs.id)));


create or replace view "public"."meeting_interviewers" as  WITH interview_data AS (
         SELECT interview_session_relation.id AS session_relation_id,
            interview_session_relation.interviewer_type,
            interview_session_relation.training_type,
            interview_session_relation.is_confirmed,
            interview_session.meeting_id,
            interview_session.id AS session_id,
            interview_session.session_type,
            interview_meeting.end_time,
            interview_meeting.start_time,
            interview_meeting.status,
            interview_session.session_duration,
            COALESCE(debrief_user.first_name, recruiter_user.first_name) AS first_name,
            COALESCE(debrief_user.last_name, recruiter_user.last_name) AS last_name,
            COALESCE(debrief_user.profile_image, recruiter_user.profile_image) AS profile_image,
            COALESCE(debrief_user.email, recruiter_user.email) AS email,
            COALESCE(debrief_user.user_id, recruiter_user.user_id) AS user_id,
            COALESCE(((debrief_user.scheduling_settings -> 'timeZone'::text) ->> 'tzCode'::text), ((recruiter_user.scheduling_settings -> 'timeZone'::text) ->> 'tzCode'::text)) AS tz_code,
            COALESCE(debrief_user."position", recruiter_user."position") AS "position",
            interview_session_relation.accepted_status,
            ( SELECT json_agg(row_to_json(interview_session_cancel.*)) AS json_agg
                   FROM interview_session_cancel
                  WHERE (interview_session_cancel.session_relation_id = interview_session_relation.id)) AS cancel_reasons,
            interview_session_relation.interview_module_relation_id,
            interview_module_relation.module_id,
                CASE
                    WHEN (interview_session.interview_plan_id IS NOT NULL) THEN interview_plan.job_id
                    ELSE applications.job_id
                END AS job_id
           FROM ((((((((interview_session_relation
             LEFT JOIN interview_module_relation ON ((interview_session_relation.interview_module_relation_id = interview_module_relation.id)))
             LEFT JOIN interview_session ON ((interview_session.id = interview_session_relation.session_id)))
             LEFT JOIN interview_meeting ON ((interview_meeting.id = interview_session.meeting_id)))
             LEFT JOIN interview_plan ON ((interview_plan.id = interview_session.interview_plan_id)))
             LEFT JOIN interview_schedule ON ((interview_meeting.interview_schedule_id = interview_schedule.id)))
             LEFT JOIN applications ON ((applications.id = interview_schedule.application_id)))
             LEFT JOIN recruiter_user ON ((recruiter_user.user_id = interview_module_relation.user_id)))
             LEFT JOIN recruiter_user debrief_user ON ((debrief_user.user_id = interview_session_relation.user_id)))
        ), time_boundaries AS (
         SELECT CURRENT_DATE AS today_start,
            ((CURRENT_DATE + '1 day'::interval) - '00:00:01'::interval) AS today_end,
            (date_trunc('week'::text, (CURRENT_DATE)::timestamp with time zone) + '1 day'::interval) AS week_start,
            ((date_trunc('week'::text, (CURRENT_DATE)::timestamp with time zone) + '7 days'::interval) - '00:00:01'::interval) AS week_end
        )
 SELECT interview_data.session_relation_id,
    interview_data.interviewer_type,
    interview_data.training_type,
    interview_data.is_confirmed,
    interview_data.meeting_id,
    interview_data.session_id,
    interview_data.session_type,
    interview_data.first_name,
    interview_data.last_name,
    interview_data.profile_image,
    interview_data.email,
    interview_data.user_id,
    interview_data.tz_code,
    interview_data."position",
    ( SELECT count(*) AS count
           FROM interview_data id2,
            time_boundaries tb
          WHERE ((id2.user_id = interview_data.user_id) AND (id2.end_time >= tb.today_start) AND (id2.end_time <= tb.today_end) AND (id2.is_confirmed = true) AND ((id2.status = 'confirmed'::interview_schedule_status) OR (id2.status = 'completed'::interview_schedule_status)))) AS totalinterviewstoday,
    ( SELECT count(*) AS count
           FROM interview_data id3,
            time_boundaries tb
          WHERE ((id3.user_id = interview_data.user_id) AND (id3.start_time >= tb.week_start) AND (id3.end_time <= tb.week_end) AND (id3.is_confirmed = true) AND ((id3.status = 'confirmed'::interview_schedule_status) OR (id3.status = 'completed'::interview_schedule_status)))) AS totalinterviewsthisweek,
    ( SELECT (COALESCE(sum(id4.session_duration), (0)::numeric) / 60.0)
           FROM interview_data id4,
            time_boundaries tb
          WHERE ((id4.user_id = interview_data.user_id) AND (id4.end_time >= tb.today_start) AND (id4.end_time <= tb.today_end) AND (id4.is_confirmed = true) AND ((id4.status = 'confirmed'::interview_schedule_status) OR (id4.status = 'completed'::interview_schedule_status)))) AS totalhourstoday,
    ( SELECT (COALESCE(sum(id5.session_duration), (0)::numeric) / 60.0)
           FROM interview_data id5,
            time_boundaries tb
          WHERE ((id5.user_id = interview_data.user_id) AND (id5.start_time >= tb.week_start) AND (id5.end_time <= tb.week_end) AND (id5.is_confirmed = true) AND ((id5.status = 'confirmed'::interview_schedule_status) OR (id5.status = 'completed'::interview_schedule_status)))) AS totalhoursthisweek,
    interview_data.accepted_status,
    interview_data.cancel_reasons,
    interview_data.interview_module_relation_id,
    interview_data.module_id,
    interview_data.job_id
   FROM interview_data;


create or replace view "public"."module_relations_view" as  WITH interview_data AS (
         SELECT interview_module_relation.id,
            interview_module_relation.pause_json,
            interview_module_relation.training_status AS module_training_status,
            interview_module_relation.user_id,
            interview_module_relation.module_id,
            interview_module_relation.number_of_shadow,
            interview_module_relation.number_of_reverse_shadow,
            recruiter_user.first_name,
            recruiter_user."position",
            recruiter_user.profile_image,
            recruiter_user.scheduling_settings,
            recruiter_user.phone,
            ( SELECT json_agg(json_build_object('interview_session', row_to_json(interview_session.*), 'interview_meeting', row_to_json(interview_meeting.*))) AS json_agg
                   FROM (((interview_session_relation
                     LEFT JOIN interview_session ON ((interview_session.id = interview_session_relation.session_id)))
                     LEFT JOIN interview_meeting ON ((interview_meeting.id = interview_session.meeting_id)))
                     LEFT JOIN interview_module ON ((interview_module.id = interview_session.module_id)))
                  WHERE ((interview_session_relation.interview_module_relation_id = interview_module_relation.id) AND ((interview_meeting.status = 'completed'::interview_schedule_status) OR (interview_meeting.status = 'confirmed'::interview_schedule_status)) AND (interview_session_relation.is_confirmed = true))) AS meetings
           FROM (interview_module_relation
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
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE (((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text)) AS completed_meeting_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE ((((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text) AND (((meeting_elements.value -> 'interview_session'::text) ->> 'training_type'::text) = 'shadow'::text))) AS shadow_meeting_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE ((((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text) AND (((meeting_elements.value -> 'interview_session'::text) ->> 'training_type'::text) = 'reverse_shadow'::text))) AS reverse_shadow_meeting_count
   FROM interview_data;


CREATE OR REPLACE FUNCTION public.new_get_interview_schedule_by_meeting_id(target_meeting_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    schedule_data JSONB;
    cancel_data JSONB;
    result_data JSONB;
BEGIN
    BEGIN
        SELECT 
            jsonb_build_object(
                'interview_meeting', row_to_json(intmeet),
                'interview_session', row_to_json(intses),
                'schedule', row_to_json(insc),
                'candidates', (
                    SELECT json_build_object(
                        'id', cand.id,
                        'email', cand.email,
                        'first_name' , cand.first_name,
                        'last_name' , cand.last_name,
                        'timezone' , cand.timezone
                    )
                    ),
                'interview_module', row_to_json(intmod),
                'job', (
                    SELECT json_build_object(
                        'id', pj.id,
                        'created_at', pj.created_at, 
                        'job_title', pj.job_title, 
                        'description', pj.description 
                    ) 
                ),
                'users', COALESCE((
                    SELECT jsonb_agg(
                         CASE WHEN intses.session_type = 'debrief' THEN
                            jsonb_build_object(
                            'id', debuser.user_id,
                            'first_name', debuser.first_name,
                            'last_name', debuser.last_name,
                            'email', debuser.email,
                            'profile_image', debuser.profile_image,
                            'position', debuser.position,
                            'department', debuser.department,
                            'interview_session_relation', row_to_json(isr),
                            'location', debuser.interview_location,
                            'scheduling_settings', debuser.scheduling_settings,
                            'weekly_meetings', (
                                SELECT json_agg(json_build_object(
                                    'start_time', im2.start_time,
                                    'end_time', im2.end_time
                                )) 
                                FROM interview_session_relation intsr2
                                JOIN interview_module_relation intmr2 ON intmr2.id = intsr2.interview_module_relation_id 
                                JOIN recruiter_user recuser2 ON recuser2.user_id = intmr2.user_id 
                                JOIN interview_session ints2 ON intsr2.session_id = ints2.id
                                JOIN interview_meeting im2 ON ints2.meeting_id = im2.id
                                WHERE recuser2.user_id = debuser.user_id
                                AND intsr2.is_confirmed = true
                                AND im2.start_time >= date_trunc('week', CURRENT_DATE)  -- Start of the current week (Monday)
                                AND im2.start_time < date_trunc('week', CURRENT_DATE) + INTERVAL '1 week'
                            )
                        )::jsonb
                            ELSE
                            jsonb_build_object(
                            'id', ru.user_id,
                            'first_name', ru.first_name,
                            'last_name', ru.last_name,
                            'email', ru.email,
                            'profile_image', ru.profile_image,
                            'position', ru.position,
                            'department', ru.department,
                            'interview_session_relation', row_to_json(isr),
                            'location', ru.interview_location,
                            'scheduling_settings', ru.scheduling_settings,
                            'weekly_meetings', (
                                SELECT json_agg(json_build_object(
                                    'start_time', im2.start_time,
                                    'end_time', im2.end_time
                                )) 
                                FROM interview_session_relation intsr2
                                JOIN interview_module_relation intmr2 ON intmr2.id = intsr2.interview_module_relation_id 
                                JOIN recruiter_user recuser2 ON recuser2.user_id = intmr2.user_id 
                                JOIN interview_session ints2 ON intsr2.session_id = ints2.id
                                JOIN interview_meeting im2 ON ints2.meeting_id = im2.id
                                WHERE recuser2.user_id = ru.user_id
                                AND intsr2.is_confirmed = true
                                AND im2.start_time >= date_trunc('week', CURRENT_DATE)  -- Start of the current week (Monday)
                                AND im2.start_time < date_trunc('week', CURRENT_DATE) + INTERVAL '1 week'
                            )
                        )::jsonb
                            END

                       
                    )
                    FROM interview_session_relation isr
                    LEFT JOIN interview_module_relation inm ON inm.id = isr.interview_module_relation_id
                    LEFT JOIN recruiter_user ru ON ru.user_id = inm.user_id
                    LEFT JOIN recruiter_user debuser ON debuser.user_id = isr.user_id
                    WHERE isr.session_id = intses.id
                ), '[]'::jsonb),
                'hiring_manager', (
                    SELECT json_build_object(
                        'id', recruiter_user.user_id,
                        'first_name', recruiter_user.first_name,
                        'last_name', recruiter_user.last_name,
                        'email', recruiter_user.email,
                        'profile_image', recruiter_user.profile_image,
                        'position', recruiter_user.position
                    ) from recruiter_user where user_id=pj.hiring_manager
                ),
                'interview_coordinator', (
                    SELECT json_build_object(
                        'id', recruiter_user.user_id,
                        'first_name', recruiter_user.first_name,
                        'last_name', recruiter_user.last_name,
                        'email', recruiter_user.email,
                        'profile_image', recruiter_user.profile_image,
                        'position', recruiter_user.position
                    ) from recruiter_user where user_id=pj.interview_coordinator
                ),
                'recruiter', (
                    SELECT json_build_object(
                        'id', recruiter_user.user_id,
                        'first_name', recruiter_user.first_name,
                        'last_name', recruiter_user.last_name,
                        'email', recruiter_user.email,
                        'profile_image', recruiter_user.profile_image,
                        'position', recruiter_user.position
                    ) from recruiter_user where user_id=pj.recruiter
                ),
                'recruiting_coordinator', (
                    SELECT json_build_object(
                        'id', recruiter_user.user_id,
                        'first_name', recruiter_user.first_name,
                        'last_name', recruiter_user.last_name,
                        'email', recruiter_user.email,
                        'profile_image', recruiter_user.profile_image,
                        'position', recruiter_user.position
                    ) from recruiter_user where user_id=pj.recruiting_coordinator
                ),
                'sourcer', (
                    SELECT json_build_object(
                        'id', recruiter_user.user_id,
                        'first_name', recruiter_user.first_name,
                        'last_name', recruiter_user.last_name,
                        'email', recruiter_user.email,
                        'profile_image', recruiter_user.profile_image,
                        'position', recruiter_user.position
                    ) from recruiter_user where user_id=pj.sourcer
                ),
                 'organizer', (
                    SELECT json_build_object(
                        'id', recruiter_user.user_id,
                        'first_name', recruiter_user.first_name,
                        'last_name', recruiter_user.last_name,
                        'email', recruiter_user.email,
                        'profile_image', recruiter_user.profile_image,
                        'position', recruiter_user.position
                    ) from recruiter_user where user_id=intmeet.organizer_id
                )
            )
        INTO schedule_data
        FROM interview_meeting intmeet
        LEFT JOIN interview_session intses ON intses.meeting_id = intmeet.id 
        LEFT JOIN interview_module intmod ON intmod.id = intses.module_id
        LEFT JOIN interview_schedule insc ON insc.id = intmeet.interview_schedule_id  
        LEFT JOIN applications app ON insc.application_id = app.id
        LEFT JOIN candidates cand ON app.candidate_id = cand.id 
        LEFT JOIN candidate_files cf ON cf.id = app.candidate_file_id  
        LEFT JOIN public_jobs pj ON pj.id = app.job_id
        WHERE intmeet.id = target_meeting_id
        GROUP BY intmeet.id, intses.id, intmod.id, insc.id, app.id, cand.id, cf.id, pj.id;
        
        EXCEPTION
            WHEN NO_DATA_FOUND THEN
                schedule_data := NULL;
    END;

    BEGIN
        SELECT jsonb_agg( 
            jsonb_build_object(
                'interview_session_cancel', row_to_json(intsescan),
                'interview_session_relation', row_to_json(intsesrel),
                'recruiter_user',(
                     CASE WHEN intsescan.session_relation_id is NULL THEN
                    json_build_object(
                        'id', canceluser.user_id,
                        'first_name', canceluser.first_name,
                        'last_name', canceluser.last_name,
                        'email', canceluser.email,
                        'profile_image', canceluser.profile_image,
                        'position', canceluser.position
                    )
                    ELSE  json_build_object(
                        'id', recuser.user_id,
                        'first_name', recuser.first_name,
                        'last_name', recuser.last_name,
                        'email', recuser.email,
                        'profile_image', recuser.profile_image,
                        'position', recuser.position
                    )
                    END
                    ), 
                'candidate', row_to_json(cand)
                    ))
        INTO cancel_data
        FROM interview_session_cancel intsescan
        LEFT JOIN interview_session intses ON intses.id = intsescan.session_id 
        LEFT JOIN interview_meeting intmeet ON intmeet.id = intses.meeting_id
        LEFT JOIN interview_session_relation intsesrel ON intsesrel.id = intsescan.session_relation_id
        LEFT JOIN interview_module_relation intmodrel ON intmodrel.id = intsesrel.interview_module_relation_id
        LEFT JOIN recruiter_user recuser ON recuser.user_id = intmodrel.user_id
        LEFT JOIN recruiter_user canceluser ON canceluser.user_id = intsescan.cancel_user_id
        LEFT JOIN interview_schedule intsch ON intsch.id = intsescan.schedule_id
        LEFT JOIN applications app ON app.id = intsch.application_id
        LEFT JOIN candidates cand ON cand.id = app.candidate_id
        WHERE intmeet.id = target_meeting_id;
        
        EXCEPTION
            WHEN NO_DATA_FOUND THEN
                cancel_data := NULL;
    END;

    result_data := jsonb_build_object(
        'schedule_data', schedule_data,
        'cancel_data', cancel_data
    );

    RETURN result_data;
    
     -- Ensure correct grouping
END;
$function$
;

CREATE OR REPLACE FUNCTION public.new_permission_to_role_mapper()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW.is_enable THEN
    WITH temp_roles as ( SELECT id as role_id, recruiter_id from roles where name = 'admin' ) --  selection sequence matters
    INSERT INTO role_permissions ( role_id, recruiter_id, permission_id) -- here
    SELECT temp_roles.*, NEW.id AS permission_id
    FROM temp_roles;
  ELSE
    DELETE FROM role_permissions WHERE permission_id = NEW.id;
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.reset_auth_users_identities(user_email text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    DELETE FROM auth.users
    where email=user_email;
END;
$function$
;

create or replace view "public"."tasks_view" as  WITH interview_session_cte AS (
         SELECT interview_session.id,
            interview_session.session_type,
            interview_session.name,
            interview_session.session_order,
                CASE
                    WHEN (interview_meeting.id IS NOT NULL) THEN json_build_object('id', interview_meeting.id, 'start_time', interview_meeting.start_time, 'end_time', interview_meeting.end_time, 'meeting_link', interview_meeting.meeting_link)
                    ELSE NULL::json
                END AS interview_meeting
           FROM (interview_session
             LEFT JOIN interview_meeting ON ((interview_meeting.id = interview_session.meeting_id)))
        ), session_interviewers_cte AS (
         SELECT interview_session_cte.id,
            json_agg(
                CASE
                    WHEN (meeting_interviewers.session_id IS NOT NULL) THEN json_build_object('email', meeting_interviewers.email, 'user_id', meeting_interviewers.user_id, 'last_name', meeting_interviewers.last_name, 'first_name', meeting_interviewers.first_name, 'profile_image', meeting_interviewers.profile_image, 'training_type', meeting_interviewers.training_type, 'interviewer_type', meeting_interviewers.interviewer_type, 'is_confirmed', meeting_interviewers.is_confirmed)
                    ELSE NULL::json
                END) AS users
           FROM (interview_session_cte
             LEFT JOIN meeting_interviewers ON ((meeting_interviewers.session_id = interview_session_cte.id)))
          WHERE (meeting_interviewers.is_confirmed = true)
          GROUP BY interview_session_cte.id
        ), session_ids AS (
         SELECT interview_session_cte.id,
            interview_session_cte.session_type,
            interview_session_cte.name,
            interview_session_cte.session_order,
            interview_session_cte.interview_meeting,
            COALESCE(session_interviewers_cte.users, '[]'::json) AS users
           FROM (interview_session_cte
             LEFT JOIN session_interviewers_cte ON ((session_interviewers_cte.id = interview_session_cte.id)))
        ), task_session_ids_cte AS (
         SELECT task_session_relation.task_id,
            COALESCE(json_agg(session_ids.*) FILTER (WHERE (session_ids.id IS NOT NULL)), '[]'::json) AS session_ids
           FROM (task_session_relation
             LEFT JOIN session_ids ON ((session_ids.id = task_session_relation.session_id)))
          GROUP BY task_session_relation.task_id
        ), task_progress_cte AS (
         SELECT DISTINCT ON (new_tasks_progress.task_id) new_tasks_progress.task_id,
            json_build_object('id', new_tasks_progress.id, 'progress_type', new_tasks_progress.progress_type, 'created_at', new_tasks_progress.created_at, 'created_by', new_tasks_progress.created_by, 'jsonb_data', new_tasks_progress.jsonb_data, 'title_meta', new_tasks_progress.title_meta) AS latest_progress,
            new_tasks_progress.created_at
           FROM new_tasks_progress
          ORDER BY new_tasks_progress.task_id, new_tasks_progress.created_at DESC
        )
 SELECT new_tasks.id,
    new_tasks.created_at,
    new_tasks.name,
    new_tasks.due_date,
    new_tasks.assignee,
    new_tasks.start_date,
    new_tasks.application_id,
    new_tasks.recruiter_id,
    new_tasks.schedule_date_range,
    new_tasks.created_by,
    new_tasks.type,
    new_tasks.status,
    new_tasks.agent,
    new_tasks.filter_id,
    new_tasks.priority,
    new_tasks.task_owner,
    new_tasks.trigger_count,
    new_tasks.task_action,
    new_tasks.request_availability_id,
    COALESCE(task_session_ids_cte.session_ids, '[]'::json) AS session_ids,
    task_progress_cte.latest_progress
   FROM ((new_tasks
     LEFT JOIN task_session_ids_cte ON ((task_session_ids_cte.task_id = new_tasks.id)))
     LEFT JOIN task_progress_cte ON ((task_progress_cte.task_id = new_tasks.id)));


CREATE OR REPLACE FUNCTION public.trigger_application_score_log()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  score numeric;
  log_count numeric;
BEGIN
  IF NEW.processing_status = 'success' AND NEW.score_json -> 'scores' IS NOT NULL THEN
    select into score, log_count
      score_application(
        applications.score_json -> 'scores',
        public_jobs.parameter_weights
      ),
      coalesce(logs.logs, 0)
    from
      applications
    left join (
      select
        application_id as id,
        coalesce(count(*)) as logs
      from
        application_logs
      where
        title similar to 'Application was scored %'
      group by
        id
    ) as logs on
      logs.id = applications.id
    inner join
      public_jobs on
        public_jobs.id = applications.job_id
    where
      applications.id = NEW.id;
    IF score IS NOT NULL AND score >= 0 THEN
      INSERT INTO application_logs(application_id, title, logged_by, module)
      VALUES (NEW.id, 
      'Application was '|| (
        case
          when log_count = 0 then 'scored'
          else 'rescored'
        end
      ) || ' ' || score || '%',
      'system', 'jobs');
    END IF;
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_application_score_log2()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  score numeric;
  title TEXT;
BEGIN
  with scores as (
    select 
      application_status_view.id,
      application_status_view.resume_score,
      coalesce(logs.logs, 0) as logs
    from
      application_status_view
    left join (
      select
        application_id as id,
        count(*) as logs
      from
        application_logs
      where
        application_logs.title similar to 'Application was scored %'
      group by
        id
    ) as logs on
      logs.id = application_status_view.id
    where
      application_status_view.job_id = NEW.id and
      application_status_view.resume_score >= 0 
  )
  insert into application_logs(application_id, title, logged_by, module)
  select 
    scores.id,
    'Application was '|| (
      case
        when scores.logs = 0 then 'scored'
        else 'rescored'
      end
    ) || ' ' || scores.resume_score || '%',
    'system',
    'jobs'
  from
    scores;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_interview_session_count_invalidation()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  WITH interview_session_info AS (
    SELECT DISTINCT
      interview_session.id,
      interview_session.interviewer_cnt,
      count(interview_session_relation.id) OVER (PARTITION BY interview_session.id) AS session_count
    FROM
      interview_session
    LEFT JOIN
      interview_session_relation ON
      interview_session_relation.session_id = interview_session.id
    WHERE
      interview_session.id = OLD.session_id
  ), invalid_session AS (
    SELECT
      *
    FROM
      interview_session_info
    WHERE
      interview_session_info.interviewer_cnt > interview_session_info.session_count
  )
  UPDATE interview_session
  SET 
    interviewer_cnt = CASE 
                        WHEN invalid_session.interviewer_cnt = 0 THEN 0
                        ELSE invalid_session.session_count
                      END
  FROM 
    invalid_session
  WHERE 
    interview_session.id = invalid_session.id;
  RETURN OLD;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_debrief_session(session_id uuid, session_duration integer, break_duration integer, location text, schedule_type interview_schedule_type, name text, members jsonb, members_meta jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    DELETE FROM 
        interview_session_relation
    WHERE user_id IN (
        SELECT
            user_id
        FROM 
            interview_session_relation
        WHERE
            interview_session_relation.session_id = update_debrief_session.session_id AND
            user_id NOT IN (
                SELECT 
                    (entry->>'id')::uuid AS user_id
                FROM 
                    jsonb_array_elements(members) AS entry
            )
    );

    INSERT INTO interview_session_relation (user_id, session_id)
    SELECT
        user_id,
        update_debrief_session.session_id AS session_id
    FROM
        (
            SELECT 
                (entry->>'id')::uuid AS user_id
            FROM 
                jsonb_array_elements(members) AS entry
        ) as temp
    WHERE
        user_id NOT IN (
            SELECT 
                interview_session_relation.user_id
            FROM
                interview_session_relation
            WHERE
                interview_session_relation.session_id = update_debrief_session.session_id
        );
    UPDATE interview_session
    SET 
      session_duration = update_debrief_session.session_duration,
      break_duration = update_debrief_session.break_duration,
      location = update_debrief_session.location,
      schedule_type = update_debrief_session.schedule_type,
      name = update_debrief_session.name,
      members_meta = update_debrief_session.members_meta
    WHERE interview_session.id = update_debrief_session.session_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_interview_session(session_id uuid, module_id uuid, session_duration integer, break_duration integer, interviewer_cnt integer, session_type session_type, location text, schedule_type interview_schedule_type, name text, interview_module_relation_entries jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    DELETE FROM interview_session_relation WHERE interview_session_relation.session_id = update_interview_session.session_id;
    INSERT INTO interview_session_relation (interview_module_relation_id, session_id, interviewer_type, training_type)
    SELECT 
        (entry->>'id')::uuid AS interview_module_relation_id,
        update_interview_session.session_id AS session_id,
        (entry->>'interviewer_type')::status_training AS interviewer_type,
        (entry->>'training_type')::interviewer_type AS training_type
    FROM 
        jsonb_array_elements(interview_module_relation_entries) AS entry;
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
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_or_delete_filter_json(session_ids_to_remove uuid[])
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    record RECORD;
BEGIN
    FOR record IN SELECT id, session_ids FROM interview_filter_json
    LOOP
        -- Calculate the difference between current session IDs and those to be removed
        record.session_ids := array(SELECT unnest(record.session_ids) EXCEPT SELECT unnest(session_ids_to_remove));

        IF array_length(record.session_ids, 1) IS NULL THEN
            -- If no session IDs are left, delete the record
            DELETE FROM interview_filter_json WHERE id = record.id;
        ELSE
            -- Otherwise, update the record with the new array of session IDs
            UPDATE interview_filter_json SET session_ids = record.session_ids WHERE id = record.id;
        END IF;
    END LOOP;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.workflow_log_on_insert_candidate_request_availability()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$DECLARE
    wa_record RECORD;
    trigger_case text;
    workflow_id uuid;
BEGIN
    -- if NEW.slots is not null then
        FOR wa_record IN
            select w_a.workflow_id as workflow_id, w_a.id as workflow_action_id, w.interval as interval_minutes, w.phase as phase,
                  json_build_object('schedule_id', i_s.id, 'application_id', i_s.application_id, 'email_type', c_e_t.type, 'avail_req_id', NEW.id) as meta
            from interview_schedule i_s 
            JOIN applications a ON a.id = i_s.application_id
            JOIN workflow_job_relation w_a_r ON w_a_r.job_id = a.job_id
            JOIN workflow w ON w.id = w_a_r.workflow_id
            JOIN workflow_action w_a ON w_a.workflow_id = w_a_r.workflow_id
            JOIN company_email_template c_e_t ON c_e_t.id = w_a.email_template_id
            WHERE i_s.application_id = NEW.application_id
            AND w.trigger::text = 'sendAvailReqReminder' 
        LOOP
            PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta);
        END LOOP;
    -- END if;
  RETURN NEW;
END;$function$
;

create or replace view "public"."application_view" as  WITH application_candidate_cte AS (
         SELECT application_status_view.id,
            application_status_view.job_id,
            application_status_view.created_at,
            application_status_view.applied_at,
            application_status_view.interview_score,
            application_status_view.processing_status,
            application_status_view.bookmarked,
            application_status_view.is_new,
            application_status_view.status,
            application_status_view.badges,
            application_status_view.candidate_id,
            application_status_view.candidate_file_id,
            application_status_view.file_url,
            application_status_view.resume_processing_state,
            application_status_view.resume_score,
            application_status_view.application_match,
            candidates.email,
            TRIM(BOTH FROM (((COALESCE(candidates.first_name, ''::citext))::text || ' '::text) || (COALESCE(candidates.last_name, ''::citext))::text)) AS name,
            candidates.city,
            candidates.linkedin,
            candidates.phone,
            candidates.state,
            candidates.country,
            candidates.current_job_title
           FROM (application_status_view
             LEFT JOIN candidates ON ((candidates.id = application_status_view.candidate_id)))
        ), application_meeting_cte AS (
         SELECT application_candidate_cte_1.id,
            jsonb_agg(jsonb_build_object('meeting_id', meeting_details.id, 'session_id', meeting_details.session_id, 'session_duration', meeting_details.session_duration, 'session_name', meeting_details.session_name, 'session_order', meeting_details.session_order, 'schedule_type', meeting_details.schedule_type, 'session_type', meeting_details.session_type, 'status', meeting_details.status, 'date', jsonb_build_object('start_time', meeting_details.start_time, 'end_time', meeting_details.end_time), 'meeting_flow', meeting_details.meeting_flow)) AS meeting_details
           FROM (application_candidate_cte application_candidate_cte_1
             JOIN meeting_details ON ((meeting_details.application_id = application_candidate_cte_1.id)))
          GROUP BY application_candidate_cte_1.id
        ), application_task_cte AS (
         SELECT application_candidate_cte_1.id,
            COALESCE(count(new_tasks.application_id), (0)::bigint) AS task_count
           FROM (application_candidate_cte application_candidate_cte_1
             LEFT JOIN new_tasks ON ((new_tasks.application_id = application_candidate_cte_1.id)))
          GROUP BY application_candidate_cte_1.id
        ), application_logs_cte AS (
         SELECT application_candidate_cte_1.id,
            COALESCE(count(application_logs.application_id), (0)::bigint) AS activity_count
           FROM (application_candidate_cte application_candidate_cte_1
             LEFT JOIN application_logs ON ((application_logs.application_id = application_candidate_cte_1.id)))
          GROUP BY application_candidate_cte_1.id
        ), application_latest_activity_cte AS (
         SELECT DISTINCT ON (application_logs.application_id) application_logs.application_id,
            application_logs.created_at AS latest_activity
           FROM application_logs
          ORDER BY application_logs.application_id, application_logs.created_at DESC
        )
 SELECT application_candidate_cte.id,
    application_candidate_cte.job_id,
    application_candidate_cte.created_at,
    application_candidate_cte.applied_at,
    application_candidate_cte.resume_score,
    application_candidate_cte.interview_score,
    application_candidate_cte.processing_status,
    application_candidate_cte.bookmarked,
    application_candidate_cte.is_new,
    application_candidate_cte.status,
    application_candidate_cte.badges,
    application_candidate_cte.candidate_file_id,
    application_candidate_cte.email,
    application_candidate_cte.name,
    application_candidate_cte.city,
    application_candidate_cte.linkedin,
    application_candidate_cte.phone,
    application_candidate_cte.state,
    application_candidate_cte.country,
    application_candidate_cte.current_job_title,
    application_candidate_cte.file_url,
    application_candidate_cte.resume_processing_state,
    COALESCE(application_meeting_cte.meeting_details, '[]'::jsonb) AS meeting_details,
    application_task_cte.task_count,
    application_logs_cte.activity_count,
    application_latest_activity_cte.latest_activity,
    application_candidate_cte.application_match
   FROM ((((application_candidate_cte
     LEFT JOIN application_meeting_cte ON ((application_meeting_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_task_cte ON ((application_task_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_logs_cte ON ((application_logs_cte.id = application_candidate_cte.id)))
     LEFT JOIN application_latest_activity_cte ON ((application_latest_activity_cte.application_id = application_candidate_cte.id)));


-- CREATE TRIGGER new_recruiters AFTER INSERT ON public.recruiter FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('https://dev.aglinthq.com/api/pre-seed', 'POST', '{"Content-type":"application/json"}', '{}', '1000');


