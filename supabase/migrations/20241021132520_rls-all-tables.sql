drop policy "autenticated_write_only" on "public"."recruiter_relation";

drop policy "recruiter_user_authenticated_accesss_only" on "public"."recruiter_user";

drop policy "Allow anonymous access" on "public"."request";

drop policy "recruiter_authencated_access_only" on "public"."recruiter";

alter table "public"."application_logs" enable row level security;

alter table "public"."candidate_request_availability" enable row level security;

alter table "public"."company_email_template" enable row level security;

alter table "public"."departments" enable row level security;

alter table "public"."integrations" enable row level security;

alter table "public"."interview_filter_json" enable row level security;

alter table "public"."interview_meeting" enable row level security;

alter table "public"."interview_module" enable row level security;

alter table "public"."interview_module_approve_users" enable row level security;

alter table "public"."interview_module_relation" enable row level security;

alter table "public"."interview_plan" enable row level security;

alter table "public"."interview_session" enable row level security;

alter table "public"."interview_session_cancel" enable row level security;

alter table "public"."interview_session_relation" enable row level security;

alter table "public"."interview_training_progress" enable row level security;

alter table "public"."office_locations" enable row level security;

alter table "public"."recruiter_preferences" enable row level security;

alter table "public"."request" enable row level security;

alter table "public"."request_log" enable row level security;

alter table "public"."request_note" enable row level security;

alter table "public"."request_progress" enable row level security;

alter table "public"."request_relation" enable row level security;

alter table "public"."request_session_relation" enable row level security;

alter table "public"."workflow" enable row level security;

alter table "public"."workflow_action" enable row level security;

alter table "public"."workflow_action_logs" enable row level security;

alter table "public"."workflow_job_relation" enable row level security;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_recruiter_id_by_user(user_id uuid)
 RETURNS uuid
 LANGUAGE sql
 SECURITY DEFINER
AS $function$
  SELECT recruiter_id 
  FROM public.recruiter_relation 
  WHERE user_id = user_id
  LIMIT 1;
$function$
;

create policy "auth only"
on "public"."application_logs"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM applications
  WHERE (applications.id = application_logs.application_id))))
with check ((EXISTS ( SELECT 1
   FROM applications
  WHERE (applications.id = application_logs.application_id))));


create policy "auth only"
on "public"."candidate_request_availability"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM applications
  WHERE (applications.id = candidate_request_availability.application_id))))
with check ((EXISTS ( SELECT 1
   FROM applications
  WHERE (applications.id = candidate_request_availability.application_id))));


create policy "auth only"
on "public"."company_email_template"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = company_email_template.recruiter_id))))
with check ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = company_email_template.recruiter_id))));


create policy "auth only "
on "public"."departments"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = departments.recruiter_id))))
with check ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = departments.recruiter_id))));


create policy "auth only"
on "public"."integrations"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = integrations.recruiter_id))))
with check ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = integrations.recruiter_id))));


create policy "authenticated only"
on "public"."interview_filter_json"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM applications
  WHERE (applications.id = interview_filter_json.application_id))))
with check ((EXISTS ( SELECT 1
   FROM applications
  WHERE (applications.id = interview_filter_json.application_id))));


create policy "auth only"
on "public"."interview_meeting"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM interview_session
  WHERE (interview_session.meeting_id = interview_meeting.id))))
with check ((EXISTS ( SELECT 1
   FROM interview_session
  WHERE (interview_session.meeting_id = interview_meeting.id))));


create policy "authenticated only"
on "public"."interview_module"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = interview_module.recruiter_id))))
with check ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = interview_module.recruiter_id))));


create policy "authenticated_only"
on "public"."interview_module_approve_users"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM interview_module
  WHERE (interview_module.id = interview_module_approve_users.module_id))))
with check ((EXISTS ( SELECT 1
   FROM interview_module
  WHERE (interview_module.id = interview_module_approve_users.module_id))));


create policy "authenticated only"
on "public"."interview_module_relation"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM interview_module
  WHERE (interview_module.id = interview_module_relation.module_id))))
with check ((EXISTS ( SELECT 1
   FROM interview_module
  WHERE (interview_module.id = interview_module_relation.module_id))));


create policy "auth only"
on "public"."interview_plan"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = interview_plan.recruiter_id))))
with check ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = interview_plan.recruiter_id))));


create policy "auth only"
on "public"."interview_session"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM interview_plan
  WHERE (interview_plan.id = interview_session.interview_plan_id))))
