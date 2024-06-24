import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { LoaderSvg } from '@/devlink/LoaderSvg';
import { Breadcrum } from '@/devlink2/Breadcrum';
import { ButtonWide } from '@/devlink2/ButtonWide';
import { EmptyPhoneScreening } from '@/devlink2/EmptyPhoneScreening';
import { PageLayout } from '@/devlink2/PageLayout';
import { PhoneScreeningTopRight } from '@/devlink2/PhoneScreeningTopRight';
import { ScreeningLanding } from '@/devlink2/ScreeningLanding';
import { ScreeningLandingCard } from '@/devlink2/ScreeningLandingCard';
import { ScreeningLandingPop } from '@/devlink2/ScreeningLandingPop';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import MuiPopup from '../../Common/MuiPopup';
import UITextField from '../../Common/UITextField';
import { QuestionnaireData } from '../types';

const Screening = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const { recruiter } = useAuthDetails();
  const [templates, setTemplates] = useState<QuestionnaireData[]>([]);
  const [isloading, setLoading] = useState<boolean>(false);
  const [isloader, setIsLoader] = useState<boolean>(true);
  const [isDashloader, setDashLoader] = useState<boolean>(true);
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('screening_questions')
        .insert({ title: input, questions: {}, recruiter_id: recruiter.id })
        .select();
      if (error) {
        toast.error('Failed to submit');
      } else {
        toast.success('Created screening.');
        setIsPopupOpen(false);
        setInput('');
        setTemplates((prev: any) => {
          return [...prev, ...data];
        });
        router.push(`/screening/${data[0].id}`);
      }
    } catch (error) {
      toast.error('Failed to submit');
    }
  };

  const fetchTemplate = async () => {
    try {
      const { data, error } = await supabase
        .from('screening_questions')
        .select('id,title,questions')
        .eq('recruiter_id', recruiter.id);

      if (error) {
        toast.error(error);
      } else {
        setIsLoader(false);
        setTemplates(data as any);
      }
    } catch {
      toast.error('Failed to Fetch Screening Templates');
    }
  };
  useEffect(() => {
    if (recruiter.id !== null) {
      fetchTemplate();
      setDashLoader(false);
    }
  }, [recruiter]);
  return (
    <>
      {isDashloader ? (
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
        <>
          <PageLayout
            slotBody={
              <Stack px={2}>
                {!isloader && templates.length === 0 ? (
                  <EmptyPhoneScreening />
                ) : (
                  <ScreeningLanding
                    slotScreeningLandingCard={templates.map((data) => {
                      const questionCount = data.questions.questions
                        ? Object.keys(data.questions.questions).length
                        : 0;
                      return (
                        <ScreeningLandingCard
                          isChange={false}
                          textTitle={data.title}
                          key={data.id}
                          textQuestionCount={questionCount}
                          onClickCard={{
                            onClick: () => {
                              router.push(`/screening/${data.id}`);
                            },
                          }}
                        />
                      );
                    })}
                  />
                )}
              </Stack>
            }
            slotTopbarLeft={<ScreeningDashboardBreadCrumbs />}
            slotTopbarRight={
              <>
                <PhoneScreeningTopRight
                  slotButton={
                    <>
                      <ButtonSoft
                        textButton='All Candidates'
                        size={2}
                        color={'neutral'}
                        iconName='north_east'
                        isLeftIcon
                        highContrast='true'
                        onClickButton={{
                          onClick: () => {
                            router.push('/screening-dashboard');
                          },
                        }}
                      />
                      <ButtonSolid
                        textButton='New Screening'
                        size={2}
                        isLeftIcon
                        iconName='add'
                        onClickButton={{
                          onClick: () => setIsPopupOpen(true),
                        }}
                      />
                    </>
                  }
                />
              </>
            }
          />
          <MuiPopup
            props={{
              onClose: () => {
                setIsPopupOpen(false);
                setLoading(false);
              },
              open: isPopupOpen,
            }}
          >
            <ScreeningLandingPop
              onClickClose={{ onClick: () => setIsPopupOpen(false) }}
              slotScreeningNameInput={
                <UITextField
                  placeholder='Enter Screening Name'
                  value={input}
                  label='Screening Name'
                  required
                  onChange={(e) => setInput(e.target.value)}
                />
              }
              slotButtonPrimaryRegular={
                <>
                  <ButtonWide
                    isEnabled={input !== ''}
                    textButton={'Submit'}
                    isLoading={isloading}
                    onClickButton={{
                      onClick: () => {
                        setLoading(true);
                        handleSubmit();
                      },
                    }}
                  />
                </>
              }
            />
          </MuiPopup>
        </>
      )}
    </>
  );
};

export default Screening;

const ScreeningDashboardBreadCrumbs = () => {
  return <Breadcrum textName={`Screening`} />;
};
