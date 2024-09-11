'use client';

import React from 'react';

interface InterviewStageProps {
  slotPipelineTab?: React.ReactNode;
  slotInterviewStage?: React.ReactNode;
}

export function InterviewStage({
  slotPipelineTab,
  slotInterviewStage,
}: InterviewStageProps) {
  return (
    <div className='grid grid-cols-[0.4fr_1fr] gap-4 p-0'>
      <div className='flex flex-col gap-2.5 relative z-[1]'>
        {slotPipelineTab}
      </div>
      <div className='rounded-md bg-neutral-100 p-0'>{slotInterviewStage}</div>
    </div>
  );
}
