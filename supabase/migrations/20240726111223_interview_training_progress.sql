alter table "public"."interview_training_progress" add column "approved_user_id" uuid;

alter table "public"."interview_training_progress" add constraint "interview_training_progress_approved_user_id_fkey" FOREIGN KEY (approved_user_id) REFERENCES recruiter_user(user_id) ON DELETE SET NULL not valid;

alter table "public"."interview_training_progress" validate constraint "interview_training_progress_approved_user_id_fkey";