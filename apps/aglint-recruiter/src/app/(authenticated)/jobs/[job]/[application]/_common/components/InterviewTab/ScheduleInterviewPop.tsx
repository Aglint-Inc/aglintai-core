import { cn } from '@lib/utils';
import { User } from 'lucide-react';

import UITypography from '@/components/Common/UITypography';

export function ScheduleInterviewPop({
  textName = '',
  textSelectedSchedule = '',
  slotStagePill,
  slotRequestOption,
  slotAssignedInput,
  slotPickDateInput,
  isRequestTypeVisible = true,
  isCandidateVisible = true,
  slotNotes,
}: any) {
  return (
    <div className={cn('flex flex-col gap-4')}>
      {isCandidateVisible ? (
        <div className='flex flex-col gap-1'>
          <UITypography variant='p' type='small'>
            Selected Candidate
          </UITypography>
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center'>
              <User size={24} />
            </div>
            <UITypography variant='p' type='small'>
              {textName}
            </UITypography>
          </div>
        </div>
      ) : null}
      <div className='flex flex-col gap-1'>
        <UITypography variant='p' type='small'>
          {textSelectedSchedule}
        </UITypography>
        <div className='flex flex-wrap items-center gap-2'>{slotStagePill}</div>
      </div>
      {isRequestTypeVisible ? (
        <div className='flex flex-col gap-2'>
          <UITypography variant='p' type='small'>
            Request Type
          </UITypography>
          <div>{slotRequestOption}</div>
          <UITypography variant='p' type='small'>
            Request will be marked as urgent to give more priority
          </UITypography>
        </div>
      ) : null}
      {isRequestTypeVisible ? (
        <div className='flex flex-col gap-2'>
          <UITypography variant='p' type='small'>
            Assigned to
          </UITypography>
          <div>{slotAssignedInput}</div>
        </div>
      ) : null}
      {isRequestTypeVisible ? (
        <div className='flex flex-col gap-2'>
          <UITypography variant='p' type='small'>
            Pick Date Range
          </UITypography>
          <div>{slotPickDateInput}</div>
        </div>
      ) : null}
      <div>{slotNotes}</div>
    </div>
  );
}
