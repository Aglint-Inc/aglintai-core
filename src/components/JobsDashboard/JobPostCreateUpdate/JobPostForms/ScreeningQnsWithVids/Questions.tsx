import axios from 'axios';
import { get, isEmpty } from 'lodash';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { ScreeningQuestionCard } from '@/devlink';
import ScreeningVideoGenerating from '@/src/components/Common/Lotties/ScreeningVideoGenerating';
import UITextField from '@/src/components/Common/UITextField';
import UITypography from '@/src/components/Common/UITypography';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { avatar_list } from '@/src/utils/avatarlist';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { Drag, Drop } from './dragDrop';
import {
  InterviewConfigType,
  QuestionType,
  useJobForm,
} from '../../JobPostFormProvider';
import { supabaseWrap } from '../../utils';

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
      </Drop>
    </>
  );
};

const Question = ({
  question,
  path,
  handleDeleteQn,
}: {
  question: QuestionType;
  path: string;
  // eslint-disable-next-line no-unused-vars
  handleDeleteQn: (qnId: any) => void;
}) => {
  const { jobForm, handleUpdateFormFields } = useJobForm();
  const [showEdit, setShowEdit] = useState(false);
  const [editQn, setEditQn] = useState(question.question);
  const [playing, setPlaying] = useState(false);
  const { recruiter } = useAuthDetails();
  const [isQnHovered, setQnHovered] = useState(false);
  const [isApiError, setIsApiError] = useState(false);
  const videoRef = useRef(null);

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

  const handleSave = () => {
    if (!editQn) return;
    handleUpdateFormFields({
      path: `${path}.question`,
      value: editQn,
    });
    setShowEdit(false);
  };

  const handleGenerateVideo = async () => {
    try {
      let videoInfo;
      if (process.env.NODE_ENV === 'development') {
        videoInfo = { video_id: 'def5da2177c44b089ccf6fa597cc3c4d' };
      } else {
        const avater = (recruiter.ai_avatar as any) || avatar_list[0];

        let {
          data: { data },
        } = await axios.post('/api/generateVideo', {
          text: question.question,
          avatar_id: get(recruiter, 'ai_avatar.avatar_id', avater.avatar_id),
          voice_id: get(recruiter, 'ai_avatar.voice_id', avater.voice_id),
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

  const handleVideoPlay = () => {
    if (!playing) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setPlaying((pre) => !pre);
  };

  const videoUrl = question.videoUrl;
  const isVideoGenerating =
    isEmpty(question.videoUrl) && !isEmpty(question.videoId);
  const isVideoError =
    (!isEmpty(question.question) &&
      !isEmpty(question.videoQn) &&
      question.question !== question.videoQn) ||
    isApiError;

  return (
    <>
      <div
        onMouseEnter={() => {
          setQnHovered(true);
        }}
        onMouseLeave={() => {
          setQnHovered(false);
        }}
      >
        <ScreeningQuestionCard
          slotInput={
            <>
              {showEdit ? (
                <UITextField
                  multiline
                  fullWidth
                  defaultValue={question.question}
                  value={editQn}
                  onChange={(e) => {
                    setEditQn(e.target.value);
                  }}
                />
              ) : (
                <UITypography type='small'>{question.question}</UITypography>
              )}
            </>
          }
          isEditButtonVisible={!showEdit}
          isGenerateButtonVisible={false}
          isSaveButtonVisible={showEdit}
          onClickEdit={{
            onClick: () => {
              setShowEdit(true);
            },
          }}
          onClickDelete={{
            onClick: () => {
              handleDeleteQn(question.id);
            },
          }}
          onClickCancel={{
            onClick: () => {
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
            onClick: handleVideoPlay,
          }}
          onClickPause={{
            onClick: handleVideoPlay,
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
          isPlayButtonVisible={!playing}
          isPauseButtonVisible={playing}
          isPlayPauseButtonVisible={!isVideoError && videoUrl.length !== 0}
          isGenerateVisible={!question.videoId}
          isGeneratingLoaderVisible={isVideoGenerating}
          isErrorVisible={isVideoError}
          onClickRetry={{
            onClick: () => {
              handleRegenerate();
            },
          }}
          textButtonError={'Regenerate'}
          textError={`Changed question click 'Regenrate'`}
          isActive={isQnHovered}
        />
      </div>
    </>
  );
};

export default Questions;
