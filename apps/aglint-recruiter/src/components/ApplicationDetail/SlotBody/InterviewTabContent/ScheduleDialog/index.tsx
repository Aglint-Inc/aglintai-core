import { type DatabaseTable } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { ButtonSoft } from '@devlink/ButtonSoft';
import { ButtonSolid } from '@devlink/ButtonSolid';
import { DcPopup } from '@devlink/DcPopup';
import { GlobalBannerShort } from '@devlink2/GlobalBannerShort';
import { ScheduleInterviewPop } from '@devlink2/ScheduleInterviewPop';
import { cn } from '@lib/utils';
import { Dialog, Stack, TextField } from '@mui/material';
import { format } from 'date-fns';
import { CalendarIcon, FileBadge2 } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

import IconSessionType from '@/components/Common/Icons/IconSessionType';
import MemberList from '@/components/Requests/ViewRequestDetails/Components/MemberList';
import { useApplication } from '@/context/ApplicationContext';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useAllMembers } from '@/queries/members';
import dayjs from '@/utils/dayjs';

import {
  setIsScheduleOpen,
  setSelectedSessionIds,
  useApplicationDetailStore,
} from '../../../store';
import { type Interviewer } from '../StageSessions/EditDrawer/types';

function DialogSchedule() {
  const { isScheduleOpen, selectedSessionIds } = useApplicationDetailStore();
  const router = useRouter();
  const selectedStageId = router.query.stage as string;
  const { recruiterUser } = useAuthDetails();

  const [selectedInterviewer, setSelectedInterviewer] = React.useState('');
  const [note, setNote] = useState('');
  const [requestType, setRequestType] =
    React.useState<DatabaseTable['request']['priority']>('standard');
  const [dateRange, setDateRange] = React.useState({
    start: dayjs().toISOString(),
    end: dayjs().add(7, 'day').toISOString(),
  });
  const [isSaving, setIsSaving] = React.useState(false);

  const { members } = useAllMembers();

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

  const optionsInterviewers: Interviewer[] = members?.map((member) => {
    return {
      name: getFullName(member.first_name, member.last_name),
      value: member.user_id,
      start_icon_url: member.profile_image,
    };
  });

  useEffect(() => {
    if (optionsInterviewers?.length > 0) {
      setSelectedInterviewer(String(optionsInterviewers[0].value));
    }
  }, [optionsInterviewers?.length]);

  const onClickSubmit = async () => {
    setIsSaving(true);
    await handleCreateRequest({
      sel_user_id: selectedInterviewer,
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
    <Dialog
      open={isScheduleOpen}
      onClose={() => {
        onClose();
      }}
    >
      <DcPopup
        popupName={'Schedule Interviews'}
        onClickClosePopup={{
          onClick: () => {
            onClose();
          },
        }}
        slotBody={
          <>
            {sessionHasRequest.length > 0 && (
              <GlobalBannerShort
                color={'warning'}
                slotButtons={
                  <>
                    <ButtonSoft
                      size={1}
                      textButton='View Request'
                      onClickButton={{
                        onClick: () => {
                          router.push({
                            query: { tab: 'requests' },
                            pathname: `/jobs/${job_id}/application/${application_id}`,
                          });
                          onClose();
                        },
                      }}
                    />
                  </>
                }
                textTitle={`${sessionHasRequest
                  .map((session) => session.interview_session.name)
                  .join(', ')} already has a schedule request.`}
                textDescription={`Please wait for the request to be accepted or rejected before creating a new request.`}
              />
            )}

            <ScheduleInterviewPop
              textName={candidate.name}
              slotStagePill={
                <>
                  {sessions.map((session) => {
                    return (
                      <ButtonSoft
                        key={session.interview_session.id}
                        size={2}
                        textButton={session.interview_session.name}
                        color={'neutral'}
                        isLeftIcon={true}
                        slotIcon={
                          <IconSessionType
                            type={session.interview_session.session_type}
                          />
                        }
                      />
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
                <>
                  <MemberList
                    onChange={(user_id) => {
                      setSelectedInterviewer(user_id);
                    }}
                    selectedMemberId={selectedInterviewer}
                    members={members}
                    width='430px'
                  />
                </>
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
                <RangePicker
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                />
              }
            />
          </>
        }
        slotButtons={
          <>
            <ButtonSoft
              size={2}
              textButton='Cancel'
              color={'neutral'}
              onClickButton={{
                onClick: () => {
                  setIsScheduleOpen(false);
                },
              }}
            />
            <ButtonSolid
              size={2}
              isLoading={isSaving}
              textButton={'Proceed'}
              onClickButton={{
                onClick: async () => {
                  if (isSaving) return;
                  onClickSubmit();
                },
              }}
            />
          </>
        }
      />
    </Dialog>
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
    from: new Date(dateRange.start),
    to: new Date(dateRange.start),
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
      <ButtonSoft
        size={2}
        textButton={'Urgent Request'}
        color={requestType === 'urgent' ? 'accent' : 'neutral'}
        isLeftIcon={true}
        slotIcon={<FileBadge2 />}
        onClickButton={{
          onClick: () => {
            setRequestType('urgent');
          },
        }}
      />
      <ButtonSoft
        size={2}
        color={requestType === 'standard' ? 'accent' : 'neutral'}
        textButton={'Standard Request'}
        onClickButton={{
          onClick: () => {
            setRequestType('standard');
          },
        }}
      />
    </Stack>
  );
};
