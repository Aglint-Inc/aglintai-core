import {
  EmailAgentId,
  PhoneAgentId,
  SystemAgentId,
} from '@aglint/shared-utils';
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from 'react';

import { useApplication } from '@/src/context/ApplicationContext';

const ApplicationInterviewActionsContext =
  createContext<ReturnType<typeof useApplicationInterviewActionsContext>>(
    undefined,
  );

export const ApplicationInterviewActionsProvider = (
  props: PropsWithChildren,
) => {
  return (
    <ApplicationInterviewActionsContext.Provider
      value={useApplicationInterviewActionsContext()}
    >
      {props.children}
    </ApplicationInterviewActionsContext.Provider>
  );
};

export const useApplicationInterviewActions = () =>
  useContext(ApplicationInterviewActionsContext);

const useApplicationInterviewActionsContext = () => {
  const { interview, tasks } = useApplication();
  const scheduledSessions = useMemo(
    () =>
      (interview.data ?? []).filter(({ status }) => status !== 'not_scheduled'),
    [interview],
  );

  const notStartedTasks = useMemo(
    () =>
      (tasks.data ?? []).filter(
        ({ status, type, created_by }) =>
          type === 'schedule' &&
          ![EmailAgentId, PhoneAgentId, SystemAgentId].includes(created_by) &&
          (status === 'not_started' || status === 'overdue'),
      ),
    [tasks, EmailAgentId, PhoneAgentId, SystemAgentId],
  );

  const validActions = useMemo(
    () =>
      notStartedTasks.filter(
        ({ session_ids }) =>
          !session_ids.some(({ id }) =>
            scheduledSessions.find(({ session_id }) => session_id === id),
          ),
      ),
    [notStartedTasks, scheduledSessions],
  );

  return validActions;
};
