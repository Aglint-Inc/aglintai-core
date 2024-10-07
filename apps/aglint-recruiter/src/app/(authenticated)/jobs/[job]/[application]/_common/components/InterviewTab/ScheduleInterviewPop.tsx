import Typography from '@components/typography';
import { cn } from '@lib/utils';
import { User } from 'lucide-react';

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
          <Typography variant='p' type='small'>
            Selected Candidate
          </Typography>
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center'>
              <User size={24} />
            </div>
            <Typography variant='p' type='small'>
              {textName}
            </Typography>
          </div>
        </div>
      ) : null}
      <div className='flex flex-col gap-1'>
        <Typography variant='p' type='small'>
          {textSelectedSchedule}
        </Typography>
        <div className='flex flex-wrap items-center gap-2'>{slotStagePill}</div>
      </div>
      {isRequestTypeVisible ? (
        <div className='flex flex-col gap-2'>
          <Typography variant='p' type='small'>
            Request Type
          </Typography>
          <div>{slotRequestOption}</div>
          <Typography variant='p' type='small'>
            Request will be marked as urgent to give more priority
          </Typography>
        </div>
      ) : null}
      {isRequestTypeVisible ? (
        <div className='flex flex-col gap-2'>
          <Typography variant='p' type='small'>
            Assigned to
          </Typography>
          <div>{slotAssignedInput}</div>
        </div>
      ) : null}
      {isRequestTypeVisible ? (
        <div className='flex flex-col gap-2'>
          <Typography variant='p' type='small'>
            Pick Date Range
          </Typography>
          <div>{slotPickDateInput}</div>
        </div>
      ) : null}
      <div>{slotNotes}</div>
    </div>
  );
}
