CREATE OR REPLACE FUNCTION update_resume_score(job_id uuid)
RETURNS boolean
AS $$
DECLARE
    job_data record;
    parameter_weights_x jsonb;  -- Fixed parameter_weights for all rows
    result_score numeric;     -- Variable to store the result of get_combined_resume_score
BEGIN
    -- Fetch the fixed parameter_weights from the public_jobs table
    SELECT parameter_weights
    INTO parameter_weights_x
    FROM public_jobs
    WHERE id = job_id;
    -- Check if the parameter_weights were found, and if not, return false
    IF NOT FOUND THEN
        RETURN false;
    END IF;
    FOR job_data IN (
        SELECT jd_score, application_id
        FROM job_applications
        WHERE job_applications.job_id = update_resume_score.job_id AND jd_score IS NOT NULL
    )
    LOOP
        -- Call your get_combined_resume_score function with jd_score and fixed parameter_weights
        result_score := get_combined_resume_score(job_data.jd_score, parameter_weights_x);
        -- Update the same row in the job_applications table with the result
        UPDATE job_applications
        SET resume_score = result_score
        WHERE application_id = job_data.application_id;
    END LOOP;
    -- If the loop completes without errors, return true
    RETURN true;
END $$ LANGUAGE plpgsql;