/* eslint-disable no-unused-vars */
import { Popover, Stack, Typography } from '@mui/material';
import {
  LocalizationProvider,
  renderTimeViewClock,
  StaticDateTimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState } from 'react';

import { TaskDate } from '@/devlink3/TaskDate';
import { ShowCode } from '@/src/components/Common/ShowCode';

import { useTaskStatesContext } from '../../../TaskStatesContext';

function TriggerTime({
  selectTriggerTime,
  setSelectTriggerTime,
  isOptionList = true,
  openTriggerTime,
  setOpenTriggerTime,
  onChange,
}: {
  selectTriggerTime: string;
  setSelectTriggerTime: (x: string) => void;
  isOptionList?: boolean;
  openTriggerTime: null;
  setOpenTriggerTime: any;
  onChange?: any;
}) {
  const { isImmediate, setIsImmediate } = useTaskStatesContext();

  const handleClick = (event: any) => {
    setOpenTriggerTime(event.currentTarget);
  };

  const handleClose = () => {
    setOpenTriggerTime(null);
  };

  const open = Boolean(openTriggerTime);
  const id = open ? 'simple-popover' : undefined;

  const localTime = new Date().toTimeString();
  const timeZonea = localTime.substring(
    localTime.lastIndexOf('(') + 1,
    localTime.lastIndexOf(')'),
  );
  const timezone = timeZonea
    .split(' ')
    .map((ele) => ele[0])
    .join('');

  return (
    <>
      <Stack width={'100%'} onClick={handleClick}>
        <ShowCode>
          <ShowCode.When isTrue={!!selectTriggerTime}>
            <ShowCode>
              <ShowCode.When isTrue={isImmediate}>
                <Typography
                  sx={{
                    cursor: 'pointer',
                  }}
                  variant='caption'
                  fontSize={'14px'}
                >
                  Immediately
                </Typography>
              </ShowCode.When>
              <ShowCode.When isTrue={!isImmediate}>
                {`${dayjs(selectTriggerTime).format('MMM DD, YYYY hh:mm A')} (${timezone})`}
              </ShowCode.When>
            </ShowCode>
          </ShowCode.When>
          <ShowCode.Else>
            <Typography
              sx={{
                cursor: 'pointer',
              }}
              variant='caption'
              fontSize={'14px'}
            >
              Select Date
            </Typography>
          </ShowCode.Else>
        </ShowCode>
      </Stack>
      <Popover
        id={id}
        open={open && isOptionList}
        anchorEl={openTriggerTime}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            border: 'none',
          }
      
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
              setSelectTriggerTime(dayjs().add(5, 'minute').toString());
              if (onChange) {
                onChange(dayjs().add(5, 'minute').toString());
              }
              handleClose();
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
                        setSelectTriggerTime(e);
                        setOpenTriggerTime(null);
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
