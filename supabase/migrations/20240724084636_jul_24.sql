drop view if exists "public"."all_interviewers";

set check_function_bodies = off;

create or replace view "public"."interview_types_view" as  SELECT intmod.id,
    intmod.name,
    intmod.department,
    intmod.created_by,
    intmod.is_archived,
    intmod.description,
    intmod.recruiter_id,
    COALESCE(( SELECT jsonb_agg(jsonb_build_object('user_id', ru.user_id, 'first_name', ru.first_name, 'last_name', ru.last_name, 'email', ru.email, 'profile_image', ru.profile_image, 'position', ru."position")) AS jsonb_agg
           FROM recruiter_user ru
          WHERE (ru.user_id IN ( SELECT intmodrel.user_id
                   FROM interview_module_relation intmodrel
                  WHERE ((intmodrel.module_id = intmod.id) AND (intmodrel.is_archived = false))))), '[]'::jsonb) AS users,
    (( SELECT count(*) AS count
           FROM (interview_meeting intm
             JOIN interview_session inses ON ((inses.meeting_id = intm.id)))
          WHERE ((intm.status = 'confirmed'::interview_schedule_status) AND (inses.module_id = intmod.id))))::integer AS upcoming_meeting_count,
    (( SELECT count(*) AS count
           FROM (interview_meeting intm
             JOIN interview_session inses ON ((inses.meeting_id = intm.id)))
          WHERE ((intm.status = 'completed'::interview_schedule_status) AND (inses.module_id = intmod.id))))::integer AS completed_meeting_count,
    (( SELECT count(*) AS count
           FROM (interview_meeting intm
             JOIN interview_session inses ON ((inses.meeting_id = intm.id)))
          WHERE ((intm.status = 'cancelled'::interview_schedule_status) AND (inses.module_id = intmod.id))))::integer AS canceled_meeting_count
   FROM interview_module intmod
  GROUP BY intmod.id
  ORDER BY intmod.created_at DESC;


create or replace view "public"."all_interviewers" as  SELECT ru.user_id,
    ru.first_name,
    ru.last_name,
    ru.email,
    ru.profile_image,
    ru."position",
    ru.schedule_auth,
    ru.scheduling_settings,
    ru.status,
    recrel.recruiter_id,
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
   FROM (((recruiter_user ru
     LEFT JOIN recruiter_relation recrel ON ((recrel.user_id = ru.user_id)))
     LEFT JOIN interview_module_relation intmodrel ON ((intmodrel.user_id = ru.user_id)))
     LEFT JOIN interview_module intmod ON ((intmod.id = intmodrel.module_id)))
  GROUP BY ru.user_id, recrel.recruiter_id;


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
    WHERE ru.status = 'active' AND recrel.recruiter_id = rec_id
    GROUP BY recrel.id, ru.user_id;  -- Ensure correct grouping
END;
$function$
;

CREATE OR REPLACE FUNCTION public.transfer_user_responsibilities(suspended_user uuid, task_owner uuid DEFAULT NULL::uuid, hiring_manager uuid DEFAULT NULL::uuid, recruiter uuid DEFAULT NULL::uuid, recruiting_coordinator uuid DEFAULT NULL::uuid, sourcer uuid DEFAULT NULL::uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  IF(transfer_user_responsibilities.hiring_manager IS NOT NULL) THEN
    UPDATE 
      public_jobs
    SET 
      hiring_manager = transfer_user_responsibilities.hiring_manager
    WHERE 
      public_jobs.hiring_manager = transfer_user_responsibilities.suspended_user;
  END IF;
  IF(transfer_user_responsibilities.recruiter IS NOT NULL) THEN
    UPDATE 
      public_jobs
    SET 
      recruiter = transfer_user_responsibilities.recruiter
    WHERE 
      public_jobs.recruiter = transfer_user_responsibilities.suspended_user;
  END IF;
  IF(transfer_user_responsibilities.recruiting_coordinator IS NOT NULL) THEN
    UPDATE 
      public_jobs
    SET 
      recruiting_coordinator = transfer_user_responsibilities.recruiting_coordinator
    WHERE 
      public_jobs.recruiting_coordinator = transfer_user_responsibilities.suspended_user;
  END IF;
  IF(transfer_user_responsibilities.sourcer IS NOT NULL) THEN
    UPDATE 
      public_jobs
    SET 
      sourcer = transfer_user_responsibilities.sourcer
    WHERE 
      public_jobs.sourcer = transfer_user_responsibilities.suspended_user;
  END IF;
  IF(transfer_user_responsibilities.task_owner IS NOT NULL) THEN
    UPDATE
      new_tasks
    SET
      assignee = new_assignees.assignee
    FROM
      (
        SELECT
          id,
          ARRAY(SELECT DISTINCT UNNEST(ARRAY_REPLACE(assignee, transfer_user_responsibilities.suspended_user, transfer_user_responsibilities.task_owner))) as assignee
        FROM
          new_tasks
        WHERE
          transfer_user_responsibilities.suspended_user = ANY(assignee)
      ) AS new_assignees
    WHERE
      new_tasks.id = new_assignees.id;
  END IF;
  UPDATE
    recruiter_user
  SET
    status = 'suspended'
  WHERE
    recruiter_user.user_id = transfer_user_responsibilities.suspended_user;
  RETURN;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_module_relation_archive()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  DELETE FROM 
    interview_session_relation
  USING (
    SELECT
    interview_session_relation.id
  FROM
    interview_session_relation
  LEFT JOIN
    interview_session ON
      interview_session_relation.session_id = interview_session.id
  LEFT JOIN
    interview_meeting ON
      interview_meeting.id = interview_session.meeting_id
  WHERE
    interview_session_relation.interview_module_relation_id = NEW.id AND
    (
      interview_session.interview_plan_id IS NOT NULL OR
      interview_meeting.status = 'not_scheduled' OR
      interview_meeting.status = 'cancelled'
    )
  ) AS session_relations
  WHERE
    interview_session_relation.id = session_relations.id;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_recruiter_user_suspension()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE 
    interview_module_relation
  SET 
    is_archived = true
  WHERE 
    interview_module_relation.user_id = NEW.user_id;
  DELETE FROM 
    interview_session_relation
  WHERE
    interview_session_relation.user_id = NEW.user_id;
  RETURN NEW;
END;
$function$
;


