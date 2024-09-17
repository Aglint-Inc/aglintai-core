import { UIButton } from '@/components/Common/UIButton';
import UITypography from '@/components/Common/UITypography';

export function InterviewMemberSide({
  isUpcomingActive = true,
  isCompletedActive = false,
  slotInterviewCard,
  onClickUpcoming = {},
  onClickCompleted = {},
  onClickCancelled = {},
  isCancelActive = false,
  propsGrids = {},
  slotInterview,
  textUpcomingCount,
  textCancelledCount,
  textPastCount,
  isMenuTabVisible = true,
}) {
  return (
    <div className='flex flex-col h-full'>
      {isMenuTabVisible && (
        <div className='flex items-center justify-between h-12 px-4  bg-white'>
          <div className='flex items-center gap-2.5'>
            <div className='flex flex-col gap-2.5'>{slotInterview}</div>
            <div className='relative'>
              <UIButton
                variant={isUpcomingActive ? 'default' : 'secondary'}
                className='flex items-center h-8 px-3 gap-2.5 border rounded-md cursor-pointer'
                {...onClickUpcoming}
              >
                <div>Upcoming</div>
                <div className='flex items-center justify-center h-5 min-w-5 px-1 bg-neutral-300 text-neutral-700 rounded'>
                  <UITypography variant='p' type='small'>
                    {textUpcomingCount}
                  </UITypography>
                </div>
              </UIButton>
            </div>
            <div className='relative'>
              <UIButton
                variant={isCancelActive ? 'default' : 'secondary'}
                className='flex items-center h-8 px-3 gap-2.5 border rounded-md cursor-pointer'
                {...onClickCancelled}
              >
                <div>Canceled</div>
                <div className='flex items-center justify-center h-5 min-w-5 px-1 bg-neutral-300 text-neutral-700 rounded'>
                  <UITypography variant='p' type='small'>
                    {textCancelledCount}
                  </UITypography>
                </div>
              </UIButton>
            </div>
            <div className='relative'>
              <UIButton
                className='flex items-center h-8 px-3 gap-2.5 border rounded-md cursor-pointer'
                variant={isCompletedActive ? 'default' : 'secondary'}
                {...onClickCompleted}
              >
                <div>Past</div>
                <div className='flex items-center justify-center h-5 min-w-5 px-1 bg-neutral-300 text-neutral-700 rounded'>
                  <UITypography variant='p' type='small'>
                    {textPastCount}
                  </UITypography>
                </div>
              </UIButton>
            </div>
          </div>
        </div>
      )}
      <div
        className='flex flex-col h-full max-w-900px p-4 gap-2.5 overflow-auto'
        {...propsGrids}
      >
        {slotInterviewCard}
      </div>
    </div>
  );
}
