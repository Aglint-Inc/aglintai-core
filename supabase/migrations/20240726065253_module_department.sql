drop view if exists "public"."all_interviewers";

drop view if exists "public"."interview_types_view";

drop view if exists "public"."module_relations_view";

alter table "public"."interview_module" drop column "department";

alter table "public"."interview_module" add column "department_id" integer;

alter table "public"."interview_module" add constraint "interview_module_department_id_fkey" FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL not valid;

alter table "public"."interview_module" validate constraint "interview_module_department_id_fkey";

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


create or replace view
  public.interview_types_view as
SELECT
        intmod.id,
        intmod.name,
        intmod.department_id,
        intmod.created_by,
        intmod.is_archived,
        intmod.description,
        intmod.recruiter_id,
        COALESCE((SELECT jsonb_agg(
            jsonb_build_object(
                'user_id', ru.user_id,
                'first_name', ru.first_name,
                'last_name', ru.last_name,
                'email', ru.email,
                'profile_image', ru.profile_image,
                'position', ru.position
            )
        ) FROM recruiter_user ru 
        WHERE ru.user_id IN (SELECT intmodrel.user_id FROM interview_module_relation intmodrel WHERE intmodrel.module_id = intmod.id AND intmodrel.is_archived=false)), '[]'::jsonb) AS users,
        (SELECT COUNT(*) FROM interview_meeting intm JOIN interview_session inses ON inses.meeting_id=intm.id  WHERE  intm.status='confirmed' AND inses.module_id=intmod.id)::integer AS upcoming_meeting_count,
        (SELECT COUNT(*) FROM interview_meeting intm JOIN interview_session inses ON inses.meeting_id=intm.id WHERE  intm.status='completed' AND inses.module_id=intmod.id)::integer AS completed_meeting_count,
         (SELECT COUNT(*) FROM interview_meeting intm JOIN interview_session inses ON inses.meeting_id=intm.id WHERE  intm.status='cancelled' AND inses.module_id=intmod.id)::integer AS canceled_meeting_count
    FROM public.interview_module intmod
    LEFT JOIN public.departments ON departments.id= intmod.department_id
    GROUP BY intmod.id
    ORDER BY intmod.created_at DESC;


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
            ( SELECT json_agg(json_build_object('interview_session', row_to_json(interview_session.*), 'interview_meeting', row_to_json(interview_meeting.*), 'interview_session_relation', row_to_json(interview_session_relation.*))) AS json_agg
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
          WHERE ((((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text) AND (((meeting_elements.value -> 'interview_session_relation'::text) ->> 'training_type'::text) = 'shadow'::text))) AS shadow_completed_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE ((((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'completed'::text) AND (((meeting_elements.value -> 'interview_session_relation'::text) ->> 'training_type'::text) = 'reverse_shadow'::text))) AS reverse_shadow_completed_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE ((((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'confirmed'::text) AND (((meeting_elements.value -> 'interview_session_relation'::text) ->> 'training_type'::text) = 'reverse_shadow'::text))) AS reverse_shadow_confirmed_count,
    ( SELECT count(*) AS count
           FROM LATERAL json_array_elements(interview_data.meetings) meeting_elements(value)
          WHERE ((((meeting_elements.value -> 'interview_meeting'::text) ->> 'status'::text) = 'confirmed'::text) AND (((meeting_elements.value -> 'interview_session_relation'::text) ->> 'training_type'::text) = 'shadow'::text))) AS shadow_confirmed_count
   FROM interview_data;



