-- alter rename cols
ALTER TABLE "public"."recruiter_user"
  RENAME COLUMN "department" TO "departmentx";

ALTER TABLE "public"."recruiter_user"
  RENAME COLUMN "interview_location" TO "interview_locationx";

-- alter add cols
ALTER TABLE "public"."recruiter_user"
  ADD COLUMN "department_id" INTEGER
  , ADD CONSTRAINT "recruiter_user_department_id_fkey" FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL NOT VALID
  , ADD COLUMN "office_location_id" INTEGER
  , ADD CONSTRAINT "recruiter_user_office_location_id_fkey" FOREIGN KEY (office_location_id) REFERENCES office_locations(id) ON DELETE SET NULL NOT VALID;

-- migrate data
WITH dep AS (SELECT recruiter_user.user_id, departments.id FROM recruiter_user JOIN recruiter_relation ON recruiter_user.user_id = recruiter_relation.user_id JOIN departments ON departments.recruiter_id = recruiter_relation.recruiter_id WHERE recruiter_user.departmentx LIKE '%'||departments.name||'%')
UPDATE recruiter_user SET department_id = dep.id FROM dep WHERE dep.user_id = recruiter_user.user_id;

-- drop old cols
alter table "public"."recruiter_user" 
  DROP COLUMN "departmentx"
  , DROP COLUMN "interview_locationx";