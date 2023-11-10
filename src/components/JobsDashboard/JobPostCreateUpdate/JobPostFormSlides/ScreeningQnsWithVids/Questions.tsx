import axios from 'axios';
import { get, isEmpty } from 'lodash';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { CategoriesEmptyState, ScreeningQuestionCard } from '@/devlink';
import ScreeningVideoGenerating from '@/src/components/Common/Lotties/ScreeningVideoGenerating';
import MuiPopup from '@/src/components/Common/MuiPopup';
import UITextField from '@/src/components/Common/UITextField';
import UITypography from '@/src/components/Common/UITypography';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { avatar_list } from '@/src/utils/avatarlist';
import interviewerList from '@/src/utils/interviewer_list';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { Drag, Drop } from './dragDrop';
import QuestionVideoPlayer from './QuestionVideoPlayer';
import {
  InterviewConfigType,
  QuestionType,
  useJobForm,
} from '../../JobPostFormProvider';
import { API_FAIL_MSG, supabaseWrap } from '../../utils';

const Questions = ({
  questions,
  categIdx,
  categId,
}: {
  categIdx: number;
  questions: InterviewConfigType['questions'];
  categId: string;
}) => {
  const { handleUpdateFormFields } = useJobForm();
  const handleDeleteQn = (qnId) => {
    const updatedQns = questions.filter((q) => q.id !== qnId);
    handleUpdateFormFields({
      path: `interviewConfig[${categIdx}].questions`,
      value: updatedQns,
    });
  };

  return (
    <>
      <Drop id={categId} type='questions'>
        {questions.map((q, index) => {
          return (
            <>
              {
                <Drag key={q.id} id={q.id} index={index}>
                  <Question
                    question={q}
                    key={q.id}
                    path={`interviewConfig[${categIdx}].questions[${index}]`}
                    handleDeleteQn={handleDeleteQn}
                  />
                </Drag>
              }
            </>
          );
        })}
        {questions.length === 0 && <CategoriesEmptyState />}
      </Drop>
    </>
  );
};

