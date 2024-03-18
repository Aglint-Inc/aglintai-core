import { Stack } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { ButtonPrimaryRegular } from '@/devlink';
import {
  AvailableOption,
  InterviewPlanEmpty,
  ScheduleOptions,
  SchedulingFlow,
} from '@/devlink2';
import { InterviewBreakCard } from '@/devlink3';
import Loader from '@/src/components/Common/Loader';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import InterviewPlanCardComp from '../Common/InterviewPlanCardComp';
import SchedulingOptionComp from '../ScheduleOption';
import {
  setDateRange,
  setFetchingPlan,
  setScheduleName,
  setSchedulingOptions,
  setSelectedApplication,
  setStep,
  useSchedulingApplicationStore,
} from '../store';
import { mailHandler, transformData } from '../../utils';

function NotScheduledApplication() {
  const router = useRouter();
  const currentDate = dayjs();
  const { recruiter } = useAuthDetails();
  const selectedApplication = useSchedulingApplicationStore(
    (state) => state.selectedApplication,
  );
  const interviewModules = useSchedulingApplicationStore(
    (state) => state.interviewModules,
  );
  const members = useSchedulingApplicationStore((state) => state.members);
  const dateRange = useSchedulingApplicationStore((state) => state.dateRange);
  const scheduleName = useSchedulingApplicationStore(
    (state) => state.scheduleName,
  );
  const step = useSchedulingApplicationStore((state) => state.step);
  const fetchingPlan = useSchedulingApplicationStore(
    (state) => state.fetchingPlan,
  );
  const fetchingSchedule = useSchedulingApplicationStore(
    (state) => state.fetchingSchedule,
  );

  const allPlans = useMemo(() => {
    return selectedApplication?.public_jobs?.interview_plan?.plan;
  }, [selectedApplication?.public_jobs?.interview_plan?.plan]);

  const findScheduleOptions = async () => {
    try {
      setFetchingPlan(true);
      const res = await axios.post('/api/scheduling/v2/find_availability', {
        job_id: selectedApplication.public_jobs.id,
        company_id: recruiter.id,
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
      });
      if (res.data) {
        if (res.data.length === 0) {
          toast.warning('No schedule options found for the given date range');
          setStep(1);
        } else {
          setSchedulingOptions(
            res.data.map((option) => {
              return {
                ...option,
                transformedPlan: transformData(option.plans),
              };
            }),
          );
          setStep(2);
        }
        setFetchingPlan(false);
      } else {
        setStep(1);
        toast.error('Error fetching schedule options');
        setFetchingPlan(false);
      }
    } catch (e) {
      setStep(1);
      //
    }
  };

  const sendToCandidate = async () => {
    const { data, error } = await supabase
      .from('interview_schedule')
      .insert({
        application_id: selectedApplication.applications.id,
        schedule_name: scheduleName,
        schedule_type: 'google_meet',
        interview_plan: allPlans,
        status: 'pending',
        filter_json: {
          job_id: selectedApplication.public_jobs.id,
          company_id: recruiter.id,
          start_date: dateRange.start_date,
          end_date: dateRange.end_date,
        },
      })
      .select();

    if (!error) {
      mailHandler({
        id: data[0].id,
        candidate_name: selectedApplication.candidates.first_name,
        company_logo: recruiter.logo,
        company_name: recruiter.name,
        schedule_name: scheduleName,
      });
      setSelectedApplication({
        ...selectedApplication,
        schedule: data[0] as any,
      });
    }
  };

  return (
    <>
      {!fetchingSchedule ? (
        allPlans?.length > 0 ? (
          <SchedulingFlow
            onClickJobSettings={{
              onClick: () => {
                router.push(
                  `${pageRoutes.JOBS}/${selectedApplication.public_jobs.id}/interview-plan`,
                );
              },
            }}
            textRole={selectedApplication.public_jobs.job_title}
            textLocation={selectedApplication.public_jobs.location || '--'}
            slotScheduleOptions={
              <>
                {fetchingPlan ? (
                  <Stack height={'100%'} width={'100%'}>
                    <Loader />
                  </Stack>
                ) : step === 1 ? (
                  <ScheduleOptions
                    slotCandidateImage={
                      <MuiAvatar
                        level={getFullName(
                          selectedApplication?.candidates.first_name,
                          selectedApplication?.candidates.last_name,
                        )}
                        src={selectedApplication?.candidates.avatar}
                        variant={'circular'}
                        width={'100%'}
                        height={'100%'}
                        fontSize={'12px'}
                      />
                    }
                    slotPrimaryButton={
                      <Stack width={'100%'}>
                        <ButtonPrimaryRegular
                          textLabel={'Get Schedule Options'}
                          onClickButton={{
                            onClick: findScheduleOptions,
                          }}
                        />
                      </Stack>
                    }
                    slotInputName={
                      <UITextField
                        placeholder='Name your Schedule'
                        onChange={(e) => {
                          setScheduleName(e.target.value);
                        }}
                        value={scheduleName}
                      />
                    }
                    slotDateRangeInput={
                      <Stack direction={'row'} width={'100%'} spacing={2}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            value={dayjs(dateRange?.start_date)}
                            onChange={(newValue) => {
                              if (
                                dayjs(newValue) < dayjs(dateRange?.end_date)
                              ) {
                                setDateRange({
                                  start_date: dayjs(newValue).toISOString(),
                                  end_date: dateRange?.end_date,
                                });
                              } else {
                                setDateRange({
                                  start_date: dayjs(newValue).toISOString(),
                                  end_date: null,
                                });
                              }
                            }}
                            minDate={currentDate}
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                variant: 'outlined',
                                InputProps: { disableUnderline: true },
                                placeholder: 'Start Date',
                              },
                            }}
                          />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            value={dayjs(dateRange?.end_date)}
                            minDate={dayjs(dateRange?.start_date)}
                            maxDate={dayjs(dateRange?.start_date).add(7, 'day')}
                            onChange={(newValue) => {
                              setDateRange({
                                start_date: dateRange?.start_date,
                                end_date: dayjs(newValue).toISOString(),
                              });
                            }}
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                variant: 'outlined',
                                InputProps: { disableUnderline: true },
                                placeholder: 'Start Date',
                              },
                            }}
                          />
                        </LocalizationProvider>
                      </Stack>
                    }
                    textCandidateName={getFullName(
                      selectedApplication.candidates.first_name,
                      selectedApplication.candidates.last_name,
                    )}
                  />
                ) : (
                  <AvailableOption
                    slotSendCandidatesButton={
                      <Stack direction={'row'} pt={4}>
                        <ButtonPrimaryRegular
                          textLabel={'Send to Candidate'}
                          onClickButton={{
                            onClick: sendToCandidate,
                          }}
                        />
                      </Stack>
                    }
                    slotOptionAvailableCard={<SchedulingOptionComp />}
                  />
                )}
              </>
            }
            slotPlanCard={
              <>
                {allPlans.map((plan) => {
                  const mod = interviewModules.find(
                    (module) => module.id === plan.module_id,
                  );
                  return plan.isBreak ? (
                    <InterviewBreakCard
                      textDuration={plan.duration + ' Minutes'}
                      isEditDeleteVisible={false}
                    />
                  ) : (
                    <InterviewPlanCardComp
                      members={members}
                      plan={plan}
                      mod={mod}
                    />
                  );
                })}
              </>
            }
          />
        ) : (
          <InterviewPlanEmpty
            onClickCreateInterviewPlan={{
              onClick: () => {
                router.push(
                  `${pageRoutes.JOBS}/${selectedApplication.public_jobs.id}/interview-plan`,
                );
              },
            }}
          />
        )
      ) : (
        <Loader />
      )}
    </>
  );
}

export default NotScheduledApplication;
