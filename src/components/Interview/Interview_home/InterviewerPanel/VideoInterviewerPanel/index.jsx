import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { InterviewInterviewerScreen } from '@/devlink';
import { useInterviewContext } from '@/src/context/InterviewContext';
import { useInterviewDetailsContext } from '@/src/context/InterviewDetails';
import { supabase } from '@/src/utils/supabaseClient';

function VideoInterviewerPanel() {
  const {
    totalNumberOfQuestions,
    questionIndex,

    video_Ids,
    video_Urls,
    videoRef,
    videoLoad,
    setVideoLoad,
    handleVideoEnd,
    handleVideoPlay,
    speaking,
    listening,
    handleVideoPause,
  } = useInterviewContext();

  const { jobDetails } = useInterviewDetailsContext();

  const [videoUrl, setVideoUrl] = useState('');
  const [character, setCharacter] = useState('');

  async function fetchVideo(id) {
    const { data, error } = await supabase
      .from('ai_videos')
      .select()
      .eq('video_id', id);
    if (!error) {
      setVideoUrl(data[0].file_url);
      return data[0];
    }
  }
  useEffect(() => {
    if (questionIndex === 0) {
      // console.log('video12345');

      fetchVideo(jobDetails.start_video.videoId);
      return;
    }

    if (questionIndex === totalNumberOfQuestions.length - 1) {
      // console.log('video12345');

      fetchVideo(jobDetails.end_video.videoId);
      return;
    }

    if (
      questionIndex !== 0 &&
      questionIndex !== totalNumberOfQuestions.length - 1
    ) {
      getVideoUrl();
    }
  }, [questionIndex]);

  async function getVideoUrl() {
    setVideoUrl(
      video_Urls
        .filter((ele) => ele.includes(video_Ids[Number(questionIndex - 1)]))[0]
        .split('.mp4')[0] + '.mp4',
    );
  }

  useEffect(() => {
    if (!videoLoad) {
      printCharactersOneByOne(
        totalNumberOfQuestions[Number(questionIndex)],
        50,
      );
    }
  }, [videoLoad, questionIndex]);
  function printCharactersOneByOne(inputString, delay = 100) {
    let index = 0;
    function printNextCharacter() {
      if (index < inputString.length) {
        const character = inputString.charAt(index);
        setCharacter((pre) => pre + character);
        index++;
        setTimeout(printNextCharacter, delay);
      }
    }

    printNextCharacter();
  }

  function videoLoaded() {
    setVideoLoad(false);
  }
  return (
    <>
      <InterviewInterviewerScreen
        isPlayPauseVisible={true}
        isPauseButtonVisible={speaking}
        isPlayButtonVisible={!listening && !speaking}
        onClickPlay={{
          onClick: () => {
            handleVideoPlay();
            videoRef.current.play();
          },
        }}
        onClickPause={{
          onClick: () => {
            handleVideoPause();
            videoRef.current.pause();
          },
        }}
        slotAiVideo={
          <>
            {videoLoad && 'Loading...'}
            <Stack
              display={videoLoad ? 'none' : 'flex'}
              width={'444px'}
              height={'264px'}
            >
              <video
                onLoadedData={videoLoaded}
                ref={videoRef}
                autoPlay
                src={videoUrl}
                onEnded={() => {
                  setCharacter('');
                  handleVideoEnd();
                }}
                style={{
                  height: '100%',
                  objectFit: 'cover',
                }}
              >
                <track kind='captions' srclang='en' label='English' default />
              </video>
            </Stack>
          </>
        }
        textQuestion={`Question: ${questionIndex + 1}/${
          totalNumberOfQuestions?.length
        }`}
        textAi={
          !videoLoad
            ? character || totalNumberOfQuestions[Number(questionIndex)]
            : 'Loading...'
        }
      />
    </>
  );
}

export default VideoInterviewerPanel;
