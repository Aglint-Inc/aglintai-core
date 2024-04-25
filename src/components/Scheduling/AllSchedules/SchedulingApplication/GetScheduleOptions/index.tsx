import { Dialog, Stack, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { ScheduleOptions } from '@/devlink2';
import { ButtonPrimaryDefaultRegular } from '@/devlink3';
import LoaderGrey from '@/src/components/Common/LoaderGrey';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApiBodyParamsSendToCandidate } from '@/src/pages/api/scheduling/application/sendtocandidate';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import SchedulingOptionComp from '../Common/ScheduleOption';
import {
  setDateRange,
  setinitialSessions,
  setIsScheduleNowOpen,
  setSchedulingOptions,
  setSelectedSessionIds,
  useSchedulingApplicationStore
} from '../store';

function GetScheduleOptionsDialog() {
  const currentDate = dayjs();
  const { recruiter, recruiterUser } = useAuthDetails();
  const {
    dateRange,
    noOptions,
    selectedApplication,
    initialSessions,
    isScheduleNowOpen,
    selectedSessionIds,
    schedulingOptions,
    totalSlots,
    selCoordinator,
  } = useSchedulingApplicationStore((state) => ({
    dateRange: state.dateRange,
    noOptions: state.noOptions,
    selectedApplication: state.selectedApplication,
    initialSessions: state.initialSessions,
    isScheduleNowOpen: state.isScheduleNowOpen,
    selectedSessionIds: state.selectedSessionIds,
    schedulingOptions: state.schedulingOptions,
    totalSlots: state.totalSlots,
    selCoordinator: state.selCoordinator,
  }));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const initialEndDate = currentDate.add(15, 'day');

  useEffect(() => {
    setDateRange({
      start_date: currentDate.toISOString(),
      end_date: initialEndDate.toISOString(),
    });
    return () => {
      setIsScheduleNowOpen(false);
      setSchedulingOptions([]);
      setSelectedSessionIds([]);
    };
  }, []);

  const isDebrief = initialSessions
    .filter((ses) => selectedSessionIds.includes(ses.id))
    .some((ses) => ses.session_type === 'debrief');

  const onClickSendToCandidate = async () => {
    try {
      setSaving(true);
      if (isDebrief && !selectedId) {
        toast.warning('Please select a slot to schedule');
      } else {
        const res = await axios.post(
          '/api/scheduling/application/sendtocandidate',
          {
            dateRange,
            initialSessions,
            is_mail: true,
            is_debrief: isDebrief,
            recruiter_id: recruiter.id,
            recruiterUser,
            schedulingOptions,
            selCoordinator,
            selected_comb_id: selectedId,
            selectedApplication,
            selectedSessionIds,
            user_tz: dayjs.tz.guess(),
          } as ApiBodyParamsSendToCandidate,
        );

        if (res.status === 200 && res.data) {
          setinitialSessions(
            initialSessions.map((session) => ({
              ...session,
              interview_meeting: selectedSessionIds.includes(session.id)
                ? session.interview_meeting
                  ? {
                      ...session.interview_meeting,
                      status: 'waiting',
                    }
                  : { status: 'waiting', interview_schedule_id: null }
                : session.interview_meeting
                  ? { ...session.interview_meeting }
                  : null,
            })),
          );
        }
        setSelectedSessionIds([]);
        setIsScheduleNowOpen(false);
      }
    } catch (e) {
      //
    } finally {
      setSaving(false);
    }
  };

  const resetState = () => {
    setIsScheduleNowOpen(false);
    setSchedulingOptions([]);
    setSelectedSessionIds([]);
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
          resetState();
        }}
      >
        <ScheduleOptions
          onClickClose={{
            onClick: () => {
              resetState();
            },
          }}
          slotSendtoCandidateButton={
            <>
              <ButtonPrimaryDefaultRegular
                buttonText={isDebrief ? 'Schedule Now' : 'Send to Candidate'}
                buttonProps={{
                  onClick: () => {
                    if (!saving) onClickSendToCandidate();
                  },
                }}
                endIconSlot={
                  saving && (
                    <Stack height={'16px'} width={'16px'}>
                      <LoaderGrey />
                    </Stack>
                  )
                }
              />
            </>
          }
          isBasicDetailsVisible={false}
          isMultipleOptionVisible={true}
          slotAvailableCard={
            <SchedulingOptionComp
              schedulingOptions={schedulingOptions}
              isBadgeVisible={true}
              isInterviewVisible={true}
              total={totalSlots}
              isDebrief={isDebrief}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
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
              <TextField fullWidth />
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
          textPopHeader={isDebrief ? 'Pick a slot' : 'Available Options'}
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
