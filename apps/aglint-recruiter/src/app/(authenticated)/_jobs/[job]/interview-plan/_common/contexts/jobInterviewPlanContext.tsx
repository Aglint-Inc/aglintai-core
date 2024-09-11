import { useMutationState } from '@tanstack/react-query';
import { createContext, type PropsWithChildren } from 'react';

import { useJob } from '@/job/hooks';
import { useCompanyMembers } from '@/queries/company-members';
import { useInterviewModules } from '@/queries/interview-modules';
import {
  type CreateDebriefSession,
  type CreateInterviewSession,
  useAddDebriefSession,
  useAddInterviewSession,
  useCreateInterviewPlan,
  useDeleteInterviewPlan,
  useDeleteInterviewSession,
  useEditDebriefSession,
  useEditInterviewSession,
  useInterviewPlanMutation,
  useReorderInterviewSessions,
  useSwapInterviewPlan,
  useUpdateInterviewPlan,
  useUpdateInterviewSession,
} from '@/queries/interview-plans';
import { interviewSessionMutationKeys } from '@/queries/interview-plans/keys';

const useJobInterviewPlanContext = () => {
  const { job, interviewPlans, jobLoad, manageJob } = useJob();
  const companyMembers = useCompanyMembers();
  const interviewModules = useInterviewModules();
  const { mutateAsync: createPlan } = useCreateInterviewPlan();
  const { mutateAsync: updatePlan } = useUpdateInterviewPlan();
  const { mutateAsync: deletePlan } = useDeleteInterviewPlan();
  const { mutateAsync: swapPlans } = useSwapInterviewPlan();
  const { swap, update, remove } = useInterviewPlanMutation();
  const { mutateAsync: createSession } = useAddInterviewSession();
  const { mutate: handleUpdateSession } = useUpdateInterviewSession();
  const { mutate: handleEditSession } = useEditInterviewSession();
  const { mutate: handleDeleteSession } = useDeleteInterviewSession();
  const { mutateAsync: createDebriefSession } = useAddDebriefSession();
  const { mutate: handleEditDebriefSession } = useEditDebriefSession();
  const { mutate: handleReorderSessions } = useReorderInterviewSessions();

  const { mutationKey: updateMutationKey } =
    interviewSessionMutationKeys.update();
  const updateQueue = useMutationState<{ session_id: string }>({
    filters: { mutationKey: updateMutationKey, status: 'pending' },
    select: (mutation) => mutation.state.variables as any,
  });

  const { mutationKey: deleteMutationKey } =
    interviewSessionMutationKeys.delete();
  const deleteQueue = useMutationState<{ session_id: string }>({
    filters: { mutationKey: deleteMutationKey, status: 'pending' },
    select: (mutation) => mutation.state.variables as any,
  });

  const initialLoad = !!(
    job &&
    jobLoad &&
    interviewModules.status !== 'pending' &&
    companyMembers.status !== 'pending' &&
    interviewPlans.status !== 'pending'
  );

  const getLoadingState = (sessionId: string) => {
    return !![...updateQueue, ...deleteQueue].find(
      ({ session_id }) => session_id === sessionId,
    );
  };

  const handleCreatePlan = async (name: string, order?: number) => {
    try {
      await createPlan({ name, order });
    } catch {
      //toast.error('Unable to create interview plan');
    }
  };

  const handleSwapPlan = async (args: Parameters<typeof swapPlans>[0]) => {
    try {
      await swapPlans(args);
    } catch {
      //toast.error('Unable to create interview plan');
    }
  };

  const handleCreateSession = async (args: CreateInterviewSession) => {
    try {
      await createSession(args);
    } catch {
      //toast.error('Unable to create interview session');
    }
  };

  const handleCreateDebriefSession = async (args: CreateDebriefSession) => {
    try {
      await createDebriefSession(args);
    } catch {
      //toast.error('Unable to create debrief session');
    }
  };

  const isPlanMutating = (id: string) => {
    return (
      !!swap.find(
        ({ plan_id_1, plan_id_2 }) => plan_id_1 === id || plan_id_2 === id,
      ) ||
      !!update.find((payload) => id === payload.id) ||
      !!remove.find((payload) => id === payload.id)
    );
  };

  const value = {
    job,
    initialLoad,
    interviewModules,
    companyMembers,
    handleCreateSession,
    handleEditSession,
    handleCreateDebriefSession,
    handleUpdateSession,
    handleEditDebriefSession,
    handleDeleteSession,
    getLoadingState,
    handleCreatePlan,
    handleSwapPlan,
    updatePlan,
    deletePlan,
    handleReorderSessions,
    isPlanMutating,
    interviewPlans,
    manageJob,
  };
  return value;
};

export const JobInterviewPlanContext =
  createContext<ReturnType<typeof useJobInterviewPlanContext>>(undefined);

export const JobInterviewPlanProvider = ({ children }: PropsWithChildren) => {
  const value = useJobInterviewPlanContext();
  return (
    <JobInterviewPlanContext.Provider value={value}>
      {children}
    </JobInterviewPlanContext.Provider>
  );
};
