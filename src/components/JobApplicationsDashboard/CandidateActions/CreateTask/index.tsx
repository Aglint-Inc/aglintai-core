import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { MoveAssessment } from '@/devlink2';
import { fetchInterviewSessionTask } from '@/src/components/Scheduling/AllSchedules/SchedulingApplication/utils';
import {
  CallIcon,
  EmailIcon,
} from '@/src/components/Tasks/TaskBody/AddNewTask';
import PriorityList from '@/src/components/Tasks/TaskBody/AddNewTask/PriorityList';
import SelectScheduleDate from '@/src/components/Tasks/TaskBody/AddNewTask/SelectScheduleDate';
import SessionList from '@/src/components/Tasks/TaskBody/AddNewTask/SessionList';
import {
  assigneeType,
  EmailAgentId,
  PhoneAgentId,
} from '@/src/components/Tasks/utils';
import { useJobInterviewPlan } from '@/src/context/JobInterviewPlanContext';
import { CustomDatabase, DatabaseEnums } from '@/src/types/customSchema';

import SelectDateTime from './SelectDateTime';
import TaskOwners from './TaskOwners';
export type TaskType = {
  assignee: string[];
  schedule_date_range: { start_date: string; end_date: string };
  session_ids: any[];
  task_owner: string;
  status: CustomDatabase['public']['Enums']['task_status'];
  priority: CustomDatabase['public']['Enums']['task_priority'];
  type: CustomDatabase['public']['Enums']['task_type_enum'];
  due_date: string;
  start_date: string;
  name: string;
};
function CreateTask({
  setTask,
}: {
  setTask: Dispatch<SetStateAction<TaskType>>;
}) {
  const [scheduleDate, setScheduleDate] = useState<{
    start_date: string;
    end_date: string;
  }>({
    start_date: dayjs().add(1, 'day').toString(),
    end_date: dayjs().add(7, 'day').toString(),
  });

  const [selectedSession, setSelectedSession] = useState<
    Awaited<ReturnType<typeof fetchInterviewSessionTask>>
  >([]);
  const [selectedAssignee, setSelectedAssignee] = useState<assigneeType | null>(
    null,
  );

  const [selectCallDate, setSelectCallDate] = useState(
    dayjs().add(5, 'minute').toString(),
  );
  const [selectedPriority, setSelectedPriority] =
    useState<DatabaseEnums['task_priority']>('medium');
  const {
    interviewPlans: {
      data: { interview_session },
    },
  } = useJobInterviewPlan();
  useEffect(() => {
    if (interview_session) {
      setSelectedSession(interview_session.slice(0, 2));
      setTask((pre) => {
        const preTask = { ...pre };
        return {
          ...preTask,
          session_ids: interview_session.slice(0, 2),
          schedule_date_range: {
            start_date: dayjs().add(1, 'day').toString(),
            end_date: dayjs().add(7, 'day').toString(),
          },
          start_date: dayjs().add(5, 'minute').toString(),
          due_date: dayjs().add(1, 'day').toString(),
        };
      });
    }
  }, [interview_session]);

  return (
    <>
      <MoveAssessment
        slotInterviewDate={
          <SelectScheduleDate
            scheduleDate={scheduleDate}
            onChange={(e: any) => {
              if (Array.isArray(e) && e[0] && e[1]) {
                setScheduleDate({
                  start_date: dayjs(e[0]).toString(),
                  end_date: dayjs(e[1]).toString(),
                });

                setTask((pre) => {
                  const preTask = { ...pre };
                  return {
                    ...preTask,
                    schedule_date_range: {
                      start_date: dayjs(e[0]).toString(),
                      end_date: dayjs(e[1]).toString(),
                    },
                    due_date: dayjs(e[0]).toString(),
                  };
                });
              }
              if (!Array.isArray(e)) {
                setScheduleDate({
                  start_date: dayjs(e).toString(),
                  end_date: null,
                });

                // set task

                setTask((pre) => {
                  const preTask = { ...pre };
                  return {
                    ...preTask,
                    schedule_date_range: {
                      start_date: dayjs(e).toString(),
                      end_date: null,
                    },
                    due_date: dayjs(e).toString(),
                  };
                });
              }
            }}
          />
        }
        slotInterview={
          <SessionList
            selectedSession={selectedSession}
            setSelectedSession={setSelectedSession}
            sessionList={interview_session as any[]}
            onChange={(sessions: any) => {
              setTask((pre) => {
                const preTask = { ...pre };
                return {
                  ...preTask,
                  session_ids: sessions,
                };
              });
            }}
          />
        }
        slotAssignedTo={
          <TaskOwners
            selectedAssignee={selectedAssignee}
            setSelectedAssignee={setSelectedAssignee}
            onChange={(owner: assigneeType) => {
              setTask((pre) => {
                const status =
                  owner.user_id === EmailAgentId ||
                  owner.user_id === PhoneAgentId
                    ? ('scheduled' as DatabaseEnums['task_status'])
                    : ('not_started' as DatabaseEnums['task_status']);

                const preTask = { ...pre };
                return {
                  ...preTask,
                  task_owner: owner.user_id,
                  assignee: [owner.user_id],
                  status: status,
                };
              });
            }}
          />
        }
        slotWhentoCall={
          <SelectDateTime
            selectCallDate={selectCallDate}
            setSelectCallDate={setSelectCallDate}
            onChange={(e: any) => {
              setTask((pre) => {
                const preTask = { ...pre };
                return {
                  ...preTask,
                  start_date: dayjs(e).toString(),
                };
              });
            }}
          />
        }
        slotPriority={
          <PriorityList
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
            onChange={(e: DatabaseEnums['task_priority']) => {
              setTask((pre) => {
                const preTask = { ...pre };
                return {
                  ...preTask,
                  priority: e,
                };
              });
            }}
          />
        }
        isPriorityVisible={true}
        isAssignedToVisible={true}
        isInterviewDateVisible={true}
        isInterviewVisible={true}
        isStatusVisible={false}
        isWhentoCallVisible={
          selectedAssignee?.user_id === EmailAgentId ||
          selectedAssignee?.user_id === PhoneAgentId
        }
        textWhenToCall={
          selectedAssignee?.user_id === EmailAgentId
            ? 'When to mail'
            : 'When to call'
        }
        slotWhentoCallIcon={
          selectedAssignee?.user_id === EmailAgentId ? (
            <EmailIcon />
          ) : (
            <CallIcon />
          )
        }
      />
    </>
  );
}

export default CreateTask;
