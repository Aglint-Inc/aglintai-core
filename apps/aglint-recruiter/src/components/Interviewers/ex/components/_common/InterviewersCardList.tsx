import React from 'react';

interface InterviewersCardListProps {
  textName?: React.ReactNode;
  textUpcoming?: React.ReactNode;
  textCompleted?: React.ReactNode;
  textDeclined?: React.ReactNode;
}

export function InterviewersCardList({
  textName = '',
  textUpcoming = '',
  textCompleted = '',
  textDeclined = '',
}: InterviewersCardListProps) {
  return (
    <div className='grid h-14 cursor-pointer grid-cols-[40%_20%_20%_20%] border-b border-[#eaf1f3] bg-white transition-colors duration-200 hover:bg-neutral-100'>
      <div className='p-2 px-4'>
        <div>{textName}</div>
      </div>
      <div className='flex items-center justify-center p-2 px-4'>
        <div>{textUpcoming}</div>
      </div>
      <div className='flex items-center justify-center p-2 px-4'>
        <div>{textCompleted}</div>
      </div>
      <div className='flex items-center justify-center p-2 px-4'>
        <div>{textDeclined}</div>
      </div>
    </div>
  );
}
