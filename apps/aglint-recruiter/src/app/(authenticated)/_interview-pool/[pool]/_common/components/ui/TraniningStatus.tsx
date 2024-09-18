interface TrainingStatusProps {
  isShadow?: boolean;
  isReverseShadow?: boolean;
  isCompletedVisible?: boolean;
  isPendingApprovalVisible?: boolean;
  isNotCompletedVisible?: boolean;
}

export function TrainingStatus({
  isShadow = true,
  isReverseShadow = false,
  isCompletedVisible = true,
  isPendingApprovalVisible = false,
  isNotCompletedVisible = false,
}: TrainingStatusProps) {
  return (
    <div className='flex flex-col items-start'>
      {isCompletedVisible && (
        <div className='flex items-center gap-1 rounded-sm bg-green-100 px-3 py-1 text-green-800'>
          {isShadow && <ShadowIcon />}
          {isReverseShadow && <ReverseShadowIcon />}
          <span className='text-xs font-medium'>Completed</span>
        </div>
      )}
      {isPendingApprovalVisible && (
        <div className='flex items-center gap-1 rounded-sm bg-orange-100 px-3 py-1 text-orange-800'>
          {isReverseShadow && <ReverseShadowIcon />}
          {isShadow && <ShadowIcon />}
          <span className='text-xs'>Pending Approval</span>
        </div>
      )}
      {isNotCompletedVisible && (
        <div className='flex items-center gap-1 rounded-sm bg-gray-100 px-3 py-1 text-gray-800'>
          {isShadow && <ShadowIcon />}
          {isReverseShadow && <ReverseShadowIcon />}
          <span className='text-xs font-medium'>Not Completed</span>
        </div>
      )}
    </div>
  );
}

const ShadowIcon = () => {
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='0.285714'
        y='0.285714'
        width='13.4286'
        height='13.4286'
        rx='6.71429'
        stroke='currentColor'
        stroke-width='0.571429'
        stroke-miterlimit='1.30541'
        stroke-dasharray='1.29 1.29'
      ></rect>
      <path
        d='M7.01953 10.666C5.47656 10.666 4.48047 9.85547 4.37793 8.70801L4.37305 8.6543H5.25195L5.25684 8.70801C5.32031 9.41113 6.05273 9.85547 7.06836 9.85547C8.02539 9.85547 8.72363 9.3623 8.72363 8.64453V8.63965C8.72363 8.05371 8.31836 7.65332 7.35156 7.43848L6.57031 7.26758C5.15918 6.95508 4.54883 6.30566 4.54883 5.28516V5.28027C4.55371 4.11328 5.57422 3.28809 7.0293 3.28809C8.43555 3.28809 9.41699 4.11816 9.49023 5.16797L9.49512 5.23633H8.61621L8.60645 5.17285C8.50879 4.55273 7.92285 4.09375 7.00488 4.09863C6.12598 4.10352 5.44727 4.51855 5.44727 5.25586V5.26074C5.44727 5.82227 5.83301 6.20312 6.79004 6.41309L7.57129 6.58887C9.04102 6.91602 9.62207 7.50684 9.62207 8.52246V8.52734C9.62207 9.8457 8.5918 10.666 7.01953 10.666Z'
        fill='currentColor'
      ></path>
    </svg>
  );
};

const ReverseShadowIcon = () => {
  return (
    <svg
      width='14'
      height='14'
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
        stroke='#8D8D86'
        stroke-width='0.653061'
        stroke-miterlimit='1.30541'
      ></rect>
      <path
        d='M5.29353 12V3.94754H8.3683C9.91964 3.94754 10.9353 4.89621 10.9353 6.34152V6.35268C10.9353 7.46875 10.327 8.33929 9.31696 8.65737L11.1808 12H10.0033L8.27902 8.81362H6.29799V12H5.29353ZM6.29799 7.92076H8.27902C9.31138 7.92076 9.89732 7.3683 9.89732 6.38616V6.375C9.89732 5.41518 9.27232 4.8404 8.23438 4.8404H6.29799V7.92076Z'
        fill='#8D8D86'
      ></path>
    </svg>
  );
};
