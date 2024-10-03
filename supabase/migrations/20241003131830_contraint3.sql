update office_locations
set name=line1;
alter table "public"."office_locations" alter column "name" set not null;


