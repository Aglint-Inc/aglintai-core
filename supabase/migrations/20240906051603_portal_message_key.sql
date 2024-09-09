alter table "public"."candidate_portal_message" drop column "type";

alter table "public"."candidate_portal_message" alter column "availability_id" set data type uuid using "availability_id"::uuid;

alter table "public"."candidate_portal_message" alter column "filter_id" set data type uuid using "filter_id"::uuid;

alter table "public"."candidate_portal_message" add constraint "candidate_portal_message_availability_id_fkey" FOREIGN KEY (availability_id) REFERENCES candidate_request_availability(id) not valid;

alter table "public"."candidate_portal_message" validate constraint "candidate_portal_message_availability_id_fkey";

alter table "public"."candidate_portal_message" add constraint "candidate_portal_message_filter_id_fkey" FOREIGN KEY (filter_id) REFERENCES interview_filter_json(id) not valid;

alter table "public"."candidate_portal_message" validate constraint "candidate_portal_message_filter_id_fkey";


