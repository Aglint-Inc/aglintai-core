import { pageRoutes } from '@utils/pageRouting';
import { get } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import {
  AssessmentScrollMenu,
  AudioSwitcherCard,
  EnableAssessment,
  ScreeningQuestion,
  VideoSwitcherCard,
} from '@/devlink';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobApplicationsForJob } from '@/src/context/JobApplicationsContext';
import { avatar_list } from '@/src/utils/avatarlist';
import interviewerList from '@/src/utils/interviewer_list';
import toast from '@/src/utils/toast';

import AIgeninstructionVideo from './AIgeninstructionVideo';
import Categories from './Categories';
import { Question } from './Questions';
import UploadInstructionVideo from './UploadInstructionVideo';
import ToggleBtn from '../utils/UIToggle';
import { QuestionType, useJobForm } from '../../JobPostFormProvider';

const ScreeningQns = () => {
  const { recruiter } = useAuthDetails();
  const { jobForm, handleUpdateFormFields, dispatch } = useJobForm();
  const totalQns = jobForm.formFields.interviewConfig.reduce((agg, curr) => {
    return agg + curr.questions.length;
  }, 0);

  const interviewSetting = jobForm.formFields.interviewSetting;
  const router = useRouter();

  const videAvatar = recruiter.ai_avatar as any;
  const isAssessmentOn = jobForm.formFields.assessment;
  return (
    <>
      {!isAssessmentOn ? (
        <EnableAssessment
          onClickProceed={{
            onClick: () => {
              dispatch({
                type: 'moveToSlide',
                payload: {
                  nextSlide: 'workflow',
                },
              });
            },
          }}
          isProceedDisable={false}
          isAddJob={jobForm.formType !== 'edit'}
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
        <ScreeningQuestion
          isAddJob={jobForm.formType === 'new'}
          onClickProceed={{
            onClick: () => {
              dispatch({
                type: 'moveToSlide',
                payload: {
                  nextSlide: 'workflow',
                },
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
            <>
              <SectionTabs />
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

const sectionIds = [
  'instruction',
  'assessment_mode',
  'welcome',
  'assessment_question',
  'epilogue',
  'validity',
];

function SectionTabs() {
  const { handleUpdateFormFields, jobForm } = useJobForm();
  const { job } = useJobApplicationsForJob(jobForm.jobPostId);

  const [isSectionInview, setIsSectionInView] = useState(Array(6).fill(false));
  const sectionRefs = useRef(null);
  const router = useRouter();
  useEffect(() => {
    sectionRefs.current = sectionIds.map((sectionId) =>
      document.getElementById(sectionId),
    );

    const observers = sectionRefs.current.map((ref, idx) => {
      return new IntersectionObserver(
        ([entry]) => {
          // Update state based on whether the section is in view or not

          if (entry.isIntersecting) {
            setIsSectionInView(() => {
              const newState = Array(5).fill(false);
              newState[Number(idx)] = true;
              return newState;
            });
          }
        },
        {
          root: null, // Use the viewport as the root
          rootMargin: '0px', // No margin
          threshold: 0.2, // Trigger when 50% of the section is in view
        },
      );
    });

    sectionRefs.current.forEach((ref, index) => {
      if (ref) {
        observers[Number(index)].observe(ref);
      }
    });

    return () => {
      observers.forEach((observer, index) => {
        if (sectionRefs.current[Number(index)].current) {
          observer.unobserve(sectionRefs.current[Number(index)].current);
        }
      });
    };
  }, []);

  const handleClickTab = (sectionidx: number) => {
    const section = document.getElementById(sectionIds[Number(sectionidx)]);
    if (!section) return;
    section.scrollIntoView({ behavior: 'smooth', inline: 'start' });
  };

  const allowDisable = job?.count.assessment === 0;

  const handleWarning = () => {
    const count = job?.count.assessment;
    toast.warning(
      `${count} cadidate${
        count === 1 ? '' : 's'
      } under assessment. Disabling forbidden!`,
    );
  };

  return (
    <>
      <AssessmentScrollMenu
        onClickDisable={{
          onClick: () => {
            allowDisable
              ? handleUpdateFormFields({
                  path: 'assessment',
                  value: false,
                })
              : handleWarning();
          },
        }}
        isInstructionActive={isSectionInview[0]}
        isAssessmentActive={isSectionInview[1]}
        isWelcomeActive={isSectionInview[2]}
        isAssessmentQuestionActive={isSectionInview[3]}
        isEpilogueActive={isSectionInview[4]}
        isValidityVisible={isSectionInview[5]}
        onClickInstructions={{
          onClick: () => handleClickTab(0),
        }}
        onClickAssessmentMode={{
          onClick: () => handleClickTab(1),
        }}
        onClickWelcome={{
          onClick: () => handleClickTab(2),
        }}
        onClickAssessmentQuestions={{
          onClick: () => handleClickTab(3),
        }}
        onClickEpilogue={{
          onClick: () => handleClickTab(4),
        }}
        onClickValidity={{
          onClick: () => handleClickTab(5),
        }}
        onClickPreview={{
          onClick: () => {
            window.open(
              `/assessment?job_id=${router.query.job_id}&mode=preview`,
              'blank',
            );
          },
        }}
      />
    </>
  );
}
