import { CardContent } from '@components/ui/card';
import React from 'react';

interface InterviewLoadCardProps {
  as?: React.ElementType;
  textHeading?: React.ReactNode;
  textInterviewCounts?: React.ReactNode;
  textLabel?: React.ReactNode;
}

export function InterviewLoadCard({
  textHeading = '',
  textInterviewCounts = '',
  textLabel = '',
}: InterviewLoadCardProps) {
  return (
    <div className='flex flex-col justify-center h-15 p-3 rounded-md bg-neutral-100'>
      <CardContent className='p-0'>
        <p className='text-sm text-neutral-600'>{textHeading}</p>
        <div className='flex items-center gap-1'>
          <p className='text-base font-semibold'>{textInterviewCounts}</p>
          <p className='text-sm text-neutral-600'>{textLabel}</p>
        </div>
      </CardContent>
    </div>
  );
}
