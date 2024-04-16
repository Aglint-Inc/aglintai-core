import { useMutationState } from '@tanstack/react-query';

import { useInterviewCoordinators } from '@/src/queries/interview-coordinators';
import { useInterviewModules } from '@/src/queries/interview-modules';
import {
  CreateDebriefSession,
  CreateInterviewSession,
  useAddDebriefSession,
  useAddInterviewCoordinator,
  useAddInterviewSession,
  useCreateInterviewPlan,
  useDeleteInterviewSession,
  useEditDebriefSession,
  useEditInterviewSession,
  useInterviewPlans,
  useReorderInterviewSessions,
  useUpdateInterviewSession,
} from '@/src/queries/interview-plans';
import { interviewSessionMutationKeys } from '@/src/queries/interview-plans/keys';

// import toast from '@/src/utils/toast';
import { useJobDetails } from '../JobDashboard';

const useJobInterviewPlanActions = () => {
  const { job } = useJobDetails();
  const interviewCoordinator = useInterviewCoordinators();
  const interviewModules = useInterviewModules();
  const interviewPlans = useInterviewPlans();
  const { mutateAsync: createPlan } = useCreateInterviewPlan();
  const { mutateAsync: createSession } = useAddInterviewSession();
  const { mutate: handleUpdateSession } = useUpdateInterviewSession();
  const { mutate: handleEditSession } = useEditInterviewSession();
  const { mutate: handleDeleteSession } = useDeleteInterviewSession();
  const { mutateAsync: createDebriefSession } = useAddDebriefSession();
  const { mutate: handleEditDebriefSession } = useEditDebriefSession();
  const { mutate: handleSelectCoordinator } = useAddInterviewCoordinator();
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
    interviewModules.status !== 'pending' &&
    interviewCoordinator.status !== 'pending' &&
    interviewPlans.status !== 'pending'
  );

  if (!initialLoad) return undefined;

  const getLoadingState = (sessionId: string) => {
    return !![...updateQueue, ...deleteQueue].find(
      ({ session_id }) => session_id === sessionId,
    );
  };

  const handleCreatePlan = async () => {
    try {
      await createPlan();
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

  const plan_id = interviewPlans?.data?.id;
  const coordinator = interviewPlans?.data?.recruiter_user;

  const value = {
    job,
    interviewModules,
    interviewCoordinator,
    handleSelectCoordinator,
    handleCreateSession,
    handleEditSession,
    handleCreateDebriefSession,
    handleUpdateSession,
    handleEditDebriefSession,
    handleDeleteSession,
    getLoadingState,
    handleCreatePlan,
    handleReorderSessions,
    interviewPlans,
    coordinator,
    plan_id,
  };
  return value;
};

export default useJobInterviewPlanActions;
