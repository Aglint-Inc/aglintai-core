import dayjs from 'dayjs';
import {
  type PropsWithChildren,
  createContext,
  memo,
  useContext,
  useMemo,
} from 'react';

import { useApplication } from '@/src/context/ApplicationContext';

const ApplicationInterviewActionsContext =
  createContext<ReturnType<typeof useApplicationInterviewActionsContext>>(
    undefined,
  );

export const ApplicationInterviewActionsProvider = memo(
  (props: PropsWithChildren) => {
    return (
      <ApplicationInterviewActionsContext.Provider
        value={useApplicationInterviewActionsContext()}
      >
        {props.children}
      </ApplicationInterviewActionsContext.Provider>
    );
  },
);
ApplicationInterviewActionsProvider.displayName =
  'ApplicationInterviewActionsProvider';

export const useApplicationInterviewActions = () =>
  useContext(ApplicationInterviewActionsContext);

const useApplicationInterviewActionsContext = () => {
  const { activity } = useApplication();
  const scheduledSessions = [];

  const notStartedTasks = [];

  const latestActivities = useMemo(
    () =>
      (activity.data ?? []).filter(
        ({ created_at }) => dayjs().diff(dayjs(created_at), 'h') <= 24,
      ),
    [activity],
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

  return { validActions, notStartedTasks, latestActivities };
};
