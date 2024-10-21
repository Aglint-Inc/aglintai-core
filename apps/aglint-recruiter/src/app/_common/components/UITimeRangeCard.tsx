import { cn } from '@lib/utils';
import { CircleMinus } from 'lucide-react';

import { UIButton } from '@/components/Common/UIButton';

export function UITimeRangeCard({
  isActive = false,
  textTime,
  isSemiActive = false,
  onClickTime,
  ShowCloseIcon = true,
}: {
  isActive?: boolean;
  textTime: string;
  isSemiActive?: boolean;
  onClickTime?: () => void;
  ShowCloseIcon?: boolean;
}) {
  return (
    <div className='group relative'>
      <UIButton
        variant='outline'
        size='sm'
        className={cn(
          'relative h-10 w-full bg-white text-center',
          isActive && 'border-blue-300 bg-blue-50',
          isSemiActive && 'border-dashed border-blue-300',
        )}
        onClick={onClickTime}
      >
        {textTime}
      </UIButton>
      {ShowCloseIcon && isActive && (
        <span
          onClick={onClickTime}
          className='z-2 absolute -right-2 -top-2 h-4 w-4 rounded-full bg-white opacity-0 transition-opacity group-hover:opacity-100'
        >
          <CircleMinus className='h-4 w-4 text-destructive' />
        </span>
      )}
    </div>
  );
}
