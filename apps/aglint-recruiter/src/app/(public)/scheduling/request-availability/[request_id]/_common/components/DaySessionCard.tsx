import {
  type DatabaseTable,
  type InterviewSessionTypeDB,
} from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import { Button } from '@components/ui/button';
import { CheckCircle, MapPin, Timer, Users } from 'lucide-react';

import { ShowCode } from '@/components/Common/ShowCode';
import { UIBadge } from '@/components/Common/UIBadge';
import { UIButton } from '@/components/Common/UIButton';

import { useRequestAvailabilityContext } from '../contexts/RequestAvailabilityContext';
import { convertMinutesToHoursAndMinutes } from '../utils';

function DaySessionCard({
  showDayCount = true,
  cardIndex,
  totalSessionMinutes,
  sessions,
  dates,
}: {
  showDayCount?: boolean;
  cardIndex: number;
  totalSessionMinutes: number;
  sessions: InterviewSessionTypeDB[];
  dates: NonNullable<
    DatabaseTable['candidate_request_availability']['slots']
  >[number]['dates'];
}) {
  const { setOpenDaySlotPopup, daySlots, isSubmitted } =
    useRequestAvailabilityContext();
  const handleOpen = async (day: number) => {
    setOpenDaySlotPopup(day);
  };

  return (
    <>
      <MultiDayCard
        textDayCount={showDayCount ? `Day ${cardIndex + 1}` : ''}
        isSelected={
          daySlots.length
            ? daySlots.map((ele) => ele.round).includes(cardIndex + 1)
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
        slotPickDateButton={
          <ShowCode>
            <ShowCode.When
              isTrue={
                (daySlots.map((ele) => ele.round).includes(cardIndex) ||
                  cardIndex < 1) &&
                !daySlots.map((ele) => ele.round).includes(cardIndex + 1)
              }
            >
              <Button
                variant='secondary'
                size='sm'
                onClick={() => handleOpen(cardIndex + 1)}
              >
                Pick Slots
              </Button>
            </ShowCode.When>
          </ShowCode>
        }
        slotChangeButton={
          <ShowCode>
            <ShowCode.When
              isTrue={
                !isSubmitted && daySlots.length
                  ? daySlots.map((ele) => ele.round).includes(cardIndex + 1)
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

        slotSelected={
          dates.length &&
          dates.map((ele, i) => {
            return (
              <SelectedSlot
                textDate={dayjsLocal(ele.curr_day).format('DD MMMM YYYY')}
                slotBadge={ele.slots.map((slot, i) => {
                  return (
                    <UIBadge
                      iconName={null}
                      color={isSubmitted ? 'success' : 'warning'}
                      key={i}
                      className='text-black'
                      textBadge={`${dayjsLocal(slot.startTime).format('hh:mm A')} - ${dayjsLocal(slot.endTime).format('hh:mm A')}`}
                    />
                  );
                })}
                key={i}
              />
            );
          })
        }
      />
    </>
  );
}

export default DaySessionCard;

interface MultiDayCardCardProps {
  textDayCount: string;
  isSelected: boolean;
  textTotalDuration: string;
  slotSessionInfo: React.ReactNode;
  slotPickDateButton: React.ReactNode;
  slotChangeButton: React.ReactNode;
  textSelectedSlots: string;
  slotSelected: React.ReactNode;
}

export function MultiDayCard({
  textDayCount,
  isSelected,
  textTotalDuration,
  slotSessionInfo,
  slotPickDateButton,
  slotChangeButton,
  textSelectedSlots,
  slotSelected,
}: MultiDayCardCardProps) {
  return (
    <div className='w-full rounded-lg border border-neutral-200'>
      <div className='space-y-4 p-4'>
        <div className='flex items-start justify-between'>
          <div>
            <h1 className='mb-2 text-black'>{textDayCount}</h1>
            <div className='flex items-center space-x-2 text-sm text-neutral-600'>
              <Timer className='h-5 w-5 text-neutral-500' />
              <span>Total Duration: {textTotalDuration}</span>
            </div>
          </div>
          <div>{slotPickDateButton}</div>
        </div>
        <div className='space-y-2'>{slotSessionInfo}</div>
      </div>
      {isSelected ? (
        <>
          <hr className='border-t border-neutral-200' />
          <div className='space-y-4 p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <CheckCircle className='h-4 w-4 text-green-800' />
                <span className='text-sm text-neutral-600'>
                  {textSelectedSlots}
                </span>
              </div>
              {slotChangeButton}
            </div>
            <div className='flex flex-col'>{slotSelected}</div>
          </div>
        </>
      ) : null}
    </div>
  );
}
export function SelectedSlot({
  textDate,
  slotBadge,
}: {
  textDate: string;
  slotBadge: React.ReactNode;
}) {
  return (
    <div className='mb-4 flex w-full flex-row gap-4'>
      <div className='flex flex-col items-start gap-2'>
        {/* <Calendar className='h-4 w-4 text-muted-foreground' /> */}
        <span className='text-sm font-medium text-gray-700'>{textDate}</span>
        <div className='flex flex-wrap gap-1'>{slotBadge}</div>
      </div>
    </div>
  );
}
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
        <Users className='h-5 w-5 text-neutral-500' />
        <span className='text-sm text-neutral-700'>{textSessionName}</span>
      </div>
      <div className='flex items-center space-x-2'>
        <Timer className='h-5 w-5 text-neutral-500' />
        <span className='text-sm text-neutral-700'>{textSessionDuration}</span>
      </div>
      {textMeetingType ? (
        <div className='flex items-center space-x-2'>
          <IconComponent className='h-5 w-5 text-neutral-500' />
          <span className='text-sm text-neutral-700'>{textMeetingType}</span>
        </div>
      ) : null}
    </div>
  );
}
