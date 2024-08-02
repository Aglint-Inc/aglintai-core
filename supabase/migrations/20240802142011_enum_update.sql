alter type "public"."workflow_cron_trigger_tables" rename to "workflow_cron_trigger_tables__old_version_to_be_dropped";

create type "public"."workflow_cron_trigger_tables" as enum ('interview_meeting', 'interview_session_relation', 'interview_filter_json', 'candidate_request_availability', 'interview_module_relation', 'interview_training_progress', 'request');

alter table "public"."workflow_action_logs" alter column related_table type "public"."workflow_cron_trigger_tables" using related_table::text::"public"."workflow_cron_trigger_tables";

drop type "public"."workflow_cron_trigger_tables__old_version_to_be_dropped";


