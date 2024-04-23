import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { MoveAssessment } from '@/devlink2';
import { fetchInterviewSessionTask } from '@/src/components/Scheduling/AllSchedules/SchedulingApplication/hooks';
import SelectScheduleDate from '@/src/components/Tasks/TaskBody/AddNewTask/SelectScheduleDate';
import SessionList from '@/src/components/Tasks/TaskBody/AddNewTask/SessionList';
import { assigneeType } from '@/src/components/Tasks/utils';
import { useJobInterviewPlan } from '@/src/context/JobInterviewPlanContext';
import { CustomDatabase } from '@/src/types/customSchema';

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
};
function CreateTask({
  setTask,
}: {
  setTask: Dispatch<SetStateAction<TaskType>>;
}) {
  const [scheduleDate, setScheduleDate] = useState({
    start_date: new Date().toString(),
    end_date: new Date().toString(),
  });

  const [selectedSession, setSelectedSession] = useState<
    Awaited<ReturnType<typeof fetchInterviewSessionTask>>
  >([]);
  const [selectedAssignee, setSelectedAssignee] = useState<assigneeType | null>(
    null,
  );

  const {
    interviewPlans: {
      data: { interview_session },
    },
  } = useJobInterviewPlan();

  useEffect(() => {
    if (
      (selectedAssignee?.user_id ?? null) &&
      (selectedSession ?? null) &&
      (scheduleDate?.start_date ?? null) &&
      (scheduleDate?.end_date ?? null)
    ) {
      setTask({
        assignee: [selectedAssignee.user_id],
        schedule_date_range: { ...scheduleDate },
        session_ids: selectedSession,
        task_owner: selectedAssignee.user_id,
        status: 'not_started',
        priority: 'medium',
        type: 'schedule' as CustomDatabase['public']['Enums']['task_type_enum'],
        due_date: dayjs().toString(),
      });
    }
  }, [
    selectedAssignee?.user_id,
    selectedSession,
    scheduleDate.start_date,
    scheduleDate.end_date,
  ]);
  return (
    <>
      <MoveAssessment
        slotInterviewDate={
          <SelectScheduleDate
            scheduleDate={scheduleDate}
            setScheduleDate={setScheduleDate}
          />
        }
        slotInterview={
          <SessionList
            selectedSession={selectedSession}
            setSelectedSession={setSelectedSession}
            sessionList={interview_session}
          />
        }
        slotAssignedTo={
          <TaskOwners
            selectedAssignee={selectedAssignee}
            setSelectedAssignee={setSelectedAssignee}
          />
        }
        isAssignedToVisible={true}
        isInterviewDateVisible={true}
        isInterviewVisible={true}
        isWhentoCallVisible={false}
        // textWhenToCall={
        //   selectedAssignee?.user_id === EmailAgentId
        //     ? 'When to mail'
        //     : 'When to call'
        // }
        // slotWhentoCallIcon={
        //   selectedAssignee?.user_id === EmailAgentId ? (
        //     <EmailIcon />
        //   ) : (
        //     <CallIcon />
        //   )
        // }
      />
    </>
  );
}

export default CreateTask;
