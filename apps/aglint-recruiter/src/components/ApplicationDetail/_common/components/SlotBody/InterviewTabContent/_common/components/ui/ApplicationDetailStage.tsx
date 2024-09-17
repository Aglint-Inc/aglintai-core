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
    <Card className='items-center justify-between rounded-md bg-neutral-100 p-4'>
      <div className='flex h-10 items-center justify-between'>
        <div>
          <UITypography type='medium' fontBold='normal'>
            {textName}
          </UITypography>
        </div>
        {isScheduleButtonVisible && <div>{slotScheduleButton}</div>}
        {isCountVisible && (
          <div className='flex items-center justify-start gap-3'>
            <UITypography type='small' color='neutral'>
              {textInterviewCount}
            </UITypography>
            <div className='hidden h-6 w-6 cursor-pointer items-center justify-center rounded-sm bg-white'>
              <ArrowBigDown size={16} className='text' />
            </div>
          </div>
        )}
      </div>
      {isInterviewStageDetailVisible && (
        <div className='mt-4 flex flex-col flex-nowrap gap-3'>
          {slotInterviewStageDetail}
        </div>
      )}
    </Card>
  );
}
