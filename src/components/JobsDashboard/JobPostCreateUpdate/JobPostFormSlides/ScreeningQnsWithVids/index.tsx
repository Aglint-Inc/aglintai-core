import axios from 'axios';
import { get, isEmpty } from 'lodash';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import {
  AvatarModal,
  ScreeningQuestion,
  ScreeningQuestionCard,
} from '@/devlink';
import AUIButton from '@/src/components/Common/AUIButton';
import ScreeningVideoGenerating from '@/src/components/Common/Lotties/ScreeningVideoGenerating';
import MuiPopup from '@/src/components/Common/MuiPopup';
import UITextField from '@/src/components/Common/UITextField';
import UITypography from '@/src/components/Common/UITypography';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { avatar_list } from '@/src/utils/avatarlist';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import Categories from './Categories';
import ToggleBtn from '../utils/UIToggle';
import { QuestionType, useJobForm } from '../../JobPostFormProvider';
import { supabaseWrap } from '../../utils';

const ScreeningQns = () => {
  const { jobForm, handleUpdateFormFields } = useJobForm();

  const totalQns = jobForm.formFields.interviewConfig.reduce((agg, curr) => {
    return agg + curr.questions.length;
  }, 0);

  return (
    <>
      <ScreeningQuestion
        slotIntroductionVideo={<Intro path={'introVideo'} />}
        slotWelcomeMessage={<Intro path={'startVideo'} />}
        slotEndingMessageVideo={<Intro path={'endVideo'} />}
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

function Intro({ path }) {
  const { jobForm, handleUpdateFormFields } = useJobForm();

  const question = get(jobForm, `formFields.${path}`) as QuestionType | null;

  const handleAddQn = () => {
    const defaultQn: QuestionType = {
      id: '',
      question: '',
      videoId: '',
      videoQn: '',
      videoUrl: '',
    };
    handleUpdateFormFields({
      path: path,
      value: defaultQn,
    });
  };

  return (
    <>
      {!question && (
        <AUIButton
          variant='outlined'
          size='small'
          onClick={() => {
            handleAddQn();
          }}
        >
          Add
        </AUIButton>
      )}
      {question && <Video path={path} />}
    </>
  );
}

const Video = ({ path }) => {
  const { jobForm, handleUpdateFormFields } = useJobForm();
  const question = get(jobForm, `formFields.${path}`) as QuestionType;

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

  const handleDeleteQn = () => {
    handleUpdateFormFields({
      path: `${path}`,
      value: null,
    });
  };

  const avatar = (recruiter.ai_avatar as any) || avatar_list[0];
  const handleGenerateVideo = async () => {
    try {
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

  const handleVideoPlay = () => {
    if (!playing) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setPlaying((pre) => !pre);
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

  const isVideoGenerating =
    isEmpty(question.videoUrl) && !isEmpty(question.videoId);
  const isVideoError =
    (!isEmpty(question.question) &&
      !isEmpty(question.videoQn) &&
      question.question !== question.videoQn) ||
    isApiError;
  const isGenerateVisible =
    question.question && !isVideoError && !question.videoId;
  const videoUrl = question.videoUrl;
  const [openPopUp, setOpenPopUP] = useState(false);

  const editMode = showEdit || isEmpty(question.question);
  return (
    <>
      <MuiPopup
        props={{
          open: openPopUp,
          // onClose: handleVideoEnd,
          maxWidth: 'md',
        }}
      >
        <AvatarModal
          textName={avatar.name}
          isPauseIconVisible={playing}
          isPlayIconVisible={!playing}
          onClickPlayPause={{
            onClick: (event: { stopPropagation: () => void }) => {
              event.stopPropagation();
              handleVideoPlay();
            },
          }}
          onClickClose={{
            onClick: (event: { stopPropagation: () => void }) => {
              event.stopPropagation();
              setPlaying(false);
              setOpenPopUP(false);
            },
          }}
          // textName={l.name}
          slotVideo={
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
              autoPlay
            />
          }
        />
      </MuiPopup>

      <div
        onMouseEnter={() => {
          setQnHovered(true);
        }}
        onMouseLeave={() => {
          setQnHovered(false);
        }}
      >
        <ScreeningQuestionCard
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
                  placeholder='Introduction'
                  InputProps={{ autoFocus: true }}
                />
              ) : (
                <UITypography type='small'>{question.question}</UITypography>
              )}
            </>
          }
          onClickEdit={{
            onClick: () => {
              setEditQn(question.question);
              setShowEdit(true);
            },
          }}
          onClickDelete={{
            onClick: () => {
              handleDeleteQn();
            },
          }}
          onClickCancel={{
            onClick: () => {
              isEmpty(question.question) && handleDeleteQn();
              setShowEdit(false);
            },
          }}
          onClickSave={{
            onClick: handleSave,
          }}
          onClickRetry={{
            onClick: () => {
              handleRegenerate();
            },
          }}
          onClickGenerateVideo={{
            onClick: () => {
              handleGenerateVideo();
            },
          }}
          onClickPlay={{
            onClick: () => {
              setOpenPopUP(true);
              setPlaying(true);
            },
          }}
          onClickPause={{
            onClick: handleVideoPlay,
          }}
          slotGeneratingLottie={<ScreeningVideoGenerating />}
          isEditButtonVisible={!showEdit && !isEmpty(question.question)}
          isGenerateButtonVisible={false}
          isSaveButtonVisible={editMode}
          isVideoVisible={jobForm.formFields.videoAssessment}
          isPlayButtonVisible={!playing}
          isPauseButtonVisible={playing}
          isPlayPauseButtonVisible={!isVideoError && videoUrl.length !== 0}
          isGenerateVisible={isGenerateVisible}
          isGeneratingLoaderVisible={isVideoGenerating && !isVideoError}
          isErrorVisible={isVideoError}
          textButtonError={'Regenerate'}
          textError={`Changed question click 'Regenrate'`}
          isActive={isQnHovered}
        />
      </div>
    </>
  );
};
