CREATE
OR REPLACE FUNCTION jobs_locations_count(
  recruiter_id uuid,
  departments numeric[] DEFAULT ARRAY[]::numeric[],
  locations numeric[] DEFAULT ARRAY[]::numeric[],
  jobs uuid[] DEFAULT ARRAY[]::uuid[],
  start_datetime timestamp with time zone DEFAULT null::timestamp with time zone,
  end_datetime timestamp with time zone DEFAULT now()
) RETURNS TABLE (
  country text,
  state text,
  city text,
  app_count bigint
) AS $function$
BEGIN
RETURN QUERY SELECT candidates.country, candidates.state, candidates.city, count(*) as app_count
  FROM candidates
  JOIN applications ON applications.candidate_id = candidates.id
  JOIN public_jobs ON public_jobs.id = applications.job_id
  WHERE public_jobs.recruiter_id = jobs_locations_count.recruiter_id
  AND (CARDINALITY(departments) = 0 OR public_jobs.department_id = ANY(departments))
  AND (CARDINALITY(locations) = 0 OR public_jobs.location_id = ANY(locations))
  AND (CARDINALITY(jobs) = 0 OR applications.job_id = ANY(jobs))
  AND (start_datetime IS NULL OR applications.created_at >= start_datetime)
  AND applications.created_at <= end_datetime
  GROUP BY candidates.country, candidates.state, candidates.city, applications.job_id;
END;
$function$ LANGUAGE plpgsql;