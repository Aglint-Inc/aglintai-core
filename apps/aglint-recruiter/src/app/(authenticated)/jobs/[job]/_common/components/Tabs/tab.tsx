'use client';

import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { cn } from '@lib/utils';
import { forwardRef, useEffect, useState } from 'react';

import {
  useApplicationsActions,
  useApplicationsStore,
  useJob,
} from '@/job/hooks';
import type { Application } from '@/types/applications.types';

interface TabProps {
  status: Application['status'];
  isOver: boolean;
  canDrop: boolean;
}

const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ status, isOver, canDrop }, dropRef) => {
    const { job } = useJob();
    const currentStatus = useApplicationsStore((state) => state.status);
    const { setStatus } = useApplicationsActions();
    const [normalize, setNormalize] = useState(false);

    useEffect(() => {
      if (canDrop) {
        const interval = setInterval(() => setNormalize((prev) => !prev), 500);
        return () => {
          clearInterval(interval);
          setNormalize(false);
        };
      }
    }, [canDrop]);

    return (
      <Button
        ref={dropRef}
        onClick={() => setStatus(status)}
        variant='ghost'
        className={cn(
          'relative px-2 py-1',
          'hover:bg-transparent hover:text-foreground',
          'focus-visible:bg-transparent focus-visible:text-foreground focus-visible:ring-0',
          currentStatus === status && 'text-foreground',
          currentStatus === status && 'rounded-none border-b-2 border-primary',
          (normalize || isOver) && 'border border-orange-200 bg-orange-100',
        )}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
        <Badge variant='secondary' className='ml-2'>
          {job?.section_count[status]}
        </Badge>
      </Button>
    );
  },
);

Tab.displayName = 'Tab';

export default Tab;
