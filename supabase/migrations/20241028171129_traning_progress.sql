set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.scheduling_analytics_training_progress(recruiter_id uuid, departments numeric[] DEFAULT ARRAY[]::numeric[], jobs uuid[] DEFAULT ARRAY[]::uuid[], locations numeric[] DEFAULT ARRAY[]::numeric[])
 RETURNS TABLE(number_of_shadow bigint, noshadow numeric, number_of_reverse_shadow bigint, noreverseshadow numeric, user_id uuid, name text, "position" text)
 LANGUAGE plpgsql
AS $function$
DECLARE
  locations_length numeric;
BEGIN
  locations_length := coalesce(
    array_length(scheduling_analytics_training_progress.locations, 1),
    0
  );
   RETURN QUERY
    with
      modules as (
        select distinct
          interview_module.id,
          interview_module.name,
          interview_module.recruiter_id,
          interview_module.settings
        from
          interview_module
          left join interview_session on interview_session.module_id = interview_module.id
      ),
      filtered_module_members as (
        select
          interview_module_relation.number_of_shadow,
          (modules.settings ->> 'noShadow')::numeric as noShadow,
          interview_module_relation.number_of_reverse_shadow,
          (modules.settings ->> 'noReverseShadow')::numeric as noReverseShadow,
          recruiter_user.user_id,
          CONCAT(recruiter_user.first_name,' ',recruiter_user.last_name) as name,
          modules.name as position
        from
          interview_module_relation
          left join modules on modules.id = interview_module_relation.module_id
          left join recruiter_user on recruiter_user.user_id = interview_module_relation.user_id
        where
          modules.recruiter_id = scheduling_analytics_training_progress.recruiter_id
      )
    select
      *
    from
      filtered_module_members
    order by
      number_of_shadow desc,
      noShadow desc,
      number_of_reverse_shadow desc,
      noReverseShadow desc;
END;
$function$
;


