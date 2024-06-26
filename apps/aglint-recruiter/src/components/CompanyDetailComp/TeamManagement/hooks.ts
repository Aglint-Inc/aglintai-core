import { useQuery } from '@tanstack/react-query';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

export const useRolesOptions = () => {
  const { recruiter } = useAuthDetails();
  return useQuery({
    queryKey: ['team', 'roles'],
    queryFn: async () => {
      return getAllRoles(recruiter.id);
    },
    enabled: Boolean(recruiter?.id),
  });
};
const getAllRoles = async (recruiter_id: string) => {
  return supabase
    .from('roles')
    .select('id, name')
    .eq('recruiter_id', recruiter_id)
    .throwOnError()
    .then(({ data }) => data);
};
