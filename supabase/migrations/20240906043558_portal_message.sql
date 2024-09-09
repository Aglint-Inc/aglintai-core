alter table "public"."candidate_portal_message" drop constraint "candidate_portal_message_sender_id_fkey";

alter table "public"."candidate_portal_message" drop column "sender_id";

alter table "public"."candidate_portal_message" add column "availability_id" text;

alter table "public"."candidate_portal_message" add column "filter_id" text;

alter table "public"."candidate_portal_message" add column "type" text;

alter table "public"."candidate_request_availability" add column "availability_id" text;

alter table "public"."candidate_request_availability" add column "filter_id" text;

