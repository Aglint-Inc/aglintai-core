import { Briefcase, ChevronDown, MapPin } from 'lucide-react';

import UITypography from '@/components/Common/UITypography';

type MeetingSlotProps = {
  slotStatus: string | React.ReactNode;
  textTime?: string;
  isTimeVisible?: boolean;
  isOnetoOneVisible?: boolean;
  isPanelIconVisible?: boolean;
  isDebriefIconVisible?: boolean;
  textMeetingTitle?: string;
  textMeetingPlatform?: string;
  slotMeetingIcon?: React.ReactNode;
  isMeetingPlatformVisible?: boolean;
  isDurationVisible?: boolean;
  textDuration?: string;
  isLocationVisible?: boolean;
  textLocation?: string;
  isPhoneCallVisible?: boolean;
  bgColorProps?: React.CSSProperties;
  textJob?: string | React.ReactNode;
  slotMembersList?: React.ReactNode;
  onClickDropdownIocn?: any;
  isMembersListVisible?: boolean;
  isDropdownIconVisible?: boolean;
  slotAvatarWithName?: React.ReactNode;
  isAvatarWithNameVisible?: boolean;
};

export function MyScheduleSubCard({
  slotStatus,
  textTime,
  isTimeVisible,
  isOnetoOneVisible,
  isPanelIconVisible,
  isDebriefIconVisible,
  textMeetingTitle,
  textMeetingPlatform,
  slotMeetingIcon,
  isMeetingPlatformVisible,
  isDurationVisible,
  textDuration,
  isLocationVisible,
  textLocation,
  isPhoneCallVisible,
  bgColorProps,
  textJob,
  slotMembersList,
  onClickDropdownIocn,
  isMembersListVisible,
  isDropdownIconVisible,
  slotAvatarWithName,
  isAvatarWithNameVisible,
}: MeetingSlotProps) {
  return (
    <div className='relative w-full h-full rounded-lg' style={bgColorProps}>
      <div className='flex flex-col justify-start items-stretch w-full h-full p-4 border-[1px] rounded-lg bg-white'>
        <div className='relative z-1 flex justify-between items-start gap-2'>
          <div className='flex justify-start items-start gap-5'>
            <div className='flex flex-col min-w-[148px] gap-2'>
              {isTimeVisible && (
                <div>
                  <UITypography variant='p' type='small'>
                    {textTime}
                  </UITypography>
                </div>
              )}
              <div>{slotStatus}</div>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex justify-start items-center gap-1'>
                {isOnetoOneVisible && (
                  <div className='flex justify-center items-center'>
                    {/* Add your SVG or icon here */}
                  </div>
                )}
                {isPanelIconVisible && (
                  <div className='flex justify-center items-center'>
                    {/* Add your SVG or icon here */}
                  </div>
                )}
                {isDebriefIconVisible && (
                  <div className='flex justify-center items-center'>
                    {/* Add your SVG or icon here */}
                  </div>
                )}
                <UITypography variant='p' type='small'>
                  {textMeetingTitle}
                </UITypography>
              </div>
              {isPhoneCallVisible && (
                <div className='flex items-center gap-1'>
                  <div className='flex justify-center items-center'>
                    {/* Add your SVG or icon here */}
                  </div>
                  <div>Phone Call</div>
                </div>
              )}
              <div className='flex items-center gap-2'>
                {isMeetingPlatformVisible && (
                  <div className='flex items-center gap-1'>
                    <div>{slotMeetingIcon}</div>
                    <UITypography variant='p' type='small'>
                      {textMeetingPlatform}
                    </UITypography>
                  </div>
                )}
                {isDurationVisible && (
                  <div className='flex items-center gap-1'>
                    <div className='flex justify-center items-center'>
                      {/* Add your SVG or icon here */}
                    </div>
                    <UITypography variant='p' type='small'>
                      {textDuration}
                    </UITypography>
                  </div>
                )}
              </div>
              {isLocationVisible && (
                <div className='flex items-center gap-1'>
                  <div className='flex justify-center items-center'>
                    <MapPin size={14} />
                  </div>
                  <div>{textLocation}</div>
                </div>
              )}
              <div className='flex items-center gap-3'>
                <div className='flex items-center gap-1'>
                  <div className='flex justify-center items-center'>
                    <Briefcase size={14} />
                  </div>
                  <UITypography variant='p' type='small'>
                    {textJob}
                  </UITypography>
                </div>
                {isAvatarWithNameVisible && <div>{slotAvatarWithName}</div>}
              </div>
            </div>
          </div>
          {isDropdownIconVisible && (
            <div
              className='flex justify-center items-center w-6 h-6 rounded cursor-pointer hover:bg-neutral-300'
              onClick={onClickDropdownIocn}
            >
              <ChevronDown size={14} />
            </div>
          )}
        </div>
        {isMembersListVisible && (
          <div className='flex flex-col gap-2 mt-2'>{slotMembersList}</div>
        )}
      </div>
    </div>
  );
}
