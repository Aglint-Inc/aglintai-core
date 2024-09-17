'use client';

import { UIButton } from '@/components/Common/UIButton';
import UITypography from '@/components/Common/UITypography';

interface SlotComponentProps {
  slotImage: React.ReactNode;
  isShadow?: boolean;
  isReverseShadow?: boolean;
  textName?: string;
  textDesignation?: string;
  textTime?: string;
  isButtonVisible?: boolean;
  onClickResendInvite?: () => void;
  onClickCopyInvite?: () => void;
  isDesignationVisible?: boolean;
  isDetailVisible?: boolean;
  onClickAccept?: () => void;
  onClickDecline?: () => void;
  isAcceptVisible?: boolean;
  isDeclineVisible?: boolean;
  isAcceptDeclineVisibe?: boolean;
  slotMemberDetail?: React.ReactNode | string;
  slotIcon?: React.ReactNode;
}

export function MembersList({
  slotImage,
  isShadow = false,
  isReverseShadow = false,
  textName = 'Brooklyn Simmons (you)',
  textDesignation = 'Decline',
  textTime = '11:30PM - 12:30PM PST',
  isButtonVisible = false,
  onClickResendInvite = () => {},
  onClickCopyInvite = () => {},
  isDesignationVisible = false,
  isDetailVisible = false,
  onClickAccept = () => {},
  onClickDecline = () => {},
  isAcceptVisible = true,
  isDeclineVisible = true,
  isAcceptDeclineVisibe = false,
  slotMemberDetail,
  slotIcon,
}: SlotComponentProps) {
  return (
    <div className='relative flex w-full mt-4 justify-between items-start '>
      <div className='flex justify-start items-start gap-2'>
        <div className='relative'>
          <div className='overflow-hidden w-10 h-10 flex-none rounded-md'>
            {slotImage}
          </div>
          <div className='absolute right-[-3px] bottom-[-2px]'>
            {isShadow && (
              <div className='flex justify-center items-center'>S</div>
            )}
            {isReverseShadow && (
              <div className='flex justify-center items-center'>R</div>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-0'>
          <div className='flex justify-start items-center gap-1'>
            <UITypography variant='p' className='font-semibold' type='small'>
              {textName}
            </UITypography>
            <div>{slotIcon}</div>
          </div>
          <div className='flex flex-col gap-3'>
            {isDesignationVisible && (
              <div>
                <UITypography variant='p' type='small' color='neutral'>
                  {textDesignation}
                </UITypography>
              </div>
            )}
            {isButtonVisible && (
              <div className='flex justify-start items-center gap-3'>
                <div
                  className='flex justify-start items-center gap-1 cursor-pointer'
                  {...onClickResendInvite}
                >
                  {/* SVG content */}
                  <UITypography variant='p' type='small'></UITypography>
                </div>
                <div
                  className='flex justify-start items-center gap-1 cursor-pointer'
                  {...onClickCopyInvite}
                >
                  {/* SVG content */}
                  <UITypography variant='p' type='small'>
                    Booking Link
                  </UITypography>
                </div>
              </div>
            )}
            {isAcceptDeclineVisibe && (
              <div className='flex justify-start items-center gap-3'>
                {isAcceptVisible && (
                  <div {...onClickAccept}>
                    <UIButton size='sm'>Accept</UIButton>
                  </div>
                )}
                {isDeclineVisible && (
                  <div {...onClickDecline}>
                    <UIButton variant='outline' size='sm' color='error'>
                      Decline
                    </UIButton>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <UITypography variant='p' type='small' color='neutral'>
          {textTime}
        </UITypography>
      </div>
      {isDetailVisible && (
        <div className='absolute left-0 top-12 right-0 z-10 flex flex-col gap-3 border border-neutral-6 rounded-md bg-white shadow-md'>
          {slotMemberDetail}
        </div>
      )}
    </div>
  );
}
