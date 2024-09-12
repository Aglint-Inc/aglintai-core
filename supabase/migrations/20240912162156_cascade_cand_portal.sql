alter table "public"."candidate_portal_message" drop constraint "candidate_portal_message_availability_id_fkey";

alter table "public"."candidate_portal_message" drop constraint "candidate_portal_message_filter_id_fkey";

alter table "public"."candidate_portal_message" add constraint "candidate_portal_message_availability_id_fkey" FOREIGN KEY (availability_id) REFERENCES candidate_request_availability(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."candidate_portal_message" validate constraint "candidate_portal_message_availability_id_fkey";

alter table "public"."candidate_portal_message" add constraint "candidate_portal_message_filter_id_fkey" FOREIGN KEY (filter_id) REFERENCES interview_filter_json(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."candidate_portal_message" validate constraint "candidate_portal_message_filter_id_fkey";


