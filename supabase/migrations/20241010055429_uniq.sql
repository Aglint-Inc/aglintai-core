CREATE UNIQUE INDEX unique_request_id ON public.candidate_request_availability USING btree (request_id);

alter table "public"."candidate_request_availability" add constraint "unique_request_id" UNIQUE using index "unique_request_id";


