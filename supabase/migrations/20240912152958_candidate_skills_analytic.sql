DROP FUNCTION IF EXISTS candidate_skills_analysis;

CREATE OR REPLACE FUNCTION candidate_skills_analysis(
  recruiter_id uuid,
  departments numeric[] DEFAULT ARRAY[]::numeric[],
  locations numeric[] DEFAULT ARRAY[]::numeric[],
  jobs uuid[] DEFAULT ARRAY[]::uuid[],
  start_datetime timestamp with time zone DEFAULT null::timestamp with time zone,
  end_datetime timestamp with time zone DEFAULT now()
  )
  RETURNS TABLE(
    skill text,
    frequency bigint
  ) AS $$
  BEGIN
    RETURN QUERY SELECT skill_list.skill
      , COUNT(*) AS frequency
      FROM (
          SELECT jsonb_array_elements_text(candidate_files.resume_json -> 'skills') AS skill
          FROM candidates
            JOIN candidate_files ON candidates.id = candidate_files.candidate_id
            JOIN applications ON applications.candidate_id = candidates.id
            JOIN public_jobs ON public_jobs.id = applications.job_id
          WHERE candidate_files.resume_json -> 'skills' IS NOT NULL
            AND public_jobs.recruiter_id = candidate_skills_analysis.recruiter_id
            AND (CARDINALITY(departments) = 0 OR public_jobs.department_id = ANY(departments))
            AND (CARDINALITY(locations) = 0 OR public_jobs.location_id = ANY(locations))
            AND (CARDINALITY(jobs) = 0 OR applications.job_id = ANY(jobs))
            AND (start_datetime IS NULL OR applications.created_at >= start_datetime)
            AND applications.created_at <= end_datetime
      ) AS skill_list
      GROUP BY skill_list.skill ORDER BY frequency DESC;
  END;
  $$ LANGUAGE plpgsql;