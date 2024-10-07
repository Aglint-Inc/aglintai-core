import Typography from '@components/typography';
import { Clock, SquareUser } from 'lucide-react';

import { UIButton } from '@/components/Common/UIButton';

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
}: {
  as?: string;
  textDate: string;
  textTime: string;
  textPanel: string;
  slotMeetingIcon: React.ReactNode;
  textPlatformName: string;
  textDuration: string;
  onClickJoinGoogleMeet?: () => void;
  onClickAddCalendar?: () => void;
  isJoinMeetingButtonVisible?: boolean;
  isAddtoCalenderVisible?: boolean;
}) {
  return (
    <div className='0 my-2 flex w-[700px] justify-between rounded border border-neutral-300 bg-white p-4 transition-colors duration-200'>
      <div className='flex flex-col justify-between'>
        <div className='flex items-center space-x-4'>
          <Typography className='font-semibold' variant='p' type='small'>
            {textDate}
          </Typography>
          <Typography variant='p' type='small'>
            {textTime}
          </Typography>
        </div>
        <div className='flex items-center space-x-1'>
          <SquareUser size={18} strokeWidth={1} />
          <Typography variant='p' type='small'>
            {textPanel}
          </Typography>
        </div>
        <div className='flex gap-3'>
          <div className='flex items-center gap-1'>
            {slotMeetingIcon}
            <Typography variant='p' type='small'>
              {textPlatformName}
            </Typography>
          </div>
          <div className='flex items-center gap-1'>
            <Clock size={16} strokeWidth={1} />
            <Typography variant='p' type='small'>
              {textDuration}
            </Typography>
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
