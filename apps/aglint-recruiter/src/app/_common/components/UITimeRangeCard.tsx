import { cn } from '@lib/utils';
import { X } from 'lucide-react';

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
    <div className='relative'>
      <UIButton
        variant='outline'
        className={cn(
          'relative h-10 w-full bg-white px-4 py-1 text-center text-black transition-all duration-200 ease-in-out',
          isActive && 'border-primary bg-primary/10 text-primary',
          isSemiActive && 'border-dashed border-orange-400 text-black',
        )}
        onClick={onClickTime}
      >
        <span className='relative z-10'>{textTime}</span>
      </UIButton>
      {ShowCloseIcon && isActive && (
        <span
          onClick={onClickTime}
          className='z-2 absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full border border-neutral-300 bg-white'
        >
          <X className='h-3 w-3 text-muted-foreground' />
        </span>
      )}
    </div>
  );
}
