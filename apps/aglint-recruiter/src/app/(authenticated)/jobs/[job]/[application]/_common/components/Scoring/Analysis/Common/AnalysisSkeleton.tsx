import React from 'react';

interface AnalysisSkeletonProps {
  slotSkeleton?: React.ReactNode;
}

export function AnalysisSkeleton({ slotSkeleton }: AnalysisSkeletonProps) {
  return (
    <div className='flex flex-col gap-1'>
      <div className='flex items-center gap-2'>
        <div className='relative h-5 w-full overflow-hidden rounded-sm'>
          {slotSkeleton}
        </div>
        <div className='relative h-5 w-12 overflow-hidden rounded-sm'>
          {slotSkeleton}
        </div>
      </div>
      <div className='relative h-4 w-4/5 overflow-hidden rounded-sm'>
        {slotSkeleton}
      </div>
      <div className='relative h-4 w-11/12 overflow-hidden rounded-sm'>
        {slotSkeleton}
      </div>
      <div className='relative h-4 w-2/5 overflow-hidden rounded-sm'>
        {slotSkeleton}
      </div>
    </div>
  );
}
