import { Stack } from '@mui/system';
import { type Ref, forwardRef } from 'react';

import { ScheduleProgress as ScheduleProgressDev } from '@/devlink/ScheduleProgress';

import ScheduleProgressPill, {
  type ScheduleProgressPillProps,
} from './ScheduleProgressPillComp';

type ScheduleProgressProps = {
  sessions: Omit<ScheduleProgressPillProps, 'position'>[];
};

const ScheduleProgress = forwardRef(
  (props: ScheduleProgressProps, ref: Ref<HTMLDivElement>) => {
    const count = props.sessions.length;
    const pills = props.sessions.map((session, index) => (
      <ScheduleProgressPill
        key={index}
        position={
          count === 1
            ? 'lone'
            : index === 0
              ? 'starting'
              : index === count - 1
                ? 'ending'
                : 'middle'
        }
        {...session}
      />
    ));
    return (
      <Stack ref={ref}>
        <ScheduleProgressDev
          slotScheduleProgressPill={pills.length ? pills : '---'}
        />
      </Stack>
    );
  },
);
ScheduleProgress.displayName = 'ScheduleProgress';
export default ScheduleProgress;
