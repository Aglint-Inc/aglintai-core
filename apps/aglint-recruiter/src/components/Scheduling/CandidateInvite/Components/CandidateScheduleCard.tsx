import { Card, CardContent } from '@components/ui/card';
import { cn } from '@lib/utils';
import { Clock } from 'lucide-react';

export function CandidateScheduleCard({
  textDay = 'Day2',
  textDuration = '2 hour 45 Minutes',
  isTitle = true,
  isSlotButtonVisible = true,
  isSelected = false,
  slotButton,
  slotSessionInfo,
  onClickCard,
}: {
  textDay?: string;
  textDuration?: string;
  isTitle?: boolean;
  isSlotButtonVisible?: boolean;
  isSelected?: boolean;
  slotButton?: React.ReactNode;
  slotSessionInfo?: React.ReactNode;
  onClickCard?: () => void;
}) {
  return (
    <Card
      className={cn('relative overflow-hidden', isSelected && 'bg-neutral-100')}
      onClick={onClickCard}
    >
      <CardContent className='space-y-4 p-4'>
        {isTitle && (
          <div className='flex items-center justify-between'>
            <span className='font-medium text-blue-600'>{textDay}</span>
          </div>
        )}
        <div className='flex items-center justify-start space-x-4'>
          <span className='text-neutral-600'>Total Duration</span>
          <div className='flex items-center space-x-2'>
            <Clock className='h-4 w-4 text-neutral-500' />
            <span>{textDuration}</span>
          </div>
        </div>
        {isSlotButtonVisible && (
          <div className='absolute right-3 top-3'>{slotButton}</div>
        )}
        {isSelected && (
          <div className='absolute inset-0 flex items-start justify-end bg-neutral-100 p-4'>
            {slotButton}
          </div>
        )}
        <div className='space-y-2'>
          {slotSessionInfo || (
            <>
              <SessionInfo />
              <SessionInfo />
              <SessionInfo />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
function SessionInfo() {
  return (
    <div className='rounded bg-gray-100 p-2'>Session Info Placeholder</div>
  );
}
