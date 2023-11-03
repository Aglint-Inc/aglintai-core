import axios from 'axios';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { ScreeningQuestion, ScreeningQuestionCard } from '@/devlink';
import ScreeningVideoGenerating from '@/src/components/Common/Lotties/ScreeningVideoGenerating';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { avatar_list } from '@/src/utils/avatarlist';
import toast from '@/src/utils/toast';

import Categories from './Categories';
import ToggleBtn from '../utils/UIToggle';
import { useJobForm } from '../../JobPostFormProvider';
import { getVideo } from '../../utils';

const ScreeningQns = () => {
  const { jobForm, handleUpdateFormFields } = useJobForm();

  const totalQns = jobForm.formFields.interviewConfig.reduce((agg, curr) => {
    return agg + curr.questions.length;
  }, 0);

  return (
    <>
      <ScreeningQuestion
        slotIntroductionVideo={<IntroVideo category={'introVideo'} />}
        slotWelcomeMessage={<IntroVideo category={'startVideo'} />}
        slotEndingMessageVideo={<IntroVideo category={'endVideo'} />}
        textQuestionCount={totalQns}
        slotAssessmentQuestion={
          <>
            <Categories />
          </>
        }
        slotToggleAssessment={
          <ToggleBtn
            handleChange={(newVal) => {
              handleUpdateFormFields({
                path: 'videoAssessment',
                value: newVal,
              });
            }}
            isChecked={jobForm.formFields.videoAssessment}
          />
        }
      />
    </>
  );
};

export default ScreeningQns;

// intro video

