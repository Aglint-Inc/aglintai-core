import {
  Section,
  SectionActions,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import Typography from '@components/typography';
import { ScrollArea } from '@components/ui/scroll-area';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';

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
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <>
      <Section>
        <SectionHeader onClick={() => setIsExpanded(!isExpanded)}>
          <SectionHeaderText>
            <SectionTitle>My Interviews</SectionTitle>
            <SectionDescription>
              View your upcoming, past, and canceled interviews.
            </SectionDescription>
          </SectionHeaderText>
          <SectionActions>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </SectionActions>
        </SectionHeader>
        {isExpanded && (
          <>
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

            <ScrollArea className='h-[340px] gap-4'>
              <div className='space-y-4'>{slotInterviewCard}</div>
            </ScrollArea>
          </>
        )}
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
                <div className='flex h-5 min-w-5 items-center justify-center rounded bg-neutral-300 px-1 text-muted-foreground'>
                  <Typography variant='p' type='small'>
                    {textUpcomingCount}
                  </Typography>
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
                <div className='flex h-5 min-w-5 items-center justify-center rounded bg-neutral-300 px-1 text-muted-foreground'>
                  <Typography variant='p' type='small'>
                    {textCancelledCount}
                  </Typography>
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
                <div className='flex h-5 min-w-5 items-center justify-center rounded bg-neutral-300 px-1 text-muted-foreground'>
                  <Typography variant='p' type='small'>
                    {textPastCount}
                  </Typography>
                </div>
              </UIButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
