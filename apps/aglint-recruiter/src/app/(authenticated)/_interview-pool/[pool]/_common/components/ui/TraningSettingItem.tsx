import { cn } from '@lib/utils';
import React from 'react';

interface TrainingSettingItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  image?: React.ReactNode;
  text?: React.ReactNode;
}

const TrainingSettingItem = React.forwardRef<
  HTMLDivElement,
  TrainingSettingItemProps
>(({ className, image, text, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-2 rounded-md bg-neutral-100 p-2',
        className,
      )}
      {...props}
    >
      {image && <div className='h-5 w-5 rounded'>{image}</div>}
      <p className='text-sm font-normal'>{text}</p>
    </div>
  );
});

TrainingSettingItem.displayName = 'TrainingSettingItem';

export { TrainingSettingItem };
