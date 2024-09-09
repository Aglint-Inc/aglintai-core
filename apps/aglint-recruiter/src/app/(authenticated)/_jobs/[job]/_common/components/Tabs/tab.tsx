/* eslint-disable security/detect-object-injection */
import { NewTabPill } from '@devlink3/NewTabPill';
import { capitalize, Stack } from '@mui/material';
import { type Ref, forwardRef, useEffect, useState } from 'react';

import { useApplications, useJob } from '@/job/hooks';
import type { Application } from '@/types/applications.types';

const Tab = forwardRef(
  (
    {
      status,
      isOver,
      canDrop,
    }: { status: Application['status']; isOver: boolean; canDrop: boolean },
    dropRef: Ref<HTMLDivElement>,
  ) => {
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
      <Stack
        ref={dropRef}
        onClick={() => setSection(status)}
        style={{ position: 'relative', cursor: 'pointer' }}
      >
        <NewTabPill
          isPillActive={section === status}
          isTabCountVisible={true}
          textLabel={`${capitalize(status)}`}
          tabCount={`${job.section_count[status]}`}
        />
        <Stack
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: 'calc(100% + 2px)',
            background:
              normalize || isOver ? 'rgba(255,223,181,0.2)' : 'transparent',
            border:
              normalize || isOver
                ? '1px solid rgba(206,83,12,0.1)'
                : 'transparent',
            transition: '0.5s',
          }}
        />
      </Stack>
    );
  },
);
Tab.displayName = 'Tab';

export default Tab;
