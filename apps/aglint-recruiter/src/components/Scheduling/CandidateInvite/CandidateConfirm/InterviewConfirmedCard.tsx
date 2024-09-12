import { Clock, SquareUser } from 'lucide-react';

import { UIButton } from '@/components/Common/UIButton';
import UITypography from '@/components/Common/UITypography';

export function InterviewConfirmedCard({
  as: _Component = '', // Default to div
  textDate = '',
  textTime = '',
  textPanel = '',
  slotMeetingIcon,
  textPlatformName = '',
  textDuration = '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClickJoinGoogleMeet = () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClickAddCalendar = () => {},
  isJoinMeetingButtonVisible = true,
  isAddtoCalenderVisible = true,
}) {
  return (
    <div className='flex justify-between p-4 border my-2 w-[700px]  border-neutral-300 rounded bg-white transition-colors duration-200 0'>
      <div className='flex flex-col justify-between '>
        <div className='flex items-center space-x-4'>
          <UITypography className='font-semibold' variant='p' type='small'>
            {textDate}
          </UITypography>
          <UITypography variant='p' type='small'>
            {textTime}
          </UITypography>
        </div>
        <div className='flex items-center space-x-1'>
          <SquareUser size={18} strokeWidth={1} />
          <UITypography variant='p' type='small'>
            {textPanel}
          </UITypography>
        </div>
        <div className='flex gap-3'>
          <div className='flex items-center gap-1'>
            {slotMeetingIcon}
            <UITypography variant='p' type='small'>
              {textPlatformName}
            </UITypography>
          </div>
          <div className='flex items-center gap-1 '>
            <Clock size={16} strokeWidth={1} />
            <UITypography variant='p' type='small'>
              {textDuration}
            </UITypography>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        {isJoinMeetingButtonVisible && (
          <UIButton onClick={onClickJoinGoogleMeet} variant='secondary'>
            Join with Google Meet
          </UIButton>
        )}
        {isAddtoCalenderVisible && (
          <UIButton onClick={onClickAddCalendar} variant='secondary'>
            Add to Calendar
          </UIButton>
        )}
      </div>
    </div>
  );
}
