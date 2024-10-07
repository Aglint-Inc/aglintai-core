import React from 'react';

const InterviewConfirmed = ({
  slotInterviewConfirmedCard,
  slotButton,
}: {
  slotInterviewConfirmedCard?: React.ReactNode;
  slotButton?: React.ReactNode;
}) => {
  return (
    <div className='relative flex w-full flex-col items-center justify-start overflow-auto'>
      <div className='flex min-w-[760px] max-w-2xl flex-col items-center justify-center'>
        <div className='mt-4 flex w-full flex-col items-center justify-center'>
          {slotInterviewConfirmedCard}
        </div>
        {slotButton && <div className='mt-4'>{slotButton}</div>}
      </div>
    </div>
  );
};

export default InterviewConfirmed;
