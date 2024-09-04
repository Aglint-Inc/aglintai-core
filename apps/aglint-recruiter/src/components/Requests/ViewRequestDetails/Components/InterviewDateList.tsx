import { Popover, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { IconButtonSoft } from '@/devlink3/IconButtonSoft';
import { useRequests } from '@/src/context/RequestsContext';
import dayjs from '@/src/utils/dayjs';
import toast from '@/src/utils/toast';

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
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <IconButtonSoft
        onClickButton={{
          onClick: handleClick,
        }}
        iconName={'edit_square'}
        color={'neutral'}
        size={1}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Stack
          padding={1}
          spacing={1}
          sx={{
            display: 'flex',
            alignItems: 'self-start',
          }}
        >
          <DateRange
            onChange={(value) => {
              setDate(value);
            }}
            value={{
              from: dayjs(selectedFilter.startDate),
              to: dayjs(selectedFilter.endDate),
            }}
          />
          <Stack
            direction={'row'}
            justifyContent={'end'}
            alignItems={'center'}
            width={'100%'}
            gap={1}
          >
            <ButtonSoft
              size={1}
              color={'neutral'}
              textButton={'cancel'}
              onClickButton={{
                onClick: () => {
                  setAnchorEl(null);
                },
              }}
            />
            <ButtonSoft
              size={1}
              textButton={'ok'}
              onClickButton={{
                onClick: () => {
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
                },
              }}
            />
          </Stack>
        </Stack>
      </Popover>
    </>
  );
}

export default InterviewDateList;
