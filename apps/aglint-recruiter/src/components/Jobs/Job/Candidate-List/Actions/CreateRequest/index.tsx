import { DatabaseTableInsert } from '@aglint/shared-types';
import { Stack, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

import { ScheduleInterviewPop } from '@/devlink2/ScheduleInterviewPop';
import { Skeleton } from '@/devlink2/Skeleton';
import MemberList from '@/src/components/Requests/ViewRequestDetails/Components/MemberList';
import { useApplications } from '@/src/context/ApplicationsContext';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJob } from '@/src/context/JobContext';
import { useAllMembers } from '@/src/queries/members';

import {
  RangePicker,
  RequestOption,
} from '../../../ApplicationDetail/SlotBody/InterviewTabContent/ScheduleDialog';
import SessionList from './SessionsList';

export type sessionType = {
  id: string;
  name: string;
  type: 'debrief' | 'panel' | 'individual';
};

function CreateRequest({
  setRequest,
  priority,
  setPriority,
  note,
  setNote,
  setSelectedSession,
  selectedSession,
}: {
  setRequest: Dispatch<SetStateAction<DatabaseTableInsert['request']>>;
  priority: 'urgent' | 'standard';
  setPriority: Dispatch<SetStateAction<'urgent' | 'standard'>>;
  note: string;
  setNote: Dispatch<SetStateAction<string>>;
  setSelectedSession: Dispatch<SetStateAction<sessionType[]>>;
  selectedSession: sessionType[];
}) {
  const { members } = useAllMembers();

  const {
    job: { hiring_manager, recruiting_coordinator, sourcer, recruiter },
  } = useApplications();
  const { recruiterUser } = useAuthDetails();

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
          .map((ele) => ({ id: ele.id, name: ele.name }) as sessionType),
      );
      setRequest((pre) => {
        const preRequest = { ...pre };
        return {
          ...preRequest,
          schedule_start_date: dateRange.start,
          schedule_end_date: dateRange.end,
          assignee_id:
            selectedInterviewer ||
            recruiting_coordinator ||
            hiring_manager ||
            sourcer ||
            recruiter,

          assigner_id: recruiterUser.user_id,
          type: 'schedule_request',
          status: 'to_do',
        };
      });
    }
  }, [status]);

  useEffect(() => {
    if (priority) {
      setRequest((pre) => {
        const preData = { ...pre };
        return {
          ...preData,
          priority: priority,
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
              onChange={({ sessions }) => {
                setSelectedSession([...sessions]);
              }}
              sessionList={
                data?.flatMap((item) =>
                  item.interview_session
                    .filter((ele) => ele.session_type !== 'debrief')
                    .flatMap((ele) => ({
                      id: ele.id,
                      name: ele.name,
                      type: ele.session_type,
                    })),
                ) as sessionType[]
              }
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
                setRequest((pre) => {
                  const preData = { ...pre };
                  return {
                    ...preData,
                    assignee_id: user_id,
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
            multiline
            minRows={2}
            maxRows={4}
            variant='outlined'
            fullWidth
          />
        }
      />
    </>
  );
}

export default CreateRequest;
