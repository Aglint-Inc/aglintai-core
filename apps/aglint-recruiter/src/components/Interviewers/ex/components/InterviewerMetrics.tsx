import React from 'react';

interface InterviewerMetricsProps {
  as?: React.ElementType;
  slotFilter?: React.ReactNode;
  slotMetrics?: React.ReactNode;
  slotFirstGrid?: React.ReactNode;
}

export function InterviewerMetrics({
  as: Component = 'div',
  slotFilter,
  slotMetrics,
  slotFirstGrid,
}: InterviewerMetricsProps) {
  return (
    <Component className='flex h-[calc(100vh-48px)] flex-col items-stretch space-y-4 overflow-auto p-4'>
      <div>{slotFilter}</div>
      <div className='grid grid-cols-2 gap-4'>{slotFirstGrid}</div>
      <div className='flex flex-col space-y-2'>
        <div className='flex flex-col space-y-2'>{slotMetrics}</div>
      </div>
    </Component>
  );
}
