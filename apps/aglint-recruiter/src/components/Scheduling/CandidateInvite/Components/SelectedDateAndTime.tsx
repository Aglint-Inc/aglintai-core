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
    <div className='grid grid-cols-[max-content_1fr] gap-4 items-stretch sm:grid-cols-[max-content_1fr] xs:grid-cols-[max-content]'>
      <div className='flex flex-col justify-center items-center w-[85px] h-[88px] bg-white rounded-md '>
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
