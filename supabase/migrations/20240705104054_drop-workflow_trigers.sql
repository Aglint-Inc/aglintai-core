drop trigger if exists "after_insert_interview_filter_json" on "public"."interview_filter_json";

drop trigger if exists "after_update_interview_meeting" on "public"."interview_meeting";

drop trigger if exists "after_update_interview_session_relation" on "public"."interview_session_relation";

drop trigger if exists "workflow_action_deletion" ON "public"."workflow";

drop trigger if exists "after_insert_candidate_request_availability" on "public"."candidate_request_availability";

drop function if exists "public"."workflow_log_on_insert_interview_filter_json"();

drop function if exists "public"."workflow_log_on_update_interview_meeting"();

drop function if exists "public"."workflow_log_on_update_interview_session_relation"();

drop function if exists "public"."trigger_workflow_action_deletion"();

drop function if exists "public"."workflow_log_on_insert_candidate_request_availability"();