import { DB } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { ScheduleInterviewPop } from '@/devlink2/ScheduleInterviewPop';
import { Skeleton } from '@/devlink2/Skeleton';
import MemberList from '@/src/components/Requests/ViewRequestDetails/Components/MemberList';
import { meetingCardType } from '@/src/components/Tasks/TaskBody/ViewTask/Progress/SessionCard';
import { useApplications } from '@/src/context/ApplicationsContext';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJob } from '@/src/context/JobContext';
import { useAllMembers } from '@/src/queries/members';

import {
  RangePicker,
  RequestOption,
} from '../../../ApplicationDetail/SlotBody/InterviewTabContent/ScheduleDialog';
import SessionList from './SessionsList';

export type TaskType = {
  assignee: string[];
  schedule_date_range: { start_date: string; end_date: string };
  session_ids: any[];
  task_owner: string;
  status: DB['public']['Enums']['task_status'];
  priority: DB['public']['Enums']['task_priority'];
  type: DB['public']['Enums']['task_type_enum'];
  due_date: string;
  start_date: string;
  name: string;
};
function CreateTask({
  setTask,
  applications,
  job_id,
  priority,
  setPriority,
}: {
  setTask: Dispatch<SetStateAction<TaskType>>;
  applications: string[];
  job_id: string;
  priority: 'urgent' | 'standard';
  setPriority: Dispatch<SetStateAction<'urgent' | 'standard'>>;
}) {
  const { members } = useAllMembers();

  const {
    job: { hiring_manager, recruiting_coordinator, sourcer, recruiter },
  } = useApplications();
  const { recruiterUser } = useAuthDetails();

  const [selectedSession, setSelectedSession] = useState<meetingCardType[]>([]);
  const [selectedInterviewer, setSelectedInterviewer] = useState<string | null>(
    null,
  );

  const [dateRange, setDateRange] = useState({
    start: dayjs().toString(),
    end: dayjs().add(14, 'day').toString(),
  });
  const {
    interviewPlans: { data, status },
  } = useJob();

  useEffect(() => {
    if (status === 'success') {
      const interview_session = data?.flatMap((item) => item.interview_session);
      setSelectedSession(
        interview_session
          .slice(0, 2)
          .map((ele) => ({ id: ele.id, name: ele.name }) as meetingCardType),
      );

      setTask((pre) => {
        const preTask = { ...pre };
        return {
          ...preTask,
          session_ids: interview_session.slice(0, 2),
          schedule_date_range: {
            start_date: dateRange.start,
            end_date: dateRange.end,
          },
          start_date: dayjs().add(5, 'minute').toString(),
          due_date: dayjs().add(1, 'day').toString(),
          assignee: [
            selectedInterviewer ||
              recruiting_coordinator ||
              hiring_manager ||
              sourcer ||
              recruiter,
          ],
          task_owner: recruiterUser.user_id,
        };
      });
    }
  }, [status]);

  useEffect(() => {
    if (priority) {
      //@ts-ignore
      setTask((pre) => {
        const preTask = { ...pre };
        return {
          ...preTask,
          priority,
        };
      });
    }
  }, [priority]);

  return (
    <>
      <ScheduleInterviewPop
        isCandidateVisible={false}
        slotStagePill={
          <>
            <SessionList
              selectedSession={selectedSession}
              setSelectedSession={setSelectedSession}
              application_id={applications[0]}
              job_id={job_id}
              onChange={({ sessions }) => {
                setTask((pre) => {
                  const preTask = { ...pre };
                  return {
                    ...preTask,
                    session_ids: sessions,
                  };
                });
              }}
            />
          </>
        }
        slotAssignedInput={
          !members.length ? (
            <Stack position={'relative'} width={'100%'} height={'40px'}>
              <Skeleton />
            </Stack>
          ) : (
            <MemberList
              selectedMemberId={
                selectedInterviewer ||
                recruiting_coordinator ||
                hiring_manager ||
                sourcer ||
                recruiter
              }
              members={members}
              width='436px'
              onChange={(user_id) => {
                setSelectedInterviewer(user_id);
                setTask((pre) => {
                  const preTask = { ...pre };
                  return {
                    ...preTask,
                    assignee: [user_id],
                    status: 'not_started',
                  };
                });
              }}
            />
          )
        }
        slotRequestOption={
          <RequestOption requestType={priority} setRequestType={setPriority} />
        }
        isRequestTypeVisible={true}
        textSelectedSchedule={`Selected Schedules`}
        slotPickDateInput={
          <RangePicker dateRange={dateRange} setDateRange={setDateRange} />
        }
      />
    </>
  );
}

export default CreateTask;
