import { useToast } from '@components/hooks/use-toast';
import { useRouter } from 'next/navigation';

import { supabase } from '@/utils/supabase/client';

export const useLogout = () => {
  const router = useRouter();
  const { toast } = useToast();
  const logout = async () => {
    const { error } = await supabase.auth.signOut({
      scope: 'local',
    });
    if (!error) {
      router.push('/login');
    } else {
      toast({
        variant: 'destructive',
        title: 'Error logging out',
      });
    }
  };
  return { logout };
};
