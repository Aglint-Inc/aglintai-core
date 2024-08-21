create table "public"."workflow_request_relation" (
    "id" uuid not null default gen_random_uuid(),
    "workflow_id" uuid not null,
    "request_id" uuid not null,
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text)
);


alter table "public"."workflow_request_relation" enable row level security;

CREATE UNIQUE INDEX workflow_request_relation_pkey ON public.workflow_request_relation USING btree (id);

alter table "public"."workflow_request_relation" add constraint "workflow_request_relation_pkey" PRIMARY KEY using index "workflow_request_relation_pkey";

alter table "public"."workflow_request_relation" add constraint "workflow_request_relation_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."workflow_request_relation" validate constraint "workflow_request_relation_request_id_fkey";

alter table "public"."workflow_request_relation" add constraint "workflow_request_relation_workflow_id_fkey" FOREIGN KEY (workflow_id) REFERENCES workflow(id) not valid;

alter table "public"."workflow_request_relation" validate constraint "workflow_request_relation_workflow_id_fkey";

grant delete on table "public"."workflow_request_relation" to "anon";

grant insert on table "public"."workflow_request_relation" to "anon";

grant references on table "public"."workflow_request_relation" to "anon";

grant select on table "public"."workflow_request_relation" to "anon";

grant trigger on table "public"."workflow_request_relation" to "anon";

grant truncate on table "public"."workflow_request_relation" to "anon";

grant update on table "public"."workflow_request_relation" to "anon";

grant delete on table "public"."workflow_request_relation" to "authenticated";

grant insert on table "public"."workflow_request_relation" to "authenticated";

grant references on table "public"."workflow_request_relation" to "authenticated";

grant select on table "public"."workflow_request_relation" to "authenticated";

grant trigger on table "public"."workflow_request_relation" to "authenticated";

grant truncate on table "public"."workflow_request_relation" to "authenticated";

grant update on table "public"."workflow_request_relation" to "authenticated";

grant delete on table "public"."workflow_request_relation" to "service_role";

grant insert on table "public"."workflow_request_relation" to "service_role";

grant references on table "public"."workflow_request_relation" to "service_role";

grant select on table "public"."workflow_request_relation" to "service_role";

grant trigger on table "public"."workflow_request_relation" to "service_role";

grant truncate on table "public"."workflow_request_relation" to "service_role";

grant update on table "public"."workflow_request_relation" to "service_role";


DROP TRIGGER IF EXISTS workflow_action_deletion ON "public"."workflow";
drop view if exists "public"."workflow_view";

alter type "public"."email_slack_types" rename to "email_slack_types__old_version_to_be_dropped";

create type "public"."email_slack_types" as enum ('interviewEnd_slack_interviewers', 'interviewerConfirmation_slack_interviewers', 'interviewStart_slack_interviewers', 'agent_email_candidate', 'applicantReject_email_applicant', 'applicationRecieved_email_applicant', 'confInterview_email_organizer', 'confirmInterview_email_applicant', 'debrief_email_interviewer', 'interReschedReq_email_recruiter', 'interviewCancel_email_applicant', 'InterviewCancelReq_email_recruiter', 'interviewReschedule_email_applicant', 'interviewStart_email_applicant', 'interviewStart_email_interviewers', 'phoneScreen_email_candidate', 'phoneScreenRemind_email_applicant', 'selfScheduleReminder_email_applicant', 'sendAvailReqReminder_email_applicant', 'sendSelfScheduleRequest_email_applicant', 'sendAvailabilityRequest_email_applicant', 'availabilityReqResend_email_candidate', 'interviewDetails_calender_interviewer', 'rescheduleSelfSchedule_email_applicant', 'interviewStart_email_organizer', 'meetingDeclined_email_organizer', 'meetingAccepted_email_organizer', 'candidateBook_slack_interviewerForFeedback', 'candidateBook_email_interviewerForFeedback', 'interviewEnd_slack_interviewerForFeedback', 'interviewEnd_email_interviewerForFeedback', 'candidateBook_slack_interviewerForConfirmation', 'onSignup_email_admin', 'onInvite_email_user', 'interviewEnd_email_shadowTraineeForMeetingAttendence', 'interviewEnd_email_rShadowTraineeForMeetingAttendence', 'interviewEnd_slack_shadowTraineeForMeetingAttendence', 'interviewEnd_slack_rShadowTraineeForMeetingAttendence', 'onQualified_email_trainee', 'onQualified_email_approved', 'onQualified_slack_trainee', 'onQualified_slack_approved', 'onTrainingComplete_slack_approverForTraineeMeetingQualification', 'onTrainingComplete_email_approverForTraineeMeetingQualification', 'interviewerResumed_email_admin', 'interviewEnd_slack_organizerForMeetingStatus', 'interviewEnd_email_organizerForMeetingStatus', 'onRequestSchedule_emailAgent_getCandidateAvailability', 'onRequestSchedule_emailLink_getCandidateAvailability', 'onRequestSchedule_agent_sendSelfScheduleRequest', 'onReceivingAvailReq_agent_confirmSlot', 'onSelfScheduleReqAgent_EmailAgent_SelfSchedule', 'onSelfScheduleReqAgent_PhoneAgent_SelfSchedule', 'onSelfScheduleReqAgent_EmailLink_SelfSchedule', 'onRequestReschedule_emailLink_resendAvailRequest', 'onRequestCancel_agent_cancelEvents', 'onRequestCancel_slack_interviewersOrganizer', 'onRequestInterviewerDecline_agent_changeInterviewer');

