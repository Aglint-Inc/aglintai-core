alter table "public"."candidate_request_availability" drop constraint "public_candidate_request_availability_request_id_fkey";

alter table "public"."interview_filter_json" drop constraint "public_interview_filter_json_request_id_fkey";

alter table "public"."candidate_request_availability" add constraint "candidate_request_availability_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."candidate_request_availability" validate constraint "candidate_request_availability_request_id_fkey";

alter table "public"."interview_filter_json" add constraint "interview_filter_json_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview_filter_json" validate constraint "interview_filter_json_request_id_fkey";

alter table "public"."interview_session_cancel" drop constraint "interview_session_cancel_request_id_fkey";

alter table "public"."interview_session_cancel" add constraint "interview_session_cancel_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview_session_cancel" validate constraint "interview_session_cancel_request_id_fkey";



update office_locations
set name=line1;
alter table "public"."office_locations" alter column "name" set not null;


