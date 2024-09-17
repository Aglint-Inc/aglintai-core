import { ScheduleProgress as ScheduleProgressDev } from '@devlink/ScheduleProgress';
import { forwardRef, type Ref } from 'react';

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
      <div ref={ref} className='flex flex-col'>
        <ScheduleProgressDev
          slotScheduleProgressPill={pills.length ? pills : '---'}
        />
      </div>
    );
  },
);
ScheduleProgress.displayName = 'ScheduleProgress';
export default ScheduleProgress;
