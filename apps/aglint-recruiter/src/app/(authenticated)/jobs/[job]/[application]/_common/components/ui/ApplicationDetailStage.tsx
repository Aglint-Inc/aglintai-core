import Typography from '@components/typography';
import { Card } from '@components/ui/card';
import { ScrollArea } from '@components/ui/scroll-area';
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
    <ScrollArea className=' h-[calc(100vh-250px)] bg-muted border rounded-md'>
    <Card className='rounded-md shadow-none border-none items-center justify-between p-2  bg-muted'>
      <div className='flex h-10 items-center justify-between'>
        <div className='flex items-end gap-1'>
          <Typography type='medium' fontBold='default'>
            {textName}
          </Typography>
          <Typography type='small' className='text-muted-foreground'>
             ({textInterviewCount})
            </Typography>
        </div>
        {isScheduleButtonVisible && <div>{slotScheduleButton}</div>}
        {isCountVisible && (
          <div className='flex items-center justify-start gap-3'>
            <div className='hidden h-6 w-6 cursor-pointer items-center justify-center rounded-sm bg-white'>
              <ArrowBigDown size={16} className='text' />
            </div>
          </div>
        )}
      </div>
      {isInterviewStageDetailVisible && (
        <div className='mt-2 flex flex-col flex-nowrap gap-3'>
          {slotInterviewStageDetail}
        </div>
      )}
    </Card>
    </ScrollArea>
  );
}
