// this file is not used
import { Stack } from '@mui/material';

function SpeakerLevelLottie({ children, speaking }) {
  return (
    <div>
      <Stack
        borderRadius={{ xs: '10px', md: '50%' }}
        height={{ xs: '80px', md: '140px' }}
        width={{ xs: '80px', md: '140px' }}
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        position={'relative'}
      >
        <Stack
          borderRadius={'50%'}
          bgcolor={'green.200'}
          sx={{
            width: speaking ? `${200}px` : '0px',
            height: speaking ? ` ${200}px` : '',
            maxWidth: 200,
            maxHeight: 200,
          }}
          position={'absolute'}
          direction={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          border={'15px solid'}
          borderColor={'green.100'}
          className={speaking ? 'wave1' : ''}
        ></Stack>

        <Stack position={'absolute'} zIndex={3}>
          {children}
        </Stack>
        <Stack
          borderRadius={'50%'}
          className={speaking ? 'blink-layer' : ''}
          border={'1px solid'}
          borderColor={'green.300'}
          position={'absolute'}
          zIndex={2}
          bgcolor={'var(--neutral-1)'}
        ></Stack>
        <style>{`
        .blink-layer{
          animation: blinkLayer 2s infinite;
        }
        @keyframes blinkLayer {
         0%{width: 50px; height: 50px; opacity:1;}
         70%{opacity:0.5;}
          100%{width: 200px; height: 200px; opacity:0;} 
        }
        .wave1{
          animation: waveAnime 2.5s infinite;
  
        }
        @keyframes waveAnime{
          0%{width: 180px; height: 180px;}
           50%{width: 200px; height: 200px;} 
          100%{width: 180px; height: 180px;}
  
        }
        `}</style>
      </Stack>
    </div>
  );
}

export default SpeakerLevelLottie;
