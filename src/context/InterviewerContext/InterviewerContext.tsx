import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext } from 'react';

import { supabase } from '@/src/utils/supabase/client';

interface InterviewerContextInterface {
  // eslint-disable-next-line no-unused-vars
  handelRemoveMemberFormPanel: (x: { panel_id?: string }) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  handelUpdateSchedule: (x: {
    panel_id?: string;
    pause_json: any;
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
    async ({ panel_id }) => {
      const user_id = router.query.member_id as string;

      return removeMemberFormPanel({
        panel_id,
        user_id
      }).then(() => {});
    };

  const handelUpdateSchedule: InterviewerContextInterface['handelUpdateSchedule'] =
    async ({ panel_id, pause_json }) => {
      const user_id = router.query.member_id as string;

      return updateSchedule({
        panel_id,
        user_id: user_id,
        pause_json
      }).then(() => {});
    };

<<<<<<< HEAD
=======
  const [interviewer, setInterviewer] = useState([]);
  async function getInterviewStatus() {
    // Initialize an object to store the counts of each status

    for (const member of interviewerMembers) {
      const statusCounts = {
        completed: 0,
        upcoming: 0
      };
      const { data, error } = await supabase.rpc(
        'get_interview_schedule_by_user_id',
        {
          target_user_id: member.user_id
        }
      );

      if (!error) {
        const allSchedules = data as unknown as ScheduleType[];
        const schArray = [];
        allSchedules.map((sch) =>
          sch.schedule.confirmed_option.plans.map((plan) => {
            if (
              !plan.isBreak &&
              plan.selectedIntervs.find(
                (user) => user.interv_id === member.user_id
              )
            ) {
              schArray.push({ ...sch, module_time: plan });
            }
          })
        );
        schArray.map((item: ScheduleType) => {
          statusCounts[item.schedule.status]++;
        });
      }
      setInterviewer((pre) => {
        return [
          ...pre,
          {
            ...member,
            upcomingCount: statusCounts.upcoming,
            completedCount: statusCounts.completed
          }
        ];
      });
    }
  }
  useEffect(() => {
    if (interviewerMembers.length) getInterviewStatus();
  }, [interviewerMembers]);
>>>>>>> 96ceb18a14a56519cc217fec5e2c03ff4f500c84
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
  user_id
}: {
  panel_id?: string;
  user_id: string;
}) => {
  return supabase
    .from('interview_module_relation')
    .delete()
    .match({ module_id: panel_id, user_id })
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
  pause_json
}: {
  panel_id?: string;
  user_id: string;
  pause_json: any;
}) => {
  return supabase
    .from('interview_module_relation')
    .update({ pause_json })
    .match(panel_id ? { module_id: panel_id, user_id } : { user_id })
    .then(({ error }) => {
      if (error) {
        throw new Error(error.message);
      }
      return true;
    });
};
<<<<<<< HEAD
=======

const getInterviewsData = async ({ user_id }: { user_id: string }) => {
  const { data, error } = await supabase.rpc(
    'get_interview_schedule_by_user_id',
    {
      target_user_id: user_id
    }
  );

  if (!error) {
    const allSchedules = data as unknown as ScheduleType[];
    const schArray = [];
    allSchedules.map((sch) =>
      sch.schedule.confirmed_option.plans.map((plan) => {
        if (
          !plan.isBreak &&
          plan.selectedIntervs.find((user) => user.interv_id === user_id)
        ) {
          schArray.push({ ...sch, module_time: plan });
        }
      })
    );
    // setSchedules(schArray);
    return schArray;
  }
};
>>>>>>> 96ceb18a14a56519cc217fec5e2c03ff4f500c84
