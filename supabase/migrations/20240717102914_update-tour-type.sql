alter table "public"."tour" drop constraint "tour_type_check";

alter table "public"."tour" add constraint "tour_type_check" CHECK ((type = ANY (ARRAY['workflow_intro'::text, 'profile_score_intro'::text]))) not valid;

alter table "public"."tour" validate constraint "tour_type_check";


