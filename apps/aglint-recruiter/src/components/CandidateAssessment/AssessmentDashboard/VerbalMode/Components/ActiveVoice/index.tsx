import { Stack } from '@mui/material';

export function ActiveVoice() {
  return (
    <Stack
      justifyContent={'center'}
      alignItems={'center'}
      direction={'row'}
      // bgcolor={'green.600'}
      width={'30px'}
      height={'30px'}
      borderRadius={'50%'}
      columnGap={0.4}
    >
      <Stack
        className='piece-0'
        borderRadius={'20px'}
        bgcolor={'var(--white-a7'}
        width={4}
        height={11.5}
      ></Stack>
      <Stack
        className='piece-1'
        borderRadius={'20px'}
        bgcolor={'var(--white-a7'}
        width={4.2}
        height={23}
      ></Stack>
      <Stack
        className='piece-2'
        borderRadius={'20px'}
        bgcolor={'var(--white-a7'}
        width={4.2}
        height={11.5}
      ></Stack>
      <style>{`
            .piece-2 {
          animation: any2 2s infinite;     
        }
  
        .piece-1 {
          animation: any1 2s infinite;
        }
  
        .piece-0 {
          animation: any0 1.5s infinite;     
  
        }
        @keyframes any2 {
          0%,
          10%,
          90%,
          100% {
            height: 20px;
            top: -5px;
          }
          45%,
          55% {
            height: 5px;
            top: -15px;
          }
        }
  
        @keyframes any1 {
          0%,
          10%,
          90%,
          100% {
            height: 12.5px;
            top: -5px;
          }
          45%,
          55% {
            height: 25px;
            top: -31px;
          }
        }
  
        @keyframes any0 {
          0%,
          10%,
          90%,
          100% {
            height: 15px;
            top: -5px;
          }
          45%,
          55% {
            height: 5px;
            top: -15px;
          }
        }
            `}</style>
    </Stack>
  );
}
