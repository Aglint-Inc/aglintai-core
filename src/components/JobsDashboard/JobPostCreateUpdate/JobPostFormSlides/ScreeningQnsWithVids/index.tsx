import { pageRoutes } from '@utils/pageRouting';
import { get } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useFeatureFlagEnabled } from 'posthog-js/react';

import {
  AssessmentEpilogue,
  AssessmentQuestion,
  AssessmentSetting,
  AudioSwitcherCard,
  EnableAssessment,
  JobEditWarning,
  JobWarningList,
  ScreeningQuestion,
  VideoSwitcherCard,
  WelcomeMessage,
} from '@/devlink';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import UITextField from '@/src/components/Common/UITextField';
import { tabs } from '@/src/components/CompanyDetailComp/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { avatar_list } from '@/src/utils/avatarlist';
import interviewerList from '@/src/utils/interviewer_list';

import AIgeninstructionVideo from './AIgeninstructionVideo';
import Categories from './Categories';
import { Question } from './Questions';
import UploadInstructionVideo from './UploadInstructionVideo';
import ToggleBtn from '../utils/UIToggle';
import { copyJobForm } from '../../copies/copyJobForm';
import { QuestionType, useJobForm } from '../../JobPostFormProvider';

const ScreeningQns = () => {
  const { recruiter } = useAuthDetails();
  const { jobForm, handleUpdateFormFields, formWarnings } = useJobForm();
  const totalQns = jobForm.formFields.interviewConfig.reduce((agg, curr) => {
    return agg + curr.questions.length;
  }, 0);

  const interviewSetting = jobForm.formFields.interviewSetting;
  const router = useRouter();

  const videAvatar = recruiter.ai_avatar as any;
  const isAssessmentOn = jobForm.formFields.assessment;
  const currentAssTab = jobForm.currentAssmSlides;

  const isEnableVideoAssesment = useFeatureFlagEnabled(
    'isEnableVideoAssesment',
  );

  return (
    <>
      {!isAssessmentOn ? (
        <EnableAssessment
          onClickEnableAssessment={{
            onClick: () => {
              handleUpdateFormFields({
                path: 'assessment',
                value: true,
              });
            },
          }}
        />
      ) : (
        <>
          {currentAssTab === 'settings' && (
            <AssessmentSetting
              textMode={
                isEnableVideoAssesment
                  ? copyJobForm.assesMent.setting.title.withVideo
                  : copyJobForm.assesMent.setting.title.withoutVideo
              }
              isSwitchAudioVideoVisible={isEnableVideoAssesment}
              textDesc={
                isEnableVideoAssesment
                  ? copyJobForm.assesMent.setting.description.withVideo
                  : copyJobForm.assesMent.setting.description.withoutVideo
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
                        onClick: () =>
                          router.replace(
                            `${pageRoutes.COMPANY}?tab=${tabs.assessment}`,
                          ),
                      }}
                    />
                  )}
                </>
              }
            />
          )}
          {currentAssTab === 'assesqns' && (
            <AssessmentQuestion
              slotAssessmentQuestion={
                <>
                  <Categories />
                </>
              }
              textQuestionCount={totalQns}
              isWarningVisible={formWarnings.assesqns.err.length > 0}
              slotWarning={
                formWarnings.assesqns.err.length !== 0 && (
                  <JobEditWarning
                    slotWarningList={
                      <>
                        {formWarnings.assesqns.err.map((er, index) => (
                          <JobWarningList key={index} textWarning={er} />
                        ))}
                      </>
                    }
                  />
                )
              }
            />
          )}
          {currentAssTab === 'welcome' && (
            <WelcomeMessage
              slotWelcomeMessage={
                <>
                  <Intro path={'startVideo'} />
                </>
              }
            />
          )}
          {currentAssTab === 'epilogue' && (
            <AssessmentEpilogue
              slotEndingMessageVideo={<Intro path={'endVideo'} />}
            />
          )}
          {currentAssTab === 'instructions' && (
            <ScreeningQuestion
              isUploadVisible={
                jobForm.formFields.interviewSetting.showInstructionVideo
              }
              slotWarning={
                formWarnings.instructions.err.length !== 0 && (
                  <JobEditWarning
                    slotWarningList={
                      <>
                        {formWarnings.instructions.err.map((er, index) => (
                          <JobWarningList key={index} textWarning={er} />
                        ))}
                      </>
                    }
                  />
                )
              }
              isRadioVisible={isEnableVideoAssesment}
              isWarningVisible={formWarnings.instructions.err.length > 0}
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
              isGenerateWithAiChecked={
                jobForm.formFields.interviewSetting.isVideoAiGenerated
              }
              isUploadChecked={
                !jobForm.formFields.interviewSetting.isVideoAiGenerated
              }
              onClickGenerateAi={{
                onClick: () => {
                  handleUpdateFormFields({
                    path: 'interviewSetting.isVideoAiGenerated',
                    value: true,
                  });
                },
              }}
              onClickUpload={{
                onClick: () => {
                  handleUpdateFormFields({
                    path: 'interviewSetting.isVideoAiGenerated',
                    value: false,
                  });
                },
              }}
              slotToggleInstructionVideo={
                <ToggleBtn
                  handleChange={() => {
                    handleUpdateFormFields({
                      path: 'interviewSetting.showInstructionVideo',
                      value:
                        !jobForm.formFields.interviewSetting
                          .showInstructionVideo,
                    });
                  }}
                  isChecked={interviewSetting.showInstructionVideo}
                />
              }
              slotUpload={
                <>
                  {!interviewSetting.isVideoAiGenerated ? (
                    <UploadInstructionVideo />
                  ) : (
                    <AIgeninstructionVideo />
                  )}
                </>
              }
            />
          )}
        </>
      )}
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