function IntroVideo({ category }) {
  const { handleUpdateFormFields, jobForm } = useJobForm();
  const { recruiter } = useAuthDetails();
  const avatar = recruiter.ai_avatar || (avatar_list[0] as any);
  const introRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoGenerating, setIsVideoGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [playing, setPlaying] = useState(false);
  const question =
    category === 'introVideo'
      ? jobForm.formFields.introVideo
      : category === 'startVideo'
      ? jobForm.formFields.startVideo
      : jobForm.formFields.endVideo;
  async function handleGenerateVideo() {
    if (introRef.current.value === '') {
      toast.warning('Please provide intro!');
      return;
    }
    if (introRef.current.value.trim() === question?.question?.trim()) {
      toast.warning('Edit message to before changes!');

      return;
    }
    if (introRef.current.value.split(' ').length < 10) {
      toast.warning('Your intro text should have at least 10 words!');
      return;
    }

    if (jobForm.formFields.videoAssessment) {
      setVideoUrl('');
      setIsVideoGenerating(true);
      await axios
        .post('/api/generateVideo', {
          text: introRef.current.value,
          avatar_id: avatar.avatar_id,
          voice_id: avatar.voice_id,
        })
        .then(({ data }) => {
          const {
            data: { video_id },
          } = data;

          if (category === 'introVideo') {
            handleUpdateFormFields({
              path: 'introVideo',
              value: {
                id: nanoid(),
                question: introRef.current.value,
                videoId: video_id,
              },
            });
          }

          if (category === 'startVideo') {
            handleUpdateFormFields({
              path: 'startVideo',
              value: {
                id: nanoid(),
                question: introRef.current.value,
                videoId: video_id,
              },
            });
          }
          if (category === 'endVideo') {
            handleUpdateFormFields({
              path: 'endVideo',
              value: {
                id: nanoid(),
                question: introRef.current.value,
                videoId: video_id,
              },
            });
          }
          setIsVideoGenerating(false);
        });

      // const data = {
      //   event_type: 'avatar_video.success',
      //   event_data: {
      //     video_id: '4b87b06344d84a7bb60a984f5358915f',
      //     url: 'https://files.movio.la/aws_pacific/avatar_tmp/0e3424a56e5b47eba6a60cb326bb0c15/cc346b61-7ace-467c-b6a6-dda6bc174f5b.mp4?Expires=1699337550&Signature=VAaPtebxmZtT5PCOpK12YspME~mBOuMjK1wASRKXknClE9cSyAp-b7GYWe2NjXnOm2qWGYBGP9I4fX551LYjOp3xc78w80PaXR71iysRRPGA54UT6nXqFmVUIbLg2KWtwHZmkRhx5hg0JOTMz9Pkbnbik9aPVSmqndQVPwLVdKBW4tOtHgUXfZFxI1UE6td0RxdNU4EMi5HUXKy34feRPq~ErECve-pImGpmZMfa~b9lKVDVWphX9JUAOJwWjnbKhXDX4A8zUVlHMeGMFF8D3QgcsuzRhWhTebjJxZgYjjoFUtbvWHyeQcVx54r-qfYwaGFVEFZqlq7qNVJic~oLow__&Key-Pair-Id=K49TZTO9GZI6K',
      //     callback_id: null,
      //   },
      // };
      // const video_id = data.event_data.video_id;
      // handleUpdateFormFields({
      //   path: 'introVideo',
      //   value: {
      //     id: nanoid(),
      //     question: introRef.current.value,
      //     videoId: video_id,
      //   },
      // });
      setIsVideoGenerating(false);
    } else {
      if (category === 'introVideo') {
        handleUpdateFormFields({
          path: 'introVideo',
          value: {
            id: nanoid(),
            question: introRef.current.value,
            videoId: '',
          },
        });
      }

      if (category === 'startVideo') {
        handleUpdateFormFields({
          path: 'startVideo',
          value: {
            id: nanoid(),
            question: introRef.current.value,
            videoId: '',
          },
        });
      }
      if (category === 'endVideo') {
        handleUpdateFormFields({
          path: 'endVideo',
          value: {
            id: nanoid(),
            question: introRef.current.value,
            videoId: '',
          },
        });
      }
      toast.success('Successfully created');
    }
  }
  const handleVideoPlay = () => {
    if (!playing) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setPlaying((pre) => !pre);
  };

  useEffect(() => {
    if (category === 'introVideo' && jobForm.formFields.introVideo?.videoId)
      getVideoIntroVideo(jobForm.formFields.introVideo?.videoId);
    if (category === 'startVideo' && jobForm.formFields.startVideo?.videoId)
      getVideoIntroVideo(jobForm.formFields.startVideo?.videoId);
    if (category === 'endVideo' && jobForm.formFields.endVideo?.videoId)
      getVideoIntroVideo(jobForm.formFields.endVideo?.videoId);
  }, [jobForm.formFields]);

  async function getVideoIntroVideo(id) {
    const questionObj = await getVideo(id);
    setVideoUrl(questionObj?.file_url || '');
  }

  // const handleRegenerate = () => {
  //   setVideoUrl('');
  //   handleUpdateFormFields({
  //     path: `introVideo`,
  //     value: '',
  //   });
  //   handleGenerateVideo();
  // };
  return (
    <ScreeningQuestionCard
      slotInput={
        <>
          <UITextField
            multiline
            fullWidth
            defaultValue={question?.question}
            // value={editQn}
            // onChange={(e) => {
            //   setEditQn(e.target.value);
            // }}
            ref={introRef}
          />
        </>
      }
      // onClickEdit={{
      //   onClick: () => {
      //     setShowEdit(true);
      //   },
      // }}
      // onClickDelete={{
      //   onClick: () => {
      //     setShowEdit(true);
      //   },
      // }}
      // onClickCancel={{
      //   onClick: () => {
      //     setShowEdit(false);
      //   },
      // }}
      // onClickSave={{
      //   onClick: handleSave,
      // }}
      // slotEmptyVideo={}
      onClickGenerate={{
        onClick: () => {
          handleGenerateVideo();
        },
      }}
      onClickPlay={{
        onClick: handleVideoPlay,
      }}
      onClickPause={{
        onClick: handleVideoPlay,
      }}
      slotVideo={
        videoUrl ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            src={videoUrl}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            ref={videoRef}
            onEnded={() => {
              setPlaying(false);
            }}
          />
        ) : (
          <Image
            src={'/images/EmptyVideo.png'}
            width={250}
            height={145}
            alt=''
            style={{
              objectFit: 'cover',
            }}
          />
        )
      }
      isVideoVisible={jobForm.formFields.videoAssessment}
      // isEditButtonVisible={!showEdit}
      slotGeneratingLottie={<ScreeningVideoGenerating />}
      isGeneratingLoaderVisible={
        isVideoGenerating || (!videoUrl && question?.videoId ? true : false)
      }
      isGenerateButtonVisible={true}
      isPlayPauseButtonVisible={videoUrl.length > 0}
      // isSaveButtonVisible={showEdit}

      isPlayButtonVisible={!playing}
      isPauseButtonVisible={playing}
      isGenerateVisible={false}
      // isErrorVisible={
      //   question.videoQn && question.question !== question.videoQn
      // }
      // onClickRetry={{
      //   onClick: () => {
      //     handleRegenerate();
      //   },
      // }}
      textButtonError={'Regenerate'}
      textError={`Changed question click 'Regenerate'`}
    />
  );
}
