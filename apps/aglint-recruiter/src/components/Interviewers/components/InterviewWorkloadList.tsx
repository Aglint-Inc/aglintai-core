import React from 'react';

interface InterviewWorkloadListProps {
  as?: React.ElementType;
  slotWorkloadGraph?: React.ReactNode;
  slotImage?: React.ReactNode;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
}

export function InterviewWorkloadList({
  slotWorkloadGraph,
  slotImage,
  textName = 'Floyd Miles',
  textRole = 'Software developer',
}: InterviewWorkloadListProps) {
  return (
    <div className='grid grid-cols-[300px_1fr] bg-white'>
      <div className='flex items-center gap-2 p-2 px-3'>
        {slotImage}
        <div>
          <p className='text-sm font-medium'>{textName}</p>
          <p className='text-sm text-muted-foreground'>{textRole}</p>
        </div>
      </div>
      <div className='flex items-center p-2 px-3'>{slotWorkloadGraph}</div>
    </div>
  );
}
