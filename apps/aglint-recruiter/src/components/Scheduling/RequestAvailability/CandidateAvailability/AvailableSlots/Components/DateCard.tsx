import { cn } from '@lib/utils';
import { X } from 'lucide-react';

import { UIButton } from '@/components/Common/UIButton';

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
    <div className='relative inline-block'>
      <UIButton
        variant='outline'
        className={cn(
          'w-[85px] h-[85px] p-2 flex flex-col items-center justify-center rounded-lg',
          isActive && 'border-primary bg-primary/10 text-primary',
          isDisable && 'opacity-60 cursor-not-allowed',
        )}
        onClick={onClickDate}
        disabled={isDisable}
      >
        <span className='text-sm'>{textMonth}</span>
        <span className='text-3xl font-semibold leading-none'>{textDate}</span>
        <span className='text-xs'>{textDay}</span>
      </UIButton>
      {isActive && (
        <UIButton
          onClick={onClickDate}
          size='sm'
          variant='outline'
          className='absolute -top-2 -right-2 h-5 w-5 rounded-full p-0'
        >
          <X className='h-3 w-3' />
        </UIButton>
      )}
    </div>
  );
}