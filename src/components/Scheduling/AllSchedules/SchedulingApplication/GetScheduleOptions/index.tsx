import { Dialog, Stack } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import { ScheduleOptions } from '@/devlink2';
import { ButtonGrey, ButtonPrimaryDefaultRegular } from '@/devlink3';
import LoaderGrey from '@/src/components/Common/LoaderGrey';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';

import SchedulingOptionComp from '../Common/ScheduleOption';
import { useGetScheduleOptions, useSendInviteForCandidate } from '../hooks';
import {
  setDateRange,
  setinitialSessions,
  setIsScheduleNowOpen,
  setSchedulingOptions,
  setSelectedSessionIds,
  setStep,
  useSchedulingApplicationStore,
} from '../store';

function GetScheduleOptionsDialog() {
  const { recruiter } = useAuthDetails();
  const currentDate = dayjs();
  const {
    selCoordinator,
    dateRange,
    noOptions,
    selectedApplication,
    fetchingPlan,
    initialSessions,
    isScheduleNowOpen,
    step,
    selectedSessionIds,
    schedulingOptions,
    totalSlots,
  } = useSchedulingApplicationStore((state) => ({
    selCoordinator: state.selCoordinator,
    dateRange: state.dateRange,
    noOptions: state.noOptions,
    selectedApplication: state.selectedApplication,
    fetchingPlan: state.fetchingPlan,
    initialSessions: state.initialSessions,
    isScheduleNowOpen: state.isScheduleNowOpen,
    step: state.step,
    selectedSessionIds: state.selectedSessionIds,
    schedulingOptions: state.schedulingOptions,
    totalSlots: state.totalSlots,
  }));

  const { findScheduleOptions } = useGetScheduleOptions();
  const { sendToCandidate } = useSendInviteForCandidate();

  const initialEndDate = currentDate.add(5, 'day');

  useEffect(() => {
    setDateRange({
      start_date: currentDate.toISOString(),
      end_date: initialEndDate.toISOString(),
    });
    return () => {
      setIsScheduleNowOpen(false);
      setStep(1);
      setSchedulingOptions([]);
      setSelectedSessionIds([]);
    };
  }, []);

  const onClickSendToCandidate = async () => {
    const res = await sendToCandidate({
      session_ids: selectedSessionIds,
      is_get_more_option: false,
      allSessions: initialSessions,
      coordinator_id: selCoordinator,
      recruiter_id: recruiter.id,
      job_title: selectedApplication.public_jobs.job_title,
      application_id: selectedApplication.id,
      candidate_email: selectedApplication.candidates.email,
      candidate_name: getFullName(
        selectedApplication.candidates.first_name,
        selectedApplication.candidates.last_name,
      ),
      dateRange: dateRange,
      is_mail: true,
    });
    if (res) {
      setinitialSessions(
        initialSessions.map((session) => ({
          ...session,
          interview_meeting: selectedSessionIds.includes(session.id)
            ? { status: 'waiting', interview_schedule_id: null }
            : null,
        })),
      );
    }
    setSelectedSessionIds([]);
    setIsScheduleNowOpen(false);
  };

  return (
    <>
      <Dialog
        sx={{
          '& .MuiDialog-paper': {
            background: '#fff',
            border: 'none',
            borderRadius: '10px',
          },
        }}
        maxWidth='xl'
        open={isScheduleNowOpen}
        onClose={() => {
          setIsScheduleNowOpen(false);
        }}
      >
        <ScheduleOptions
          onClickClose={{
            onClick: () => {
              setIsScheduleNowOpen(false);
            },
          }}
          slotSendtoCandidateButton={
            <>
              <ButtonGrey
                textLabel={'Back'}
                onClickButton={{
                  onClick: () => {
                    setStep(1);
                  },
                }}
              />
              <ButtonPrimaryDefaultRegular
                buttonText={'Send to Candidate'}
                buttonProps={{
                  onClick: () => {
                    onClickSendToCandidate();
                  },
                }}
              />
            </>
          }
          isBasicDetailsVisible={step === 1}
          isMultipleOptionVisible={step === 2}
          slotAvailableCard={
            <SchedulingOptionComp
              schedulingOptions={schedulingOptions}
              isBadgeVisible={true}
              isInterviewVisible={true}
              total={totalSlots}
            />
          }
          slotPrimaryButton={
            <>
              <ButtonPrimaryDefaultRegular
                buttonProps={{
                  onClick: async () => {
                    if (dateRange.start_date && dateRange.end_date) {
                      await findScheduleOptions({
                        dateRange: dateRange,
                        session_ids: selectedSessionIds,
                        rec_id: recruiter.id,
                      });
                    }
                  },
                }}
                endIconSlot={
                  fetchingPlan ? (
                    <Stack height={'100%'} width={'14px'}>
                      <LoaderGrey />
                    </Stack>
                  ) : (
                    ''
                  )
                }
                buttonText={'Get Schedule Options'}
              />
            </>
          }
          isNoOptionsFoundVisible={noOptions}
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
          slotDateRangeInput={
            <Stack direction={'row'} width={'100%'} spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(dateRange?.start_date)}
                  onChange={(newValue) => {
                    if (dayjs(newValue) < dayjs(dateRange?.end_date)) {
                      setDateRange({
                        start_date: dayjs(newValue)?.toISOString(),
                        end_date: dateRange?.end_date,
                      });
                    } else {
                      setDateRange({
                        start_date: dayjs(newValue).isValid()
                          ? dayjs(newValue)?.toISOString()
                          : null,
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
                  maxDate={dayjs(dateRange?.start_date).add(1, 'month')}
                  onChange={(newValue) => {
                    setDateRange({
                      start_date: dateRange?.start_date,
                      end_date: dayjs(newValue)?.toISOString(),
                    });
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      InputProps: { disableUnderline: true },
                      placeholder: 'End Date',
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
          textPopHeader={
            step === 1 ? 'Enter Basic details' : 'Available Options'
          }
        />
      </Dialog>
      {/* <MuiPopup
        props={{
          onClose: () => {
            setIsPopupOpen(false);
            setLoading(false);
          },
          open: isPopupOpen,
        }}
      >
        <SchedulingPop
          textEmail={'Schedule With Email Agent'}
          textPhone={'Schedule With Phone Agent'}
          isEmailActive={isEmail}
          isPhoneActive={isPhone}
          slotRadioEmail={
            <RadioButton
              textLabel=''
              isChecked={isEmail}
              onClickCheck={{
                onClick: () => {
                  setEmail(true);
                  setPhone(false);
                },
              }}
            />
          }
          slotRadiophone={
            <RadioButton
              textLabel=''
              isChecked={isPhone}
              onClickCheck={{
                onClick: () => {
                  setEmail(false);
                  setPhone(true);
                },
              }}
            />
          }
          slotPrimaryButton={
            <ButtonWide
              isLoading={isloading}
              isEnabled={input !== ''}
              textButton={'Schedule'}
              onClickButton={{
                onClick: () => {
                  setLoading(true);
                  isEmail ? initConversation() : makePhoneCal();
                },
              }}
            />
          }
          slotInput1={
            <UITextField
              placeholder='Enter Phone Number'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              defaultValue={selectedApplication.candidates.phone}
            />
          }
          slotInput3={
            <UITextField
              placeholder='Enter Email'
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              defaultValue={selectedApplication.candidates.email}
            />
          }
          slotInput2={
            <Stack width={465}>
              <Autocomplete
                disableClearable
                options={timeZones}
                value={selectedTimeZone}
                onChange={(event, value) => {
                  if (value) {
                    setSelectedTimeZone(value);
                  }
                }}
                autoComplete={false}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => {
                  return (
                    <li {...props}>
                      <Typography variant='body2' color={'#000'}>
                        {option.label}
                      </Typography>
                    </li>
                  );
                }}
                renderInput={(params) => {
                  return (
                    <UITextField
                      rest={{ ...params }}
                      labelSize='medium'
                      // fullWidth
                      label=''
                      placeholder='Asia/Calcutta (GMT+05:30)'
                      InputProps={{
                        ...params.InputProps,
                        autoComplete: 'new-password',
                      }}
                    />
                  );
                }}
              />
            </Stack>
          }
          onClickClose={{
            onClick: () => {
              setIsPopupOpen(false);
            },
          }}
        />
      </MuiPopup> */}
    </>
  );
}

export default GetScheduleOptionsDialog;
