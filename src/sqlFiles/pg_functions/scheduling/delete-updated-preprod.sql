
  drop function if exists find_avail_api_details_updated (
    job_id uuid,
    recruiter_id uuid
  );

  CREATE OR REPLACE FUNCTION find_avail_api_details_updated (
    job_id uuid,
    recruiter_id uuid
  ) RETURNS TABLE (
    interview_plan jsonb,
    service_json jsonb,
    interviewer jsonb,
    interview_modules jsonb,
    shadow_ints jsonb,
    rshadow_ints jsonb
  ) AS $$ 
  DECLARE
      int_ids_array uuid[] := '{}'; -- Initialize as empty array
      int_modules_ids_array uuid[] := '{}'; -- Initialize as empty array
      shadow_int_ids_array uuid[] := '{}'; -- Initialize as empty array
      rshadow_int_ids_array uuid[] := '{}'; -- Initialize as empty array
  BEGIN
      -- Fetch interview plan details
      SELECT INTO interview_plan coalesce(p_jobs.interview_plan, '{}'::jsonb)
      FROM public_jobs p_jobs
      WHERE p_jobs.id = job_id;
      
      SELECT array_agg(distinct module->>'module_id') INTO int_modules_ids_array
      FROM jsonb_array_elements(COALESCE(interview_plan->'plan', '{}'::jsonb)) AS module;
      -- Extract interviewer IDs and module IDs from interview plan
      SELECT array_agg(distinct selected_interv->>'interv_id') INTO int_ids_array
      FROM jsonb_array_elements(COALESCE(interview_plan->'plan', '[]'::jsonb)) AS plan,
          jsonb_array_elements(plan->'selectedIntervs') AS selected_interv;

      SELECT array_agg(distinct shadowIntervs->>'interv_id') INTO shadow_int_ids_array
            FROM jsonb_array_elements(COALESCE(interview_plan->'plan', '[]'::jsonb)) AS plan,
                jsonb_array_elements(plan->'shadowIntervs') AS shadowIntervs;
      
      SELECT array_agg(distinct revShadowInterv->>'interv_id') INTO rshadow_int_ids_array
            FROM jsonb_array_elements(COALESCE(interview_plan->'plan', '[]'::jsonb)) AS plan,
                jsonb_array_elements(plan->'revShadowInterv') AS revShadowInterv;

      -- Fetch service details
      SELECT INTO service_json jsonb_build_object('service_json', to_jsonb(r.service_json))
      FROM recruiter r
      WHERE r.id = recruiter_id; 

      -- Fetch interviewer details
      SELECT INTO interviewer jsonb_build_object('interviewer', jsonb_agg(row_to_json(recruiter_user)))
      FROM recruiter_user
      WHERE user_id = ANY(int_ids_array); 


    -- shadow and reverse shadow 
      SELECT INTO shadow_ints jsonb_build_object('shadow_ints', jsonb_agg(row_to_json(recruiter_user)))
      FROM recruiter_user
      WHERE user_id = ANY(shadow_int_ids_array); 

      SELECT INTO rshadow_ints jsonb_build_object('rshadow_ints', jsonb_agg(row_to_json(recruiter_user)))
      FROM recruiter_user
      WHERE user_id = ANY(rshadow_int_ids_array); 

      -- Fetch interview module details
      SELECT INTO interview_modules jsonb_build_object('interview_modules', jsonb_agg(row_to_json(interview_module)))
      FROM interview_module
      WHERE id = ANY(int_modules_ids_array); 

      RETURN QUERY SELECT interview_plan, service_json, interviewer, interview_modules,shadow_ints, rshadow_ints;
  END; 
  $$ LANGUAGE plpgsql;




    SELECT
      *
    FROM
      find_avail_api_details (
        'c47bd34e-2d6e-4221-984b-a7085ca6fa45'::uuid,
        'd353b3a0-3e19-45d0-8623-4bd35577f548'::uuid
      );

