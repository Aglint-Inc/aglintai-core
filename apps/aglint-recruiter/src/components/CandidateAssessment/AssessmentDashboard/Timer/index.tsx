import { Chip, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
let formattedTime;
let timerInterval;
function Timer({ maxTime, nextClick }) {
  const [time, setTime] = useState(null);
  const timeOut = false;
  function startTimer(durationInMinutes) {
    let durationInSeconds = durationInMinutes * 60;

    timerInterval = setInterval(() => {
      const remainingTime = dayjs()
        .startOf('day')
        .add(durationInSeconds, 'seconds');
      formattedTime = remainingTime.format('mm:ss');

      setTime(formattedTime);

      if (durationInSeconds <= 0) {
        nextClick();
        clearInterval(timerInterval);
      } else {
        durationInSeconds--;
      }
    }, 1000);
  }

  useEffect(() => {
    clearInterval(timerInterval);
    if (maxTime?.duration) {
      startTimer(maxTime?.duration || 0);
    }
  }, [maxTime?.question_id]);

  return (
    <Stack>
      <style>
        {`
        .timmer {
        animation: blink 1.5s infinite;     

      }
      @keyframes blink {
        0%,
        10%,
        90%,
        100% {
          opacity: 0;
        }
        45%,
        55% {
            opacity: 1;
        }
      }
        `}
      </style>
      <Chip
        sx={{
          borderColor: 'grey.200',
          color: 'black.700',
          height: '25px',
          bgcolor: 'white.700',
        }}
        label={
          <Stack alignItems={'center'} spacing={0.5} direction={'row'}>
            <Stack
              className={timeOut ? '' : 'timmer'}
              bgcolor={timeOut ? 'red.500' : 'lime.400'}
              borderRadius={'50%'}
              width={'6px'}
              height={'6px'}
            ></Stack>

            <Typography
              className={timeOut ? 'timmer' : ''}
              color={timeOut ? 'red.500' : 'white.600'}
              variant='body1'
            >
              {time || '00:00'}
            </Typography>
          </Stack>
        }
        variant='outlined'
      />
    </Stack>
  );
}

export default Timer;
