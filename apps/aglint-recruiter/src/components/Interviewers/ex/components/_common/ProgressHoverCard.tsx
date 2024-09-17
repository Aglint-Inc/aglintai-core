'use client';

import UITypography from '@/components/Common/UITypography';

interface ProgressHoverCardProps {
  slotInterviewTypeIcon?: React.ReactNode;
  slotScheduleStatus?: React.ReactNode;
  slotMeetingTypeIcon?: React.ReactNode;
  textScheduleName?: string;
  isScheduleDate?: boolean;
  textScheduleDate?: string;
  textDuration?: string;
  textMeetingType?: string;
}

export function ProgressHoverCard({
  slotInterviewTypeIcon,
  textScheduleName = '',
  slotScheduleStatus,
  isScheduleDate = false,
  textScheduleDate = '',
  textDuration = '',
  slotMeetingTypeIcon,
  textMeetingType = '',
}: ProgressHoverCardProps) {
  return (
    <div className='z-4 flex flex-col p-4 bg-white rounded-md'>
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-2'>
          <div>{slotInterviewTypeIcon}</div>
          <UITypography variant='p' type='small'>
            {textScheduleName}
          </UITypography>
        </div>
        <div>{slotScheduleStatus}</div>
      </div>
      {isScheduleDate && (
        <div>
          <UITypography variant='p' type='small'>
            {textScheduleDate}
          </UITypography>
        </div>
      )}
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-2'>
          <div className='flex items-center'>
            {/* Placeholder for Duration Icon */}
          </div>
          <UITypography variant='p' type='small'>
            {textDuration}
          </UITypography>
        </div>
        <div className='flex items-center gap-2'>
          <div>{slotMeetingTypeIcon}</div>
          <UITypography variant='p' type='small'>
            {textMeetingType}
          </UITypography>
        </div>
      </div>
    </div>
  );
}
