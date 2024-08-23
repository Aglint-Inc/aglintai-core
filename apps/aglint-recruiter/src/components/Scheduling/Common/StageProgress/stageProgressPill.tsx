import { Stack } from '@mui/material';
import { type Ref, forwardRef, memo } from 'react';

import { StagePipelineSmall } from '@/devlink3/StagePipelineSmall';

import type { StageProgressProps } from '.';

export type StageProgressPillProps = {
  pillProps: ReturnType<typeof getPlanPillProps>[number];
} & {
  position: 'ending' | 'middle' | 'starting' | 'lone';
};

const StageProgressPill = memo(
  forwardRef(
    (
      // eslint-disable-next-line no-unused-vars
      { position = 'middle', pillProps }: StageProgressPillProps,
      ref: Ref<HTMLDivElement>,
    ) => {
      const isLeft = position !== 'ending' && position !== 'lone';
      const isRight = position !== 'starting' && position !== 'lone';
      return (
        <Stack ref={ref}>
          <StagePipelineSmall
            isRight={isLeft}
            isLeft={isRight}
            color={pillProps.color}
            showText={pillProps.showText}
            textStageName={pillProps.name}
            iconName={pillProps.icon}
          />
        </Stack>
      );
    },
  ),
);
StageProgressPill.displayName = 'StageProgressPill';
export default StageProgressPill;

export const getPlanPillProps = (
  interview_plans: StageProgressProps['interview_plans'],
) => {
  return interview_plans.reduce(
    (acc, curr) => {
      const total = Object.values(curr.status ?? {}).reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0);
      if (curr.status.not_scheduled === total) {
        if (acc.flag) {
          acc.flag = false;
          acc.pills.push({
            color: 'neutral',
            icon: 'not_started',
            showText: true,
            name: curr.name,
          });
        } else
          acc.pills.push({
            color: 'neutral',
            icon: 'brightness_1',
            showText: false,
            name: curr.name,
          });
      } else if (curr.status.completed === total) {
        acc.pills.push({
          color: 'success',
          icon: 'check_circle',
          showText: false,
          name: curr.name,
        });
      } else if (acc.flag) {
        acc.flag = false;
        acc.pills.push({
          color: 'info',
          icon: 'atr',
          showText: true,
          name: curr.name,
        });
      } else
        acc.pills.push({
          color: 'info',
          icon: 'atr',
          showText: false,
          name: curr.name,
        });
      return acc;
    },
    {
      pills: [] as {
        color: string;
        icon: string;
        showText: boolean;
        name: string;
      }[],
      flag: true,
    },
  ).pills;
};
