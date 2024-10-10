import { forwardRef, type Ref } from 'react';

import type { Application } from '@/job/types';

import StageProgressPill, { getPlanPillProps } from './stageProgressPill';

export type StageProgressProps = Pick<Application, 'interview_plans'> & {
  currentStep: number;
};

const StageProgress = forwardRef(
  (props: StageProgressProps, ref: Ref<HTMLDivElement>) => {
    const { interview_plans = [], currentStep } = props;
    const count = interview_plans.length;

    const pills = getPlanPillProps(interview_plans).map((pillProps, index) => (
      <StageProgressPill
        key={index}
        pillProps={pillProps}
        isLast={index === count - 1}
        color={
          currentStep === index
            ? 'info'
            : currentStep < index
              ? 'neutral'
              : 'success'
        }
      />
    ));

    return (
      <div ref={ref} className='flex flex-col space-y-2'>
        <div className='flex w-full flex-row items-center overflow-hidden rounded-md shadow-sm'>
          {pills.length ? (
            pills
          ) : (
            <div className='flex w-full items-center'>
              <div className='p-2'>---</div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

StageProgress.displayName = 'StageProgress';
export default StageProgress;
