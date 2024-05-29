alter table "public"."new_tasks" add column "request_availability_id" uuid;

alter table "public"."new_tasks" add constraint "new_tasks_request_availability_id_fkey" FOREIGN KEY (request_availability_id) REFERENCES new_tasks(id) ON DELETE CASCADE not valid;

alter table "public"."new_tasks" validate constraint "new_tasks_request_availability_id_fkey";


