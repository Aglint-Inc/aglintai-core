import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';

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
    <>
      <Card className='mb-6 border-none shadow-none'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-lg font-semibold'>
              My Interviews
            </CardTitle>
            <Tabs
              isUpcomingActive={isUpcomingActive}
              onClickUpcoming={onClickUpcoming}
              onClickCompleted={onClickCompleted}
              onClickCancelled={onClickCancelled}
              isCompletedActive={isCompletedActive}
              isCancelActive={isCancelActive}
              slotInterview={slotInterview}
              textUpcomingCount={textUpcomingCount}
              textCancelledCount={textCancelledCount}
              textPastCount={textPastCount}
              isMenuTabVisible={isMenuTabVisible}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex h-full flex-col'>
            <div
              className='max-w-900px flex h-full flex-col gap-2.5 overflow-auto'
              {...propsGrids}
            >
              {slotInterviewCard}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

const Tabs = ({
  isUpcomingActive = true,
  isCompletedActive = false,
  onClickUpcoming = {},
  onClickCompleted = {},
  onClickCancelled = {},
  isCancelActive = false,
  slotInterview,
  textUpcomingCount,
  textCancelledCount,
  textPastCount,
  isMenuTabVisible = true,
}) => {
  return (
    <>
      {isMenuTabVisible && (
        <div className='flex h-12 items-center justify-between'>
          <div className='flex items-center gap-2.5'>
            <div className='flex flex-col gap-2.5'>{slotInterview}</div>
            <div className='relative'>
              <UIButton
                variant={isUpcomingActive ? 'default' : 'secondary'}
                className='flex h-8 cursor-pointer items-center gap-2.5 rounded-md border px-3'
                {...onClickUpcoming}
              >
                <div>Upcoming</div>
                <div className='flex h-5 min-w-5 items-center justify-center rounded bg-neutral-300 px-1 text-neutral-700'>
                  <UITypography variant='p' type='small'>
                    {textUpcomingCount}
                  </UITypography>
                </div>
              </UIButton>
            </div>
            <div className='relative'>
              <UIButton
                variant={isCancelActive ? 'default' : 'secondary'}
                className='flex h-8 cursor-pointer items-center gap-2.5 rounded-md border px-3'
                {...onClickCancelled}
              >
                <div>Canceled</div>
                <div className='flex h-5 min-w-5 items-center justify-center rounded bg-neutral-300 px-1 text-neutral-700'>
                  <UITypography variant='p' type='small'>
                    {textCancelledCount}
                  </UITypography>
                </div>
              </UIButton>
            </div>
            <div className='relative'>
              <UIButton
                className='flex h-8 cursor-pointer items-center gap-2.5 rounded-md border px-3'
                variant={isCompletedActive ? 'default' : 'secondary'}
                {...onClickCompleted}
              >
                <div>Past</div>
                <div className='flex h-5 min-w-5 items-center justify-center rounded bg-neutral-300 px-1 text-neutral-700'>
                  <UITypography variant='p' type='small'>
                    {textPastCount}
                  </UITypography>
                </div>
              </UIButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
