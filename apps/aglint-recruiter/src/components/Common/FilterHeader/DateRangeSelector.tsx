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
import { useTasksContext } from '@/src/context/TasksContextProvider/TasksContextProvider';

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
  const { filter } = useTasksContext();

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const currentDate = filter.date.values;
  return (
    <>
      <ButtonFilter
        onClickStatus={{
          onClick: (e) => {
            setAnchorEl(e.target);
          },
        }}
        textLabel={'Interview Date'}
        isDotVisible={
          filter.date.values ? Boolean(filter.date.values.length) : false
        }
        isActive={selectedDate.length > 0}
        slotRightIcon={
          <Stack>
            <GlobalIcon iconName='keyboard_arrow_down' />
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
                      dayjs(currentDate[0]).toString() == 'Invalid Date'
                        ? [dayjs(currentDate[0]), dayjs(currentDate[1])]
                        : [dayjs(currentDate[0]), dayjs(currentDate[1])]
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
