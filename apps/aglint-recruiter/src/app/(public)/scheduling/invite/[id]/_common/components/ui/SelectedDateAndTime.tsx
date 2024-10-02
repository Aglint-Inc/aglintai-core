import React from 'react';

export function SelectedDateAndTime({
  textMonth,
  textDate,
  textDay,
  slotSessionAndTime,
}: {
  textMonth: string;
  textDate: string;
  textDay: string;
  slotSessionAndTime: React.ReactNode;
}) {
  return (
    <div className='xs:grid-cols-[max-content] grid grid-cols-[max-content_1fr] items-stretch gap-4 sm:grid-cols-[max-content_1fr]'>
      <div className='flex h-[88px] w-[85px] flex-col items-center justify-center rounded-md bg-white'>
        <p className='text-sm'>{textMonth}</p>
        <p className='text-2xl font-bold'>{textDate}</p>
        <p className='text-sm'>{textDay}</p>
      </div>
      <div className='flex flex-col justify-center gap-4'>
        {slotSessionAndTime}
      </div>
    </div>
  );
}
