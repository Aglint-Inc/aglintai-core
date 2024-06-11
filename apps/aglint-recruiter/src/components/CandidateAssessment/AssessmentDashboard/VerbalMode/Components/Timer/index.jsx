import { Chip, Stack, Typography } from '@mui/material';
function Timer({ introStep, getminutes, getSecound, timeOut }) {
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
        label={
          <Stack alignItems={'center'} spacing={0.5} direction={'row'}>
            {introStep !== 2 && (
              <Stack
                className={timeOut ? '' : 'timmer'}
                bgcolor={timeOut ? 'red.500' : 'lime.400'}
                borderRadius={'50%'}
                width={'6px'}
                height={'6px'}
              ></Stack>
            )}
            <Typography
              className={timeOut ? 'timmer' : ''}
              color={timeOut ? 'red.500' : 'white.600'}
              variant='body1'
            >
              {getminutes < 10 && '0'}
              {getminutes} : {getSecound < 10 && '0'}
              {getSecound}
            </Typography>
          </Stack>
        }
        variant='outlined'
      />
    </Stack>
  );
}

export default Timer;
