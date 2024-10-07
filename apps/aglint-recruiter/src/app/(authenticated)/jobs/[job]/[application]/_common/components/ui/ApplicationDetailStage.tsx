import Typography from '@components/typography';
import { Card } from '@components/ui/card';
import { ArrowBigDown } from 'lucide-react';
import React from 'react';

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
    <Card className='rounded-mdbg-muted h-full items-center justify-between p-4'>
      <div className='flex h-10 items-center justify-between'>
        <div>
          <Typography type='medium' fontBold='normal'>
            {textName}
          </Typography>
        </div>
        {isScheduleButtonVisible && <div>{slotScheduleButton}</div>}
        {isCountVisible && (
          <div className='flex items-center justify-start gap-3'>
            <Typography type='small' color='neutral'>
              {textInterviewCount}
            </Typography>
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
