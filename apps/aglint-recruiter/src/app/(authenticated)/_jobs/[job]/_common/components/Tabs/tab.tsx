'use client';

import { forwardRef, type Ref, useEffect, useState } from 'react';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { cn } from '@lib/utils';
import { useApplications, useJob } from '@/job/hooks';
import type { Application } from '@/types/applications.types';

interface TabProps {
  status: Application['status'];
  isOver: boolean;
  canDrop: boolean;
}

const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ status, isOver, canDrop }, dropRef) => {
    const { job } = useJob();
    const { section, setSection } = useApplications();
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
        onClick={() => setSection(status)}
        variant="ghost"
        className={cn(
          'relative px-2 py-1',
          'hover:bg-transparent hover:text-foreground',
          'focus-visible:bg-transparent focus-visible:text-foreground focus-visible:ring-0',
          section === status && 'text-foreground',
          section === status && 'border-b-2 border-primary rounded-none',
          (normalize || isOver) && 'bg-orange-100 border border-orange-200'
        )}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
        <Badge variant="secondary" className="ml-2">
          {job.section_count[status]}
        </Badge>
      </Button>
    );
  },
);

Tab.displayName = 'Tab';

export default Tab;
