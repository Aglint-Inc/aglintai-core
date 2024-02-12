/* eslint-disable security/detect-object-injection */
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useMutationState,
  useQuery,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { Database } from '@/src/types/schema';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { type AssessmentCard } from './types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export const AssementQueryProvider: React.FC<{
  children: React.JSX.Element;
}> = ({ children }) => {
  const DEV = process.env.NEXT_PUBLIC_HOST_NAME.includes('localhost');
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {DEV && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};

const useQueryKey = () => {
  const {
    recruiter: { id: recruiter_id },
  } = useAuthDetails();
  return {
    recruiter_id,
    queryKey: ['assessment', recruiter_id],
    mutationKey: ['assessment'],
  };
};

export const useAssessment = () => {
  const { queryKey, recruiter_id } = useQueryKey();
  return useQuery({
    queryKey,
    queryFn: () => readAssessmentsDbAction(recruiter_id),
  });
};

export const useCreateAssessment = () => {
  const { queryKey, recruiter_id, mutationKey } = useQueryKey();
  return useMutation({
    mutationKey: mutationKey,
    mutationFn: (payload: AssessmentCard) =>
      createAssessmentsDbAction(payload, recruiter_id),
    onError: (err) => {
      toast.error(JSON.stringify(err));
    },
    onSuccess: (data) => {
      queryClient.setQueryData<AssessmentCard[]>(queryKey, (prev) => [
        ...prev,
        data,
      ]);
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useCreateAssessmentQueue = () => {
  const { mutationKey } = useQueryKey();
  return useMutationState<AssessmentCard>({
    filters: { mutationKey, status: 'pending' },
    select: (mutation) => mutation.state.variables as AssessmentCard,
  });
};

const readAssessmentsDbAction = async (
  recruiter_id: Database['public']['Tables']['recruiter']['Row']['id'],
) => {
  const { data, error } = await supabase
    .from('assessment')
    .select()
    .eq('recruiter_id', recruiter_id);
  if (error) throw new Error(error.message);
  return data;
};

const createAssessmentsDbAction = async (
  payload: AssessmentCard,
  recruiter_id: Database['public']['Tables']['recruiter']['Row']['id'],
) => {
  const { data, error } = await supabase
    .from('assessment')
    .insert({ ...payload, recruiter_id })
    .select();
  if (error) throw new Error(error.message);
  return data[0];
};
