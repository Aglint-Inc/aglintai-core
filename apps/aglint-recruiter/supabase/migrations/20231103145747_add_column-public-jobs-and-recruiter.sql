alter table "public"."public_jobs" add column "end_video" jsonb;

alter table "public"."public_jobs" add column "intro_videos" jsonb;

alter table "public"."public_jobs" add column "start_video" jsonb;

alter table "public"."recruiter" add column "audio_avatar_id" numeric not null default '0'::numeric;

alter table "public"."recruiter" add column "video_assessment" boolean default false;


