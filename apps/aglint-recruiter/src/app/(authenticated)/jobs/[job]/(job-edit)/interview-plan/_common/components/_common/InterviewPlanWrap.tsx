import {
  Section,
  SectionActions,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';

import { InterviewPlanDetail } from './InterviewPlanDetail';
export function InterviewPlanWrap({
  textStageName = '',
  textInterviewCount = '',
  slotRightIconButton,
  slotInterviewPlanDetail,
  isSlotInterviewPlanVisible = true,
  onClickUp,
  onClickDown,
  isTopArrowVisible = true,
  isBottomArrowVisible = true,
  isInputVisible = false,
  slotInputButton,
}: {
  textStageName?: string;
  textInterviewCount?: string;
  slotRightIconButton: React.ReactNode;
  slotInterviewPlanDetail: React.ReactNode;
  isSlotInterviewPlanVisible?: boolean;
  onClickUp: () => void;
  onClickDown: () => void;
  isTopArrowVisible?: boolean;
  isBottomArrowVisible?: boolean;
  isInputVisible?: boolean;
  slotInputButton: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [hover, setHover] = useState(false);

  return (
    <div
      className='pr-20'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <div className='relative rounded-md bg-muted p-2 px-4'>
        <Section>
          {isInputVisible ? (
            slotInputButton
          ) : (
            <SectionHeader
              className={`cursor-pointer ${isExpanded ? 'mb-4' : 'mb-0'}`}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <SectionHeaderText>
                <SectionTitle>{textStageName}</SectionTitle>
                <SectionDescription>{textInterviewCount}</SectionDescription>
              </SectionHeaderText>
              {hover && (
                <SectionActions>
                  {isExpanded ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </SectionActions>
              )}
            </SectionHeader>
          )}
          {isSlotInterviewPlanVisible && isExpanded && (
            <div className='flex flex-col gap-2'>
              {slotInterviewPlanDetail ?? <InterviewPlanDetail />}
            </div>
          )}
        </Section>
        {hover && (
          <div className='absolute inset-y-2 -right-12 flex flex-col gap-2'>
            <div>{slotRightIconButton}</div>
            {isTopArrowVisible && (
              <UIButton
                variant='outline'
                size='sm'
                icon={<ArrowUp className='h-4 w-4' />}
                onClick={(e) => {
                  e.stopPropagation();
                  onClickUp();
                }}
              />
            )}
            {isBottomArrowVisible && (
              <UIButton
                variant='outline'
                size='sm'
                icon={<ArrowDown className='h-4 w-4' />}
                onClick={(e) => {
                  e.stopPropagation();
                  onClickDown();
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