export const Question = ({
  question,
  path,
  handleDeleteQn,
  componentType = 'question',
}: {
  question: QuestionType;
  path: string;
  // eslint-disable-next-line no-unused-vars
  handleDeleteQn: (qnId: any) => void;
  componentType?: 'question' | 'intro' | 'welcome' | 'end';
}) => {
  const { jobForm, handleUpdateFormFields } = useJobForm();
  const [showEdit, setShowEdit] = useState(false);
  const [editQn, setEditQn] = useState(question.question);
  const { recruiter } = useAuthDetails();
  const [isApiError, setIsApiError] = useState(false);
  const videoRef = useRef(null);
  const [isAudioPlaying, setIsAudioplaying] = useState(false);
  const audioRef = useRef(new Audio());
  useEffect(() => {
    (async () => {
      try {
        const [d] = supabaseWrap(
          await supabase
            .from('ai_videos')
            .select()
            .eq('video_id', question.videoId),
        );
        if (d) {
          handleUpdateFormFields({
            path: `${path}.videoUrl`,
            value: d.file_url,
          });
        }
      } catch (err) {
        toast.error('Something went wrong. Please try again');
      }
    })();
  }, []);

  const qninfo = get(jobForm.formFields, path) as QuestionType;
  const handleSave = () => {
    if (!editQn) return;
    handleUpdateFormFields({
      path: `${path}.question`,
      value: editQn,
    });
    setShowEdit(false);
  };

  const avatar = (recruiter.ai_avatar as any) || avatar_list[0];
  const handleGenerateVideo = async () => {
    try {
      if (!question.question) return;
      let videoInfo;
      if (process.env.NODE_ENV === 'development') {
        videoInfo = { video_id: 'def5da2177c44b089ccf6fa597cc3c4d' };
      } else {
        let {
          data: { data },
        } = await axios.post('/api/generateVideo', {
          text: question.question,
          avatar_id: get(recruiter, 'ai_avatar.avatar_id', avatar.avatar_id),
          voice_id: get(recruiter, 'ai_avatar.voice_id', avatar.voice_id),
          test: recruiter.email == 'ravi+test@aglinthq.com' ? false : true,
        });
        videoInfo = data;
      }

      const updatedQn: QuestionType = {
        ...question,
        videoId: videoInfo.video_id,
        videoQn: question.question,
        videoUrl: '',
      };

      handleUpdateFormFields({
        path: `${path}`,
        value: {
          ...updatedQn,
        },
      });
    } catch (err) {
      setIsApiError(true);
      toast.error('Something went wrong please try again');
    }
  };

  const handleRegenerate = async () => {
    const updateQn: QuestionType = {
      ...question,
      videoId: '',
      videoUrl: '',
    };
    handleUpdateFormFields({
      path: path,
      value: { ...updateQn },
    });
    handleGenerateVideo();
  };

  const videoUrl = question.videoUrl;
  const isVideoGenerating =
    isEmpty(question.videoUrl) && !isEmpty(question.videoId);
  const isVideoError =
    (!isEmpty(question.question) &&
      !isEmpty(question.videoQn) &&
      question.question !== question.videoQn) ||
    isApiError;
  const isGenerateVisible = !isVideoError && !question.videoId;
  const [openPopUp, setOpenPopUp] = useState(false);
  const isSaveBtnVisible = showEdit || isEmpty(question.question);
  const isVideoEnable =
    componentType === 'intro' ? true : jobForm.formFields.videoAssessment;

  const handlePlayAudio = async () => {
    try {
      if (isAudioPlaying) {
        audioRef.current.pause();
        setIsAudioplaying(false);
        return;
      }
      const voice = interviewerList[recruiter.audio_avatar_id].voice;
      const resp = await fetch(
        'https://us-west1-aglint-cloud-381414.cloudfunctions.net/text-to-speech',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip',
          },
          body: JSON.stringify({
            data: {
              audioConfig: {
                audioEncoding: 'LINEAR16',

                pitch: 0,
                speakingRate: 0.9,
              },
              input: {
                text: qninfo.question,
              },
              voice: voice,
            },
          }),
        },
      );
      const data = await resp.json();
      const audioContent = data.audioContent;
      const audioDataUrl = `data:audio/mp3;base64,${audioContent}`;
      audioRef.current.src = audioDataUrl;
      setIsAudioplaying(true);
      audioRef.current.play();
      audioRef.current.addEventListener('ended', () => {
        setIsAudioplaying(false);
      });
    } catch (err) {
      toast.error(API_FAIL_MSG);
    } finally {
      //
    }
  };

  return (
    <>
      <MuiPopup
        props={{
          open: openPopUp,
          // onClose: handleVideoEnd,
          maxWidth: 'md',
        }}
      >
        <QuestionVideoPlayer
          avatarName={avatar.name}
          setOpenPopUp={setOpenPopUp}
          videoUrl={videoUrl}
        />
      </MuiPopup>

      <ScreeningQuestionCard
        slotInput={
          <>
            {showEdit || isEmpty(question.question) ? (
              <UITextField
                multiline
                fullWidth
                defaultValue={question.question}
                value={editQn}
                onChange={(e) => {
                  setEditQn(e.target.value);
                }}
                InputProps={{
                  autoFocus: true,
                }}
              />
            ) : (
              <UITypography type='small'>{question.question}</UITypography>
            )}
          </>
        }
        isDeleteVisible={componentType === 'question'}
        isEditButtonVisible={!isSaveBtnVisible}
        isGenerateButtonVisible={false}
        isSaveButtonVisible={isSaveBtnVisible}
        onClickEdit={{
          onClick: () => {
            setEditQn(question.question);
            setShowEdit(true);
          },
        }}
        onClickDelete={{
          onClick: () => {
            setEditQn('');
            handleDeleteQn(question.id);
          },
        }}
        onClickCancel={{
          onClick: () => {
            setEditQn('');
            setShowEdit(false);
          },
        }}
        onClickSave={{
          onClick: handleSave,
        }}
        // slotEmptyVideo={}
        onClickGenerateVideo={{
          onClick: () => {
            handleGenerateVideo();
          },
        }}
        onClickPlay={{
          onClick: () => {
            setOpenPopUp(true);
          },
        }}
        slotGeneratingLottie={<ScreeningVideoGenerating />}
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
            />
          ) : (
            <Image
              src={'/images/EmptyVideo.svg'}
              width={256}
              height={150}
              alt=''
              style={{
                objectFit: 'cover',
                transform: 'translate(0px, -5px)',
              }}
            />
          )
        }
        isVideoVisible={isVideoEnable}
        isPlayButtonVisible={true}
        isPauseButtonVisible={false}
        isPlayPauseButtonVisible={!isVideoError && videoUrl.length !== 0}
        isGenerateVisible={isGenerateVisible}
        isGeneratingLoaderVisible={isVideoGenerating && !isVideoError}
        isErrorVisible={isVideoError}
        onClickRetry={{
          onClick: () => {
            handleRegenerate();
          },
        }}
        textButtonError={'Regenerate'}
        textError={`Changed question click 'Regenrate'`}
        isActive={componentType === 'question'}
        isAudioVisible={!isVideoEnable}
        isMicVisible={!isVideoEnable}
        slotAudioAvatar={
          <>
            {!isVideoEnable && (
              <>
                <Image
                  src={`${interviewerList[recruiter.audio_avatar_id].image}`}
                  width={80}
                  height={80}
                  alt=''
                />
              </>
            )}
          </>
        }
        isAudioPauseVisible={isAudioPlaying}
        onClickAudioPlayPause={{
          onClick: handlePlayAudio,
        }}
        isAudioPlayVisible={!isAudioPlaying}
      />
    </>
  );
};

export default Questions;
