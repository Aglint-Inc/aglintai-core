set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.clone_sessions(app_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
    company_id uuid;
    session_rec record;
    sesn_reln_record record;
    old_new_session_ids jsonb := '[]'::jsonb;
    app_session_ids uuid[] := '{}';
    appl_job_id uuid;
    int_schedule_id uuid;
    inserted_meeting jsonb;
    inserted_session jsonb;
    inserted_relation jsonb;
    session_data jsonb := '[]'::jsonb;
    session_obj jsonb;
    inserted_sesn_id uuid;
    session_relations jsonb := '[]'::jsonb;
BEGIN
    SELECT interview_schedule.id 
    INTO int_schedule_id  
    FROM interview_schedule
    WHERE interview_schedule.application_id = app_id;
    
    -- clone
    IF int_schedule_id IS NULL THEN 
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
            -- Insert interview meeting and session within a single SQL command using CTEs
            WITH inserted_meeting_cte AS (
                INSERT INTO interview_meeting (interview_schedule_id, status)
                VALUES (int_schedule_id, 'not_scheduled')
                RETURNING *
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
                    (SELECT id FROM inserted_meeting_cte)
                )
                RETURNING *
            )
            SELECT 
                (SELECT row_to_json(im) FROM inserted_meeting_cte im),
                (SELECT row_to_json(ins) FROM inserted_session_cte ins)
            INTO inserted_meeting, inserted_session;

            session_obj := jsonb_build_object(
                'interview_session', inserted_session,
                'interview_meeting', inserted_meeting,
                'interview_session_relation', '[]'::jsonb
            );

            inserted_sesn_id := (inserted_session->>'id')::uuid;

            old_new_session_ids := old_new_session_ids || jsonb_build_object(
                'old_session_id', session_rec.id::text,
                'new_session_id', inserted_sesn_id::text
            );

            session_relations := '[]'::jsonb;

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
                )
                RETURNING row_to_json(interview_session_relation.*) INTO inserted_relation;

                session_relations := session_relations || jsonb_build_array(inserted_relation);
            END LOOP;

            session_obj := session_obj || jsonb_build_object(
                'interview_session_relation', session_relations
            );

            session_data := session_data || jsonb_build_array(session_obj);
            app_session_ids := array_append(app_session_ids, inserted_sesn_id);
        END LOOP;
    ELSE
        SELECT jsonb_agg(
            jsonb_build_object(
                'interview_session', row_to_json(interview_session),
                'interview_meeting', row_to_json(interview_meeting),
                'interview_session_relation', (
                    SELECT jsonb_agg(row_to_json(isr))
                    FROM interview_session_relation isr
                    WHERE isr.session_id = interview_session.id
                )
            )
        )
        INTO session_data
        FROM interview_schedule
        LEFT JOIN interview_meeting ON interview_meeting.interview_schedule_id = interview_schedule.id
        LEFT JOIN interview_session ON interview_session.meeting_id = interview_meeting.id
        WHERE interview_schedule.application_id = app_id;
    END IF;

    RETURN jsonb_build_object('old_new_session_ids', old_new_session_ids, 'cloned_sessions', session_data, 'schedule_id', int_schedule_id);
END;
$function$
;


