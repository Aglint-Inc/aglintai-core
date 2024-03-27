import { Autocomplete, Stack, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import timeZones from '@utils/timeZone.json';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { RadioButton } from '@/devlink';
import { ButtonWide, ScheduleOptions } from '@/devlink2';
import {
  ButtonGrey,
  ButtonPrimaryDefaultRegular,
  SchedulingPop,
} from '@/devlink3';
import AvatarSelectDropDown from '@/src/components/Common/AvatarSelect/AvatarSelectDropDown';
import LoaderGrey from '@/src/components/Common/LoaderGrey';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import MuiPopup from '@/src/components/Common/MuiPopup';
import UITextField from '@/src/components/Common/UITextField';
import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { InitAgentBodyParams } from '@/src/components/ScheduleAgent/types';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { useGetScheduleOptions } from '../../hooks';
import {
  setDateRange,
  setScheduleName,
  setSelCoordinator,
  useSchedulingApplicationStore,
} from '../../store';

function GetScheduleOptions() {
  const { recruiter } = useAuthDetails();
  const currentDate = dayjs();
  const {
    selCoordinator,
    fetchingSchedule,
    members,
    dateRange,
    noOptions,
    scheduleName,
    selectedApplication,
    fetchingPlan,
  } = useSchedulingApplicationStore((state) => ({
    selCoordinator: state.selCoordinator,
    dateRange: state.dateRange,
    fetchingPlan: state.fetchingPlan,
    members: state.members,
    scheduleName: state.scheduleName,
    selectedApplication: state.selectedApplication,
    noOptions: state.noOptions,
    fetchingSchedule: state.fetchingSchedule,
  }));

  const { findScheduleOptions } = useGetScheduleOptions();
  const router = useRouter();
  const { recruiter_id, recruiterUser } = useAuthDetails();
  const [isloading, setLoading] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>(
    selectedApplication.candidates.phone,
  );
  const [selectedTimeZone, setSelectedTimeZone] = useState(null);
  const [isEmail, setEmail] = useState(true);
  const [isPhone, setPhone] = useState(false);

  const initConversation = async () => {
    try {
      const [rec] = supabaseWrap(
        await supabase
          .from('applications')
          .select(
            'id, candidate_files(resume_json,candidate_id),public_jobs(id,job_title), candidates(*)',
          )
          .eq('id', selectedApplication.applications.id),
      );
      let payload: InitAgentBodyParams = {
        application_id: rec.id,
        end_date: dateRange.end_date,
        start_date: dateRange.start_date,
        company_id: recruiter_id,
        recruiter_user_id: recruiterUser.user_id,
        organizer_time_zone: dayjs.tz.guess(),
        schedule_type: 'email',
      };
      await axios.post('/api/scheduling/mail-agent/init-agent', {
        ...payload,
      });
      // console.log(data);
    } catch (error) {
      toast.error(error);
    } finally {
      toast.success('Email Successfully Sent');
      router.push(`/scheduling?tab=candidates`);
    }
  };
  const makePhoneCal = async () => {
    try {
      let payload: InitAgentBodyParams = {
        application_id: selectedApplication.applications.id,
        end_date: dateRange.end_date,
        start_date: dateRange.start_date,
        company_id: recruiter_id,
        recruiter_user_id: recruiterUser.user_id,
        organizer_time_zone: dayjs.tz.guess(),
        schedule_type: 'phone',
      };
      const {
        data: { schedule_id },
      } = await axios.post('/api/scheduling/mail-agent/init-agent', {
        ...payload,
      });

      const phone_payload = {
        company_name: 'Figmatic',
        schedule_id: schedule_id,
        application_id: selectedApplication.applications.id,
        caq: 'Based  in Caalifornia',
        begin_call_sentence:
          'Hi Dileep, this is Raimon calling from Aglint. We wanted to schedule an interview for the position of SDE, Is this the right time to talk?',
        from: '+12512066348',
        to: input,
        agent: 'd874c616f28ef76fe4eefe45af69cda7',
        types: 'Scheduling',
        title: 'initial',
        organizer_time_zone: 'Asia/colombo',
        cand_time_zone: selectedTimeZone.tzCode,
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_PHONE_CALL_SERVER}/api/create-phone-call`,

        {
          ...phone_payload,
        },
      );
    } catch (error) {
      toast.error(error);
    } finally {
      toast.success('Call Initiated Successfully');
      setIsPopupOpen(false);
      router.push(`/scheduling?tab=candidates`);
    }
    //
  };
  return (
    <>
      <ScheduleOptions
        slotInterviewCordinator={
          !fetchingSchedule && (
            <AvatarSelectDropDown
              onChange={(e) => {
                setSelCoordinator(e.target.value);
              }}
              menuOptions={members?.map((m) => ({
                name: m.first_name + ' ' + (m?.last_name || ''),
                value: m.user_id,
                start_icon_url: m.profile_image,
              }))}
              showMenuIcons
              value={selCoordinator}
              defaultValue={selCoordinator}
            />
          )
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
        slotPrimaryButton={
          <>
            <ButtonGrey
              textLabel={'Schedule With Agent'}
              onClickButton={{
                onClick: () => {
                  setIsPopupOpen(true);
                },
              }}
            />
            <ButtonPrimaryDefaultRegular
              buttonProps={{
                onClick: async () => {
                  if (dateRange.start_date && dateRange.end_date)
                    await findScheduleOptions({
                      dateRange: dateRange,
                      selectedApplication: selectedApplication,
                      rec_id: recruiter.id,
                    });
                },
              }}
              endIconSlot={
                fetchingPlan ? (
                  <Stack height={'100%'} width={'20px'}>
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
      </MuiPopup>
    </>
  );
}

export default GetScheduleOptions;
