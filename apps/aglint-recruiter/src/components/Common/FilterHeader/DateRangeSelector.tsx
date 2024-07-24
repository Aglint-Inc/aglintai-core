import { Popover, Stack } from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { TaskDate } from '@/devlink3/TaskDate';
import DateRange from '@/src/components/Tasks/Components/DateRange';

import { ShowCode } from '../ShowCode';

export type DateRangeSelectorType = {
  name: string;
  values: string[];
  // eslint-disable-next-line no-unused-vars
  setValue: (x: dayjs.Dayjs[]) => void;
};
// eslint-disable-next-line no-unused-vars
function DateRangeSelector({ name, setValue, values }: DateRangeSelectorType) {
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
        isDotVisible={values ? Boolean(values.length) : false}
        isActive={selectedDate.length > 0}
        slotRightIcon={
          <Stack>
            <GlobalIcon
              iconName={anchorEl ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            />
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
                      dayjs(values[0]).toString() == 'Invalid Date'
                        ? [dayjs(values[0]), dayjs(values[1])]
                        : [dayjs(values[0]), dayjs(values[1])]
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
                  <ButtonSoft
                    size={2}
                    color={'neutral'}
                    textButton='Cancel'
                    onClickButton={{
                      onClick: () => {
                        setAnchorEl(null);
                      },
                    }}
                  />
                  <ButtonSolid
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
