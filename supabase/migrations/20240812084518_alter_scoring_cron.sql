create table
  public.recruiter_preferences (
    recruiter_id uuid not null,
    scoring boolean not null default false,
    constraint recuriter_preferences_pkey primary key (recruiter_id),
    constraint recuriter_preferences_recruiter_id_fkey foreign key (recruiter_id) references recruiter (id) on delete cascade
  ) tablespace pg_default;



CREATE OR REPLACE FUNCTION public.batchcalcresumejdscore()
 RETURNS jsonb[]
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB[];
BEGIN
    -- Initialize an empty JSONB array for the results
    result := ARRAY[]::JSONB[];
    -- Select up to 50 records that meet the specified conditions
    SELECT ARRAY_AGG(row_to_json(data))
    INTO result
    FROM (
        SELECT ja.id AS application_id,
           ja.candidate_id AS candidate_id,
           ja.score_json AS jd_score,
           cf.file_url AS resume,
           cf.id AS file_id,
           cf.resume_json AS json_resume,
           cf.resume_text AS resume_text,
           ja.job_id as job_id,
           r.name as company,
           pj.jd_json as jd_json,
           pj.parameter_weights as parameter_weights,
           0 as retry
           FROM applications ja join candidate_files cf on cf.id = ja.candidate_file_id
       JOIN public_jobs pj ON ja.job_id = pj.id
       JOIN recruiter r ON r.id = pj.recruiter_id
       JOIN recruiter_preferences rp ON rp.recruiter_id = r.id
       WHERE ja.processing_status='not started' AND pj.status='published' AND ja.candidate_file_id IS NOT NULL AND pj.jd_json IS NOT NULL AND rp.scoring --boolen check
       ORDER BY ja.created_at ASC
       LIMIT 50
    ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.retrybatchcalcresumejdscore()
 RETURNS jsonb[]
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB[];
BEGIN
    -- Initialize an empty JSONB array for the results
    result := ARRAY[]::JSONB[];

    -- Select up to 50 records that meet the specified conditions
    SELECT ARRAY_AGG(row_to_json(data))
    INTO result
    FROM (
       SELECT ja.id AS application_id,
           ja.candidate_id AS candidate_id,
           ja.score_json AS jd_score,
           cf.file_url AS resume,
           cf.id AS file_id,
           cf.resume_json AS json_resume,
           cf.resume_text AS resume_text,
           ja.job_id as job_id,
           r.name as company,
           pj.jd_json as jd_json,
           pj.parameter_weights as parameter_weights,
           1 as retry
           FROM applications ja join candidate_files cf on cf.id = ja.candidate_file_id
       JOIN public_jobs pj ON ja.job_id = pj.id
       JOIN recruiter r ON r.id = pj.recruiter_id
       WHERE ja.processing_status in ('failed') and pj.status='published'  and retry < 1 and pj.jd_json is not null 
       ORDER BY ja.created_at ASC
       LIMIT 25
    ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.secondretrybatchcalcresumejdscore()
 RETURNS jsonb[]
 LANGUAGE plpgsql
AS $function$
DECLARE
    result JSONB[];
BEGIN
    -- Initialize an empty JSONB array for the results
    result := ARRAY[]::JSONB[];

    -- Select up to 50 records that meet the specified conditions
    SELECT ARRAY_AGG(row_to_json(data))
    INTO result
    FROM (
      SELECT ja.id AS application_id,
           ja.candidate_id AS candidate_id,
           ja.score_json AS jd_score,
           cf.file_url AS resume,
           cf.id AS file_id,
           cf.resume_json AS json_resume,
           cf.resume_text AS resume_text,
           ja.job_id as job_id,
           r.name as company,
           pj.jd_json as jd_json,
           pj.parameter_weights as parameter_weights,
           2 as retry
           FROM applications ja join candidate_files cf on cf.id = ja.candidate_file_id
       JOIN public_jobs pj ON ja.job_id = pj.id
              JOIN recruiter r ON r.id = pj.recruiter_id
       WHERE ja.processing_status in ('failed') and pj.status='published'  and retry >= 1 and retry < 2 and pj.jd_json is not null
       ORDER BY ja.created_at ASC
       LIMIT 10
    ) as data;

    -- Return the final result as a JSONB array
    RETURN result;
END;
$function$
;


