alter table "public"."workflow" alter column "title" set default ''::text;

update "public"."workflow"
set title = ''
where title is null;

alter table "public"."workflow" alter column "title" set not null;


