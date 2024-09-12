import { Calendar } from 'lucide-react';
import React from 'react';

interface AllInterviewEmptyProps {
  textDynamic?: string;
}

export function AllInterviewEmpty({
  textDynamic = 'No schedule found',
}: AllInterviewEmptyProps) {
  return (
    <div className='flex flex-col items-center justify-center w-full h-[300px] p-4'>
      <div className='flex flex-col items-center space-y-4'>
        <div className='rounded-full bg-gray-100 p-3'>
          <Calendar className='w-10 h-10 text-gray-500' />
        </div>
        <p className='text-sm text-gray-500'>{textDynamic}</p>
      </div>
    </div>
  );
}
