DROP FUNCTION IF EXISTS candidate_exp_analytic;

CREATE OR REPLACE FUNCTION candidate_exp_analytic(
recruiter_id uuid,
departments numeric[] DEFAULT ARRAY[]::numeric[],
locations numeric[] DEFAULT ARRAY[]::numeric[],
jobs uuid[] DEFAULT ARRAY[]::uuid[],
start_datetime timestamp with time zone DEFAULT null::timestamp with time zone,
end_datetime timestamp with time zone DEFAULT now()
)
RETURNS TABLE(
    app_id uuid,
    total_exp bigint,
    count bigint
) AS $$
BEGIN
    RETURN QUERY select position_list.app_id
    , SUM(calculate_experience(position->'start',position->'end')) as total_exp
    , count(*) as count
    from (
        select 
        applications.id as app_id,
        jsonb_array_elements(candidate_files.resume_json->'positions') as position
        FROM applications
        JOIN candidate_files ON applications.candidate_file_id = candidate_files.id
        JOIN public_jobs ON applications.job_id = public_jobs.id
        where  public_jobs.recruiter_id = candidate_exp_analytic.recruiter_id
            AND (CARDINALITY(departments) = 0 OR public_jobs.department_id = ANY(departments))
            AND (CARDINALITY(locations) = 0 OR public_jobs.location_id = ANY(locations))
            AND (CARDINALITY(jobs) = 0 OR public_jobs.id = ANY(jobs))
            AND (start_datetime IS NULL OR applications.created_at >= start_datetime)
            AND applications.created_at <= end_datetime
    ) AS position_list 
    where
    position_list.position->'start'->>'month' is not null
    AND position_list.position->'end'->>'month' is not null
    GROUP BY position_list.app_id;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION calculate_experience(start_time JSONB, end_time JSONB)
RETURNS INTEGER AS $$
DECLARE
    start_year INTEGER;
    start_month INTEGER;
    end_year INTEGER;
    end_month INTEGER;
    current_year INTEGER;
    current_month INTEGER;
    total_months INTEGER;
BEGIN
    -- Extract the start year and month
    start_year := (start_time->>'year')::INTEGER;
    start_month := (start_time->>'month')::INTEGER;

    -- If start year or month is 0, return 0 experience
    IF start_year is null OR start_month is null THEN
        RETURN 0;
    END IF;

    -- Extract the end year and month
    end_year := (end_time->>'year')::INTEGER;
    end_month := (end_time->>'month')::INTEGER;

    -- If end year or month is 0, use the current date
    IF end_year is null OR end_month is null THEN
        SELECT EXTRACT(YEAR FROM CURRENT_DATE), EXTRACT(MONTH FROM CURRENT_DATE)
        INTO current_year, current_month;
        end_year := current_year;
        end_month := current_month;
    END IF;

    -- Calculate total experience in months
    total_months := (end_year - start_year) * 12 + (end_month - start_month);

    -- Return the total experience
    RETURN total_months;
END;
$$ LANGUAGE plpgsql;