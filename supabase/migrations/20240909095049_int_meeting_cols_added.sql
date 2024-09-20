drop trigger if exists "new_recruiters" on "public"."recruiter";

alter table "public"."interview_meeting" add column "confirmed_candidate_tz" text;

set check_function_bodies = off;

create or replace view "public"."meeting_details" as  SELECT interview_meeting.id,
    interview_meeting.created_at,
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
    interview_meeting.application_id,
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
          WHERE ((interview_session_relation.session_id = interview_session.id) AND (interview_session_relation.is_confirmed = true))) AS confirmed_module_relation_ids,
    interview_session.parent_session_id,
    interview_meeting.schedule_request_id,
    interview_meeting.confirmed_candidate_tz
   FROM (((interview_meeting
     LEFT JOIN interview_session ON ((interview_meeting.id = interview_session.meeting_id)))
     LEFT JOIN applications ON ((applications.id = interview_meeting.application_id)))
     LEFT JOIN public_jobs ON ((applications.job_id = public_jobs.id)));


CREATE TRIGGER new_recruiters AFTER INSERT ON public.recruiter FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('http://192.168.29.44:3000/api/pre-seed', 'POST', '{"Content-type":"application/json"}', '{}', '1000');
