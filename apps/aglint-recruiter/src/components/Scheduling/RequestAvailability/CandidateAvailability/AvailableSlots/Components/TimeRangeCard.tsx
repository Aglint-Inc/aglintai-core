import { cn } from '@lib/utils';
import { X } from 'lucide-react';

import { UIButton } from '@/components/Common/UIButton';

export function TimeRangeCard({
  isActive = false,
  textTime,
  isSemiActive = false,
  onClickTime,
}: {
  isActive?: boolean;
  textTime: string;
  isSemiActive?: boolean;
  onClickTime?: () => void;
}) {
  return (
    <div className='relative'>
      <UIButton
        variant='outline'
        className={cn(
          'relative w-full h-10 px-4 py-1 text-center transition-all duration-200 text-black ease-in-out bg-white ',
          isActive && 'border-primary bg-primary/10 text-primary',
          isSemiActive && 'border-dashed border-orange-400  text-black',
        )}
        onClick={onClickTime}
      >
        <span className='relative z-10'>{textTime}</span>
      </UIButton>
      {isActive && (
        <span
          onClick={onClickTime}
          className='absolute z-2 -top-2 -right-2 flex items-center justify-center w-4 h-4 bg-white border border-neutral-300 rounded-full '
        >
          <X className='w-3 h-3 text-neutral-600' />
        </span>
      )}
    </div>
  );
}
