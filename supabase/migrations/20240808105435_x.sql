ALTER TABLE "public"."office_locations"
  ADD COLUMN "name" text NOT NULL DEFAULT '';

ALTER TABLE "public"."office_locations"
  ALTER COLUMN "name" DROP DEFAULT;
