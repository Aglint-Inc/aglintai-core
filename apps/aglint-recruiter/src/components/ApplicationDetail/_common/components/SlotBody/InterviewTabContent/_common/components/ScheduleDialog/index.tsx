import { type DatabaseTable } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { cn } from '@lib/utils';
import { Stack, TextField } from '@mui/material';
import { format } from 'date-fns';
import { CalendarIcon, Edit2, FileBadge2 } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import type { DateRange } from 'react-day-picker';

import IconSessionType from '@/components/Common/Icons/IconSessionType';
import MemberCard from '@/components/Common/MemberCard';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import UpdateMembers from '@/components/Common/UpdateMembers';
import { type MemberType } from '@/components/Scheduling/InterviewTypes/types';
import { useApplication } from '@/context/ApplicationContext';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useMemberList } from '@/hooks/useMemberList';
import dayjs from '@/utils/dayjs';

import {
  setIsScheduleOpen,
  setSelectedSessionIds,
  useApplicationDetailStore,
} from '../../../../../../store/store';
import { type Interviewer } from '../EditDrawer/types';
import { ScheduleInterviewPop } from '../ScheduleInterviewPop';

function DialogSchedule() {
  const { isScheduleOpen, selectedSessionIds } = useApplicationDetailStore();
  const router = useRouter();
  const selectedStageId = router.query.stage as string;
  const { recruiterUser } = useAuthDetails();

  const [note, setNote] = useState('');
  const [requestType, setRequestType] =
    React.useState<DatabaseTable['request']['priority']>('standard');
  const [dateRange, setDateRange] = React.useState({
    start: dayjs().toISOString(),
    end: dayjs().add(7, 'day').toISOString(),
  });
  const [isSaving, setIsSaving] = React.useState(false);

  const { data: members, status: membersStatus } = useMemberList();

  const [selectedInterviewer, setSelectedInterviewer] =
    React.useState<MemberType>(null);

  const {
    meta,
    interview,
    handleCreateRequest,
    requests,
    job_id,
    application_id,
  } = useApplication();

  const candidate = meta.data;
  const selectedStage = interview.data.find(
    (stage) => stage.interview_plan.id === selectedStageId,
  );
  const requestSessionIds = requests.data
    .filter(
      (request) =>
        request.type === 'schedule_request' &&
        (request.status === 'to_do' || request.status === 'in_progress'),
    )
    .flatMap((request) => request.request_relation)
    .flatMap((relation) => relation.session_id);

  const sessions = interview.data
    .flatMap((stage) => stage.sessions)
    .filter((session) =>
      selectedSessionIds.includes(session.interview_session.id),
    );

  const sessionHasRequest = sessions.filter((session) =>
    requestSessionIds.includes(session.interview_session.id),
  );

  const optionsInterviewers: Interviewer[] =
    membersStatus === 'success'
      ? members?.map((member) => {
          return {
            name: getFullName(member.first_name, member.last_name),
            value: member.user_id,
            start_icon_url: member.profile_image,
          };
        })
      : [];

  useEffect(() => {
    if (optionsInterviewers?.length > 0 && membersStatus === 'success') {
      const selectedMembers = members?.find(
        (member) => member.user_id === String(optionsInterviewers[0].value),
      );
      setSelectedInterviewer(selectedMembers);
    }
  }, [optionsInterviewers?.length, membersStatus]);

  const onClickSubmit = async () => {
    setIsSaving(true);
    await handleCreateRequest({
      sel_user_id: selectedInterviewer.user_id,
      assigned_user_id: recruiterUser.user_id,
      requestType,
      dateRange,
      selectedSessionIds,
      sessionNames: sessions.map((session) => session.interview_session.name),
      note,
    });

    setIsSaving(false);
    setSelectedSessionIds([]);
    setIsScheduleOpen(false);
  };

  const onClose = () => {
    if (isSaving) return;
    setIsScheduleOpen(false);
  };

  return (
    <>
      <UIDialog
        open={isScheduleOpen}
        onClose={onClose}
        title='Schedule Interviews'
        slotButtons={
          <>
            <UIButton
              variant='secondary'
              size='md'
              color='neutral'
              onClick={() => {
                setIsScheduleOpen(false);
              }}
            >
              Cancel
            </UIButton>

            <UIButton
              size='md'
              isLoading={isSaving}
              onClick={async () => {
                if (isSaving) return;
                onClickSubmit();
              }}
            >
              Proceed
            </UIButton>
          </>
        }
      >
        <>
          {sessionHasRequest.length > 0 && (
            <Alert variant='warning'>
              <AlertTitle>
                {`${sessionHasRequest
                  .map((session) => session.interview_session.name)
                  .join(', ')} already has a schedule request.`}
              </AlertTitle>
              <AlertDescription>
                Please wait for the request to be accepted or rejected before
                creating a new request.
              </AlertDescription>
              <Button
                variant='outline'
                size='sm'
                className='mt-3'
                onClick={() => {
                  router.push({
                    query: { tab: 'requests' },
                    pathname: `/jobs/${job_id}/application/${application_id}`,
                  });
                  onClose();
                }}
              >
                View Request
              </Button>
            </Alert>
          )}

          <ScheduleInterviewPop
            textName={candidate.name}
            slotStagePill={
              <>
                {sessions.map((session) => {
                  return (
                    <UIButton
                      key={session.interview_session.id}
                      variant='secondary'
                      leftIcon={
                        <IconSessionType
                          type={session.interview_session.session_type}
                        />
                      }
                    >
                      {session.interview_session.name}
                    </UIButton>
                  );
                })}
              </>
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
            slotAssignedInput={
              <div className='flex items-center justify-between pr-2'>
                {selectedInterviewer && (
                  <MemberCard selectedMember={selectedInterviewer} />
                )}
                <UpdateMembers
                  handleChange={(member) => {
                    setSelectedInterviewer(member);
                  }}
                  updateButton={
                    <Edit2 className='h-4 w-4 cursor-pointer text-gray-400' />
                  }
                  members={members}
                />
              </div>
            }
            slotRequestOption={
              <RequestOption
                requestType={requestType}
                setRequestType={setRequestType}
              />
            }
            isRequestTypeVisible={true}
            textSelectedSchedule={`Selected Schedules from stage ${selectedStage?.interview_plan.name} `}
            slotPickDateInput={
              <RangePicker dateRange={dateRange} setDateRange={setDateRange} />
            }
          />
        </>
      </UIDialog>
    </>
  );
}

export default DialogSchedule;

export const RangePicker = ({
  dateRange,
  setDateRange,
}: {
  dateRange: { start: string; end: string };
  setDateRange: (_x: { start: string; end: string }) => void;
}) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(dateRange?.start),
    to: new Date(dateRange?.end),
  });

  useEffect(() => {
    setDateRange({
      start: dayjs(date?.from).toISOString(),
      end: dayjs(date?.to).toISOString(),
    });
  }, [date]);

  return (
    <div className={cn('grid gap-2')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const RequestOption = ({
  requestType,
  setRequestType,
}: {
  requestType: DatabaseTable['request']['priority'];
  setRequestType: React.Dispatch<
    React.SetStateAction<DatabaseTable['request']['priority']>
  >;
}) => {
  return (
    <Stack direction={'row'} width={'100%'} spacing={'var(--space-2)'}>
      <UIButton
        variant={requestType === 'urgent' ? 'default' : 'outline'}
        leftIcon={<FileBadge2 />}
        onClick={() => {
          setRequestType('urgent');
        }}
      >
        Urgent Request
      </UIButton>
      <UIButton
        variant={requestType === 'standard' ? 'default' : 'outline'}
        onClick={() => {
          setRequestType('standard');
        }}
      >
        Standard Request
      </UIButton>
    </Stack>
  );
};
