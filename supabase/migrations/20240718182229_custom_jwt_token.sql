CREATE
OR REPLACE FUNCTION public.custom_access_token_hook (event jsonb) RETURNS jsonb LANGUAGE plpgsql AS $$
DECLARE
    claims jsonb;
    allpermissions jsonb;
    role_name text;
    recruiter_id uuid;
BEGIN
    -- Retrieve and convert permissions to JSONB array
    SELECT jsonb_agg(permissions.name) INTO allpermissions
    FROM public.permissions
    JOIN public.role_permissions ON role_permissions.permission_id = permissions.id
    JOIN public.roles ON roles.id = role_permissions.role_id
    JOIN public.recruiter_relation ON recruiter_relation.role_id = roles.id
    WHERE permissions.is_enable = true 
      AND recruiter_relation.user_id = (event->>'user_id')::uuid;

    -- Handle case where no permissions are found
    allpermissions := COALESCE(allpermissions, '[]'::jsonb);

    -- Retrieve the role name
    SELECT roles.name, recruiter_relation.recruiter_id INTO role_name ,recruiter_id
    FROM public.roles
    JOIN public.recruiter_relation ON recruiter_relation.role_id = roles.id
    WHERE recruiter_relation.user_id = (event->>'user_id')::uuid;

    -- Proceed with claims
    claims := event->'claims';

    -- Check if 'app_metadata' exists in claims
    IF jsonb_typeof(claims->'app_metadata') IS NULL THEN
        -- If 'app_metadata' does not exist, create an empty object
        claims := jsonb_set(claims, '{app_metadata}', '{}');
    END IF;

    -- Set a claim of 'permissions' and 'role'
    claims := jsonb_set(
        claims, 
        '{app_metadata, role_permissions}', 
        jsonb_build_object('permissions', allpermissions, 'role', role_name,'recruiter_id',recruiter_id)
    );

    -- Update the 'claims' object in the original event
    event := jsonb_set(event, '{claims}', claims);

    -- Return the modified event
    RETURN event;
END;
$$;


grant usage on schema public to supabase_auth_admin;

grant execute
on function custom_access_token_hook
to supabase_auth_admin;

revoke execute
on function public.custom_access_token_hook
from authenticated, anon, public;

grant all
on table public.permissions
to supabase_auth_admin;

ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;

create policy "Allow auth admin to read user roles" ON public.permissions
as permissive for select
to supabase_auth_admin
using (true);

create policy "Allow authenticated to read permissions" ON public.permissions
as permissive for select
to authenticated
using (true);

grant all
on table public.role_permissions
to supabase_auth_admin;

ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;

create policy "Allow auth admin to read user roles" ON public.role_permissions
as permissive for select
to supabase_auth_admin
using (true);

create policy "Allow authenticated to read role_permissions" ON public.role_permissions
as permissive for select
to authenticated
using (true);

grant all
on table public.roles
to supabase_auth_admin;

ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

create policy "Allow auth admin to read user roles" ON public.roles
as permissive for select
to supabase_auth_admin
using (true);

create policy "Allow authenticated to read roles" ON public.roles
as permissive for select
to authenticated
using (true);

grant all
on table public.recruiter_relation
to supabase_auth_admin;

create policy "Allow auth admin to read user roles" ON public.recruiter_relation
as permissive for select
to supabase_auth_admin
using (true);