// this file is not used

function SpeakerLevelLottie({ children, speaking }) {
  return (
    <div>
      <div className='relative flex h-[80px] w-[80px] items-center justify-center rounded-[10px] md:h-[140px] md:w-[140px] md:rounded-full'>
        <div
          className={`absolute flex items-center justify-center rounded-full border-[15px] border-green-100 bg-green-200 ${
            speaking ? 'wave1' : ''
          }`}
          style={{
            width: speaking ? '200px' : '0px',
            height: speaking ? '200px' : '0px',
            maxWidth: '200px',
            maxHeight: '200px',
          }}
        ></div>

        <div className='absolute z-[3]'>{children}</div>
        <div
          className={`absolute z-[2] rounded-full border border-green-300 bg-[var(--neutral-1)] ${
            speaking ? 'blink-layer' : ''
          }`}
        ></div>
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
      </div>
    </div>
  );
}

export default SpeakerLevelLottie;
