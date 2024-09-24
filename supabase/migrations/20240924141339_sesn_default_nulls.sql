alter table "public"."interview_session" alter column "break_duration" set not null;

alter table "public"."interview_session" alter column "interviewer_cnt" set not null;

alter table "public"."interview_session" alter column "name" set default ''::text;

alter table "public"."interview_session" alter column "name" set not null;


