import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import { useRequests } from '@/context/RequestsContext';
import dayjs from '@/utils/dayjs';
import toast from '@/utils/toast';

import DateRange from '../../AgentChats/AgentInputBox/CreateSchedulePopUp/SelectScheduleDate/DateRange'; // need to import from common(NTIFC)

function InterviewDateList({
  selectedFilter,
}: {
  selectedFilter: {
    startDate: string;
    endDate: string;
  };
}) {
  const { handleAsyncUpdateRequest } = useRequests();
  const { query } = useRouter();
  const [date, setDate] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>([
    null,
    null,
  ]);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  // eslint-disable-next-line no-unused-vars
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <UIButton variant='secondary' size='sm' onClick={handleClick}>
        <Pencil className='h-4 w-4' />
      </UIButton>
      <Popover>
        <PopoverTrigger asChild>
          <UIButton variant='secondary' size='sm' onClick={handleClick}>
            <Pencil className='h-4 w-4' />
          </UIButton>
        </PopoverTrigger>
        <PopoverContent className='w-80'>
          <div className='flex flex-col space-y-4'>
            <DateRange
              onChange={(value) => {
                setDate(value);
              }}
              value={{
                from: dayjs(selectedFilter.startDate),
                to: dayjs(selectedFilter.endDate),
              }}
            />
            <div className='flex items-center justify-end space-x-2'>
              <UIButton
                size='sm'
                variant='secondary'
                onClick={() => {
                  setAnchorEl(null);
                }}
              >
                Cancel
              </UIButton>
              <UIButton
                variant='default'
                size='sm'
                onClick={() => {
                  setAnchorEl(null);
                  handleAsyncUpdateRequest({
                    payload: {
                      requestId: String(query?.id),
                      requestPayload: {
                        schedule_start_date: date[0]
                          ? date[0].toISOString()
                          : selectedFilter.startDate,
                        schedule_end_date: date[1]
                          ? date[1].toISOString()
                          : selectedFilter.endDate,
                      },
                    },
                    loading: false,
                    toast: false,
                  });
                  toast.success('Interview date updated');
                }}
              >
                OK
              </UIButton>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default InterviewDateList;
