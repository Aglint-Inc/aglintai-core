import { cn } from '@lib/utils';
import React from 'react';

interface HistoryPillProps {
  isReverseShadow?: boolean;
  isShadow?: boolean;
  isActive?: boolean;
  position?: 'start' | 'end' | '';
  slotHistoryTrainingCard?: React.ReactNode;
  isHistoryTrainingCardVisible?: boolean;
}

export function HistoryPillShadcn({
  isReverseShadow = false,
  isShadow = true,
  isActive = false,
  position,
  slotHistoryTrainingCard,
  isHistoryTrainingCardVisible = true,
}: HistoryPillProps) {
  return (
    <div className='relative flex items-center justify-center cursor-pointer'>
      <div className='relative'>
        <div
          className={cn(
            'flex w-[60px] h-[26px] justify-center items-center bg-neutral-300 text-neutral-900',
            position === 'start' && 'rounded-l-md',
            position === 'end' && 'rounded-r-md',
          )}
        >
          {isShadow && <ShadowIcon />}
          {isReverseShadow && <ReverseShadowIcon />}
        </div>
        {isActive && (
          <div
            className={cn(
              'absolute inset-0 flex justify-center items-center bg-green-400 text-green-900',
              position === 'start' && 'rounded-l-md',
              position === 'end' && 'rounded-r-md',
            )}
          >
            {isShadow && <ShadowIcon />}
            {isReverseShadow && <ReverseShadowIcon />}
          </div>
        )}
      </div>
      {isHistoryTrainingCardVisible && <div>{slotHistoryTrainingCard}</div>}
    </div>
  );
}

function ShadowIcon() {
  return (
    <svg
      className='w-4 h-4'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='0.326531'
        y='0.326531'
        width='15.3469'
        height='15.3469'
        rx='7.67347'
        stroke='currentColor'
        strokeWidth='0.653061'
        strokeMiterlimit='1.30541'
        strokeDasharray='1.47 1.47'
      />
      <path
        d='M8.02232 12.1897C6.25893 12.1897 5.12054 11.2634 5.00335 9.95201L4.99777 9.89062H6.00223L6.00781 9.95201C6.08036 10.7556 6.91741 11.2634 8.07812 11.2634C9.17187 11.2634 9.96987 10.6998 9.96987 9.87946V9.87388C9.96987 9.20424 9.5067 8.74665 8.40179 8.50112L7.50893 8.3058C5.89621 7.94866 5.19866 7.20647 5.19866 6.04018V6.0346C5.20424 4.70089 6.37054 3.75781 8.03348 3.75781C9.64062 3.75781 10.7623 4.70647 10.846 5.90625L10.8516 5.98437H9.8471L9.83594 5.91183C9.72433 5.20312 9.05469 4.67857 8.00558 4.68415C7.00112 4.68973 6.22545 5.16406 6.22545 6.0067V6.01228C6.22545 6.65402 6.66629 7.08929 7.76004 7.32924L8.6529 7.53013C10.3326 7.90402 10.9967 8.57924 10.9967 9.73996V9.74554C10.9967 11.2522 9.8192 12.1897 8.02232 12.1897Z'
        fill='currentColor'
      />
    </svg>
  );
}

function ReverseShadowIcon() {
  return (
    <svg
      className='w-4 h-4'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='0.326531'
        y='0.326531'
        width='15.3469'
        height='15.3469'
        rx='7.67347'
        stroke='currentColor'
        strokeWidth='0.653061'
        strokeMiterlimit='1.30541'
      />
      <path
        d='M5.29353 12V3.94754H8.3683C9.91964 3.94754 10.9353 4.89621 10.9353 6.34152V6.35268C10.9353 7.46875 10.327 8.33929 9.31696 8.65737L11.1808 12H10.0033L8.27902 8.81362H6.29799V12H5.29353ZM6.29799 7.92076H8.27902C9.31138 7.92076 9.89732 7.3683 9.89732 6.38616V6.375C9.89732 5.41518 9.27232 4.8404 8.23438 4.8404H6.29799V7.92076Z'
        fill='currentColor'
      />
    </svg>
  );
}
