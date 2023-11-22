DROP FUNCTION
  IF EXISTS calc_sim_score;

create function
  calc_sim_score (
    job_ids uuid[],
    skill_qry_emb vector (1536),
    edu_qry_emb vector (1536),
    exp_qry_emb vector (1536),
    resume_qry_emb vector (1536),
    max_records integer = 25
  ) returns table (
    application_id uuid,
    created_at text,
    first_name citext,
    last_name citext,
    job_title text,
    email citext,
    json_resume jsonb,
    profile_image text,
    similarity float,
    sim_exp float,
    sim_res float,
    sim_skills float,
    sim_educ float
  ) language plpgsql as $$ begin return query 
select
  ja.application_id,
ja.created_at::text,
  c.first_name,
  c.last_name,
  COALESCE(ja.json_resume->'basics'->>'currentJobTitle', ''),
  c.email,
  ja.json_resume,
  c.profile_image,
  (
    (
      coalesce(1 -(ja.experience_embedding <=> exp_qry_emb), 0)*0.4+
      coalesce(1 -(ja.resume_embedding <=> resume_qry_emb), 0)*0.2+
      coalesce(1 -(ja.skills_embedding <=> skill_qry_emb), 0)*0.2 + 
      coalesce(1 -(ja.education_embedding <=> edu_qry_emb), 0)*0.2 
    )
  ) as similarity,
  coalesce(1 -(ja.experience_embedding <=> exp_qry_emb), 0),
  coalesce(1 -(ja.resume_embedding <=> resume_qry_emb), 0),
  coalesce(1 -(ja.skills_embedding <=> skill_qry_emb), 0),
  coalesce(1 -(ja.education_embedding <=> edu_qry_emb), 0)
from
  job_applications ja
  JOIN candidates c ON ja.candidate_id = c.id
where
  ja.job_id = ANY(job_ids)
ORDER BY
  similarity DESC
LIMIT max_records;

end;
$$;
