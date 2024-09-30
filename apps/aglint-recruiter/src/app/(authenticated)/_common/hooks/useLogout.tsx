import { useToast } from '@components/hooks/use-toast';
import type { QueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { supabase } from '@/utils/supabase/client';

export const useLogout = () => {
  const router = useRouter();
  const { toast } = useToast();
  const logout = async (queryClient: QueryClient) => {
    const { error } = await supabase.auth.signOut({
      scope: 'local',
    });
    if (!error) {
      router.push('/login');
      queryClient.removeQueries();
    } else {
      toast({
        variant: 'destructive',
        title: 'Error logging out',
      });
    }
  };
  return { logout };
};
