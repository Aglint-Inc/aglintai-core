import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';

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
  slotInterview,
  textUpcomingCount,
  textCancelledCount,
  textPastCount,
  isMenuTabVisible = true,
}: {
  isUpcomingActive?: boolean;
  isCompletedActive?: boolean;
  slotInterviewCard: React.ReactNode;
  onClickUpcoming?: any;
  onClickCompleted?: any;
  onClickCancelled?: any;
  isCancelActive?: boolean;
  slotInterview: React.ReactNode;
  textUpcomingCount?: number;
  textCancelledCount?: number;
  textPastCount?: number;
  isMenuTabVisible?: boolean;
}) {
  return (
    <>
      <Section>
        <SectionHeader>
          <SectionHeaderText>
            <SectionTitle>My Interviews</SectionTitle>
            <SectionDescription>
              View your upcoming, past, and canceled interviews.
            </SectionDescription>
          </SectionHeaderText>
        </SectionHeader>
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
        {slotInterviewCard}
      </Section>
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
}: {
  isUpcomingActive?: boolean;
  isCompletedActive?: boolean;
  onClickUpcoming?: any;
  onClickCompleted?: any;
  onClickCancelled?: any;
  isCancelActive?: boolean;
  slotInterview: React.ReactNode;
  textUpcomingCount?: number;
  textCancelledCount?: number;
  textPastCount?: number;
  isMenuTabVisible?: boolean;
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
