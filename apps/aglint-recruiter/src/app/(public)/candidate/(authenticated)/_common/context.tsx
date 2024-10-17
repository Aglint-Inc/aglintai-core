'use client';
import {
  createContext,
  type PropsWithChildren,
  useEffect,
  useState,
} from 'react';

import { Loader } from '@/components/Common/Loader';
import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';
import { supabase } from '@/utils/supabase/client';

import { useGetCandidateEmailByApplicationId } from './uilts';

const useCandidatePortalContext = () => {
  const { queryParams } = useRouterPro();
  const application_id = queryParams?.application_id as string;
  void api.candidatePortal.get_profile.usePrefetchQuery({ application_id });
  return { application_id };
};

export const CandidatePortalContext = createContext<
  ReturnType<typeof useCandidatePortalContext> | undefined
>(undefined);

export const CandidatePortalProvider = async ({
  children,
}: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const { queryParams } = useRouterPro();
  const application_id = queryParams?.application_id as string;

  const fetcher = useGetCandidateEmailByApplicationId();
  const router = useRouterPro();

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push(
            `${process.env.NEXT_PUBLIC_HOST_NAME}/candidate/login?application_id=${application_id}`,
          );
        }
      } catch {
        //
      } finally {
        setIsLoading(false);
      }
    };

    const checkIsExist = async () => {
      try {
        const { application_id: app_id } = await fetcher({ application_id });
        if (app_id) await getSession();
      } catch (e) {
        router.push(
          `${process.env.NEXT_PUBLIC_HOST_NAME}/candidate/login?application_id=${application_id}`,
        );
      }
    };

    checkIsExist();
    // getSession();
  }, []);

  if (isLoading) return <Loader />;
  return (
    <CandidatePortalContext.Provider value={{ application_id }}>
      {children}
    </CandidatePortalContext.Provider>
  );
};
