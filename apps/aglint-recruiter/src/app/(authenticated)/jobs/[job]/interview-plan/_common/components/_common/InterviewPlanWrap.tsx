'use client';

import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@components/ui/collapsible';
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

import { InterviewPlanDetail } from './InterviewPlanDetail';

export function InterviewPlanWrap({
  textStageName = 'This is a global text component',
  textInterviewCount = 'This is a global text component',
  slotRightIconButton,
  slotInputButton,
  isInputVisible = false,
  slotInterviewPlanDetail,
  isSlotInterviewPlanVisible = true,
  onClickUp,
  onClickDown,
  isTopArrowVisible = true,
  isBottomArrowVisible = true,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div
      className='relative'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className='w-full'>
        <Card className='w-full'>
          <CardHeader className='px-4 py-3'>
            {isInputVisible ? (
              <div className='w-full'>{slotInputButton}</div>
            ) : (
              <CollapsibleTrigger asChild>
                <div className='flex h-[40px] w-full cursor-pointer items-center justify-between'>
                  <div className='flex items-center'>
                    <CardTitle className='text-md'>{textStageName}</CardTitle>
                    <div
                      className={`flex items-center gap-2 transition-opacity duration-300 ${hover ? 'opacity-100' : 'opacity-0'}`}
                    >
                      {slotRightIconButton}
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <CardDescription>{textInterviewCount}</CardDescription>
                    {isOpen ? (
                      <ChevronUp className='h-4 w-4' />
                    ) : (
                      <ChevronDown className='h-4 w-4' />
                    )}
                  </div>
                </div>
              </CollapsibleTrigger>
            )}
          </CardHeader>
          <CollapsibleContent>
            <CardContent className='px-4 pb-0 pt-0'>
              {isSlotInterviewPlanVisible && (
                <div className='flex flex-col gap-2'>
                  {slotInterviewPlanDetail ?? <InterviewPlanDetail />}
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
      <div className='absolute -right-12 top-0 flex flex-col gap-2'>
        {isTopArrowVisible && (
          <Button
            variant='secondary'
            size='sm'
            onClick={(e) => {
              e.stopPropagation();
              onClickUp();
            }}
          >
            <ArrowUp className='h-4 w-4' />
          </Button>
        )}
        {isBottomArrowVisible && (
          <Button
            variant='secondary'
            size='sm'
            onClick={(e) => {
              e.stopPropagation();
              onClickDown();
            }}
          >
            <ArrowDown className='h-4 w-4' />
          </Button>
        )}
      </div>
    </div>
  );
}
