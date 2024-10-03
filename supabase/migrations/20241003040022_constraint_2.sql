alter table "public"."interview_session_cancel" drop constraint "interview_session_cancel_request_id_fkey";

alter table "public"."interview_session_cancel" add constraint "interview_session_cancel_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview_session_cancel" validate constraint "interview_session_cancel_request_id_fkey";


