import { Popover, Stack } from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import { Calendar } from '@/components/ui/calendar';
import { ButtonGhost } from '@/devlink/ButtonGhost';
import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { TaskDate } from '@/devlink3/TaskDate';

import DateRange from '../DateRange';
import { ShowCode } from '../ShowCode';

export type DateRangeSelectorType = {
  name: string;
  values: string[];
  // eslint-disable-next-line no-unused-vars
  setValue: (x: dayjs.Dayjs[]) => void;
  disablePast?: boolean;
};
// eslint-disable-next-line no-unused-vars
function DateRangeSelector({
  name,
  setValue,
  values,
  disablePast = true,
}: DateRangeSelectorType) {
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
        textLabel={name}
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
                      if (e.to) {
                        setSelectedDate([dayjs(e.from), dayjs(e.to)]);
                      }
                    }}
                    value={{
                      from: dayjs(values[0]).isValid()
                        ? dayjs(values[0]).toDate()
                        : undefined,
                      to: dayjs(values[1]).isValid()
                        ? dayjs(values[1]).toDate()
                        : undefined,
                    }}
                  />
                </ShowCode.When>
                <ShowCode.Else>
                  <Calendar
                    mode='single'
                    selected={selectedDate[0]?.toDate()}
                    onSelect={(date) => setSelectedDate([dayjs(date)])}
                    disabled={(date) =>
                      disablePast &&
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                  />
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
