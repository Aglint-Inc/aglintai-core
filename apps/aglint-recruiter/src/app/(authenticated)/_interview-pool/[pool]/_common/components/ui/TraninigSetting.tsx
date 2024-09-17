import { Card, CardContent } from '@components/ui/card';
import React from 'react';

interface TrainingSettingProps {
  slotButton: React.ReactNode;
  textHeading?: string;
  textShadow?: string;
  textReverseShadow?: string;
  slotApproval?: React.ReactNode;
  isEnable?: boolean;
  isDisable?: boolean;
  isApprovalVisible?: boolean;
}

export function TrainingSetting({
  slotButton,
  textHeading = 'Training is enabled for this module',
  textShadow = 'This is a global text component',
  textReverseShadow = 'This is a global text component',
  slotApproval,
  isEnable = true,
  isDisable = false,
  isApprovalVisible = true,
}: TrainingSettingProps) {
  return (
    <Card className='flex flex-col p-4'>
      <div className='flex items-start justify-between p-0'>
        <div className='flex flex-col gap-1'>
          <p>{textHeading}</p>
          {isDisable && (
            <p>
              Enable training from settings to add trainee interviewers and
              track their training progress
            </p>
          )}
        </div>
        <div>{slotButton}</div>
      </div>
      {isEnable && (
        <CardContent className='mt-4 flex flex-col gap-4 p-0'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <ShadowIcon />
              <p>{textShadow}</p>
            </div>
            <div className='flex items-center gap-2'>
              <ReverseIcon />
              <p>{textReverseShadow}</p>
            </div>
          </div>
          {isApprovalVisible && (
            <div className='flex flex-col gap-1'>
              <p>
                Following persons approval is required before moving to
                qualified state:
              </p>
              <div className='flex items-center gap-2'>{slotApproval}</div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}

function ShadowIcon() {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='20' height='20' rx='10' fill='white'></rect>
      <rect
        x='0.408163'
        y='0.408163'
        width='19.1837'
        height='19.1837'
        rx='9.59184'
        stroke='#467B7C'
        stroke-width='0.816327'
        stroke-miterlimit='1.30541'
        stroke-dasharray='1.84 1.84'
      ></rect>
      <path
        d='M10.0279 15.2372C7.82366 15.2372 6.40067 14.0792 6.25418 12.44L6.24721 12.3633H7.50279L7.50977 12.44C7.60045 13.4445 8.64676 14.0792 10.0977 14.0792C11.4648 14.0792 12.4623 13.3747 12.4623 12.3493V12.3424C12.4623 11.5053 11.8834 10.9333 10.5022 10.6264L9.38616 10.3823C7.37026 9.93583 6.49833 9.00809 6.49833 7.55022V7.54325C6.5053 5.87612 7.96317 4.69727 10.0419 4.69727C12.0508 4.69727 13.4528 5.88309 13.5575 7.38281L13.5645 7.48047H12.3089L12.2949 7.38979C12.1554 6.50391 11.3184 5.84821 10.007 5.85519C8.75139 5.86216 7.78181 6.45508 7.78181 7.50837V7.51535C7.78181 8.31752 8.33287 8.86161 9.70006 9.16155L10.8161 9.41267C12.9157 9.88002 13.7458 10.7241 13.7458 12.1749V12.1819C13.7458 14.0653 12.274 15.2372 10.0279 15.2372Z'
        fill='#467B7C'
      ></path>
    </svg>
  );
}

function ReverseIcon() {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='20' height='20' rx='10' fill='white'></rect>
      <rect
        x='0.408163'
        y='0.408163'
        width='19.1837'
        height='19.1837'
        rx='9.59184'
        stroke='#467B7C'
        stroke-width='0.816327'
        stroke-miterlimit='1.30541'
      ></rect>
      <path
        d='M6.61691 15V4.93443H10.4604C12.3996 4.93443 13.6691 6.12026 13.6691 7.9269V7.94085C13.6691 9.33594 12.9088 10.4241 11.6462 10.8217L13.976 15H12.5042L10.3488 11.017H7.87249V15H6.61691ZM7.87249 9.90095H10.3488C11.6392 9.90095 12.3717 9.21038 12.3717 7.9827V7.96875C12.3717 6.76897 11.5904 6.0505 10.293 6.0505H7.87249V9.90095Z'
        fill='#467B7C'
      ></path>
    </svg>
  );
}
