alter table "public"."candidate_request_availability" alter column "request_id" set not null;

alter table "public"."interview_filter_json" alter column "request_id" set not null;

alter table "public"."public_jobs" alter column "job_title" set not null;

alter table "public"."recruiter" alter column "name" set not null;


