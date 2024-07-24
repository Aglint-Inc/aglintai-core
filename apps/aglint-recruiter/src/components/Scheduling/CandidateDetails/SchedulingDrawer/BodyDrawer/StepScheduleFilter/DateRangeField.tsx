import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack } from '@mui/material';
import { DesktopTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { Checkbox } from '@/devlink/Checkbox';
import { RolesPill } from '@/devlink/RolesPill';
import { TimeRangeSelector } from '@/devlink3/TimeRangeSelector';
import toast from '@/src/utils/toast';

import { ClockIcon } from '../../../../Settings/Components/SelectTime';
import { setFilters, useSchedulingFlowStore } from '../../store';

function DateRangeField() {
  const filters = useSchedulingFlowStore((state) => state.filters);

  const [value, setValue] = React.useState<{
    startTime: Date;
    endTime: Date;
  }>(null);

  return (
    <Stack spacing={2}>
      <TimeRangeSelector
        slotButton={
          <ButtonSoft
            size={2}
            isDisabled={!value?.startTime || !value?.endTime}
            textButton={'Add'}
            onClickButton={{
              onClick: () => {
                if (!value) {
                  toast.error('Choose start time and end time then add');
                  return;
                }
                if (
                  dayjsLocal(value.startTime).valueOf() >=
                  dayjsLocal(value.endTime).valueOf()
                ) {
                  toast.error(
                    'Start time End time cannot be same and End time must be greater than start time',
                  );
                  return;
                }

                if (!value?.startTime || !value?.endTime) return;
                setFilters({
                  preferredDateRanges: [
                    ...filters.preferredDateRanges,
                    {
                      startTime: dayjs(value.startTime)?.toISOString(),
                      endTime: dayjs(value.endTime)?.toISOString(),
                    },
                  ],
                });
                setValue({
                  endTime: null,
                  startTime: null,
                });
              },
            }}
          />
        }
        slotSelectedTime={
          filters.preferredDateRanges.length > 0 && (
            <Stack gap={1} direction={'row'} sx={{ flexWrap: 'wrap' }}>
              {filters.preferredDateRanges.map((dateRange, index) => {
                return (
                  <RolesPill
                    textRoles={`${dayjs(dateRange.startTime).format('hh:mm A')} - ${dayjs(dateRange.endTime).format('hh:mm A')}`}
                    key={index}
                    onClickRemoveRoles={{
                      onClick: () => {
                        setFilters({
                          preferredDateRanges:
                            filters.preferredDateRanges.filter(
                              (range) =>
                                range.startTime !== dateRange.startTime,
                            ),
                        });
                      },
                    }}
                  />
                );
              })}
            </Stack>
          )
        }
        slotCheckbox={<Checkbox />}
        isMultiDay={false}
        slotTimeinputs={
          <Stack direction={'row'} spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopTimePicker
                value={value?.startTime}
                onAccept={(value) => {
                  setValue((prev) => ({
                    startTime: value,
                    endTime: prev?.endTime,
                  }));
                }}
                format='hh:mm A'
                slots={{
                  openPickerIcon: ClockIcon,
                }}
                sx={{
                  width: '100%',
                  '& input': {
                    height: '17px',
                    fontSize: '14px',
                  },
                }}
              />
            </LocalizationProvider>{' '}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopTimePicker
                value={value?.endTime}
                onAccept={(value) => {
                  setValue((prev) => ({
                    startTime: prev?.startTime,
                    endTime: value,
                  }));
                }}
                format='hh:mm A'
                slots={{
                  openPickerIcon: ClockIcon,
                }}
                sx={{
                  width: '100%',
                  '& input': {
                    height: '17px',
                    fontSize: '14px',
                  },
                }}
              />
            </LocalizationProvider>
          </Stack>
        }
        textDay={'Day'}
      />
    </Stack>
  );
}

export default DateRangeField;
