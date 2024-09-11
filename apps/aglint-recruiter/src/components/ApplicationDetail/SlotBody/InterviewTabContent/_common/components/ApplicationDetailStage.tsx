import { Card } from '@components/ui/card';
import { ArrowBigDown } from 'lucide-react';
import React from 'react';

import UITypography from '@/components/Common/UITypography';

interface ApplicantDetailStageProps {
  textName?: React.ReactNode;
  textInterviewCount?: React.ReactNode;
  slotInterviewStageDetail?: React.ReactNode;
  isInterviewStageDetailVisible?: boolean;
  isCountVisible?: boolean;
  slotScheduleButton?: React.ReactNode;
  isScheduleButtonVisible?: boolean;
}

export function ApplicantDetailStage({
  textName = '',
  textInterviewCount = '',
  slotInterviewStageDetail,
  isInterviewStageDetailVisible = true,
  isCountVisible = true,
  slotScheduleButton,
  isScheduleButtonVisible = false,
}: ApplicantDetailStageProps) {
  return (
    <Card className='p-4 justify-between items-center rounded-md bg-neutral-100'>
      <div className='flex h-10 justify-between items-center'>
        <div>
          <UITypography type='medium' fontBold='normal'>
            {textName}
          </UITypography>
        </div>
        {isScheduleButtonVisible && <div>{slotScheduleButton}</div>}
        {isCountVisible && (
          <div className='flex justify-start items-center gap-3'>
            <UITypography type='small' color='neutral'>
              {textInterviewCount}
            </UITypography>
            <div className='hidden w-6 h-6 justify-center items-center rounded-sm bg-white cursor-pointer'>
              <ArrowBigDown size={16} className='text' />
            </div>
          </div>
        )}
      </div>
      {isInterviewStageDetailVisible && (
        <div className='flex flex-col flex-nowrap gap-3 mt-4'>
          {slotInterviewStageDetail}
        </div>
      )}
    </Card>
  );
}
