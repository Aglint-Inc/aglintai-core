CREATE UNIQUE INDEX interview_filter_json_request_id_key ON public.interview_filter_json USING btree (request_id);

alter table "public"."interview_filter_json" add constraint "interview_filter_json_request_id_key" UNIQUE using index "interview_filter_json_request_id_key";
