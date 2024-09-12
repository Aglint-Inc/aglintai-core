import React from 'react';

import UITypography from '@/components/Common/UITypography';

const InterviewConfirmed = ({
  textMailSent,
  slotCompanyLogo,
  textDesc,
  slotInterviewConfirmedCard,
  slotButton,
}: {
  textMailSent?: React.ReactNode;
  slotCompanyLogo?: React.ReactNode;
  textDesc?: React.ReactNode;
  slotInterviewConfirmedCard?: React.ReactNode;
  slotButton?: React.ReactNode;
  isBannerVisible?: boolean;
}) => {
  return (
    <div className='relative flex flex-col items-center justify-start  w-full h-screen overflow-auto bg-sand-3'>
      <div className='flex flex-col items-center justify-center max-w-2xl min-w-[760px] p-6 mt-[80px] border border-neutral-300 rounded-lg bg-white'>
        <div className='flex flex-col items-center text-center'>
          {slotCompanyLogo && <div className='mb-4'>{slotCompanyLogo}</div>}
          <UITypography className='text-[18px] font-semibold'>
            Interview Confirmed
          </UITypography>
          <h2 className='text-sm max-w-[500px]'>{textDesc}</h2>
          {textMailSent && (
            <p className='mt-2'>
              Information has sent to{' '}
              <span className='text-red-700'>{textMailSent}</span>
            </p>
          )}
        </div>
        <div className='flex flex-col items-center justify-center w-full mt-4'>
          {slotInterviewConfirmedCard}
        </div>
        {slotButton && <div className='mt-4'>{slotButton}</div>}
      </div>
    </div>
  );
};

export default InterviewConfirmed;
