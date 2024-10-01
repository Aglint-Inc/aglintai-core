set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_user(first_name text, last_name text, linked_in text, office_location_id integer, employment text, "position" text, department_id integer, phone text, profile_image text, scheduling_settings json, user_id uuid, manager_id uuid, role_id uuid, recruiter_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN   
    -- Update recruiter_user table
    UPDATE recruiter_user
    SET
        department_id = update_user.department_id,  -- Use the function parameter explicitly
        employment = update_user.employment::employment_type_enum,
        first_name = update_user.first_name,
        last_name = update_user.last_name,
        linked_in = update_user.linked_in,
        office_location_id = update_user.office_location_id,
        phone = update_user.phone,
        "position" = update_user."position",  -- Enclosed in double quotes
        profile_image = update_user.profile_image
    WHERE
        recruiter_user.user_id = update_user.user_id;  -- Specify the table column

    -- Update recruiter_relation table
    UPDATE recruiter_relation
    SET
        manager_id = update_user.manager_id,
        role_id = update_user.role_id
    WHERE
        recruiter_relation.user_id = update_user.user_id
        AND recruiter_relation.recruiter_id = update_user.recruiter_id;  -- Specify the table column
END;
$function$
;


