create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
as $$
  declare
    claims jsonb;
    perm jsonb;
  begin
    -- Retrieve and convert permissions to JSONB array
    SELECT jsonb_agg(permissions.name) into perm
    from public.permissions
    join public.role_permissions on role_permissions.permission_id = permissions.id
    join public.roles on roles.id = role_permissions.role_id
    join public.recruiter_relation on recruiter_relation.role_id = roles.id
    where recruiter_relation.user_id = (event->>'user_id')::uuid;
    
    -- Proceed with claims
    claims := event->'claims';

    -- Check if 'app_metadata' exists in claims
    if jsonb_typeof(claims->'app_metadata') is null then
      -- If 'app_metadata' does not exist, create an empty object
      claims := jsonb_set(claims, '{app_metadata}', '{}');
    end if;

    -- Set a claim of 'permissions'
    claims := jsonb_set(claims, '{app_metadata, permission}', coalesce(perm, '["asd"]'::jsonb));

    -- Update the 'claims' object in the original event
    event := jsonb_set(event, '{claims}', claims);
    
    -- Return the modified event
    return event;
  end;
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