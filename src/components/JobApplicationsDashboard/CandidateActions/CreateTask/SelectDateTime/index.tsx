/* eslint-disable no-unused-vars */
import { Popover, Stack } from '@mui/material';
import {
  LocalizationProvider,
  renderTimeViewClock,
  StaticDateTimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useState } from 'react';

function SelectDateTime({
  selectTriggerTime,
  setSelectTriggerTime,
}: {
  selectTriggerTime: string;
  setSelectTriggerTime: (x: string) => void;
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <Stack onClick={handleClick}>
        {`${dayjs(selectTriggerTime).format('DD MMM YYYY, hh:mm')}`}
      </Stack>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            border: 'none',
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDateTimePicker
            orientation='portrait'
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            ampmInClock={true}
            sx={{
              '& .MuiPickersToolbar-root': { display: 'none' },
              '& .MuiTabs-root': {
                display: 'none',
              },
            }}
            disablePast
            value={dayjs(selectTriggerTime)}
            onAccept={(e: any) => {
              setSelectTriggerTime(String(new Date(e)));
              setAnchorEl(null);
            }}
            shouldDisableDate={(date) => {
              const dayOfWeek = dayjs(date).day();
              return dayOfWeek === 0 || dayOfWeek === 6;
            }}
          />
        </LocalizationProvider>
      </Popover>
    </>
  );
}

export default SelectDateTime;
