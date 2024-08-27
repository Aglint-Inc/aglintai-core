alter table "public"."interview_plan" add column "application_id" uuid;

alter table "public"."interview_plan" add constraint "interview_plan_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview_plan" validate constraint "interview_plan_application_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.trigger_clone_interview_session()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    company_id uuid;
    appl_job_id uuid;
    int_schedule_id uuid := gen_random_uuid();  -- Assuming this is to generate a new UUID
    session_rec record;
    sesn_reln_record record;
    inserted_sesn_id uuid;
    inserted_meet_id uuid;
    inserted_plan_id uuid;
    int_plan_loop record;
BEGIN
    -- Delete any existing interview schedules for this application
    DELETE FROM interview_schedule WHERE interview_schedule.application_id = NEW.id;

    -- Fetch the recruiter ID for the application
    SELECT public_jobs.recruiter_id 
    INTO company_id 
    FROM applications
    LEFT JOIN public_jobs ON public_jobs.id = applications.job_id 
    WHERE applications.id = NEW.id;

    -- Insert a new interview schedule record
    INSERT INTO interview_schedule(id, application_id, recruiter_id) 
    VALUES (int_schedule_id, NEW.id, company_id);

    -- Fetch the job ID for the application
    SELECT job_id 
    INTO appl_job_id 
    FROM applications 
    WHERE id = NEW.id;

    -- Loop through each interview plan related to the job
    FOR int_plan_loop IN 
        SELECT 
            interview_plan.id AS plan_id,
            interview_plan.name,
            interview_plan.plan_order
        FROM interview_plan 
        WHERE interview_plan.job_id = appl_job_id
    LOOP
        -- Insert into interview_plan and get the inserted plan_id
        INSERT INTO interview_plan (name, plan_order, application_id)
        VALUES (int_plan_loop.name, int_plan_loop.plan_order, NEW.id)
        RETURNING id INTO inserted_plan_id;

        FOR session_rec IN
            SELECT 
                interview_session.id AS id,
                interview_session.break_duration,
                interview_session.interviewer_cnt,
                interview_session.location,
                interview_session.module_id,
                interview_session.name,
                interview_session.schedule_type,
                interview_session.session_duration,
                interview_session.session_order,
                interview_session.session_type
            FROM interview_session
            WHERE interview_session.interview_plan_id = int_plan_loop.plan_id
        LOOP
            -- Insert interview meeting and session within a single SQL command using CTEs
            WITH inserted_meeting_cte AS (
                INSERT INTO interview_meeting (interview_schedule_id, status,application_id)
                VALUES (int_schedule_id, 'not_scheduled',NEW.id)
                RETURNING id
            ),
            inserted_session_cte AS (
                INSERT INTO interview_session (
                    break_duration,
                    interviewer_cnt,
                    location,
                    module_id,
                    name,
                    schedule_type,
                    session_duration,
                    session_order,
                    session_type,
                    parent_session_id,
                    meeting_id,
                    interview_plan_id
                )
                VALUES (
                    session_rec.break_duration,
                    session_rec.interviewer_cnt,
                    session_rec.location,
                    session_rec.module_id,
                    session_rec.name,
                    session_rec.schedule_type,
                    session_rec.session_duration,
                    session_rec.session_order,
                    session_rec.session_type,
                    session_rec.id,
                    (SELECT id FROM inserted_meeting_cte),
                    inserted_plan_id
                )
                RETURNING id
            )
            SELECT 
                (SELECT id FROM inserted_meeting_cte),
                (SELECT id FROM inserted_session_cte)
            INTO inserted_meet_id, inserted_sesn_id;

            -- Insert relations for the session
            FOR sesn_reln_record IN 
            (
                SELECT 
                    interview_session_relation.interview_module_relation_id,
                    interview_session_relation.interviewer_type,
                    interview_session_relation.user_id,
                    interview_session_relation.training_type
                FROM interview_session_relation 
                WHERE interview_session_relation.session_id = session_rec.id
            )
            LOOP
                INSERT INTO interview_session_relation(
                    interview_module_relation_id,
                    interviewer_type,
                    user_id,
                    training_type,
                    session_id
                ) 
                VALUES (
                    sesn_reln_record.interview_module_relation_id,
                    sesn_reln_record.interviewer_type,
                    sesn_reln_record.user_id,
                    sesn_reln_record.training_type,
                    inserted_sesn_id
                );
            END LOOP;
        END LOOP;
    END LOOP;

    RETURN NEW;
END;
$function$
;

update interview_plan
set
  application_id = temp.application_id
from
  (
    select distinct
      interview_session.interview_plan_id,
      interview_meeting.application_id
    from
      interview_session
      inner join interview_meeting on interview_meeting.id = interview_session.meeting_id
      inner join interview_plan on interview_plan.id = interview_session.interview_plan_id
    where
      interview_plan.application_id is null
      and interview_plan.job_id is null
  ) as temp
where
  interview_plan.id = temp.interview_plan_id;

update interview_plan
set
  plan_order = temp.plan_order
from
  (
    select distinct
      interview_plan.id,
      interview_plan.job_id,
      row_number() over (
        partition by
          interview_plan.job_id
        order by
          interview_plan.plan_order,
          interview_plan.name,
          interview_plan.id
      ) as plan_order
    from
      interview_plan
    where
      interview_plan.application_id is null
      and interview_plan.job_id is not null
  ) as temp
where
  interview_plan.id = temp.id;

update interview_plan
set
  plan_order = temp.plan_order
from
  (
    select distinct
      interview_plan.id,
      interview_plan.job_id,
      row_number() over (
        partition by
          interview_plan.application_id
        order by
          interview_plan.plan_order,
          interview_plan.name,
          interview_plan.id
      ) as plan_order
    from
      interview_plan
    where
      interview_plan.application_id is not null
      and interview_plan.job_id is null
  ) as temp
where
  interview_plan.id = temp.id;
