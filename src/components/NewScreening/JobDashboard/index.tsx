import { Stack } from '@mui/material';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import {
  AssessmentSide,
  ButtonPrimaryRegular,
  CreateNewJob,
  EnableAssessment,
  LoaderSvg
} from '@/devlink';
import {
  Breadcrum,
  BrowseScreeningPop,
  ChooseScreeningCard,
  PageLayout,
  PhoneScreening,
  ScreeningLandingCard
} from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobDashboard } from '@/src/context/JobDashboard';
import { useCurrentJob } from '@/src/queries/job-assessment/keys';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import MuiPopup from '../../Common/MuiPopup';

const ScreeningDashboardComp = () => {
  const { recruiter_id, recruiterUser } = useAuthDetails();
  const { job } = useJobDashboard();
  const [phoneScreening, setPhoneScreening] = useState({
    phone_screen_enabled: false,
    recruiter_id: '',
    screening_template: ''
  });
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const filteredTemplates = templates.filter(
    (template) => template.id === phoneScreening.screening_template
  );
  const filteredTitles = filteredTemplates.map((template) => template.title);
  const questionsCount = filteredTemplates.map((count) => {
    return count.questions.questions === undefined
      ? '0'
      : count.questions.questions.length;
  });
  const updateScreeningVisibility = async () => {
    try {
      const { error } = await supabase
        .from('public_jobs')
        .update({ phone_screen_enabled: false })
        .eq('id', job.id);
      if (error) {
        toast.error('Couldnt Disable Phone Screening');
      } else {
        toast.success('Successfully Updated');
        isEnable();
      }
    } catch {
      toast.error('Unable to update Screening Templates');
    }
  };
  const submitScreeningVisibility = async () => {
    try {
      const { error } = await supabase
        .from('public_jobs')
        .update({ phone_screen_enabled: true })
        .eq('id', job.id);
      if (error) {
        toast.error('Couldnt Enable Screening');
      } else {
        toast.success('Successfully Updated');
        isEnable();
      }
    } catch {
      toast.error('Unable to update Screening Templates');
    }
  };

  const isEnable = async () => {
    try {
      const { data, error } = await supabase
        .from('public_jobs')
        .select('phone_screen_enabled,recruiter_id,screening_template')
        .eq('id', job.id);

      if (error) {
        toast.error('Error Fetching Data');
      } else {
        setPhoneScreening(data[0]);
        setLoading(false);
      }
    } catch {
      toast.error('Failed to Fetch Screening Templates');
    }
  };

  const fetchTemplate = async () => {
    try {
      const { data, error } = await supabase
        .from('screening_questions')
        .select('id,title,questions')
        .eq('recruiter_id', recruiter_id);

      if (error) {
        toast.error('Error Fetching Screening Templates');
      } else {
        setTemplates(data);
      }
    } catch {
      toast.error('Failed to Fetch Screening Templates');
    }
  };

  const submitTemplate = async () => {
    try {
      const { error } = await supabase
        .from('public_jobs')
        .update({ screening_template: selectedTemplate })
        .eq('id', job.id);
      if (error) {
        toast.error('Error Submiitting Template');
      } else {
        toast.success('Successfully Updated');
        isEnable();
        setIsTemplateOpen(false);
      }
    } catch {
      toast.error('Unable to update Screening Templates');
    }
  };

  useEffect(() => {
    isEnable();
    fetchTemplate();
  }, []);
  return (
    <>
      {isLoading ? (
        <Stack
          direction={'row'}
          alignItems={'center'}
          width={'100%'}
          height={'100vh'}
          justifyContent={'center'}
        >
          <LoaderSvg />
        </Stack>
      ) : (
        <PageLayout
          slotBody={
            <CreateNewJob
              isAssessmentPreviewVisible={
                phoneScreening.phone_screen_enabled ? true : false
              }
              isHeaderVisible={false}
              isSideNavVisible={false}
              isDetailsActive={false}
              isEmailTemplateActive={false}
              isScreeningQuestionsActive={false}
              isScoreSettingActive={false}
              isWorkflowsActive={false}
              textJobName={false}
              isScreeningActive={false}
              isProceedVisible={false}
              slotCreateJob={
                phoneScreening.phone_screen_enabled ? (
                  <>
                    <Stack sx={{ paddingLeft: '16px' }}>
                      <PhoneScreening
                        isHeaderVisible={true}
                        slotWelcomeText={
                          phoneScreening.screening_template === null ? (
                            <ChooseScreeningCard
                              onClickCard={{
                                onClick: () => {
                                  setIsTemplateOpen(true);
                                }
                              }}
                            />
                          ) : (
                            <ScreeningLandingCard
                              isChange={true}
                              onClickCard={{
                                onClick: () => {
                                  setIsTemplateOpen(true);
                                }
                              }}
                              key={selectedTemplate}
                              textTitle={filteredTitles}
                              textQuestionCount={questionsCount[0]}
                            />
                          )
                        }
                      />
                      <MuiPopup
                        props={{
                          // sx: { width: '800px' },
                          maxWidth: 'md',
                          fullWidth: true,
                          open: isTemplateOpen,
                          onClose: () => {
                            setIsTemplateOpen(false);
                            setSelectedTemplate('');
                          }
                        }}
                      >
                        <BrowseScreeningPop
                          isEmpty={!templates.length ? true : false}
                          isNotEmpty={!templates.length ? false : true}
                          onClickClose={{
                            onClick: () => {
                              setIsTemplateOpen(false);
                              setSelectedTemplate('');
                            }
                          }}
                          isAddScreeenButtonVisible={selectedTemplate !== ''}
                          slotAddScreeningButton={
                            <ButtonPrimaryRegular
                              textLabel={'Add Screening'}
                              onClickButton={{
                                onClick: () => {
                                  submitTemplate();
                                  setSelectedTemplate('');
                                }
                              }}
                            />
                          }
                          slotBrowseScreeningCard={templates.map((data) => {
                            const questionCount = data.questions.questions
                              ? Object.keys(data.questions.questions).length
                              : 0;
                            return (
                              <ScreeningLandingCard
                                isChange={false}
                                isActive={selectedTemplate === data.id}
                                textTitle={data.title}
                                textQuestionCount={questionCount}
                                key={data.id}
                                onClickCard={{
                                  onClick: () => {
                                    setSelectedTemplate(data.id);
                                  }
                                }}
                              />
                            );
                          })}
                        />
                      </MuiPopup>
                    </Stack>
                  </>
                ) : (
                  <EnableAssessment
                    onClickEnablePhoneScreening={{
                      onClick: () => {
                        submitScreeningVisibility();
                      }
                    }}
                    isPhoneScreeningEnable
                    isEnableAssessmentVisible={false}
                  />
                )
              }
              slotSavedChanges={<></>}
              slotSideSection={
                phoneScreening.phone_screen_enabled ? (
                  <AssessmentSide
                    isPhoneScreeningImageVisible={true}
                    isAssessmentImageVisible={false}
                    isDisableAssessmentVisible={true}
                    textDisableButton={'Disable'}
                    textPreviewButton={'Preview'}
                    textPreview='See How Candidates Will Experience the Screening Questions'
                    textDescDisable='Disable Phone Screening for this job.'
                    onClickDisableAssessment={{
                      onClick: () => {
                        updateScreeningVisibility();
                      }
                    }}
                    onClickAssessmentPreview={{
                      onClick: () => {
                        window.open(
                          `${
                            process.env.NEXT_PUBLIC_HOST_NAME
                          }/candidate-phone-screening?template_id=${phoneScreening.screening_template}&recruiter_email=${recruiterUser.email}&recruiter_name=${[
                            recruiterUser.first_name,
                            recruiterUser.last_name
                          ].join(' ')}`,
                          '_blank'
                        );
                      }
                    }}
                  />
                ) : (
                  ''
                )
              }
            />
          }
          slotTopbarLeft={<JobScreeningDashboardBreadCrumbs />}
        />
      )}
    </>
  );
};

export default ScreeningDashboardComp;

const JobScreeningDashboardBreadCrumbs = () => {
  const { push } = useRouter();
  const { job } = useCurrentJob();
  return (
    <>
      <Breadcrum
        isLink
        textName={`${capitalize(job?.status ?? 'all')} jobs`}
        onClickLink={{
          onClick: () => {
            push(`/jobs?status=${job?.status ?? 'all'}`);
          },
          style: { cursor: 'pointer' }
        }}
      />
      <Breadcrum
        isLink
        textName={capitalize(job?.job_title ?? 'Job')}
        onClickLink={{
          onClick: () => {
            push(`/jobs/${job?.id}`);
          },
          style: { cursor: 'pointer' }
        }}
        showArrow
      />
      <Breadcrum textName={`Screening`} showArrow />
    </>
  );
};
