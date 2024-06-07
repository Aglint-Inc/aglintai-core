-- Create the trigger function
CREATE OR REPLACE FUNCTION insert_into_workflow_log()
RETURNS TRIGGER AS $$
DECLARE
    wa_record RECORD;
BEGIN
    -- Loop over the selected workflow_action ids
    FOR wa_record IN
        SELECT wa.workflow_id, wa.id 
        FROM workflow_job_relation war
        JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
        WHERE war.job_id = NEW.job_id
          AND war.workflow_id = (SELECT id FROM workflow WHERE trigger::text = 'application_new')
    LOOP
        -- Insert a row into the workflow_job_relation_log table for each workflow_action id
        INSERT INTO workflow_action_logs (workflow_id, workflow_action_id, meta)
        VALUES (wa_record.workflow_id, wa_record.id, json_build_object('application_id', NEW.id));
    END LOOP;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER after_insert_new_applications
AFTER INSERT ON applications
FOR EACH ROW
EXECUTE FUNCTION insert_into_workflow_log();