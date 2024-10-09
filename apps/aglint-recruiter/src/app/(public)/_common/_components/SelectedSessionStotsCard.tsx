import { type DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import { cn } from '@lib/utils';
import { CheckCircle, Timer } from 'lucide-react';

import { UIBadge } from '@/common/UIBadge';

export function SelectedSessionSlotsCard({
  textDayCount,
  isSelected,
  textTotalDuration,
  slotSessionInfo,
  slotChangeButton,
  textSelectedSlots,
  selectedDates,
  isSubmitted,
  isActive,
}: {
  textDayCount: string;
  isSelected: boolean;
  textTotalDuration: string;
  slotSessionInfo: React.ReactNode;
  slotChangeButton: React.ReactNode;
  textSelectedSlots: string;
  selectedDates: NonNullable<
    DatabaseTable['candidate_request_availability']['slots']
  >[number]['dates'];
  isSubmitted: boolean;
  isActive: boolean;
}) {
  return (
    <div
      className={cn('rounded-lg border', {
        'border-blue-500': isActive,
      })}
    >
      <div className='w-full'>
        <div className='space-y-4 p-4'>
          <div className='flex items-start justify-between'>
            <div>
              <h1 className='mb-2 text-black'>{textDayCount}</h1>
              <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
                <Timer className='h-5 w-5 text-muted-foreground' />
                <span>Total Duration: {textTotalDuration}</span>
              </div>
            </div>
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
                  <span className='text-sm text-muted-foreground'>
                    {textSelectedSlots}
                  </span>
                </div>
                {slotChangeButton}
              </div>
              <div className='flex flex-col'>
                {selectedDates.map((ele, i) => {
                  return (
                    <SelectedSlot
                      key={i}
                      textDate={dayjsLocal(ele.curr_day).format('DD MMMM YYYY')}
                      slotBadge={ele.slots.map((slot, i) => {
                        return (
                          <UIBadge
                            color={isSubmitted ? 'success' : 'warning'}
                            key={i}
                            textBadge={`${dayjsLocal(slot.startTime).format('hh:mm A')} - ${dayjsLocal(slot.endTime).format('hh:mm A')}`}
                          />
                        );
                      })}
                    />
                  );
                })}
              </div>
            </div>
          </>
        ) : null}
      </div>
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
