drop function if exists "public"."create_new_workflow_action_log"(triggered_table text, triggered_table_pkey uuid, workflow_id uuid, workflow_action_id uuid, interval_minutes numeric, phase text, meta json, base_time timestamp with time zone);

drop function if exists "public"."create_new_workflow_action_log"(triggered_table workflow_cron_trigger_tables, triggered_table_pkey uuid, workflow_id uuid, workflow_action_id uuid, interval_minutes numeric, phase text, meta json, base_time timestamp with time zone);

drop function if exists "public"."create_new_workflow_action_log"(workflow_id uuid, workflow_action_id uuid, interval_minutes numeric, phase text, meta json, base_time timestamp with time zone);


