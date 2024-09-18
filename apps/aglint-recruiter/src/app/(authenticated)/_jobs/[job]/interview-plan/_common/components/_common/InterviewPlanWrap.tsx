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
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp, Edit } from 'lucide-react';
import React, { useState } from 'react';

import { InterviewPlanDetail } from './InterviewPlanDetail';

export function InterviewPlanWrap({
  textStageName = 'This is a global text component',
  onClickEdit,
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

  return (
    <div className='relative'>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className='w-full'>
        <Card className='w-full'>
          <CardHeader>
            <CollapsibleTrigger asChild>
              <div className='flex w-full cursor-pointer items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <CardTitle className='text-md'>{textStageName}</CardTitle>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='opacity-0 transition-opacity duration-300 hover:opacity-100'
                    onClick={(e) => {
                      e.stopPropagation();
                      onClickEdit();
                    }}
                  >
                    <Edit className='h-4 w-4' />
                  </Button>
                </div>
                <div className='flex items-center gap-2'>
                  <CardDescription>{textInterviewCount}</CardDescription>
                  {slotRightIconButton}
                  {isOpen ? (
                    <ChevronUp className='h-4 w-4' />
                  ) : (
                    <ChevronDown className='h-4 w-4' />
                  )}
                </div>
              </div>
            </CollapsibleTrigger>
            {isInputVisible && (
              <div className='absolute inset-0 z-10 bg-neutral-100'>
                {slotInputButton}
              </div>
            )}
          </CardHeader>
          <CollapsibleContent>
            <CardContent>
              {isSlotInterviewPlanVisible && (
                <div className='flex flex-col gap-2 pt-4'>
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
