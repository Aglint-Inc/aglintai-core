/* eslint-disable no-unused-vars */
import { Popover, Stack } from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState } from 'react';

import { ListPop } from '@/devlink3/ListPop';

function SelectDueDate({
  selectedDueDate,
  setSelectedDueDate,
  isOptionList = true,
  onChange,
}: {
  selectedDueDate: string;
  setSelectedDueDate: (x: string) => void;
  isOptionList?: boolean;
  onChange?: any;
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
      <Stack width={'100%'} onClick={handleClick}>
        {selectedDueDate ? (
          <>{`${dayjs(selectedDueDate).format('MMM DD, YYYY')}`}</>
        ) : (
          <>Select Date</>
        )}
      </Stack>
      <Popover
        id={id}
        open={open && isOptionList}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        // sx={{
        //   '& .MuiPopover-paper': {
        //     border: 'none',
        //   },
        // }}
      >
        <Stack bgcolor={'#fff'} p={0.5} overflow={'scroll'} height={'100%'}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              disablePast
              value={dayjs(selectedDueDate)}
              onChange={(e) => {
                setSelectedDueDate(dayjs(e).toString());
                if (onChange) {
                  onChange(e);
                }
              }}
              shouldDisableDate={(date) => {
                const dayOfWeek = dayjs(date).day(); // 0 for Sunday, 6 for Saturday
                return dayOfWeek === 0 || dayOfWeek === 6; // Disable if Sunday or Saturday
              }}
            />
          </LocalizationProvider>
        </Stack>
      </Popover>
    </>
  );
}

export default SelectDueDate;
