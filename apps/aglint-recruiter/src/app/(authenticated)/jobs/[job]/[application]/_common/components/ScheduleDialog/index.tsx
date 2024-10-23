import { type DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { cn } from '@lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Edit2, FileBadge2 } from 'lucide-react';
import React, { useEffect } from 'react';
import type { DateRange } from 'react-day-picker';
import { useMemberList } from 'src/app/_common/hooks/useMemberList';

import IconSessionType from '@/components/Common/Icons/IconSessionType';
import MemberCard from '@/components/Common/MemberCard';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import UITextField from '@/components/Common/UITextField';
import UpdateMembers from '@/components/Common/UpdateMembers';

import { useApplicationMeta } from '../../hooks/useApplicationMeta';
import { useScheduleRequest } from '../../hooks/useScheduleRequest';
import {
  setDateRange,
  setIsScheduleOpen,
  setNote,
  setRequestType,
  setSelectedAssignee,
  useApplicationDetailStore,
} from '../../stores/applicationDetail';
import { ScheduleInterviewPop } from '../InterviewTab/ScheduleInterviewPop';

function DialogSchedule() {
  const { isScheduleOpen, note, selectedAssignee, requestType, dateRange } =
    useApplicationDetailStore();
  const {
    isSaving,
    sessionHasRequest,
    selectedStage,
    sessions,
    handleCreateRequest,
  } = useScheduleRequest();
  const { data: members } = useMemberList(false, true);
  const { data: meta } = useApplicationMeta();

  const candidate = meta;

  const onClose = () => {
    if (isSaving) return;
    setIsScheduleOpen(false);
  };
  const isRequestExists = sessionHasRequest.length > 0;

  return (
    <>
      <UIDialog
        open={isScheduleOpen}
        onClose={onClose}
        title='Schedule Interviews'
        slotButtons={
          !isRequestExists && (
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
                  await handleCreateRequest();
                }}
              >
                Proceed
              </UIButton>
            </>
          )
        }
      >
        <>
          {isRequestExists ? (
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
            </Alert>
          ) : (
            <ScheduleInterviewPop
              textName={candidate?.name ?? ''}
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
                <UITextField
                  value={note || ''}
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                  placeholder='Add note'
                />
              }
              slotAssignedInput={
                <div className='flex items-center justify-between pr-2'>
                  {selectedAssignee && (
                    <MemberCard
                      selectedMember={{
                        first_name: selectedAssignee?.first_name,
                        last_name: selectedAssignee?.last_name,
                        profile_image: selectedAssignee?.profile_image,
                        role: selectedAssignee?.role,
                      }}
                    />
                  )}
                  <UpdateMembers
                    handleChange={(assignee) => {
                      setSelectedAssignee(assignee);
                    }}
                    updateButton={
                      <Edit2 className='h-4 w-4 cursor-pointer text-gray-400' />
                    }
                    members={members || []}
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
                <RangePicker
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                />
              }
            />
          )}
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
      start: dayjsLocal(date?.from).toISOString(),
      end: dayjsLocal(date?.to).toISOString(),
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
  setRequestType: (_: DatabaseTable['request']['priority']) => void;
}) => {
  return (
    <div className='flex w-full flex-row space-x-2'>
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
    </div>
  );
};
