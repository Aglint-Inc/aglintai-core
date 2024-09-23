import { forwardRef, memo, type Ref } from 'react';

import type { StageProgressProps } from '.';

export type StageProgressPillProps = {
  pillProps: ReturnType<typeof getPlanPillProps>[number];
  isLast: boolean;
  isActive: boolean;
};

const StageProgressPill = memo(
  forwardRef(
    (
      { pillProps, isLast, isActive }: StageProgressPillProps,
      ref: Ref<HTMLDivElement>,
    ) => {
      return (
        <div
          ref={ref}
          className={`relative flex h-8 items-center ${isActive ? 'bg-blue-100' : 'bg-gray-100'} ${isLast ? 'rounded-r-md' : ''} z-1 px-3`}
        >
          <span
            className={`ml-2 block w-fit text-sm ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
          >
            {pillProps.name}
          </span>
          {!isLast && (
            <div
              className={`absolute -right-[10px] top-0 h-0 w-0 border-b-[16px] border-l-[10px] border-t-[16px] border-b-transparent border-t-transparent ${isActive ? 'border-l-blue-100' : 'border-l-gray-100'} z-10`}
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
