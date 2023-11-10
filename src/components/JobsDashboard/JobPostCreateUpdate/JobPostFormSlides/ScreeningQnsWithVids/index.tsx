import { pageRoutes } from '@utils/pageRouting';
import { get } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';

import {
  AssessmentScrollMenu,
  AudioSwitcherCard,
  ScreeningQuestion,
  VideoSwitcherCard,
} from '@/devlink';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { avatar_list } from '@/src/utils/avatarlist';
import interviewerList from '@/src/utils/interviewer_list';

import AIgeninstructionVideo from './AIgeninstructionVideo';
import Categories from './Categories';
import { Question } from './Questions';
import UploadInstructionVideo from './UploadInstructionVideo';
import ToggleBtn from '../utils/UIToggle';
import { QuestionType, useJobForm } from '../../JobPostFormProvider';

const ScreeningQns = () => {
  const { recruiter } = useAuthDetails();
  const { jobForm, handleUpdateFormFields } = useJobForm();
  const totalQns = jobForm.formFields.interviewConfig.reduce((agg, curr) => {
    return agg + curr.questions.length;
  }, 0);

  const interviewSetting = jobForm.formFields.interviewSetting;
  const router = useRouter();

  const videAvatar = recruiter.ai_avatar as any;

  return (
    <>
      <ScreeningQuestion
        onClickUpload={{
          onClick: () => {
            handleUpdateFormFields({
              path: 'interviewSetting.isVideoAiGenerated',
              value: false,
            });
          },
        }}
        onClickGenerateAi={{
          onClick: () => {
            handleUpdateFormFields({
              path: 'interviewSetting.isVideoAiGenerated',
              value: true,
            });
          },
        }}
        isUploadChecked={!interviewSetting.isVideoAiGenerated}
        isGenerateWithAiChecked={interviewSetting.isVideoAiGenerated}
        slotUpload={
          <>
            {!interviewSetting.isVideoAiGenerated ? (
              <UploadInstructionVideo />
            ) : (
              <AIgeninstructionVideo />
            )}
          </>
        }
        slotToggleInstructionVideo={
          <ToggleBtn
            handleChange={() => {
              handleUpdateFormFields({
                path: 'interviewSetting.showInstructionVideo',
                value:
                  !jobForm.formFields.interviewSetting.showInstructionVideo,
              });
            }}
            isChecked={interviewSetting.showInstructionVideo}
          />
        }
        isUploadVisible={interviewSetting.showInstructionVideo}
        slotInstructionsBrief={
          <>
            <TipTapAIEditor
              initialValue={jobForm.formFields.interviewInstrctions}
              handleChange={(s) => {
                handleUpdateFormFields({
                  path: 'interviewInstrctions',
                  value: s,
                });
              }}
              placeholder='Type here'
            />
          </>
        }
        slotWelcomeMessage={
          <>
            <Intro path={'startVideo'} />
          </>
        }
        slotEndingMessageVideo={<Intro path={'endVideo'} />}
        textQuestionCount={totalQns}
        slotAssessmentQuestion={
          <>
            <Categories />
          </>
        }
        slotExpirationInput={
          <UITextField
            type='number'
            value={
              jobForm.formFields.interviewSetting.assessmentValidity
                .expirationDuration
            }
            onChange={(e) => {
              handleUpdateFormFields({
                path: 'interviewSetting.assessmentValidity.expirationDuration',
                value: e.target.value,
              });
            }}
          />
        }
        slotRetrysCount={
          <UITextField
            type='number'
            value={
              jobForm.formFields.interviewSetting.assessmentValidity
                .candidateRetry
            }
            onChange={(e) => {
              handleUpdateFormFields({
                path: 'interviewSetting.assessmentValidity.candidateRetry',
                value: e.target.value,
              });
            }}
          />
        }
        slotRightScrollMenu={
          <AssessmentScrollMenu
            onClickPreview={{
              onClick: () => {
                window.open(`/assessment`, '_blank');
              },
            }}
          />
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
        slotSwitchAudioVideo={
          <>
            {!jobForm.formFields.videoAssessment ? (
              <AudioSwitcherCard
                slotAvatar={
                  <Image
                    src={interviewerList[recruiter.audio_avatar_id].image}
                    width={40}
                    height={40}
                    alt=''
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                }
                onClickCompanySetting={{
                  onClick: () => router.replace(pageRoutes.COMPANY),
                }}
              />
            ) : (
              <VideoSwitcherCard
                slotAvatar={
                  <>
                    <Image
                      src={
                        avatar_list.find(
                          (a) => a.avatar_id === videAvatar?.avatar_id,
                        )?.normal_preview
                      }
                      width={80}
                      height={40}
                      alt=''
                      style={{
                        objectFit: 'contain',
                      }}
                    />
                  </>
                }
                onClickCompanySetting={{
                  onClick: () => router.replace(pageRoutes.COMPANY),
                }}
              />
            )}
          </>
        }
      />
    </>
  );
};

export default ScreeningQns;

// intro video

function Intro({ path }) {
  const { jobForm } = useJobForm();

  const question = get(jobForm, `formFields.${path}`) as QuestionType | null;

  return (
    <>
      <Question
        handleDeleteQn={() => {}}
        path={path}
        question={question}
        componentType='welcome'
      />
    </>
  );
}
