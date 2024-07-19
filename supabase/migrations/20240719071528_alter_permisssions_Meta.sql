alter table "public"."permissions" drop column "dependency_tree";

alter table "public"."permissions" drop column "updated_at";

alter table "public"."permissions" add column "meta" jsonb default '{"module": false, "description": "", "dependency_tree": {"child": [], "parent": null, "sibling": null}}'::jsonb;
