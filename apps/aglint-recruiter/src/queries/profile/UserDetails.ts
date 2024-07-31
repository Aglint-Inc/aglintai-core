import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

export function useUserProfile({ id }: { id: string }) {
  return useQuery({
    queryKey: [id, 'profile'],
    queryFn: () => userDetails(id),
    enabled: !!id,
  });
}
async function userDetails(id: string) {
  return (
    await supabase
      .from('recruiter_relation')
      .select(
        'roles(name), recruiter_user!public_recruiter_relation_user_id_fkey(first_name, last_name, position, office_locations(*), departments(name)), manager_details:recruiter_user!recruiter_relation_manager_id_fkey(first_name, last_name, position)',
      )
      .eq('id', id)
      .single()
      .throwOnError()
  ).data;
}