alter type "public"."workflow_trigger" rename to "workflow_trigger__old_version_to_be_dropped";

create type "public"."workflow_trigger" as enum ('selfScheduleReminder', 'interviewStart', 'sendAvailReqReminder', 'interviewerConfirmation', 'interviewEnd', 'meetingDeclined', 'meetingAccepted', 'candidateBook', 'onQualified', 'onTrainingComplete', 'onReceivingAvailReq', 'onRequestSchedule', 'onSelfScheduleReqAgent', 'onRequestCancel', 'onRequestReschedule', 'onRequestInterviewerDecline');

alter table "public"."application_email_status" alter column email type "public"."email_slack_types" using email::text::"public"."email_slack_types";

alter table "public"."company_email_template" alter column type type "public"."email_slack_types" using type::text::"public"."email_slack_types";

alter table "public"."job_email_template" alter column type type "public"."email_slack_types" using type::text::"public"."email_slack_types";

alter table "public"."workflow" alter column trigger type "public"."workflow_trigger" using trigger::text::"public"."workflow_trigger";

alter table "public"."workflow_action" alter column target_api type "public"."email_slack_types" using target_api::text::"public"."email_slack_types";

drop type "public"."email_slack_types__old_version_to_be_dropped";

drop type "public"."workflow_trigger__old_version_to_be_dropped";

create or replace view "public"."workflow_view" as  SELECT workflow.id,
    workflow.created_at,
    workflow.trigger,
    workflow.phase,
    workflow."interval",
    workflow.title,
    workflow.recruiter_id,
    workflow.auto_connect,
    workflow.description,
    COALESCE(workflow_jobs.jobs, '[]'::json) AS jobs,
    workflow.workflow_type,
    workflow.is_paused
   FROM (workflow
     LEFT JOIN ( SELECT workflow_job_relation.workflow_id,
            json_agg(json_build_object('id', workflow_job_relation.job_id, 'job_title', public_jobs.job_title, 'department', departments.name, 'location', row_to_json(office_locations.*), 'status', public_jobs.status)) AS jobs
           FROM (((workflow_job_relation
             LEFT JOIN public_jobs ON ((workflow_job_relation.job_id = public_jobs.id)))
             LEFT JOIN departments ON ((departments.id = public_jobs.department_id)))
             LEFT JOIN office_locations ON ((office_locations.id = public_jobs.location_id)))
          GROUP BY workflow_job_relation.workflow_id) workflow_jobs ON ((workflow_jobs.workflow_id = workflow.id)));

CREATE TRIGGER workflow_action_deletion AFTER UPDATE OF trigger ON public.workflow FOR EACH ROW EXECUTE FUNCTION trigger_workflow_action_deletion();

