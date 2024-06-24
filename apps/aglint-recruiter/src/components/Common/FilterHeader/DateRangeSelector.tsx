import { Popover, Stack } from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { TaskDate } from '@/devlink3/TaskDate';
import DateRange from '@/src/components/Tasks/Components/DateRange';

import { ShowCode } from '../ShowCode';

export type DateRangeSelectorType = {
  name: string;
  // eslint-disable-next-line no-unused-vars
  setValue: (x: dayjs.Dayjs[]) => void;
};
// eslint-disable-next-line no-unused-vars
function DateRangeSelector({ name, setValue }: DateRangeSelectorType) {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs[]>([]);
  const [rangeActive, setRangeActive] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <ButtonFilter
        onClickStatus={{
          onClick: (e) => {
            setAnchorEl(e.target);
          },
        }}
        textLabel={'Interview Date'}
        isDotVisible={selectedDate.length > 0}
        isActive={selectedDate.length > 0}
        slotRightIcon={
          <Stack>
            <GlobalIcon iconName='keyboard_arrow_down' />
            {/* <svg
              width='15'
              height='16'
              viewBox='0 0 15 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M7.75781 11.2578C7.58594 11.4141 7.41406 11.4141 7.24219 11.2578L2.74219 6.75781C2.58594 6.58594 2.58594 6.41406 2.74219 6.24219C2.91406 6.08594 3.08594 6.08594 3.25781 6.24219L7.5 10.4609L11.7422 6.24219C11.9141 6.08594 12.0859 6.08594 12.2578 6.24219C12.4141 6.41406 12.4141 6.58594 12.2578 6.75781L7.75781 11.2578Z'
                fill='#0F3554'
              />
            </svg> */}
          </Stack>
        }
      />
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
        <TaskDate
          onClickInDateRange={{
            onClick: () => {
              setRangeActive(true);
            },
          }}
          onClickSpecificDate={{
            onClick: () => {
              setRangeActive(false);
            },
          }}
          isInDateRangeActive={rangeActive}
          isSpecificDateActive={!rangeActive}
          slotDate={
            <>
              <ShowCode>
                <ShowCode.When isTrue={rangeActive}>
                  <DateRange
                    onChange={(e) => {
                      if (e[1]) {
                        setSelectedDate(e);
                      }
                    }}
                    value={
                      dayjs(selectedDate[0]).toString() == 'Invalid Date'
                        ? [dayjs(selectedDate[0]), dayjs(selectedDate[1])]
                        : [dayjs(selectedDate[0]), dayjs(selectedDate[1])]
                    }
                  />
                </ShowCode.When>
                <ShowCode.Else>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                      views={['day']}
                      disablePast
                      value={dayjs(selectedDate[0])}
                      onChange={(e) => {
                        setSelectedDate([e]);
                      }}
                    />
                  </LocalizationProvider>
                </ShowCode.Else>
              </ShowCode>
              <Stack
                width={'100%'}
                direction={'row'}
                alignItems={'center'}
                spacing={'var(--space-2)'}
                justifyContent={'space-between'}
              >
                <ButtonGhost
                  textButton='Reset'
                  iconName='refresh'
                  isLeftIcon
                  size={2}
                  onClickButton={{
                    onClick: () => {
                      setSelectedDate([]);
                      setValue([]);
                      setAnchorEl(null);
                    },
                  }}
                />
                <Stack
                  direction={'row'}
                  spacing={'var(--space-2)'}
                  alignItems={'center'}
                >
                  <ButtonGhost
                    size={2}
                    textButton='Cancel'
                    onClickButton={{
                      onClick: () => {
                        setAnchorEl(null);
                      },
                    }}
                  />
                  <ButtonGhost
                    size={2}
                    textButton='OK'
                    onClickButton={{
                      onClick: () => {
                        setValue(selectedDate);
                        setAnchorEl(null);
                      },
                    }}
                  />
                </Stack>
              </Stack>
            </>
          }
        />
      </Popover>
    </>
  );
}

export default DateRangeSelector;
