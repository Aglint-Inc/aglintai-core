import React from 'react';

interface InterviewerTrainingListProps {
  as?: React.ElementType;
  slotImage?: React.ReactNode;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  slotInterviewPool?: React.ReactNode;
  slotTrainingProgress?: React.ReactNode;
}

export function InterviewerTrainingList({
  as: Component = 'div',
  slotImage,
  textName = 'Floyd Miles',
  textRole = 'Software developer',
  slotInterviewPool,
  slotTrainingProgress,
}: InterviewerTrainingListProps) {
  return (
    <Component className='grid grid-cols-[300px_257px_1fr] bg-white'>
      <div className='flex items-center gap-2 p-2 px-3'>
        <div className='rounded-md'>{slotImage}</div>
        <div>
          <p className='text-sm font-normal'>{textName}</p>
          <p className='text-sm font-normal text-neutral-500'>{textRole}</p>
        </div>
      </div>
      <div className='flex items-center gap-2 p-2 px-3'>
        {slotInterviewPool}
      </div>
      <div className='flex items-center gap-2 p-2 px-3'>
        {slotTrainingProgress}
      </div>
    </Component>
  );
}
