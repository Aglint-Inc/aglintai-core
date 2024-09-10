'use client';
import { useParams, useRouter } from 'next/navigation';
import {
  type PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react';

import { api } from '@/trpc/client';
import { supabase } from '@/utils/supabase/client';

const useCandidatePortalContext = () => {
  const params = useParams();
  const application_id = params?.application_id as string;
  void api.candidatePortal.get_profile.usePrefetchQuery({ application_id });
  return { application_id };
};

export const CandidatePortalContext =
  createContext<ReturnType<typeof useCandidatePortalContext>>(undefined);

export const CandidatePortalProvider = async ({
  children,
}: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const value = useCandidatePortalContext();
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push(
            `${process.env.NEXT_PUBLIC_HOST_NAME}/candidate/${value.application_id}/login`,
          );
        }
      } catch {
        //
      } finally {
        setIsLoading(false);
      }
    };

    getSession();
  }, []);

  if (isLoading) return <>Loading...</>;

  const finalValue = { ...value };
  return (
    <CandidatePortalContext.Provider value={finalValue}>
      {children}
    </CandidatePortalContext.Provider>
  );
};
