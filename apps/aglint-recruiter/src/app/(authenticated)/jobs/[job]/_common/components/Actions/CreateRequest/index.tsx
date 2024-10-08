import type { DatabaseTable } from '@aglint/shared-types';
import { Textarea } from '@components/ui/textarea';
import dayjs from 'dayjs';
import { Edit2 } from 'lucide-react';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { useMemberList } from 'src/app/_common/hooks/useMemberList';
import { type MemberType } from 'src/app/_common/types/memberType';

import { useTenant } from '@/company/hooks';
import MemberCard from '@/components/Common/MemberCard';
import { UIDateRangePicker } from '@/components/Common/UIDateRangePicker';
import UpdateMembers from '@/components/Common/UpdateMembers';
import { useJob } from '@/job/hooks';
import { ScheduleInterviewPop } from '@/jobs/job/application/components/InterviewTab/ScheduleInterviewPop';
import { RequestOption } from '@/jobs/job/application/components/ScheduleDialog';

import { SessionList, type SessionType } from './SessionsList';
function CreateRequest({
  setRequest,
  priority,
  setPriority,
  note,
  setNote,
  setSelectedSession,
  selectedSession,
}: {
  setRequest: Dispatch<SetStateAction<DatabaseTable['request'] | null>>;
  priority: 'urgent' | 'standard';
  setPriority: Dispatch<SetStateAction<'urgent' | 'standard'>>;
  note: string;
  setNote: Dispatch<SetStateAction<string>>;
  setSelectedSession: Dispatch<SetStateAction<SessionType[]>>;
  selectedSession: SessionType[];
}) {
  const { data: members, status: membersStatus } = useMemberList();
  const {
    job: { hiring_manager, recruiting_coordinator, sourcer, recruiter },
  } = useJob();
  const { recruiter_user } = useTenant();
  const selectedMember = (
    membersStatus === 'success'
      ? members.find(
          (member) =>
            member.user_id === recruiting_coordinator ||
            hiring_manager ||
            sourcer ||
            recruiter,
        )
      : null
  )!;
  const [selectedInterviewer, setSelectedInterviewer] =
    useState<MemberType>(selectedMember);

  const [dateRange, setDateRange] = useState({
    start: dayjs().toString(),
    end: dayjs().add(14, 'day').toString(),
  });
  const {
    interviewPlans: { data, status },
  } = useJob();

  useEffect(() => {
    if (membersStatus === 'success') {
      setSelectedInterviewer(selectedMember);
    }
  }, [membersStatus]);

  useEffect(() => {
    if (status === 'success') {
      const interview_session = data?.flatMap((item) => item.interview_session);
      setSelectedSession(
        interview_session
          .filter((ele) => ele.session_type !== 'debrief')
          .slice(0, 2)
          .map((ele) => ({ id: ele.id, name: ele.name }) as SessionType),
      );
      setRequest((pre) => {
        const preRequest = { ...pre };
        return {
          ...preRequest,
          schedule_start_date: dateRange.start,
          schedule_end_date: dateRange.end,
          assignee_id:
            selectedInterviewer?.user_id ||
            recruiting_coordinator ||
            hiring_manager ||
            sourcer ||
            recruiter,

          assigner_id: recruiter_user.user_id,
          type: 'schedule_request',
          status: 'to_do',
        } as typeof pre;
      });
    }
  }, [status]);

  useEffect(() => {
    if (priority) {
      setRequest((pre) => {
        const preData = { ...pre! };
        return {
          ...preData,
          priority: priority,
        };
      });
    }
  }, [priority]);

  return (
    <>
      {selectedSession.length > 0 ? (
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
                  ) as SessionType[]
                }
              />
            </>
          }
          slotAssignedInput={
            membersStatus === 'pending' ? (
              <div className='h-10 w-full animate-pulse rounded-md bg-gray-100'></div>
            ) : (
              <div className='flex items-center justify-between pr-2'>
                {selectedInterviewer && (
                  <MemberCard selectedMember={selectedInterviewer} />
                )}
                <UpdateMembers
                  handleChange={(member) => {
                    setSelectedInterviewer(member);
                    setRequest((pre) => {
                      const preData = { ...pre! };
                      return {
                        ...preData,
                        assignee_id: member.user_id,
                      };
                    });
                  }}
                  updateButton={
                    <Edit2 className='h-4 w-4 cursor-pointer text-gray-400' />
                  }
                  members={members!}
                />
              </div>
            )
          }
          slotRequestOption={
            <RequestOption
              requestType={priority}
              setRequestType={setPriority}
            />
          }
          isRequestTypeVisible={true}
          textSelectedSchedule={`Selected Schedules`}
          slotPickDateInput={
            <UIDateRangePicker
              value={{
                from: new Date(dateRange.start),
                to: new Date(dateRange.end),
              }}
              onAccept={(date) => {
                setDateRange({
                  start: dayjs(date.from).toISOString(),
                  end: dayjs(date.to).toISOString(),
                });
              }}
            />
          }
          slotNotes={
            <Textarea
              value={note || ''}
              onChange={(e) => setNote(e.target.value)}
              placeholder='Add note'
              className='min-h-[80px]'
            />
          }
        />
      ) : null}
    </>
  );
}

export default CreateRequest;
