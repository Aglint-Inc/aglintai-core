import Typography from '@components/typography';
import React from 'react';

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
    <div className='bg-sand-3 relative flex h-screen w-full flex-col items-center justify-start overflow-auto'>
      <div className='mt-[80px] flex min-w-[760px] max-w-2xl flex-col items-center justify-center rounded-lg border border-neutral-300 bg-white p-6'>
        <div className='flex flex-col items-center text-center'>
          {slotCompanyLogo && <div className='mb-4'>{slotCompanyLogo}</div>}
          <Typography className='text-[18px] font-semibold'>
            Interview Confirmed
          </Typography>
          <h2 className='max-w-[500px] text-sm'>{textDesc}</h2>
          {textMailSent && (
            <p className='mt-2'>
              Information has sent to{' '}
              <span className='text-red-700'>{textMailSent}</span>
            </p>
          )}
        </div>
        <div className='mt-4 flex w-full flex-col items-center justify-center'>
          {slotInterviewConfirmedCard}
        </div>
        {slotButton && <div className='mt-4'>{slotButton}</div>}
      </div>
    </div>
  );
};

export default InterviewConfirmed;
