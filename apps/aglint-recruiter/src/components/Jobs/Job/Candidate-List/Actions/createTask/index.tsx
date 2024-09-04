import { type DB } from '@aglint/shared-types';
import { ScheduleInterviewPop } from '@devlink2/ScheduleInterviewPop';
import { Skeleton } from '@devlink2/Skeleton';
import { Stack, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

import { meetingCardType } from '@/components/Common/SessionCard';
import MemberList from '@/components/Requests/ViewRequestDetails/Components/MemberList';
import { useApplications } from '@/context/ApplicationsContext';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useJob } from '@/context/JobContext';
import { useAllMembers } from '@/queries/members';

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
  note,
  setNote,
}: {
  setTask: Dispatch<SetStateAction<TaskType>>;
  applications: string[];
  job_id: string;
  priority: 'urgent' | 'standard';
  setPriority: Dispatch<SetStateAction<'urgent' | 'standard'>>;
  note: string;
  setNote: Dispatch<SetStateAction<string>>;
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
        slotNotes={
          <TextField
            value={note || ''}
            onChange={(e) => {
              setNote(e.target.value);
            }}
            placeholder='Add note'
            multiline // Enables textarea behavior
            minRows={2} // Minimum number of rows
            maxRows={4} // Maximum number of rows
            variant='outlined' // Uses the outlined variant
            fullWidth // Takes full width of the container
          />
        }
      />
    </>
  );
}

export default CreateTask;
