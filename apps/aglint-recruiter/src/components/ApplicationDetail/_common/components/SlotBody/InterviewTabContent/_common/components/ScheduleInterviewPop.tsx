import { cn } from '@lib/utils';

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
}) {
  return (
    <div className={cn('flex flex-col gap-4')}>
      {isCandidateVisible ? (
        <div className='flex flex-col gap-1'>
          <UITypography variant='p' type='small'>
            Selected Candidate
          </UITypography>
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4Z'
                  fill='#8D8D86'
                />
                <rect
                  width='16'
                  height='16'
                  transform='translate(4 4)'
                  fill='white'
                  fill-opacity='0.01'
                />
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M12.0001 4.93359C9.86464 4.93359 8.13347 6.66476 8.13347 8.80026C8.13347 10.5633 9.31346 12.0508 10.9268 12.516C9.65315 12.6712 8.56074 13.1217 7.73781 13.9327C6.69044 14.965 6.16016 16.5016 6.16016 18.5068C6.16016 18.7867 6.387 19.0135 6.66682 19.0135C6.94665 19.0135 7.17349 18.7867 7.17349 18.5068C7.17349 16.6722 7.65652 15.4356 8.44911 14.6544C9.24319 13.8719 10.4287 13.4669 12.0001 13.4669C13.5715 13.4669 14.757 13.8719 15.5512 14.6545C16.3437 15.4356 16.8268 16.6722 16.8268 18.5068C16.8268 18.7867 17.0536 19.0135 17.3335 19.0135C17.6133 19.0136 17.8401 18.7867 17.8401 18.5069C17.8401 16.5016 17.3098 14.965 16.2624 13.9327C15.4395 13.1217 14.3471 12.6712 13.0735 12.516C14.6867 12.0508 15.8668 10.5633 15.8668 8.80026C15.8668 6.66476 14.1356 4.93359 12.0001 4.93359ZM9.1468 8.80026C9.1468 7.22441 10.4243 5.94693 12.0001 5.94693C13.576 5.94693 14.8535 7.22441 14.8535 8.80026C14.8535 10.3761 13.576 11.6536 12.0001 11.6536C10.4243 11.6536 9.1468 10.3761 9.1468 8.80026Z'
                  fill='white'
                />
              </svg>
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