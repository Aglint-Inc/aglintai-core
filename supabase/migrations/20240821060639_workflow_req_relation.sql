create table "public"."workflow_request_relation" (
    "id" uuid not null default gen_random_uuid(),
    "workflow_id" uuid not null,
    "request_id" uuid not null,
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text)
);


alter table "public"."workflow_request_relation" enable row level security;

CREATE UNIQUE INDEX workflow_request_relation_pkey ON public.workflow_request_relation USING btree (id);

alter table "public"."workflow_request_relation" add constraint "workflow_request_relation_pkey" PRIMARY KEY using index "workflow_request_relation_pkey";

alter table "public"."workflow_request_relation" add constraint "workflow_request_relation_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."workflow_request_relation" validate constraint "workflow_request_relation_request_id_fkey";

alter table "public"."workflow_request_relation" add constraint "workflow_request_relation_workflow_id_fkey" FOREIGN KEY (workflow_id) REFERENCES workflow(id) not valid;

alter table "public"."workflow_request_relation" validate constraint "workflow_request_relation_workflow_id_fkey";

grant delete on table "public"."workflow_request_relation" to "anon";

grant insert on table "public"."workflow_request_relation" to "anon";

grant references on table "public"."workflow_request_relation" to "anon";

grant select on table "public"."workflow_request_relation" to "anon";

grant trigger on table "public"."workflow_request_relation" to "anon";

grant truncate on table "public"."workflow_request_relation" to "anon";

grant update on table "public"."workflow_request_relation" to "anon";

grant delete on table "public"."workflow_request_relation" to "authenticated";

grant insert on table "public"."workflow_request_relation" to "authenticated";

grant references on table "public"."workflow_request_relation" to "authenticated";

grant select on table "public"."workflow_request_relation" to "authenticated";

grant trigger on table "public"."workflow_request_relation" to "authenticated";

grant truncate on table "public"."workflow_request_relation" to "authenticated";

grant update on table "public"."workflow_request_relation" to "authenticated";

grant delete on table "public"."workflow_request_relation" to "service_role";

grant insert on table "public"."workflow_request_relation" to "service_role";

grant references on table "public"."workflow_request_relation" to "service_role";

grant select on table "public"."workflow_request_relation" to "service_role";

grant trigger on table "public"."workflow_request_relation" to "service_role";

grant truncate on table "public"."workflow_request_relation" to "service_role";

grant update on table "public"."workflow_request_relation" to "service_role";


