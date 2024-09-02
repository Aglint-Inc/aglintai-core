import { useRouter } from 'next/router';
import { type ReactNode, createContext, useContext } from 'react';

import { supabase } from '@/src/utils/supabase/client';

interface InterviewerContextInterface {
  // eslint-disable-next-line no-unused-vars
  handelRemoveMemberFormPanel: (x: {
    panel_id?: string;
    training_status: 'training' | 'qualified';
  }) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  handelUpdateSchedule: (x: {
    panel_id?: string;
    pause_json: any;
    training_status: 'training' | 'qualified';
  }) => Promise<void>;
}

const initialInterviewerContext: InterviewerContextInterface = {
  // eslint-disable-next-line no-unused-vars
  handelRemoveMemberFormPanel: (x) => Promise.resolve(),
  // eslint-disable-next-line no-unused-vars
  handelUpdateSchedule: (x) => Promise.resolve()
};

const InterviewerContext = createContext<InterviewerContextInterface>(
  initialInterviewerContext
);

const useInterviewerContext = () => useContext(InterviewerContext);

const InterviewerContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const handelRemoveMemberFormPanel: InterviewerContextInterface['handelRemoveMemberFormPanel'] =
    async ({ panel_id, training_status }) => {
      const user_id = router.query.member_id as string;

      return removeMemberFormPanel({
        panel_id,
        user_id,
        training_status
      }).then(() => {});
    };

  const handelUpdateSchedule: InterviewerContextInterface['handelUpdateSchedule'] =
    async ({ panel_id, pause_json, training_status }) => {
      const user_id = router.query.member_id as string;

      return updateSchedule({
        panel_id,
        user_id: user_id,
        pause_json,
        training_status
      }).then(() => {});
    };

  return (
    <InterviewerContext.Provider
      value={{
        handelRemoveMemberFormPanel,
        handelUpdateSchedule
      }}
    >
      {children}
    </InterviewerContext.Provider>
  );
};

export { InterviewerContextProvider, useInterviewerContext };

const removeMemberFormPanel = async ({
  panel_id,
  user_id,
  training_status
}: {
  panel_id?: string;
  user_id: string;
  training_status: 'qualified' | 'training';
}) => {
  return supabase
    .from('interview_module_relation')
    .delete()
    .match(
      panel_id ? { module_id: panel_id, user_id } : { user_id, training_status }
    )
    .then(({ error }) => {
      if (error) {
        throw new Error(error.message);
      }
      return true;
    });
};

const updateSchedule = async ({
  panel_id,
  user_id,
  pause_json,
  training_status
}: {
  panel_id?: string;
  user_id: string;
  pause_json: any;
  training_status: 'qualified' | 'training';
}) => {
  return supabase
    .from('interview_module_relation')
    .update({ pause_json })
    .match(
      panel_id ? { module_id: panel_id, user_id } : { user_id, training_status }
    )
    .then(({ error }) => {
      if (error) {
        throw new Error(error.message);
      }
      return true;
    });
};
