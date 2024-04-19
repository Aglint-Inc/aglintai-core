/* eslint-disable no-unused-vars */
import { Popover, Stack } from '@mui/material';
import {
  LocalizationProvider,
  renderTimeViewClock,
  StaticDateTimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState } from 'react';

import { TaskDate } from '@/devlink3';
import { ShowCode } from '@/src/components/Common/ShowCode';

import { useTaskStatesContext } from '../../../TaskStatesContext';

function TriggerTime({
  selectTriggerTime,
  setSelectTriggerTime,
  isOptionList = true,
}: {
  selectTriggerTime: string;
  setSelectTriggerTime: (x: string) => void;
  isOptionList?: boolean;
}) {
  const { isImmediate, setIsImmediate } = useTaskStatesContext();
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
        <ShowCode>
          <ShowCode.When isTrue={!!selectTriggerTime}>
            <ShowCode>
              <ShowCode.When isTrue={isImmediate}>
                {'Immediately'}
              </ShowCode.When>
              <ShowCode.When isTrue={!isImmediate}>
                {`${dayjs(selectTriggerTime).format('DD MMM YYYY, hh:mm')}`}
              </ShowCode.When>
            </ShowCode>
          </ShowCode.When>
          <ShowCode.Else>Select Date</ShowCode.Else>
        </ShowCode>
      </Stack>
      <Popover
        id={id}
        open={open && isOptionList}
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
          textButton1='Immediately'
          textButton2={'Select Date'}
          onClickInDateRange={{
            onClick: () => {
              setIsImmediate(false);
            },
          }}
          onClickSpecificDate={{
            onClick: () => {
              setIsImmediate(true);
              setSelectTriggerTime(String(new Date()));
            },
          }}
          isInDateRangeActive={!isImmediate}
          isSpecificDateActive={isImmediate}
          slotDate={
            <>
              <ShowCode>
                <ShowCode.When isTrue={!isImmediate}>
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
                </ShowCode.When>
                <ShowCode.Else>
                  <Stack p={2}>{'Task will be triggered immediately'}</Stack>
                </ShowCode.Else>
              </ShowCode>
            </>
          }
        />
      </Popover>
    </>
  );
}

export default TriggerTime;
