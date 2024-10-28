-- Add a unique constraint on the request_id column of the interview_filter_json table

alter table "public"."interview_filter_json" add constraint "interview_filter_json_request_id_key" UNIQUE (request_id);