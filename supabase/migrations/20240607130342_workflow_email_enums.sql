drop view if exists "public"."workflow_view";

alter type "public"."email_types" rename to "email_types__old_version_to_be_dropped";

create type "public"."email_types" as enum ('debrief_calendar_invite', 'candidate_invite_confirmation', 'cancel_interview_session', 'init_email_agent', 'confirmation_mail_to_organizer', 'interview', 'rejection', 'phone_screening', 'interview_resend', 'application_received', 'phone_screening_resend', 'request_candidate_slot', 'candidate_cancel_request', 'candidate_reschedule_request', 'recruiter_rescheduling_email', 'candidate_availability_request', 'sendSelfScheduleRequest_email_applicant', 'interviewStart_email_applicant', 'sendAvailabilityRequest_email_applicant', 'interviewStart_email_interviewers', 'interviewStart_slack_interviewers', 'interviewEnd_slack_interviewers', 'interviewerConfirmation_slack_interviewers');

alter type "public"."workflow_trigger" rename to "workflow_trigger__old_version_to_be_dropped";

create type "public"."workflow_trigger" as enum ('sendSelfScheduleRequest', 'interviewStart', 'sendAvailabilityRequest', 'interviewerConfirmation', 'interviewEnd');

alter table "public"."company_email_template" alter column type type "public"."email_types" using type::text::"public"."email_types";

alter table "public"."workflow" alter column trigger type "public"."workflow_trigger" using trigger::text::"public"."workflow_trigger";

drop type "public"."email_types__old_version_to_be_dropped";

drop type "public"."workflow_trigger__old_version_to_be_dropped";

CREATE UNIQUE INDEX company_email_template_ukey ON public.company_email_template USING btree (recruiter_id, type);

alter table "public"."company_email_template" add constraint "company_email_template_ukey" UNIQUE using index "company_email_template_ukey";

create or replace view "public"."workflow_view" as  SELECT workflow.id,
    workflow.created_at,
    workflow.phase,
    workflow."interval",
    workflow.title,
    workflow.recruiter_id,
    workflow.trigger,
    COALESCE(workflow_jobs.jobs, '[]'::json) AS jobs
   FROM (workflow
     LEFT JOIN ( SELECT workflow_job_relation.workflow_id,
            json_agg(workflow_job_relation.job_id) AS jobs
           FROM workflow_job_relation
          GROUP BY workflow_job_relation.workflow_id) workflow_jobs ON ((workflow_jobs.workflow_id = workflow.id)));



