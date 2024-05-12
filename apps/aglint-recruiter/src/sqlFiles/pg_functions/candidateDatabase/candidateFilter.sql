DROP FUNCTION IF EXISTS filter_candidates2;

CREATE FUNCTION filter_candidates2(
    rec_id uuid,
    max_records numeric = 100,
    offset_records numeric = 0,
    location_filter text = '',
    name_filter text = '',
    job_title_filter text = '',
    is_location_desc boolean = false,
    is_name_desc boolean = true,
    is_job_title_desc boolean = false
) RETURNS TABLE (
    application_id uuid,
    created_at text,
    first_name citext,
    last_name citext,
    job_title text,
    email citext,
    resume_link text,
    json_resume jsonb,
    profile_image text,
    candidate_id uuid,
    job_id uuid,
    total_results bigint -- Added total_results column
) LANGUAGE plpgsql AS $$ 
DECLARE
    total_count bigint;
BEGIN
    -- Get total results count
    SELECT COUNT(DISTINCT c.id)
    INTO total_count
    FROM job_applications ja
    JOIN candidates c ON ja.candidate_id = c.id
    WHERE
        c.recruiter_id=rec_id
AND (
            CASE
                WHEN LENGTH(location_filter) > 0 THEN to_tsvector(lower(COALESCE(ja.json_resume->'basics'->>'location', ''))) @@ to_tsquery('english', lower(location_filter))
                ELSE true 
            END
        )
        AND (
            CASE
                WHEN LENGTH(name_filter) > 0 THEN to_tsvector(lower(concat(COALESCE(ja.json_resume->'basics'->>'firstName', ''),' ',COALESCE(ja.json_resume->'basics'->>'lastName', '')))) @@ to_tsquery('english', lower(name_filter))
                ELSE true 
            END
        )
        AND (
            CASE
                WHEN LENGTH(job_title_filter) > 0 THEN to_tsvector(lower(COALESCE(ja.json_resume->'basics'->>'currentJobTitle', ''))) @@ to_tsquery('english', lower(job_title_filter))
                ELSE true 
            END
    );
    -- Return total_results count
    RETURN QUERY 
    SELECT DISTINCT ON (ja.candidate_id)
        ja.application_id,
        ja.created_at::text,
        c.first_name,
        c.last_name,
        COALESCE(ja.json_resume->'basics'->>'currentJobTitle', ''),
        c.email,
        ja.resume,
        ja.json_resume,
        c.profile_image,
        ja.candidate_id,
        ja.job_id,
        total_count
    FROM
        job_applications ja
        JOIN candidates c ON ja.candidate_id = c.id
    WHERE
        c.recruiter_id=rec_id
        AND (
            CASE
                WHEN LENGTH(location_filter) > 0 THEN to_tsvector(lower(COALESCE(ja.json_resume->'basics'->>'location', ''))) @@ to_tsquery('english', lower(location_filter))
                ELSE true 
            END
        )
        AND (
            CASE
                WHEN LENGTH(name_filter) > 0 THEN to_tsvector(lower(concat(COALESCE(ja.json_resume->'basics'->>'firstName', ''),' ',COALESCE(ja.json_resume->'basics'->>'lastName', '')))) @@ to_tsquery('english', lower(name_filter))
                ELSE true 
            END
        )
        AND (
            CASE
                WHEN LENGTH(job_title_filter) > 0 THEN to_tsvector(lower(COALESCE(ja.json_resume->'basics'->>'currentJobTitle', ''))) @@ to_tsquery('english', lower(job_title_filter))
                ELSE true 
            END
    )
    ORDER BY
    ja.candidate_id
    LIMIT max_records
    OFFSET offset_records;
END;
$$;
