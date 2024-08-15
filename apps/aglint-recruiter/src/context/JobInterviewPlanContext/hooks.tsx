import { useMutationState } from '@tanstack/react-query';

import { useCompanyMembers } from '@/src/queries/company-members';
import { useInterviewModules } from '@/src/queries/interview-modules';
import {
  CreateDebriefSession,
  CreateInterviewSession,
  useAddDebriefSession,
  useAddInterviewSession,
  useCreateInterviewPlan,
  useDeleteInterviewPlan,
  useDeleteInterviewSession,
  useEditDebriefSession,
  useEditInterviewSession,
  useReorderInterviewSessions,
  useUpdateInterviewPlan,
  useUpdateInterviewSession,
} from '@/src/queries/interview-plans';
import { interviewSessionMutationKeys } from '@/src/queries/interview-plans/keys';

import { useJob } from '../JobContext';

const useJobInterviewPlanActions = () => {
  const { job, interviewPlans, jobLoad, manageJob } = useJob();
  const companyMembers = useCompanyMembers();
  const interviewModules = useInterviewModules();
  const { mutateAsync: createPlan } = useCreateInterviewPlan();
  const { mutateAsync: updatePlan } = useUpdateInterviewPlan();
  const { mutateAsync: deletePlan } = useDeleteInterviewPlan();
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
    updatePlan,
    deletePlan,
    handleReorderSessions,
    interviewPlans,
    manageJob,
  };
  return value;
};

export default useJobInterviewPlanActions;
