import { cn } from '@lib/utils';
import { Pencil, Trash2, Zap } from 'lucide-react';
import React from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UITypography from '@/components/Common/UITypography';

interface WorkflowCardProps {
  textWorkflowTrigger?: React.ReactNode;
  textJobs?: React.ReactNode;
  textWorkflowName?: React.ReactNode;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
  slotCheckbox?: React.ReactNode;
  isCheckboxVisible?: boolean;
  isChecked?: boolean;
  isEditButton?: boolean;
  showButtons?: boolean;
  border?: 'visible' | 'hidden';
  slotBadge?: React.ReactNode;
  smallCard?: boolean;
  widthText?: 'small' | 'normal';
}

export function WorkflowCard({
  textWorkflowTrigger = 'Follow-Up Email Automation for Unresponsive Candidates',
  textJobs = 'Used in 8 jobs',
  textWorkflowName = 'Follow-Up Email Automation for Unresponsive Candidates',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClickEdit = () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClickDelete = () => {},
  slotCheckbox,
  isCheckboxVisible = false,
  isChecked = false,
  isEditButton = true,
  showButtons = false,
  border,
  slotBadge,
  smallCard,
  widthText,
}: WorkflowCardProps) {
  return (
    <div className='flex justify-start items-start gap-2.5 bg-white'>
      <div className='relative w-full'>
        <div
          className={cn(
            'flex w-full flex-row justify-start flex-nowrap bg-white cursor-pointer transition-all duration-200 ease-in-out',
            border === 'visible' && 'border border-neutral-200 rounded-md',
            'hover:border-neutral-300',
          )}
        >
          {isCheckboxVisible && (
            <div className='flex justify-center items-start mt-1 pt-4 pl-4'>
              {slotCheckbox || (
                <div className='flex justify-center items-center'>
                  {/* Replace with your checkbox component */}
                  <input type='checkbox' checked={isChecked} readOnly />
                </div>
              )}
            </div>
          )}
          <div className='w-full flex-col justify-center flex-nowrap gap-1'>
            <div className='flex h-auto justify-between items-center'>
              <div
                className={cn(
                  'flex w-full py-4 pl-4 justify-start items-center gap-2',
                  widthText === 'small' && 'w-[85%]',
                )}
                {...onClickEdit}
              >
                <UITypography type='small' variant='h3'>
                  {textWorkflowName}
                </UITypography>
              </div>
              {showButtons && (
                <div className='flex pr-4 gap-1'>
                  {isEditButton && (
                    <UIButton
                      icon={<Pencil />}
                      variant='ghost'
                      size='sm'
                      onClick={onClickEdit}
                    />
                  )}
                  <UIButton
                    icon={<Trash2 />}
                    variant='ghost'
                    size='sm'
                    onClick={onClickDelete}
                  />
                </div>
              )}
            </div>
            <div
              className='flex px-4 pb-3 justify-between items-center gap-5'
              {...onClickEdit}
            >
              <div
                className={cn(
                  'flex justify-start items-center gap-2',
                  smallCard && 'flex-col-reverse items-start',
                )}
              >
                <div className='flex justify-start items-center gap-2'>
                  {slotBadge}
                </div>
                <div className='flex justify-start items-center'>
                  <Zap className='mr-2' strokeWidth={1} />
                  <UITypography type='small'>
                    {textWorkflowTrigger}
                  </UITypography>
                </div>
              </div>
              <div>
                <UITypography type='small'>{textJobs}</UITypography>
              </div>
            </div>
          </div>
        </div>
        {isChecked && (
          <div className='absolute inset-0 border border-accent-500 rounded-lg' />
        )}
      </div>
    </div>
  );
}
