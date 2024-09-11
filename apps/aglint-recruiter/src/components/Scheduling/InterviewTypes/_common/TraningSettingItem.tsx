import React from 'react';

import { cn } from '@/utils/shadcn';

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
        'flex items-center gap-2 p-2 rounded-md bg-neutral-100',
        className,
      )}
      {...props}
    >
      {image && <div className='w-5 h-5 rounded'>{image}</div>}
      <p className='text-sm font-normal'>{text}</p>
    </div>
  );
});

TrainingSettingItem.displayName = 'TrainingSettingItem';

export { TrainingSettingItem };
