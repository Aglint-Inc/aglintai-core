import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';

interface AuthContextInterface {
  user_id: string;
  recruiter_id: string;
}

const AuthContext = createContext<AuthContextInterface>({
  user_id: null,
  recruiter_id: null,
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<Session['user'] | null>(null);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session) => {
        const tempUser = session?.user;
        if (event !== 'TOKEN_REFRESHED') {
          if (tempUser) {
            (!user ||
              user.id !== tempUser.id ||
              user.user_metadata.recruiter_id !==
                tempUser.user_metadata.recruiter_id) &&
              setUser(tempUser);
          } else if (event !== 'USER_UPDATED') {
            setUser(null);
            router.replace(ROUTES['/login']());
          }
        }
      },
    );
    return () => {
      listener.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);
  return user?.id ? (
    <AuthContext.Provider
      value={{
        user_id: user.id,
        recruiter_id: user.user_metadata.recruiter_id,
      }}
    >
      {children}
    </AuthContext.Provider>
  ) : (
    <>Loading</>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
