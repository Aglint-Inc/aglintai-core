import { Button } from '@components/ui/button';
import { cn } from '@lib/utils';
import { Check } from 'lucide-react';

interface DatePickerProps {
  textMonth: string;
  textDate: string;
  textDay: string;
  isActive: boolean;
  isDisable?: boolean;
  onClickDate: () => void;
}

export function DateCard({
  textMonth,
  textDate,
  textDay,
  isActive,
  isDisable,
  onClickDate,
}: DatePickerProps) {
  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
      className={cn(
        'relative flex h-24 min-w-24 flex-col items-center justify-center rounded-lg p-2',
        isDisable && 'cursor-not-allowed opacity-60',
        isActive && 'bg-blue-500 text-white hover:bg-blue-600',
      )}
      onClick={onClickDate}
      disabled={isDisable}
    >
      <span className='text-sm'>{textMonth}</span>
      <span className='text-3xl font-semibold leading-none'>{textDate}</span>
      <span className='text-xs'>{textDay}</span>
      {isActive && (
        <div className='absolute -right-1 -top-1 rounded-full bg-green-500 p-1 opacity-0'>
          <Check className='h-3 w-3 text-white' />
        </div>
      )}
    </Button>
  );
}
