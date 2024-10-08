import { forwardRef, memo, type Ref } from 'react';

import type { StageProgressProps } from '.';

type StageProgressPillProps = {
  pillProps: ReturnType<typeof getPlanPillProps>[number];
  isLast: boolean;
  color: 'info' | 'neutral' | 'success';
};

const statusColors = {
  neutral: {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    border: 'border-l-gray-100',
  },
  info: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-l-blue-100',
  },
  success: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-l-green-100',
  },
};

const StageProgressPill = memo(
  forwardRef(
    (
      { pillProps, isLast, color }: StageProgressPillProps,
      ref: Ref<HTMLDivElement>,
    ) => {
      return (
        <div
          ref={ref}
          className={`relative flex h-8 items-center ${statusColors[color].bg} ${isLast ? 'rounded-r-md' : ''} z-1 px-3`}
        >
          <span
            className={`ml-2 block w-fit text-sm ${statusColors[color].text}`}
          >
            {pillProps.name}
          </span>
          {!isLast && (
            <div
              className={`absolute -right-[10px] top-0 h-0 w-0 border-b-[16px] border-l-[10px] border-t-[16px] border-b-transparent border-t-transparent ${statusColors[color].border} border-1-gray-800 z-10`}
            />
          )}
        </div>
      );
    },
  ),
);

export const getPlanPillProps = (
  interview_plans: StageProgressProps['interview_plans'],
) => {
  return interview_plans.map((plan, index) => ({
    step: index + 1,
    name: plan.name,
  }));
};

StageProgressPill.displayName = 'StageProgressPill';
export default StageProgressPill;
