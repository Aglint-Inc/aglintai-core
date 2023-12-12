DROP FUNCTION IF EXISTS calc_sim_score2;

CREATE FUNCTION calc_sim_score2 (
  job_ids uuid[],
  skill_qry_emb vector (1536),
  edu_qry_emb vector (1536),
  exp_qry_emb vector (1536),
  resume_qry_emb vector (1536),
  max_records integer = 25,
  ts_query text='',
  filter_companies text=''
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
  similarity float,
  sim_exp float,
  sim_res float,
  sim_skills float,
  sim_educ float
) LANGUAGE plpgsql AS $$ 
BEGIN 
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
      (
        (
          COALESCE(1 - (ja.experience_embedding <=> exp_qry_emb), 0) * 0.5 +
          COALESCE(1 - (ja.resume_embedding <=> resume_qry_emb), 0) * 0.2 +
          COALESCE(1 - (ja.skills_embedding <=> skill_qry_emb), 0) * 0.2 + 
          COALESCE(1 - (ja.education_embedding <=> edu_qry_emb), 0) * 0.1 
        )
      ) AS similarity,
      COALESCE(1 - (ja.experience_embedding <=> exp_qry_emb), 0),
      COALESCE(1 - (ja.resume_embedding <=> resume_qry_emb), 0),
      COALESCE(1 - (ja.skills_embedding <=> skill_qry_emb), 0),
      COALESCE(1 - (ja.education_embedding <=> edu_qry_emb), 0)
    FROM
      job_applications ja
      JOIN candidates c ON ja.candidate_id = c.id
    WHERE
      ja.job_id = ANY(job_ids) AND
      CASE
        WHEN LENGTH(ts_query) > 0 THEN 
          to_tsvector(COALESCE(lower(ja.json_resume->'basics'->>'currentJobTitle'), '')) @@ to_tsquery('english', ts_query) 
        ELSE true
        end
      AND
      CASE
        WHEN LENGTH(filter_companies) > 0 THEN to_tsvector(COALESCE(lower(ja.resume_text),'')) @@ to_tsquery('english', filter_companies)
        ELSE true 
      END
    ORDER BY ja.candidate_id, similarity DESC
    LIMIT max_records;
END;
$$;
