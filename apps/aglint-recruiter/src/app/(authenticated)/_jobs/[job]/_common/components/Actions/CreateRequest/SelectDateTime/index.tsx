/* eslint-disable no-unused-vars */
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import {
  LocalizationProvider,
  renderTimeViewClock,
  StaticDateTimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useState } from 'react';

function SelectDateTime({
  selectCallDate,
  setSelectCallDate,
  onChange,
}: {
  selectCallDate: string;
  setSelectCallDate: (x: string) => void;
  onChange: any;
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
      <div className='cursor-pointer' onClick={handleClick}>
        {dayjs(selectCallDate).format('DD MMM YYYY, hh:mm A')}
      </div>
      <Popover open={open} onOpenChange={handleClose}>
        <PopoverTrigger asChild>
          <div className='hidden' />{' '}
          {/* Hidden trigger for programmatic control */}
        </PopoverTrigger>
        <PopoverContent className='border-none p-0' side='bottom' align='start'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDateTimePicker
              orientation='portrait'
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              ampmInClock={true}
              className='[&_.MuiPickersToolbar-root]:hidden [&_.MuiTabs-root]:hidden'
              disablePast
              value={dayjs(selectCallDate)}
              onAccept={(e: any) => {
                setSelectCallDate(String(new Date(e)));
                handleClose();
                if (onChange) {
                  onChange(e);
                }
              }}
              shouldDisableDate={(date) => {
                const dayOfWeek = dayjs(date).day();
                return dayOfWeek === 0 || dayOfWeek === 6;
              }}
            />
          </LocalizationProvider>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default SelectDateTime;
