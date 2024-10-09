import {
  type DatabaseTable,
  type InterviewSessionTypeDB,
} from '@aglint/shared-types';
import { cn } from '@lib/utils';
import { MapPin, Timer, Users } from 'lucide-react';
import { SelectedSessionSlotsCard } from 'src/app/(public)/_common/_components/SelectedSessionStotsCard';

import { ShowCode } from '@/components/Common/ShowCode';
import { UIButton } from '@/components/Common/UIButton';

import { useRequestAvailabilityContext } from '../contexts/RequestAvailabilityContext';
import { convertMinutesToHoursAndMinutes } from '../utils';

function DaySessionCard({
  showDayCount = true,
  cardIndex,
  totalSessionMinutes,
  sessions,
  dates,
  singleDay,
}: {
  showDayCount?: boolean;
  cardIndex: number;
  totalSessionMinutes: number;
  sessions: InterviewSessionTypeDB[];
  dates: NonNullable<
    DatabaseTable['candidate_request_availability']['slots']
  >[number]['dates'];
  singleDay: boolean;
}) {
  const { setOpenDaySlotPopup, selectedSlots, isSubmitted, openDaySlotPopup } =
    useRequestAvailabilityContext();
  const handleOpen = async (day: number) => {
    setOpenDaySlotPopup(day);
  };

  return (
    <div
      className={cn('rounded-lg border', {
        'border-blue-500': cardIndex + 1 === openDaySlotPopup && !isSubmitted,
      })}
    >
      <SelectedSessionSlotsCard
        isSubmitted={isSubmitted}
        textDayCount={showDayCount ? `Day ${cardIndex + 1}` : ''}
        isSelected={
          selectedSlots.length
            ? selectedSlots.map((ele) => ele.round).includes(cardIndex + 1)
            : false
        }
        textTotalDuration={convertMinutesToHoursAndMinutes(totalSessionMinutes)}
        slotSessionInfo={sessions.map((session, i) => {
          return (
            <SessionInfo
              textSessionName={session.name}
              textSessionDuration={convertMinutesToHoursAndMinutes(
                session.session_duration,
              )}
              key={i}
            />
          );
        })}
        slotChangeButton={
          <ShowCode>
            <ShowCode.When
              isTrue={
                !singleDay && !isSubmitted && selectedSlots.length
                  ? selectedSlots
                      .map((ele) => ele.round)
                      .includes(cardIndex + 1)
                  : false
              }
            >
              <UIButton
                variant='default'
                size='sm'
                onClick={() => handleOpen(cardIndex + 1)}
              >
                Change
              </UIButton>
            </ShowCode.When>
          </ShowCode>
        }
        textSelectedSlots={`Selected ${dates.map((ele) => ele.slots).flat().length} slots across ${dates.length} days `}
        // date listing slots
        selectedDates={dates}
      />
    </div>
  );
}

export default DaySessionCard;

export function SessionInfo({
  textSessionName,
  textSessionDuration,
  textMeetingType,
  iconName = 'remote',
}: {
  textSessionName: string;
  textSessionDuration: string;
  textMeetingType?: string;
  iconName?: 'location' | 'remote';
}) {
  const IconComponent = iconName === 'location' ? MapPin : Users;

  return (
    <div className='flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0'>
      <div className='flex items-center space-x-2'>
        <Users className='h-5 w-5 text-muted-foreground' />
        <span className='text-sm text-muted-foreground'>{textSessionName}</span>
      </div>
      <div className='flex items-center space-x-2'>
        <Timer className='h-5 w-5 text-muted-foreground' />
        <span className='text-sm text-muted-foreground'>
          {textSessionDuration}
        </span>
      </div>
      {textMeetingType ? (
        <div className='flex items-center space-x-2'>
          <IconComponent className='h-5 w-5 text-muted-foreground' />
          <span className='text-sm text-muted-foreground'>
            {textMeetingType}
          </span>
        </div>
      ) : null}
    </div>
  );
}
