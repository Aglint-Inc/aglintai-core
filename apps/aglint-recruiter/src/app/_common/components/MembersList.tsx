'use client';

import Typography from '@components/typography';

import { UIButton } from '@/components/Common/UIButton';

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
    <div className='relative mt-4 flex w-full items-start justify-between'>
      <div className='flex items-start justify-start gap-2'>
        <div className='relative'>
          <div className='h-10 w-10 flex-none overflow-hidden rounded-md'>
            {slotImage}
          </div>
          <div className='absolute bottom-[-2px] right-[-3px]'>
            {isShadow && (
              <div className='flex items-center justify-center'>S</div>
            )}
            {isReverseShadow && (
              <div className='flex items-center justify-center'>R</div>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-0'>
          <div className='flex items-center justify-start gap-1'>
            <Typography variant='p' className='font-semibold' type='small'>
              {textName}
            </Typography>
            <div>{slotIcon}</div>
          </div>
          <div className='flex flex-col gap-3'>
            {isDesignationVisible && (
              <div>
                <Typography variant='p' type='small' color='neutral'>
                  {textDesignation}
                </Typography>
              </div>
            )}
            {isButtonVisible && (
              <div className='flex items-center justify-start gap-3'>
                <div
                  className='flex cursor-pointer items-center justify-start gap-1'
                  {...onClickResendInvite}
                >
                  {/* SVG content */}
                  <Typography variant='p' type='small'></Typography>
                </div>
                <div
                  className='flex cursor-pointer items-center justify-start gap-1'
                  {...onClickCopyInvite}
                >
                  {/* SVG content */}
                  <Typography variant='p' type='small'>
                    Booking Link
                  </Typography>
                </div>
              </div>
            )}
            {isAcceptDeclineVisibe && (
              <div className='flex items-center justify-start gap-3'>
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
        <Typography variant='p' type='small' color='neutral'>
          {textTime}
        </Typography>
      </div>
      {isDetailVisible && (
        <div className='border-neutral-6 absolute left-0 right-0 top-12 z-10 flex flex-col gap-3 rounded-md border bg-white shadow-md'>
          {slotMemberDetail}
        </div>
      )}
    </div>
  );
}