with check ((EXISTS ( SELECT 1
   FROM interview_plan
  WHERE (interview_plan.id = interview_session.interview_plan_id))));


create policy "auth only"
on "public"."interview_session_cancel"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM interview_session
  WHERE (interview_session.id = interview_session_cancel.session_id))))
with check ((EXISTS ( SELECT 1
   FROM interview_session
  WHERE (interview_session.id = interview_session_cancel.session_id))));


create policy "auth only"
on "public"."interview_session_relation"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM interview_session
  WHERE (interview_session.id = interview_session_relation.session_id))))
with check ((EXISTS ( SELECT 1
   FROM interview_session
  WHERE (interview_session.id = interview_session_relation.session_id))));


create policy "auth only"
on "public"."interview_training_progress"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM interview_session_relation
  WHERE (interview_session_relation.id = interview_training_progress.session_relation_id))))
with check ((EXISTS ( SELECT 1
   FROM interview_session_relation
  WHERE (interview_session_relation.id = interview_training_progress.session_relation_id))));


create policy "auth only"
on "public"."office_locations"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = office_locations.recruiter_id))))
with check ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = office_locations.recruiter_id))));


create policy "auth only"
on "public"."recruiter_preferences"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = recruiter_preferences.recruiter_id))))
with check ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = recruiter_preferences.recruiter_id))));


create policy "auth  access"
on "public"."recruiter_relation"
as permissive
for select
to authenticated
using ((recruiter_id = get_recruiter_id_by_user(auth.uid())));


create policy "auth only "
on "public"."recruiter_user"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM recruiter_relation
  WHERE (recruiter_relation.user_id = recruiter_user.user_id))))
with check ((EXISTS ( SELECT 1
   FROM recruiter_relation
  WHERE (recruiter_relation.user_id = recruiter_user.user_id))));


create policy "auth only"
on "public"."request"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM applications
  WHERE (applications.id = request.application_id))))
with check ((EXISTS ( SELECT 1
   FROM applications
  WHERE (applications.id = request.application_id))));


create policy "auth only"
on "public"."request_log"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM request
  WHERE (request.id = request_log.request_id))))
with check ((EXISTS ( SELECT 1
   FROM request
  WHERE (request.id = request_log.request_id))));


create policy "auth only"
on "public"."request_note"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM request
  WHERE (request.id = request_note.request_id))))
with check ((EXISTS ( SELECT 1
   FROM request
  WHERE (request.id = request_note.request_id))));


create policy "auth only"
on "public"."request_progress"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM request
  WHERE (request.id = request_progress.request_id))))
with check ((EXISTS ( SELECT 1
   FROM request
  WHERE (request.id = request_progress.request_id))));


create policy "auth only"
on "public"."request_relation"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM request
  WHERE (request.id = request_relation.request_id))))
with check ((EXISTS ( SELECT 1
   FROM request
  WHERE (request.id = request_relation.request_id))));


create policy "auth"
on "public"."request_session_relation"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM candidate_request_availability
  WHERE (candidate_request_availability.id = request_session_relation.request_availability_id))))
with check ((EXISTS ( SELECT 1
   FROM candidate_request_availability
  WHERE (candidate_request_availability.id = request_session_relation.request_availability_id))));


create policy "auth only"
on "public"."workflow"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = workflow.recruiter_id))))
with check ((EXISTS ( SELECT 1
   FROM recruiter
  WHERE (recruiter.id = workflow.recruiter_id))));


create policy "auth only"
on "public"."workflow_action"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM workflow
  WHERE (workflow.id = workflow_action.workflow_id))))
with check ((EXISTS ( SELECT 1
   FROM workflow
  WHERE (workflow.id = workflow_action.workflow_id))));


create policy "auth only"
on "public"."workflow_action_logs"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM workflow
  WHERE (workflow.id = workflow_action_logs.workflow_id))))
with check ((EXISTS ( SELECT 1
   FROM workflow
  WHERE (workflow.id = workflow_action_logs.workflow_id))));


create policy "auth only"
on "public"."workflow_job_relation"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM workflow
  WHERE (workflow.id = workflow_job_relation.workflow_id))))
with check ((EXISTS ( SELECT 1
   FROM workflow
  WHERE (workflow.id = workflow_job_relation.workflow_id))));


create policy "recruiter_authencated_access_only"
on "public"."recruiter"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM recruiter_relation
  WHERE (recruiter_relation.recruiter_id = recruiter.id))))
with check ((EXISTS ( SELECT 1
   FROM recruiter_relation
  WHERE (recruiter_relation.recruiter_id = recruiter.id))));



