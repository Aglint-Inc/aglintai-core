alter table "public"."recruiter_preferences" add column "ats" text not null default 'Aglint'::text;

alter table "public"."recruiter_preferences" add constraint "recruiter_preferences_ats_check" CHECK ((ats = ANY (ARRAY['Aglint'::text, 'Ashby'::text, 'Greenhouse'::text, 'Lever'::text]))) not valid;

update recruiter_preferences
set ats = 'Greenhouse'
where greenhouse = true;

alter table "public"."recruiter_preferences" drop column "greenhouse"
