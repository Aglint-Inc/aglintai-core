import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

import { ModuleDashboard, TransformSchedule } from '../types';

export const useAllInterviewModules = () => {
  const { recruiter } = useAuthDetails();
  const query = useQuery({
    queryKey: ['interview_modules'],
    queryFn: () => fetchInterviewModules(recruiter.id),
    enabled: !!recruiter.id,
    initialData: [],
    refetchOnWindowFocus: false
  });
  return query;
};

const fetchInterviewModules = async (rec_id: string) => {
  const { data, error } = await supabase.rpc('get_interview_modules', {
    rec_id: rec_id
  });
  if (error) throw new Error(error.message);
  return data as ModuleDashboard[];
};

export const useAllSchedulesByModuleId = () => {
  const router = useRouter();
  const query = useQuery({
    queryKey: ['interview_modules', { module_id: router.query.module_id }],
    queryFn: () => fetchModules(router.query.module_id as string),
    enabled: !!router.query.module_id,
    initialData: [],
    refetchOnWindowFocus: false
  });
  return query;
};

const fetchModules = async (module_id: string) => {
  const { data, error } = await supabase.rpc(
    'get_interview_schedule_by_module_id',
    {
      target_module_id: module_id
    }
  );
  if (error) throw new Error(error.message);
  return data as TransformSchedule[];
};
