alter table "public"."interview_meeting" add column "request_id" uuid;

alter table "public"."interview_meeting" add constraint "public_interview_meeting_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."interview_meeting" validate constraint "public_interview_meeting_request_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.workflow_log_on_update_interview_meeting()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    wa_record RECORD;
    trigger_case TEXT;
    workflow_id UUID;
    base_time TIMESTAMP;
    allowed_endpoints TEXT[];
BEGIN
    allowed_endpoints := ARRAY[
        'interviewStart_email_applicant', 'interviewStart_email_organizer', 
        'interviewEnd_slack_organizerForMeetingStatus', 'interviewEnd_email_organizerForMeetingStatus', 
        'interviewEnd_email_shadowTraineeForMeetingAttendence', 'interviewEnd_email_rShadowTraineeForMeetingAttendence', 
        'interviewEnd_slack_rShadowTraineeForMeetingAttendence', 'interviewEnd_slack_shadowTraineeForMeetingAttendence', 
        'candidateBook_slack_interviewerForConfirmation'
    ]::email_slack_types[];

    UPDATE workflow_action_logs
    set status='stopped'::workflow_cron_run_status
    where related_table='interview_meeting'::workflow_cron_trigger_tables and related_table_pkey=NEW.ID;

    IF NEW.status::text = 'confirmed' THEN

        IF NEW.request_id IS NOT NULL THEN          
            INSERT INTO request_progress (event_type, request_id,status,is_progress_step)
            VALUES ('CAND_CONFIRM_SLOT', NEW.request_id,'completed',false);
            
            UPDATE request
            set status='completed'
            where id=NEW.request_id;
        END IF;

        FOR wa_record IN
            SELECT 
                workflow.id AS workflow_id, 
                workflow_action.id AS workflow_action_id, 
                workflow.interval AS interval_minutes, 
                workflow.phase AS phase, 
                workflow.trigger AS trigger, 
                json_build_object('schedule_id', i_s.id, 'meeeting_id',NEW.id,
                'payload',workflow_action.payload,
                'application_id',i_s.application_id,
                'target_api',workflow_action.target_api,'organizer_id',NEW.organizer_id,'session_id', (select i_m_s.id from interview_session i_m_s where i_m_s.meeting_id=NEW.id)) AS meta
            FROM workflow
            LEFT JOIN workflow_action ON workflow_action.workflow_id = workflow.id
            LEFT JOIN interview_schedule i_s ON i_s.recruiter_id = workflow.recruiter_id
            LEFT JOIN applications ON applications.id = i_s.application_id
            WHERE 
                i_s.id = NEW.interview_schedule_id
                AND workflow.is_paused = FALSE
                AND (workflow.workflow_type = 'system' OR 
                    (workflow.workflow_type = 'job' AND 
                    workflow.id IN (
                        SELECT w_j_r.workflow_id 
                        FROM workflow_job_relation w_j_r
                        WHERE w_j_r.job_id = applications.job_id
                    )
                ))
                AND workflow_action.target_api::text = ANY(allowed_endpoints)
        LOOP
            IF wa_record.trigger::TEXT = 'interviewEnd' THEN
                base_time := NEW.end_time ::timestamp;
            ELSE
                base_time := NOW();
            END IF;

            PERFORM create_new_workflow_action_log(
                'interview_meeting'::workflow_cron_trigger_tables ,
                NEW.id,
                wa_record.workflow_id, 
                wa_record.workflow_action_id, 
                wa_record.interval_minutes, 
                wa_record.phase::TEXT, 
                wa_record.meta, 
                base_time
            );
        END LOOP;
    END IF;

    RETURN NEW;
END;
$function$
;


