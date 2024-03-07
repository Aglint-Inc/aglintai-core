import { Stack, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { ButtonPrimaryRegular } from '@/devlink';
import { InterviewPlanCard, SchedulingFlow } from '@/devlink2';
import { InterviewBreakCard } from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import UITextField from '@/src/components/Common/UITextField';
import { getFullName } from '@/src/utils/jsonResume';
import { pageRoutes } from '@/src/utils/pageRouting';

import {
  setDateRange,
  setScheduleName,
  useSchedulingApplicationStore
} from '../store';
import { convertToWord } from '../../utils';

function NotScheduledApplication() {
  const router = useRouter();
  const currentDate = dayjs();
  const selectedApplication = useSchedulingApplicationStore(
    (state) => state.selectedApplication
  );
  const interviewModules = useSchedulingApplicationStore(
    (state) => state.interviewModules
  );
  const members = useSchedulingApplicationStore((state) => state.members);
  const dateRange = useSchedulingApplicationStore((state) => state.dateRange);
  const scheduleName = useSchedulingApplicationStore(
    (state) => state.scheduleName
  );

  let allPlans = useMemo(() => {
    return selectedApplication?.public_jobs?.interview_plan?.plan;
  }, [selectedApplication?.public_jobs?.interview_plan?.plan]);

  return (
    <>
      {selectedApplication && (
        <SchedulingFlow
          onClickJobSettings={{
            onClick: () => {
              router.push(
                `${pageRoutes.JOBS}/${selectedApplication.public_jobs.id}/interview-plan`
              );
            }
          }}
          slotInputName={
            <UITextField
              placeholder='Name your Schedule'
              onChange={(e) => {
                setScheduleName(e.target.value);
              }}
              value={scheduleName}
            />
          }
          textCandidateName={getFullName(
            selectedApplication.candidates.first_name,
            selectedApplication.candidates.last_name
          )}
          textRole={selectedApplication.public_jobs.job_title}
          textLocation={selectedApplication.public_jobs.location || '--'}
          slotCandidateImage={
            <MuiAvatar
              level={getFullName(
                selectedApplication?.candidates.first_name,
                selectedApplication?.candidates.last_name
              )}
              src={selectedApplication?.candidates.avatar}
              variant={'circular'}
              width={'100%'}
              height={'100%'}
              fontSize={'12px'}
            />
          }
          slotDateRangeInput={
            <Stack direction={'row'} width={'100%'} spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(dateRange?.start_date)}
                  onChange={(newValue) => {
                    if (dayjs(newValue) < dayjs(dateRange?.end_date)) {
                      setDateRange({
                        start_date: dayjs(newValue).toISOString(),
                        end_date: dateRange?.end_date
                      });
                    } else {
                      setDateRange({
                        start_date: dayjs(newValue).toISOString(),
                        end_date: null
                      });
                    }
                  }}
                  minDate={currentDate}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      InputProps: { disableUnderline: true },
                      placeholder: 'Start Date'
                    }
                  }}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(dateRange?.end_date)}
                  minDate={dayjs(dateRange?.start_date)}
                  onChange={(newValue) => {
                    setDateRange({
                      start_date: dateRange?.start_date,
                      end_date: dayjs(newValue).toISOString()
                    });
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      InputProps: { disableUnderline: true },
                      placeholder: 'Start Date'
                    }
                  }}
                />
              </LocalizationProvider>
            </Stack>
          }
          slotPlanCard={
            <>
              {allPlans.map((plan) => {
                const mod = interviewModules.find(
                  (module) => module.id === plan.module_id
                );
                return plan.isBreak ? (
                  <InterviewBreakCard
                    textDuration={plan.duration}
                    isEditDeleteVisible={false}
                  />
                ) : (
                  <InterviewPlanCard
                    key={plan.module_id}
                    textTitle={mod?.name}
                    textDuration={plan.duration + ' Minutes'}
                    textMemberFrom={`${convertToWord(
                      plan?.meetingIntervCnt || 0
                    )} Member from :`}
                    slotMemberList={
                      <Stack
                        direction={'row'}
                        sx={{
                          flexWrap: 'wrap',
                          gap: 2.5
                        }}
                      >
                        {plan.selectedIntervs.map((int) => {
                          const user = members.find(
                            (member) => member.user_id === int.interv_id
                          );
                          if (!user) return null;
                          return (
                            <Stack
                              key={int.interv_id}
                              direction={'row'}
                              spacing={1}
                              sx={{
                                textWrap: 'nowrap'
                              }}
                            >
                              <MuiAvatar
                                level={getFullName(
                                  user.first_name,
                                  user.last_name
                                )}
                                src={user?.profile_image}
                                variant={'circular'}
                                width={'24px'}
                                height={'24px'}
                                fontSize={'12px'}
                              />
                              <Typography variant={'body2'} color={'#000'}>
                                {getFullName(user.first_name, user.last_name)}
                              </Typography>
                            </Stack>
                          );
                        })}
                      </Stack>
                    }
                  />
                );
              })}

              <Stack direction={'row'} pt={4}>
                <ButtonPrimaryRegular textLabel={'Find Schedule Options'} />
              </Stack>
            </>
          }
        />
      )}
    </>
  );
}

export default NotScheduledApplication;
