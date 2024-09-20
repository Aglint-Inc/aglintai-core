alter table "public"."request_completed_event" alter column "request_id" drop default;

alter table "public"."request_completed_event" alter column "request_id" set not null;

CREATE UNIQUE INDEX request_completed_event_pkey ON public.request_completed_event USING btree (id);

alter table "public"."request_completed_event" add constraint "request_completed_event_pkey" PRIMARY KEY using index "request_completed_event_pkey";

alter table "public"."request_completed_event" add constraint "public_request_completed_event_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."request_completed_event" validate constraint "public_request_completed_event_request_id_fkey";


