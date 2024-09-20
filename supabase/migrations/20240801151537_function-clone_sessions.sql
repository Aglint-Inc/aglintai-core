set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.clone_sessions(app_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    company_id uuid;
    session_rec record;
    sesn_reln_record record;
    job_session_ids uuid[] := '{}';
    app_session_ids uuid[] := '{}';
    appl_job_id uuid;
    int_schedule_id uuid;
    inserted_sesn_id uuid;
BEGIN
    SELECT interview_schedule.id 
    INTO int_schedule_id  
    FROM interview_schedule
    WHERE interview_schedule.application_id = app_id;
    
    -- clone
    IF int_schedule_id IS NOT NULL THEN 
        int_schedule_id := uuid_generate_v4();
        
        SELECT public_jobs.recruiter_id 
        INTO company_id 
        FROM applications
        LEFT JOIN public_jobs ON public_jobs.id = applications.job_id 
        WHERE applications.id = app_id;

        INSERT INTO interview_schedule(id, application_id, recruiter_id) 
        VALUES (int_schedule_id, app_id, company_id);

        SELECT job_id 
        INTO appl_job_id 
        FROM applications 
        WHERE id = app_id;
        
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
        FROM interview_plan
        LEFT JOIN interview_session ON interview_session.interview_plan_id = interview_plan.id
        WHERE interview_plan.job_id = appl_job_id
        LOOP
            WITH inserted_meeting AS (
                INSERT INTO interview_meeting (interview_schedule_id, status)
                VALUES (int_schedule_id, 'not_scheduled')
                RETURNING id
            ),
            inserted_session AS (
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
                    meeting_id
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
                    (SELECT id FROM inserted_meeting)
                )
                RETURNING id
            )
            SELECT id INTO inserted_sesn_id FROM inserted_session;

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

            app_session_ids := array_append(app_session_ids, inserted_sesn_id);
            job_session_ids := array_append(job_session_ids, session_rec.id);
        END LOOP;
    ELSE
        SELECT array_agg(interview_session.id)
        INTO app_session_ids
        FROM interview_schedule
        LEFT JOIN interview_meeting ON interview_meeting.interview_schedule_id = interview_schedule.id
        LEFT JOIN interview_session ON interview_session.meeting_id = interview_meeting.id
        WHERE interview_schedule.application_id = app_id;
    END IF;

    RETURN jsonb_build_object('job_session_ids', job_session_ids, 'cloned_session_ids', app_session_ids, 'schedule_id', int_schedule_id);
END;
$function$
;


